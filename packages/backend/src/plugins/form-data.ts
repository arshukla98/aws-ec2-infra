import { createRouter, RouterOptions } from '@premise/plugin-form-data-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { exampleRouter } from '../providers/example';
import { runningEC2Router } from '../providers/running_ec2_instances';
import { crossplaneEC2Router } from '../providers/crossplane_ec2_instance';
import { JsonValue } from '@backstage/types';
import { Config } from '@backstage/config';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
    const routerOptions: RouterOptions = {
        logger: env.logger,
        config: {
          has: function (_key: string): boolean {
            throw new Error('Function not implemented.');
          },
          keys: function (): string[] {
            throw new Error('Function not implemented.');
          },
          get: function <T = JsonValue>(_key?: string | undefined): T {
            throw new Error('Function not implemented.');
          },
          getOptional: function <T = JsonValue>(_key?: string | undefined): T | undefined {
            throw new Error('Function not implemented.');
          },
          getConfig: function (_key: string): Config {
            throw new Error('Function not implemented.');
          },
          getOptionalConfig: function (_key: string): Config | undefined {
            throw new Error('Function not implemented.');
          },
          getConfigArray: function (_key: string): Config[] {
            throw new Error('Function not implemented.');
          },
          getOptionalConfigArray: function (_key: string): Config[] | undefined {
            throw new Error('Function not implemented.');
          },
          getNumber: function (_key: string): number {
            throw new Error('Function not implemented.');
          },
          getOptionalNumber: function (_key: string): number | undefined {
            throw new Error('Function not implemented.');
          },
          getBoolean: function (_key: string): boolean {
            throw new Error('Function not implemented.');
          },
          getOptionalBoolean: function (_key: string): boolean | undefined {
            throw new Error('Function not implemented.');
          },
          getString: function (_key: string): string {
            throw new Error('Function not implemented.');
          },
          getOptionalString: function (_key: string): string | undefined {
            throw new Error('Function not implemented.');
          },
          getStringArray: function (_key: string): string[] {
            throw new Error('Function not implemented.');
          },
          getOptionalStringArray: function (_key: string): string[] | undefined {
            throw new Error('Function not implemented.');
          }
        } // Add any required config here, or leave it empty if not needed
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
      },
      {
        path: '/crossplane',
        router: crossplaneEC2Router,
      }
    ],
  );
}