import { Request, Response, RequestHandler } from 'express';
import svgCaptcha from 'svg-captcha';

declare module 'express-session' {
    interface SessionData {
        captchaText?: string;
    }
}

// [v1] Generación y validación de CAPTCHA para desarrollo
export const generateCaptcha = (_req: Request, res: Response) => {
    try {
        const captcha = svgCaptcha.create({
            size: 6,
            noise: 3,
            color: true,
            background: '#f4f4f4',
            width: 250,
            height: 80,
        });

        res.json({
            svg: captcha.data,
            text: captcha.text, // ⚠️ en producción NO se debe enviar el texto al cliente
        });
    } catch (error) {
        res.json({ message: 'Error generando CAPTCHA' });
    }
};

// [v1] Validación de CAPTCHA para desarrollo
export const validateCaptcha: RequestHandler = (req, res) => {
    try {
        const { captchaInput, captchaSession } = req.body;

        if (!captchaInput || !captchaSession) {
            res.status(400).json({ success: false, message: 'Faltan datos' });
        }

        if (captchaInput === req.session.captchaText) {
            res.status(200).json({ success: true, message: 'CAPTCHA válido' });
        } else {
            res.status(400).json({ success: false, message: 'CAPTCHA inválido' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error validando CAPTCHA' });
    }
};
