import { Request, Response,NextFunction } from 'express';
import ResultModel from '../models/results.model';
import {AuthenticatedRequest} from '../middleware/admin.middleware'

export const createResult = async (req: AuthenticatedRequest, res: Response,next:NextFunction): Promise<void> => {
    try {
      const adminId = req.admin?.id;

      if (!adminId) {
        res.status(401).json({ message: 'Unauthorized: admin ID not found' });
        return
      }
      const ResultData = {
        ...req.body,
        adminId: adminId
      };
      const result = new ResultModel(ResultData);
      const saved = await result.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(500).json({ message: 'Creation failed', error: err });
    }
  };

export const getResults = async (_: Request, res: Response) => {
    try {
        const results = await ResultModel.find();
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: 'Fetch failed', error: err });
    }
  };