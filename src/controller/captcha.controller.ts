import { Request, Response, NextFunction } from 'express';
import svgCaptcha from 'svg-captcha';

declare module 'express-session' {
    interface SessionData {
        captchaText?: string;
    }
}

// [v1] Generación y validación de CAPTCHA para desarrollo
export const generateCaptcha = (req: Request, res: Response) => {
    try {
        const captcha = svgCaptcha.create({
            size: 6,
            noise: 3,
            color: true,
            background: '#f4f4f4',
            width: 250,
            height: 80,
        });

        res.status(200).json({
            svg: captcha.data,
            text: captcha.text, // ⚠️ en producción NO se debe enviar el texto al cliente
        });
    } catch (error) {
        res.status(500).json({ message: 'Error generando CAPTCHA' });
    }
};

// [v1] Validación de CAPTCHA para desarrollo
export const validateCaptcha = (req: Request, res: Response) => {
    try {
        const { captchaInput, captchaSession } = req.body;

        if (!captchaInput || !captchaSession) {
            return res.status(400).json({ success: false, message: 'Faltan datos' });
        }

        if (captchaInput === captchaSession) {
            return res.status(200).json({ success: true, message: 'CAPTCHA válido' });
        } else {
            return res.status(400).json({ success: false, message: 'CAPTCHA inválido' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error validando CAPTCHA' });
    }
};

// [v2] Generación y validación de CAPTCHA para producción
export const generateCaptchaProd = (req: Request, res: Response) => {
    try {
        const captcha = svgCaptcha.create({
            size: 6,
            noise: 3,
            color: true,
            background: '#f4f4f4',
            width: 250,
            height: 80,
        });

        req.session.captchaText = captcha.text;

        res.status(200).json({
            svg: captcha.data,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error generando CAPTCHA' });
    }
};

// [v2] Validación de CAPTCHA para producción
export const validateCaptchaProd = (req: Request, res: Response) => {
    try {
        const { captchaInput } = req.body;
        const storedCaptcha = req.session.captchaText;

        if (!storedCaptcha) {
            return res.status(400).json({ success: false, message: 'Sesión CAPTCHA expirada' });
        }

        if (captchaInput === storedCaptcha) {
            req.session.captchaText = undefined;
            return res.status(200).json({ success: true, message: 'CAPTCHA válido' });
        } else {
            return res.status(400).json({ success: false, message: 'CAPTCHA inválido' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error validando CAPTCHA' });
    }
};
