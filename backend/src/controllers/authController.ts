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
      if (error.message === 'User already exists') {
        return res.status(400).json({
          success: false,
          error: error.message
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
          error: 'Email and password are required'
        });
      }

      const result = await this.authService.login({ email, password });

      res.json({
        success: true,
        ...result
      });
    } catch (error: any) {
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({
          success: false,
          error: error.message
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
}