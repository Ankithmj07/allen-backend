import { Request, Response,NextFunction } from 'express';
import TestimonialModel from '../models/testimonial.model';
import {AuthenticatedRequest} from '../middleware/admin.middleware'

export const createTestimonial = async (req: AuthenticatedRequest, res: Response,next:NextFunction): Promise<void> => {
    try {
      const adminId = req.admin?.id;

      if (!adminId) {
        res.status(401).json({ message: 'Unauthorized: admin ID not found' });
        return
      }
      const testimonialData = {
        ...req.body,
        adminId: adminId
      };
      const testimonial = new TestimonialModel(testimonialData);
      const saved = await testimonial.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(500).json({ message: 'Creation failed', error: err });
    }
  };

export const getTestimonial = async (_: Request, res: Response) => {
    try {
        const testimonials = await TestimonialModel.find();
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: 'Fetch failed', error: err });
    }
  };
  