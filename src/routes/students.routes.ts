import express from 'express';
import { StudentSignup,getStudents,StudentSignin} from '../controllers/students.controller';
import {verifyStudentToken} from '../middleware/students.middleware'


const Studentrouter = express.Router();

Studentrouter.post('/signup', StudentSignup);
Studentrouter.post('/signin', StudentSignin);
Studentrouter.get('/',verifyStudentToken, getStudents);


export default Studentrouter;
