import express from 'express';
import { AdminSignup,getAdminCourses,AdminSignin} from '../controllers/admin.controller';
import {verifyAdminToken} from '../middleware/admin.middleware'


const Adminrouter = express.Router();

Adminrouter.post('/signup', AdminSignup);
Adminrouter.post('/signin', AdminSignin);
Adminrouter.get('/',verifyAdminToken, getAdminCourses);


export default Adminrouter;
