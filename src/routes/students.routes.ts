import express from 'express';
import { StudentSignup,getStudents,StudentSignin, updateStudentProfile} from '../controllers/students.controller';
import {verifyStudentToken} from '../middleware/students.middleware'


const Studentrouter = express.Router();

Studentrouter.post('/signup', StudentSignup);
Studentrouter.post('/signin', StudentSignin);
Studentrouter.get('/',verifyStudentToken, getStudents);
Studentrouter.put('/',verifyStudentToken,updateStudentProfile)


export default Studentrouter;
