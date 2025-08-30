import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { AuthenticatedRequest } from '../middleware/auth';

export class AuthController {
  private authService = new AuthService();

  register = async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Username, email, and password are required'
        });
      }

      const user = await this.authService.register({ username, email, password });

      res.status(201).json({
        success: true,
        user
      });
    } catch (error: any) {
      if ((error as any).message === 'User already exists') {
        return res.status(400).json({
          success: false,
          error: (error as any).message
        });
      }

      res.status(500).json({
        success: false,
        error: 'Registration failed'
      });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email/username and password are required'
        });
      }

      const result = await this.authService.login({ email, password });

      res.json({
        success: true,
        data: {
          user: result.user,
          tokens: {
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
          }
        }
      });
    } catch (error: any) {
      if ((error as any).message === 'Invalid credentials') {
        return res.status(401).json({
          success: false,
          error: (error as any).message
        });
      }

      res.status(500).json({
        success: false,
        error: 'Login failed'
      });
    }
  };

  refresh = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          error: 'Refresh token required'
        });
      }

      const accessToken = await this.authService.refreshToken(refreshToken);

      res.json({
        success: true,
        accessToken
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: 'Invalid refresh token'
      });
    }
  };

  logout = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { refreshToken } = req.body;
      const userId = req.user?.userId;

      if (!userId || !refreshToken) {
        return res.status(400).json({
          success: false,
          error: 'User ID and refresh token required'
        });
      }

      await this.authService.logout(userId, refreshToken);

      res.json({
        success: true,
        message: 'Logged out successfully'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: 'Logout failed'
      });
    }
  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      const { email, newPassword } = req.body;

      if (!email || !newPassword) {
        return res.status(400).json({
          success: false,
          error: 'Email and new password are required'
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          error: 'Password must be at least 6 characters long'
        });
      }

      await this.authService.resetPassword(email, newPassword);

      res.json({
        success: true,
        message: 'Password reset successfully'
      });
    } catch (error: any) {
      if ((error as any).message === 'User not found') {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      res.status(500).json({
        success: false,
        error: 'Password reset failed'
      });
    }
  };

  changePassword = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
      }

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          error: 'Current password and new password are required'
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          error: 'New password must be at least 6 characters long'
        });
      }

      await this.authService.changePassword(userId, currentPassword, newPassword);

      res.json({
        success: true,
        message: 'Password changed successfully'
      });
    } catch (error: any) {
      if ((error as any).message === 'Current password is incorrect') {
        return res.status(400).json({
          success: false,
          error: (error as any).message
        });
      }

      if ((error as any).message === 'User not found') {
        return res.status(404).json({
          success: false,
          error: (error as any).message
        });
      }

      res.status(500).json({
        success: false,
        error: 'Password change failed'
      });
    }
  };
}