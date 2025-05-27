import express from 'express';
import { createTestimonial,getTestimonial} from '../controllers/testimonials.controller';
import {verifyAdminToken} from '../middleware/admin.middleware'

const Testimonialrouter = express.Router();

Testimonialrouter.post('/',verifyAdminToken, createTestimonial);
Testimonialrouter.get('/', getTestimonial);


export default Testimonialrouter;
