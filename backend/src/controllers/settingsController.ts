import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { SettingsService } from '../services/settingsService';

export class SettingsController {
  private settingsService = new SettingsService();

  // Get user settings
  getUserSettings = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      const settings = await this.settingsService.getUserSettings(userId);
      
      res.json({
        success: true,
        data: settings
      });
    } catch (error: any) {
      console.error('Get user settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get settings'
      });
    }
  };

  // Update user settings
  updateUserSettings = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      const settings = await this.settingsService.updateUserSettings(userId, req.body);
      
      res.json({
        success: true,
        data: settings
      });
    } catch (error: any) {
      console.error('Update user settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update settings'
      });
    }
  };

  // Get board settings
  getBoardSettings = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      const settings = await this.settingsService.getBoardSettings(userId);
      
      res.json({
        success: true,
        data: settings
      });
    } catch (error: any) {
      console.error('Get board settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get board settings'
      });
    }
  };

  // Update board settings
  updateBoardSettings = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      const settings = await this.settingsService.updateBoardSettings(userId, req.body);
      
      res.json({
        success: true,
        data: settings
      });
    } catch (error: any) {
      console.error('Update board settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update board settings'
      });
    }
  };

  // Get notification settings
  getNotificationSettings = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      const settings = await this.settingsService.getNotificationSettings(userId);
      
      res.json({
        success: true,
        data: settings
      });
    } catch (error: any) {
      console.error('Get notification settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get notification settings'
      });
    }
  };

  // Update notification settings
  updateNotificationSettings = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      const settings = await this.settingsService.updateNotificationSettings(userId, req.body);
      
      res.json({
        success: true,
        data: settings
      });
    } catch (error: any) {
      console.error('Update notification settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update notification settings'
      });
    }
  };

  // Unified settings methods for frontend compatibility
  getAllSettings = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      // Get all settings from different categories
      const userSettings = await this.settingsService.getUserSettings(userId);
      const boardSettings = await this.settingsService.getBoardSettings(userId);
      const notificationSettings = await this.settingsService.getNotificationSettings(userId);

      // Consolidate into unified format
      const allSettings = {
        general: userSettings,
        board: boardSettings,
        notifications: notificationSettings
      };
      
      res.json({
        success: true,
        data: allSettings
      });
    } catch (error: any) {
      console.error('Get all settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get settings'
      });
    }
  };

  updateAllSettings = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      const { general, board, notifications } = req.body;
      let updatedSettings: any = {};

      // Update each category if provided
      if (general) {
        updatedSettings.general = await this.settingsService.updateUserSettings(userId, general);
      }
      if (board) {
        updatedSettings.board = await this.settingsService.updateBoardSettings(userId, board);
      }
      if (notifications) {
        updatedSettings.notifications = await this.settingsService.updateNotificationSettings(userId, notifications);
      }

      // If no categories provided, get current settings
      if (!general && !board && !notifications) {
        updatedSettings = {
          general: await this.settingsService.getUserSettings(userId),
          board: await this.settingsService.getBoardSettings(userId),
          notifications: await this.settingsService.getNotificationSettings(userId)
        };
      }
      
      res.json({
        success: true,
        data: updatedSettings
      });
    } catch (error: any) {
      console.error('Update all settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update settings'
      });
    }
  };

  resetSettings = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      // Reset to default settings
      const defaultSettings = {
        general: {
          language: 'en',
          timezone: 'UTC',
          theme: 'system'
        },
        board: {
          theme: 'classic',
          pieceSet: 'classic',
          showCoordinates: true,
          highlightMoves: true,
          soundEnabled: true
        },
        notifications: {
          email: true,
          push: true,
          sms: false,
          gameReminders: true,
          puzzleReminders: true,
          achievementAlerts: true,
          quietHoursEnabled: false,
          quietHoursStart: '22:00',
          quietHoursEnd: '08:00'
        }
      };

      // Update each category with defaults
      const resetSettings = {
        general: await this.settingsService.updateUserSettings(userId, defaultSettings.general),
        board: await this.settingsService.updateBoardSettings(userId, defaultSettings.board),
        notifications: await this.settingsService.updateNotificationSettings(userId, defaultSettings.notifications)
      };
      
      res.json({
        success: true,
        data: resetSettings
      });
    } catch (error: any) {
      console.error('Reset settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to reset settings'
      });
    }
  };

  exportSettings = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      // Get all current settings for export
      const allSettings = {
        general: await this.settingsService.getUserSettings(userId),
        board: await this.settingsService.getBoardSettings(userId),
        notifications: await this.settingsService.getNotificationSettings(userId),
        exportDate: new Date().toISOString(),
        version: '1.0'
      };
      
      res.json({
        success: true,
        data: allSettings
      });
    } catch (error: any) {
      console.error('Export settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to export settings'
      });
    }
  };

  importSettings = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      const { general, board, notifications } = req.body;
      let importedSettings: any = {};

      // Import each category if provided
      if (general) {
        importedSettings.general = await this.settingsService.updateUserSettings(userId, general);
      }
      if (board) {
        importedSettings.board = await this.settingsService.updateBoardSettings(userId, board);
      }
      if (notifications) {
        importedSettings.notifications = await this.settingsService.updateNotificationSettings(userId, notifications);
      }
      
      res.json({
        success: true,
        data: importedSettings,
        message: 'Settings imported successfully'
      });
    } catch (error: any) {
      console.error('Import settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to import settings'
      });
    }
  };

  validateSettings = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const settings = req.body;
      const errors: string[] = [];

      // Basic validation for settings structure
      if (settings.general) {
        if (settings.general.language && typeof settings.general.language !== 'string') {
          errors.push('Language must be a string');
        }
        if (settings.general.theme && !['light', 'dark', 'system'].includes(settings.general.theme)) {
          errors.push('Theme must be light, dark, or system');
        }
      }

      if (settings.board) {
        if (settings.board.showCoordinates && typeof settings.board.showCoordinates !== 'boolean') {
          errors.push('showCoordinates must be a boolean');
        }
        if (settings.board.highlightMoves && typeof settings.board.highlightMoves !== 'boolean') {
          errors.push('highlightMoves must be a boolean');
        }
      }

      if (settings.notifications) {
        if (settings.notifications.quietHours && typeof settings.notifications.quietHours !== 'boolean') {
          errors.push('quietHours must be a boolean');
        }
      }
      
      res.json({
        success: true,
        data: {
          valid: errors.length === 0,
          errors: errors.length > 0 ? errors : undefined
        }
      });
    } catch (error: any) {
      console.error('Validate settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to validate settings'
      });
    }
  };

  // Theme and asset methods
  getBoardThemes = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const themes = [
        { id: 'classic', name: 'Classic', preview: '/themes/classic-preview.png' },
        { id: 'blue', name: 'Blue', preview: '/themes/blue-preview.png' },
        { id: 'green', name: 'Green', preview: '/themes/green-preview.png' },
        { id: 'brown', name: 'Brown', preview: '/themes/brown-preview.png' },
        { id: 'purple', name: 'Purple', preview: '/themes/purple-preview.png' }
      ];
      
      res.json({
        success: true,
        data: themes
      });
    } catch (error: any) {
      console.error('Get board themes error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get board themes'
      });
    }
  };

  getPieceThemes = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const pieceThemes = [
        { id: 'classic', name: 'Classic', preview: '/pieces/classic-preview.png' },
        { id: 'modern', name: 'Modern', preview: '/pieces/modern-preview.png' },
        { id: 'staunton', name: 'Staunton', preview: '/pieces/staunton-preview.png' },
        { id: 'chess.com', name: 'Chess.com Style', preview: '/pieces/chesscom-preview.png' }
      ];
      
      res.json({
        success: true,
        data: pieceThemes
      });
    } catch (error: any) {
      console.error('Get piece themes error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get piece themes'
      });
    }
  };

  getSoundPacks = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const soundPacks = [
        { 
          id: 'classic', 
          name: 'Classic', 
          samples: ['/sounds/classic/move.mp3', '/sounds/classic/capture.mp3', '/sounds/classic/check.mp3'] 
        },
        { 
          id: 'modern', 
          name: 'Modern', 
          samples: ['/sounds/modern/move.mp3', '/sounds/modern/capture.mp3', '/sounds/modern/check.mp3'] 
        },
        { 
          id: 'wood', 
          name: 'Wood', 
          samples: ['/sounds/wood/move.mp3', '/sounds/wood/capture.mp3', '/sounds/wood/check.mp3'] 
        }
      ];
      
      res.json({
        success: true,
        data: soundPacks
      });
    } catch (error: any) {
      console.error('Get sound packs error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get sound packs'
      });
    }
  };
}