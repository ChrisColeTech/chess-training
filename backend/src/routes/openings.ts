import express from 'express';
import { getOpenings, getOpeningById, getOpeningsByEco } from '../controllers/openingController';

const router = express.Router();

// GET /api/openings - Get all openings
router.get('/', getOpenings);

// GET /api/openings/eco/:eco - Get openings by ECO code
router.get('/eco/:eco', getOpeningsByEco);

// GET /api/openings/:id - Get specific opening
router.get('/:id', getOpeningById);

export default router;