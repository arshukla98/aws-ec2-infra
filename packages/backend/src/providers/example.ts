import express from 'express';
import Router from 'express-promise-router';
import { RouterOptions } from '@premise/plugin-form-data-backend';

export async function exampleRouter(options: RouterOptions): Promise<express.Router> {
    const { logger } = options;
    const router = Router();

    router.get('/listOfPersons', async (_, response) => {
        logger.info('ping');
        response.json(['Aditya Shukla', 'Amit Jain', 'Amit Shukla'])
    });
    return router;
}