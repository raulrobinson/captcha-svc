import { Router } from 'express';
import {
    generateCaptcha,
    generateCaptchaProd,
    validateCaptcha,
    validateCaptchaProd
} from "../controller/captcha.controller";

const router = Router();

router.get('/v1', generateCaptcha);
router.post('/v1', validateCaptcha);

router.get('/v2', generateCaptchaProd);
router.post('/v2', validateCaptchaProd);

export default router;
