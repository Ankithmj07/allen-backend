import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt'
import AdminModel from '../models/admin.model';
import CourseModel from '../models/course.model';
import ResultModel from '../models/results.model';
import AdminValidator from '../middleware/adminValidator'
import { AuthenticatedRequest } from '../middleware/admin.middleware';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const JWT_ADMIN_KEY = process.env.JWT_ADMIN_KEY || "fallback-secret-key";


export const AdminSignup = async (req: Request, res: Response) => {
    try {
      const validatedData = AdminValidator.safeParse(req.body)
      if (!validatedData.success) {
        res.json({
            message:"Incorrect format",
            error:validatedData.error
        })
        return
      }
      const findEmail = await AdminModel.findOne({
        email:validatedData.data.email
      })
      if(!findEmail){
        const encPassword =await bcrypt.hash(validatedData.data.password,10)
        const finalData = {
          ...validatedData.data,
          password: encPassword,
        };
        const student = new AdminModel(finalData);
        const saved = await student.save();
        res.status(201).json(saved);
        
      }
      else{
        res.send({
            message:"Email already exist"
        })
      }

    } catch (err) {
      res.status(500).json({ message: 'Creation failed', error: err });
    }
  };


export const AdminSignin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAdmin = await AdminModel.findOne({
        email:req.body.email
    });
    if(!findAdmin){
      res.status(404).json({
        errCode: 1,
        message: "Admin not found, please sign up"
      });
    
      return
    }

    const passwordMatch = await bcrypt.compare(req.body.password,findAdmin.password)

    if(passwordMatch){
      const token = jwt.sign(
        { id: findAdmin._id, email: findAdmin.email },
        JWT_ADMIN_KEY as string,
        { expiresIn: '1d' }
      );
      res.setHeader('Authorization', `Bearer ${token}`);
      res.status(200).json({
        errCode: 0,
        message: 'Sign In Successful',
        token,
        student: {
          id: findAdmin._id,
          name: findAdmin.name,
          email: findAdmin.email,
          phone: findAdmin.phNumber
        },
      });
    }
    else{
        res.status(400).json({
            errCode:1,
            message:"Incorrect password"
        })
    }
    } catch (err) {
      res.status(500).json({ message: 'Fetch failed', error: err });
    }
}

export const getAdminCourses = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const adminId = req.admin?.id;

      if (!adminId) {
        res.status(401).json({ message: 'Unauthorized: admin ID not found' });
        return
      }
      const courses = await CourseModel.find({
        adminId:adminId
      });
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Fetch failed', error: err });
    }
  };

export const getAdminResults = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const adminId = req.admin?.id;
    if (!adminId) {
      res.status(401).json({ message: 'Unauthorized: admin ID not found' });
      return
    }
    const courses = await ResultModel.find({
      adminId:adminId
    });
      res.json(courses);
  } catch (err) {
      res.status(500).json({ message: 'Fetch failed', error: err });
  }
};
