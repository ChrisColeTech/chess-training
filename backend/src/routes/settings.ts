import express from 'express';
import { SettingsController } from '../controllers/settingsController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
const settingsController = new SettingsController();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserSettings:
 *       type: object
 *       properties:
 *         language:
 *           type: string
 *           example: en
 *           description: User's preferred language
 *         timezone:
 *           type: string
 *           example: UTC
 *           description: User's timezone
 *         theme:
 *           type: string
 *           enum: [light, dark, system]
 *           example: system
 *           description: Application theme preference
 *     
 *     BoardSettings:
 *       type: object
 *       properties:
 *         theme:
 *           type: string
 *           example: classic
 *           description: Chess board theme
 *         pieceSet:
 *           type: string
 *           example: classic
 *           description: Chess piece set style
 *         showCoordinates:
 *           type: boolean
 *           example: true
 *           description: Whether to show board coordinates
 *         highlightMoves:
 *           type: boolean
 *           example: true
 *           description: Whether to highlight possible moves
 *         soundEnabled:
 *           type: boolean
 *           example: true
 *           description: Whether to enable move sounds
 *     
 *     NotificationSettings:
 *       type: object
 *       properties:
 *         email:
 *           type: boolean
 *           example: true
 *           description: Enable email notifications
 *         push:
 *           type: boolean
 *           example: true
 *           description: Enable push notifications
 *         sms:
 *           type: boolean
 *           example: false
 *           description: Enable SMS notifications
 *         gameReminders:
 *           type: boolean
 *           example: true
 *           description: Enable game reminder notifications
 *         puzzleReminders:
 *           type: boolean
 *           example: true
 *           description: Enable puzzle reminder notifications
 *         achievementAlerts:
 *           type: boolean
 *           example: true
 *           description: Enable achievement alert notifications
 *         quietHoursEnabled:
 *           type: boolean
 *           example: false
 *           description: Enable quiet hours for notifications
 *         quietHoursStart:
 *           type: string
 *           example: "22:00"
 *           description: Start time for quiet hours (24-hour format)
 *         quietHoursEnd:
 *           type: string
 *           example: "08:00"
 *           description: End time for quiet hours (24-hour format)
 *     
 *     AllSettings:
 *       type: object
 *       properties:
 *         general:
 *           $ref: '#/components/schemas/UserSettings'
 *         board:
 *           $ref: '#/components/schemas/BoardSettings'
 *         notifications:
 *           $ref: '#/components/schemas/NotificationSettings'
 *     
 *     UpdateAllSettingsRequest:
 *       type: object
 *       properties:
 *         general:
 *           $ref: '#/components/schemas/UserSettings'
 *         board:
 *           $ref: '#/components/schemas/BoardSettings'
 *         notifications:
 *           $ref: '#/components/schemas/NotificationSettings'
 *     
 *     ExportedSettings:
 *       allOf:
 *         - $ref: '#/components/schemas/AllSettings'
 *         - type: object
 *           properties:
 *             exportDate:
 *               type: string
 *               format: date-time
 *               example: "2024-01-15T10:30:00.000Z"
 *               description: Date when settings were exported
 *             version:
 *               type: string
 *               example: "1.0"
 *               description: Settings format version
 *     
 *     ValidationResult:
 *       type: object
 *       properties:
 *         valid:
 *           type: boolean
 *           example: true
 *           description: Whether the settings are valid
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Language must be a string"]
 *           description: Array of validation error messages
 *     
 *     BoardTheme:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: classic
 *           description: Theme identifier
 *         name:
 *           type: string
 *           example: Classic
 *           description: Human-readable theme name
 *         preview:
 *           type: string
 *           example: /themes/classic-preview.png
 *           description: URL to theme preview image
 *     
 *     PieceTheme:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: classic
 *           description: Piece theme identifier
 *         name:
 *           type: string
 *           example: Classic
 *           description: Human-readable piece theme name
 *         preview:
 *           type: string
 *           example: /pieces/classic-preview.png
 *           description: URL to piece theme preview image
 *     
 *     SoundPack:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: classic
 *           description: Sound pack identifier
 *         name:
 *           type: string
 *           example: Classic
 *           description: Human-readable sound pack name
 *         samples:
 *           type: array
 *           items:
 *             type: string
 *           example: ["/sounds/classic/move.mp3", "/sounds/classic/capture.mp3"]
 *           description: Array of sample sound file URLs
 *     
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *         data:
 *           type: object
 *           description: Response data
 *         message:
 *           type: string
 *           description: Optional response message
 *     
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *           description: Always false for error responses
 *         error:
 *           type: string
 *           description: Error message
 *   
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// All settings routes require authentication
router.use(authenticateToken);

/**
 * @swagger
 * /settings:
 *   get:
 *     summary: Get all user settings
 *     description: Retrieves all settings for the authenticated user including general, board, and notification settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all settings
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AllSettings'
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', settingsController.getAllSettings);

/**
 * @swagger
 * /settings:
 *   put:
 *     summary: Update all user settings
 *     description: Updates all settings for the authenticated user. Can update general, board, and/or notification settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAllSettingsRequest'
 *           examples:
 *             updateAll:
 *               summary: Update all setting categories
 *               value:
 *                 general:
 *                   language: "en"
 *                   timezone: "UTC"
 *                   theme: "dark"
 *                 board:
 *                   theme: "blue"
 *                   showCoordinates: true
 *                   highlightMoves: true
 *                 notifications:
 *                   email: true
 *                   push: false
 *             updatePartial:
 *               summary: Update only board settings
 *               value:
 *                 board:
 *                   theme: "green"
 *                   soundEnabled: false
 *     responses:
 *       200:
 *         description: Successfully updated settings
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AllSettings'
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/', settingsController.updateAllSettings);

/**
 * @swagger
 * /settings/reset:
 *   post:
 *     summary: Reset all settings to defaults
 *     description: Resets all user settings to their default values
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully reset all settings to defaults
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AllSettings'
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/reset', settingsController.resetSettings);

/**
 * @swagger
 * /settings/export:
 *   get:
 *     summary: Export all user settings
 *     description: Exports all user settings with metadata for backup purposes
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully exported settings
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/ExportedSettings'
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/export', settingsController.exportSettings);

/**
 * @swagger
 * /settings/import:
 *   post:
 *     summary: Import user settings
 *     description: Imports previously exported settings to restore user preferences
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAllSettingsRequest'
 *           examples:
 *             fullImport:
 *               summary: Import all settings
 *               value:
 *                 general:
 *                   language: "en"
 *                   timezone: "America/New_York"
 *                   theme: "dark"
 *                 board:
 *                   theme: "blue"
 *                   pieceSet: "modern"
 *                   showCoordinates: true
 *                   highlightMoves: true
 *                   soundEnabled: true
 *                 notifications:
 *                   email: true
 *                   push: true
 *                   sms: false
 *                   gameReminders: true
 *                   puzzleReminders: true
 *                   achievementAlerts: true
 *                   quietHoursEnabled: true
 *                   quietHoursStart: "22:00"
 *                   quietHoursEnd: "08:00"
 *     responses:
 *       200:
 *         description: Successfully imported settings
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AllSettings'
 *                     message:
 *                       type: string
 *                       example: "Settings imported successfully"
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/import', settingsController.importSettings);

/**
 * @swagger
 * /settings/validate:
 *   post:
 *     summary: Validate settings data
 *     description: Validates settings data structure and values without saving
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAllSettingsRequest'
 *           examples:
 *             validSettings:
 *               summary: Valid settings example
 *               value:
 *                 general:
 *                   language: "en"
 *                   theme: "dark"
 *                 board:
 *                   showCoordinates: true
 *                   highlightMoves: false
 *             invalidSettings:
 *               summary: Invalid settings example
 *               value:
 *                 general:
 *                   language: 123
 *                   theme: "invalid_theme"
 *                 board:
 *                   showCoordinates: "not_boolean"
 *     responses:
 *       200:
 *         description: Validation completed (check data.valid for result)
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/ValidationResult'
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/validate', settingsController.validateSettings);

/**
 * @swagger
 * /settings/board-themes:
 *   get:
 *     summary: Get available board themes
 *     description: Retrieves a list of available chess board themes with preview images
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved board themes
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/BoardTheme'
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/board-themes', settingsController.getBoardThemes);

/**
 * @swagger
 * /settings/piece-themes:
 *   get:
 *     summary: Get available piece themes
 *     description: Retrieves a list of available chess piece themes with preview images
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved piece themes
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/PieceTheme'
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/piece-themes', settingsController.getPieceThemes);

/**
 * @swagger
 * /settings/sound-packs:
 *   get:
 *     summary: Get available sound packs
 *     description: Retrieves a list of available sound packs with sample audio files
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved sound packs
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/SoundPack'
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/sound-packs', settingsController.getSoundPacks);

/**
 * @swagger
 * /settings/user:
 *   get:
 *     summary: Get user general settings
 *     description: Retrieves general user settings (language, timezone, theme)
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user settings
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/UserSettings'
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/user', settingsController.getUserSettings);

/**
 * @swagger
 * /settings/user:
 *   put:
 *     summary: Update user general settings
 *     description: Updates general user settings such as language, timezone, and theme
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSettings'
 *           examples:
 *             updateTheme:
 *               summary: Update theme only
 *               value:
 *                 theme: "dark"
 *             updateAll:
 *               summary: Update all user settings
 *               value:
 *                 language: "es"
 *                 timezone: "Europe/Madrid"
 *                 theme: "light"
 *     responses:
 *       200:
 *         description: Successfully updated user settings
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/UserSettings'
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/user', settingsController.updateUserSettings);

/**
 * @swagger
 * /settings/board:
 *   get:
 *     summary: Get board settings
 *     description: Retrieves chess board display and interaction settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved board settings
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/BoardSettings'
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/board', settingsController.getBoardSettings);

/**
 * @swagger
 * /settings/board:
 *   put:
 *     summary: Update board settings
 *     description: Updates chess board display and interaction settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoardSettings'
 *           examples:
 *             updateThemeOnly:
 *               summary: Update board theme only
 *               value:
 *                 theme: "green"
 *             updateVisuals:
 *               summary: Update visual preferences
 *               value:
 *                 showCoordinates: false
 *                 highlightMoves: true
 *                 soundEnabled: false
 *             updateAll:
 *               summary: Update all board settings
 *               value:
 *                 theme: "blue"
 *                 pieceSet: "staunton"
 *                 showCoordinates: true
 *                 highlightMoves: true
 *                 soundEnabled: true
 *     responses:
 *       200:
 *         description: Successfully updated board settings
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/BoardSettings'
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/board', settingsController.updateBoardSettings);

/**
 * @swagger
 * /settings/notifications:
 *   get:
 *     summary: Get notification settings
 *     description: Retrieves user notification preferences and quiet hours configuration
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved notification settings
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/NotificationSettings'
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/notifications', settingsController.getNotificationSettings);

/**
 * @swagger
 * /settings/notifications:
 *   put:
 *     summary: Update notification settings
 *     description: Updates user notification preferences including delivery methods and quiet hours
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotificationSettings'
 *           examples:
 *             disableAll:
 *               summary: Disable all notifications
 *               value:
 *                 email: false
 *                 push: false
 *                 sms: false
 *                 gameReminders: false
 *                 puzzleReminders: false
 *                 achievementAlerts: false
 *             enableQuietHours:
 *               summary: Enable quiet hours
 *               value:
 *                 quietHoursEnabled: true
 *                 quietHoursStart: "22:00"
 *                 quietHoursEnd: "08:00"
 *             customPreferences:
 *               summary: Custom notification preferences
 *               value:
 *                 email: true
 *                 push: true
 *                 sms: false
 *                 gameReminders: true
 *                 puzzleReminders: false
 *                 achievementAlerts: true
 *                 quietHoursEnabled: true
 *                 quietHoursStart: "23:00"
 *                 quietHoursEnd: "07:00"
 *     responses:
 *       200:
 *         description: Successfully updated notification settings
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/NotificationSettings'
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/notifications', settingsController.updateNotificationSettings);

export default router;