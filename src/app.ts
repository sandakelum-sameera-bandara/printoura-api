import express, { type Express } from 'express'
import { healthRouter } from './routes/health.js'

export function buildApp(): Express{
    const app = express();
    app.use(express.json());
    app.use('/api/health', healthRouter);

    app.get('/', (req,res) => {
        res.send('Hello Printoura')
    });

    return app;
}