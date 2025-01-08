import express from 'express'
import { companyController } from '../controllers/company.js';

const router = express.Router()

router.get('/',companyController)

export default router;