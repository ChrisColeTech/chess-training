import express from 'express';
import { SettingsController } from '../controllers/settingsController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
const settingsController = new SettingsController();

// All settings routes require authentication
router.use(authenticateToken);

// Unified settings routes (for frontend compatibility)
router.get('/', settingsController.getAllSettings);
router.put('/', settingsController.updateAllSettings);
router.post('/reset', settingsController.resetSettings);
router.get('/export', settingsController.exportSettings);
router.post('/import', settingsController.importSettings);
router.post('/validate', settingsController.validateSettings);

// Theme and assets routes
router.get('/board-themes', settingsController.getBoardThemes);
router.get('/piece-themes', settingsController.getPieceThemes);  
router.get('/sound-packs', settingsController.getSoundPacks);

// Specific settings routes (for backward compatibility)
router.get('/user', settingsController.getUserSettings);
router.put('/user', settingsController.updateUserSettings);
router.get('/board', settingsController.getBoardSettings);
router.put('/board', settingsController.updateBoardSettings);
router.get('/notifications', settingsController.getNotificationSettings);
router.put('/notifications', settingsController.updateNotificationSettings);

export default router;