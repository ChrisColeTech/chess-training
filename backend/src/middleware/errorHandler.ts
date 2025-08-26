import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error);

  // Operational errors
  if (error.message === 'Game not found') {
    return res.status(404).json({
      success: false,
      error: 'Game not found'
    });
  }

  if (error.message === 'Illegal move') {
    return res.status(400).json({
      success: false,
      error: 'Illegal move'
    });
  }

  if (error.message === 'Puzzle not found') {
    return res.status(404).json({
      success: false,
      error: 'Puzzle not found'
    });
  }

  if (error.message === 'User not found') {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  if (error.message === 'User already exists') {
    return res.status(400).json({
      success: false,
      error: 'User already exists'
    });
  }

  if (error.message === 'Invalid credentials') {
    return res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }

  // Default server error
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
};