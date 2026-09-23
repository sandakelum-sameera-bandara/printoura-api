import type { ErrorRequestHandler } from 'express';
import { ZodError, z } from 'zod';
import { AppError } from '../lib/errors.js';
import { logger } from '../lib/logger.js';

export const errorHandler:ErrorRequestHandler=(err,_req,res,_next)=>{
    if( err instanceof AppError){
        res.status(err.status).json({
            error:{
            code:err.code,
            message:err.message,
            ...(err.details?{details:err.details}:{}),
            },
        });
    return;
}
    if( err instanceof ZodError){
        res.status(422).json({
        error:{
            code: 'VALIDATION_ERROR',
            message: 'Requestvalidationfailed',
            details: z.flattenError(err), //Zod4:top-levelhelper,nota method
            },
        });
    return;
}
    logger.error({err},'Unhandlederror'); //fullstack->logsONLY
        res.status(500).json({
            error:{ code: 'INTERNAL', message: 'Internal server error'}
        });
};