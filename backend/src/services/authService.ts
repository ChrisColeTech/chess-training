import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Database } from '../utils/database';
import { JWTService, TokenPayload } from '../utils/jwt';
import { User, UserPublic, CreateUserRequest, LoginRequest } from '../models/User';

export class AuthService {
  private db = Database.getInstance();

  async register(userData: CreateUserRequest): Promise<UserPublic> {
    const { username, email, password } = userData;

    // Check if user already exists
    const existingUser = await this.db.db.get(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    // Create user
    await this.db.db.run(
      `INSERT INTO users (id, username, email, password_hash) 
       VALUES (?, ?, ?, ?)`,
      [userId, username, email, passwordHash]
    );

    // Get created user
    const user = await this.db.db.get(
      'SELECT id, username, email, chess_elo, puzzle_rating, preferences, created_at, updated_at FROM users WHERE id = ?',
      [userId]
    );

    return {
      ...user,
      preferences: JSON.parse(user.preferences || '{}')
    };
  }

  async login(loginData: LoginRequest): Promise<{
    user: UserPublic;
    accessToken: string;
    refreshToken: string;
  }> {
    const { email, password } = loginData;

    // Get user with password hash - check both email and username
    const user = await this.db.db.get(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, email]
    );

    if (!user || !await bcrypt.compare(password, user.password_hash)) {
      throw new Error('Invalid credentials');
    }

    // Generate tokens
    const tokenPayload: TokenPayload = { userId: user.id, email: user.email };
    const accessToken = JWTService.generateAccessToken(tokenPayload);
    const refreshToken = JWTService.generateRefreshToken(tokenPayload);

    // Store refresh token
    await this.storeRefreshToken(user.id, refreshToken);

    // Return user without password hash
    const userPublic: UserPublic = {
      id: user.id,
      username: user.username,
      email: user.email,
      chess_elo: user.chess_elo,
      puzzle_rating: user.puzzle_rating,
      preferences: JSON.parse(user.preferences || '{}'),
      created_at: user.created_at,
      updated_at: user.updated_at
    };

    return {
      user: userPublic,
      accessToken,
      refreshToken
    };
  }

  async refreshToken(refreshToken: string): Promise<string> {
    try {
      // Verify refresh token
      const decoded = JWTService.verifyRefreshToken(refreshToken);

      // Check if refresh token exists in database
      const tokenRecord = await this.db.db.get(
        'SELECT * FROM user_sessions WHERE refresh_token = ? AND user_id = ? AND expires_at > datetime("now")',
        [refreshToken, decoded.userId]
      );

      if (!tokenRecord) {
        throw new Error('Invalid refresh token');
      }

      // Generate new access token
      return JWTService.generateAccessToken({
        userId: decoded.userId,
        email: decoded.email
      });
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  async logout(userId: string, refreshToken: string): Promise<void> {
    // Remove refresh token from database
    await this.db.db.run(
      'DELETE FROM user_sessions WHERE user_id = ? AND refresh_token = ?',
      [userId, refreshToken]
    );
  }

  private async storeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const sessionId = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await this.db.db.run(
      `INSERT INTO user_sessions (id, user_id, refresh_token, expires_at)
       VALUES (?, ?, ?, ?)`,
      [sessionId, userId, refreshToken, expiresAt.toISOString()]
    );
  }

  async getUserById(userId: string): Promise<UserPublic | null> {
    const user = await this.db.db.get(
      'SELECT id, username, email, chess_elo, puzzle_rating, preferences, created_at, updated_at FROM users WHERE id = ?',
      [userId]
    );

    if (!user) return null;

    return {
      ...user,
      preferences: JSON.parse(user.preferences || '{}')
    };
  }

  async updateUserPreferences(userId: string, preferences: any): Promise<void> {
    await this.db.db.run(
      'UPDATE users SET preferences = ?, updated_at = datetime("now") WHERE id = ?',
      [JSON.stringify(preferences), userId]
    );
  }

  async resetPassword(email: string, newPassword: string): Promise<void> {
    // Check if user exists
    const user = await this.db.db.get(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (!user) {
      throw new Error('User not found');
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Update user password
    await this.db.db.run(
      'UPDATE users SET password_hash = ?, updated_at = datetime("now") WHERE id = ?',
      [passwordHash, user.id]
    );

    // Invalidate all user sessions (force re-login with new password)
    await this.db.db.run(
      'DELETE FROM user_sessions WHERE user_id = ?',
      [user.id]
    );
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    // Get user with current password hash
    const user = await this.db.db.get(
      'SELECT password_hash FROM users WHERE id = ?',
      [userId]
    );

    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    if (!await bcrypt.compare(currentPassword, user.password_hash)) {
      throw new Error('Current password is incorrect');
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Update password
    await this.db.db.run(
      'UPDATE users SET password_hash = ?, updated_at = datetime("now") WHERE id = ?',
      [passwordHash, userId]
    );

    // Invalidate all user sessions except current one
    // Note: In a more sophisticated implementation, we'd preserve the current session
    await this.db.db.run(
      'DELETE FROM user_sessions WHERE user_id = ?',
      [userId]
    );
  }
}