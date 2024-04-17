import { createRouter, RouterOptions } from '@premise/plugin-form-data-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { exampleRouter } from '../providers/example';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
    const routerOptions: RouterOptions = {
        logger: env.logger,
        config: {} // Add any required config here, or leave it empty if not needed
      };
  return await createRouter(routerOptions,
    [
      {
        path: '/example',
        router: exampleRouter,
      }
    ],
  );
}