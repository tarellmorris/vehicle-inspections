import { createPlugin, createToken, type Context } from 'fusion-core';
import { HubbubServiceToken } from '../services/hubbub-service';
import { ResponseError } from 'fusion-plugin-rpc';

import type { Site } from '../types';

export const VIMSitesRPCToken = createToken<SitesRPCPluginType>('VIMSitesRPCToken');

type SitesRPCDeps = {
  hubbubService: typeof HubbubServiceToken;
};

export type SitesRPCPluginType = {
  loadVIMSites: (_: any, ctx: Context) => Promise<Array<Site> | undefined | null>;
};

export default createPlugin<SitesRPCDeps, SitesRPCPluginType>({
  deps: {
    hubbubService: HubbubServiceToken,
  },
  provides: ({ hubbubService }) => {
    return {
      async loadVIMSites(_: any, ctx: Context): Promise<Array<Site> | undefined | null> {
        try {
          // @ts-expect-error todo(ts-migration) TS2739 Type 'Site[]' is missing the following properties from type 'Promise<Site[]>': then, catch, finally, [Symbol.toStringTag]
          const result: Promise<Array<Site> | undefined | null> = await hubbubService.getAllSites(
            ctx
          );

          return result;
        } catch (e) {
          throw new ResponseError(e.message);
        }
      },
    };
  },
});
