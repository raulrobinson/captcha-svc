import { Router } from 'express';
import {
    generateCaptchaProd,
    validateCaptchaProd
} from "../controller/prod.controller";

const prodRoutes = Router();

prodRoutes.get('/', generateCaptchaProd);
prodRoutes.post('/', validateCaptchaProd);

export default prodRoutes;