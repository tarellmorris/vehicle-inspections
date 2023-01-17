import { createPlugin, createToken, type Context } from 'fusion-core';
import { SafariServiceToken } from '../services/safari-service';
import { ResponseError } from 'fusion-plugin-rpc';

export const VIMTerritoryRPCToken = createToken<TerritoryRPCPluginType>('VIMTerritoryRPCToken');

type TerritoryRPCDeps = {
  safariService: typeof SafariServiceToken;
};

export type TerritoryRPCPluginType = {
  loadVIMTerritory: (_: any, ctx: Context) => Promise<any>;
};

export default createPlugin<TerritoryRPCDeps, TerritoryRPCPluginType>({
  deps: {
    safariService: SafariServiceToken,
  },
  provides: ({ safariService }) => {
    return {
      async loadVIMTerritory(_: any, ctx: Context): Promise<any> {
        try {
          const result: Promise<any> = await safariService.getTerritoryId(ctx);

          return result;
        } catch (e) {
          throw new ResponseError(e.message);
        }
      },
    };
  },
});
