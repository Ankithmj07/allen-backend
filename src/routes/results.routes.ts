import express from 'express';
import { createResult,getResults} from '../controllers/results.controller';
import {verifyAdminToken} from '../middleware/admin.middleware'

const Resultsrouter = express.Router();

Resultsrouter.post('/',verifyAdminToken, createResult);
Resultsrouter.get('/', getResults);


export default Resultsrouter;
