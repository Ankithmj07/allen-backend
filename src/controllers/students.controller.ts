import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt'
import StudentModel from '../models/students.model';
import StudentValidator from '../middleware/studentValidator'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const JWT_USER_KEY = process.env.JWT_USER_KEY || "fallback-secret-key";


export const StudentSignup = async (req: Request, res: Response) => {
    try {
      const validatedData = StudentValidator.safeParse(req.body)
      if (!validatedData.success) {
        res.status(400).json({
            message:"Incorrect format",
            error:validatedData.error
        })
        return
      }
      const findEmail = await StudentModel.findOne({
        email:validatedData.data.email
      })
      if(!findEmail){
        const encPassword =await bcrypt.hash(validatedData.data.password,10)
        const finalData = {
          ...validatedData.data,
          password: encPassword,
        };
        const student = new StudentModel(finalData);
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


export const StudentSignin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findStudent = await StudentModel.findOne({
        email:req.body.email
    });
    if(!findStudent){
      res.status(404).json({
        errCode: 1,
        message: "User not found, please sign up"
      });
    
      return
    }

    const passwordMatch = await bcrypt.compare(req.body.password,findStudent.password)

    if(passwordMatch){
      const token = jwt.sign(
        { id: findStudent._id, email: findStudent.email },
        JWT_USER_KEY as string,
        { expiresIn: '1d' }
      );
      res.setHeader('Authorization', `Bearer ${token}`);
      res.status(200).json({
        errCode: 0,
        message: 'Sign In Successful',
        token,
        student: {
          id: findStudent._id,
          name: findStudent.name,
          email: findStudent.email,
          classLevel: findStudent.classLevel,
          exam: findStudent.exam,
          phNumber: findStudent.phNumber
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

export const getStudents = async (req: Request, res: Response) => {
    try {
      res.json({ message: 'Student profile accessed', student: (req as any).student });
    } catch (err) {
        res.status(500).json({ message: 'Fetch failed', error: err });
    }
  };

  export const updateStudentProfile = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
    try {
      const { email, gender, dob, pinCode, state, city, address1, address2 } = req.body;
  
      if (!email) {
        res.status(400).json({ message: "Email is required to update profile" });
        return
      }
  
      const updateFields: Partial<{ gender: string; dob: Date; pinCode:number; state: string; city: string; address1: string; address2: string; }> = {};
  
      if (gender !== undefined) updateFields.gender = gender;
      if (dob !== undefined) updateFields.dob = new Date(dob);
      if (pinCode !== undefined) updateFields.pinCode = pinCode;
      if (state !== undefined) updateFields.state = state;
      if (city !== undefined) updateFields.city = city;
      if (address1 !== undefined) updateFields.address1 = address1;
      if (address2 !== undefined) updateFields.address2 = address2;
      
  
      const updatedStudent = await StudentModel.findOneAndUpdate(
        { email }, // Filter by email
        { $set: updateFields }, // Only update what's provided
        { new: true } // Return updated document
      );
  
      if (!updatedStudent) {
        res.status(404).json({ message: "Student not found" });
        return
      }
  
      res.status(200).json({
        message: "Profile updated successfully",
        student: updatedStudent,
      });
    } catch (err) {
      res.status(500).json({ message: "Update failed", error: err });
    }
  };