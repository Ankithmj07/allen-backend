import express from 'express';
import { createCourse,getCourses} from '../controllers/course.controller';
import {verifyAdminToken} from '../middleware/admin.middleware'

const Courserouter = express.Router();

Courserouter.post('/',verifyAdminToken, createCourse);
Courserouter.get('/:exam', getCourses);


export default Courserouter;
