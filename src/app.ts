import express, { type Express } from 'express'
import { healthRouter } from './routes/health.js'
import { categoriesRouter } from './routes/categories.js';
import { pinoHttp } from 'pino-http';
import { logger } from './lib/logger.js';
import { errorHandler } from './middleware/error-handler.js';
import { authRouter } from './routes/auth.js';

export function buildApp(): Express{
    const app = express();

    app.use(pinoHttp({ logger }))

    app.use(express.json());

    app.use('/api/health', healthRouter);
    app.use('/api/categories', categoriesRouter)
    app.use('/api/auth', authRouter);

    app.get('/', (req,res) => {
        res.send('Hello Printoura')
    });

    app.use(errorHandler);

    return app;
}