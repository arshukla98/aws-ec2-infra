import {
  createRouter,
  providers,
  defaultAuthProviderFactories,
} from '@backstage/plugin-auth-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return await createRouter({
    logger: env.logger,
    config: env.config,
    database: env.database,
    discovery: env.discovery,
    tokenManager: env.tokenManager,
    providerFactories: {
      ...defaultAuthProviderFactories,

      // This replaces the default GitHub auth provider with a customized one.
      // The `signIn` option enables sign-in for this provider, using the
      // identity resolution logic that's provided in the `resolver` callback.
      //
      // This particular resolver makes all users share a single "guest" identity.
      // It should only be used for testing and trying out Backstage.
      //
      // If you want to use a production ready resolver you can switch to
      // the one that is commented out below, it looks up a user entity in the
      // catalog using the GitHub username of the authenticated user.
      // That resolver requires you to have user entities populated in the catalog,
      // for example using https://backstage.io/docs/integrations/github/org
      //
      // There are other resolvers to choose from, and you can also create
      // your own, see the auth documentation for more details:
      //
      //   https://backstage.io/docs/auth/identity-resolver

      // github: providers.github.create({
      //   signIn: {
      //     async resolver({ result: { fullProfile } }, ctx) {
      //       const userId = fullProfile.username;
      //       if (!userId) {
      //         throw new Error(
      //           `GitHub user profile does not contain a username`,
      //         );
      //       }

      //       const userEntityRef = stringifyEntityRef({
      //         kind: 'User',
      //         name: userId,
      //         namespace: DEFAULT_NAMESPACE,
      //       });

      //       return ctx.issueToken({
      //         claims: {
      //           sub: userEntityRef,
      //           ent: [userEntityRef],
      //         },
      //       });
      //     },
      //   },
      // }),
      github: providers.github.create({
        signIn: {
          resolver: providers.github.resolvers.usernameMatchingUserEntityName(),
        }
      }),
      // gitlab: providers.gitlab.create({
      //   signIn: {
      //     async resolver({ result: { fullProfile } }, ctx) {
      //       return ctx.signInWithCatalogUser({
      //         entityRef: {
      //           name: fullProfile.id,
      //         },
      //       });
      //     },
      //   },
      // }),
      microsoft: providers.microsoft.create({
        signIn: {
          resolver:
            providers.microsoft.resolvers.emailMatchingUserEntityAnnotation(),
        },
      }),
      google: providers.google.create({
        signIn: {
          resolver:
            providers.google.resolvers.emailLocalPartMatchingUserEntityName(),
        },
      }),
      // okta: providers.okta.create({
      //   signIn: {
      //     resolver:
      //       providers.okta.resolvers.emailMatchingUserEntityAnnotation(),
      //   },
      // }),
      bitbucket: providers.bitbucket.create({
        signIn: {
          resolver:
            providers.bitbucket.resolvers.usernameMatchingUserEntityAnnotation(),
        },
      }),
      // bitbucketServer: providers.bitbucketServer.create({
      //   signIn: {
      //     resolver:
      //       providers.bitbucketServer.resolvers.emailMatchingUserEntityProfileEmail(),
      //   },
      // }),
    },
  });
}
