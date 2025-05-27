import express from 'express';
import {createPhoneCall} from '../controllers/contact.controller'

const Contactrouter = express.Router();

Contactrouter.post('/',createPhoneCall);


export default Contactrouter;
