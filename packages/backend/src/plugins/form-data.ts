import { createRouter, RouterOptions } from '@premise/plugin-form-data-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { exampleRouter } from '../providers/example';
import { runningEC2Router } from '../providers/running_ec2_instances';

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
      },
      {
        path: '/ec2-instances',
        router: runningEC2Router,
      }
    ],
  );
}