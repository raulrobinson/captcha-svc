import express from 'express';
import cors from 'cors';
import devRoutes from "./routes/dev.routes";
import prodRoutes from "./routes/prod.routes";
import session from 'express-session';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
    secret: 'MiSuperClaveSecreta', // secret para firmar la sesión
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // true si es HTTPS
        maxAge: 5 * 60 * 1000 // 5 minutos
    }
}));

app.use(cors());
app.use(express.json());

app.use('/api/v1/captcha', devRoutes);
app.use('/api/v2/captcha', prodRoutes);

app.listen(PORT, () => {
    console.log(`Captcha server Running on port:${PORT}`);
});
