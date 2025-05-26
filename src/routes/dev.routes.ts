import { Router } from 'express';
import {
    generateCaptcha,
    validateCaptcha,
} from "../controller/dev.controller";

const devRoutes = Router();

devRoutes.get('/', generateCaptcha);
devRoutes.post('/', validateCaptcha);

export default devRoutes;
