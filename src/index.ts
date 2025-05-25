import express from 'express';
import cors from 'cors';
import captchaRoutes from './routes/captcha.routes';

const app = express();
const PORT = process.env.PORT || 3000;

import session from 'express-session';

app.use(session({
    secret: 'tu-clave-secreta', // cambia esto por una secreta real
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // true si usas HTTPS
        maxAge: 5 * 60 * 1000 // 5 minutos
    }
}));

app.use(cors());
app.use(express.json());

app.use('/api/captcha', captchaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
