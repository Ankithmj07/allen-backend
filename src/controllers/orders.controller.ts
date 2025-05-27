import { Request, Response,NextFunction } from "express";
import OrderModel from "../models/orders.model";
import StudentModel from "../models/students.model";
import CourseModel from "../models/course.model";
import mongoose from "mongoose";
import { AuthenticatedRequest } from "../middleware/students.middleware";

export const createOrder = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { courseId, totalAmount, status } = req.body;

    const studentId = req.student?.id;
    if (!studentId) {
      res.status(401).json({ message: "Unauthorized: No student ID" });
      return;
    }

    const student = await StudentModel.findById(studentId);
    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    const course = await CourseModel.findById(courseId);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    const purchasedDate = new Date();
    const EndDate = new Date(
      purchasedDate.getFullYear() + course.duration,
      purchasedDate.getMonth(),
      purchasedDate.getDate()
    );

    const order = new OrderModel({
      student: student._id,
      courses: [course._id],
      totalAmount,
      status: status || "pending",
      purchasedDate,
      EndDate,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ message: "Order creation failed", error: err });
  }
};


export const getOrders = async (req: AuthenticatedRequest, res: Response,next: NextFunction): Promise<void> => {
  try {
    if (!req.student || !req.student.id) {
      res.status(401).json({ message: "Unauthorized access" });
      return
    }

    const studentId = req.student.id;

    const orders = await OrderModel.find({ student: studentId })
      .populate("courses") // populates course details
      .sort({ purchasedDate: -1 });

    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Failed to fetch orders", error: err });
  }
};