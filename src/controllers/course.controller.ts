import { Request, Response,NextFunction } from 'express';
import CourseModel from '../models/course.model';
import {AuthenticatedRequest} from '../middleware/admin.middleware'

export const createCourse = async (req: AuthenticatedRequest, res: Response,next:NextFunction): Promise<void> => {
    try {
      const adminId = req.admin?.id;

      if (!adminId) {
        res.status(401).json({ message: 'Unauthorized: admin ID not found' });
        return
      }
      const courseData = {
        ...req.body,
        adminId: adminId
      };
      const course = new CourseModel(courseData);
      const saved = await course.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(500).json({ message: 'Creation failed', error: err });
    }
  };

export const getCourses = async (_: Request, res: Response) => {
    try {
      const { exam } = _.params;
      const { id } = _.query;
      if(id){
        const course = await CourseModel.findOne({
          _id: id,
          exam: { $regex: new RegExp(`^${exam}$`, 'i') },
        });
  
        if (!course) {
          res.status(404).json({ message: 'Course not found' });
        }
  
        res.json(course);
      }
      const courses = await CourseModel.find({
        exam: { $regex: new RegExp(`^${exam}$`, 'i') },
      });
  
      res.json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Fetch failed', error: err });
    }
  };
  