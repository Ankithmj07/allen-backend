import { Request, Response, NextFunction } from 'express';
import PhoneCallModel from '../models/contact.model';

export const createPhoneCall = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const phoneCall = new PhoneCallModel(req.body);
    const saved = await phoneCall.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Phone call request failed', error: err });
  }
};
