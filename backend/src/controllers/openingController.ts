import { Request, Response } from 'express';
import { OpeningService } from '../services/openingService';

const openingService = new OpeningService();

export const getOpenings = async (req: Request, res: Response) => {
  try {
    const result = await openingService.getAllOpenings(req.query);
    res.json({
      success: true,
      data: result.openings,
      total: result.total,
      limit: result.limit,
      offset: result.offset
    });
  } catch (error) {
    console.error('Error fetching openings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch openings'
    });
  }
};

export const getOpeningById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const opening = await openingService.getOpeningById(id);
    
    res.json({
      success: true,
      data: opening
    });
  } catch (error) {
    if ((error as any).message === 'Opening not found') {
      return res.status(404).json({
        success: false,
        error: 'Opening not found'
      });
    }
    
    console.error('Error fetching opening:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch opening'
    });
  }
};

export const getOpeningsByEco = async (req: Request, res: Response) => {
  try {
    const { eco } = req.params;
    const openings = await openingService.getOpeningsByEco(eco);
    
    res.json({
      success: true,
      data: openings
    });
  } catch (error) {
    console.error('Error fetching openings by ECO:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch openings by ECO'
    });
  }
};