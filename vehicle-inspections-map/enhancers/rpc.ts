import { createPlugin } from 'fusion-core';
import { VIMSitesRPCToken } from '../rpc/sites';

type RPCEnhancerDeps = {
  sitesRPC: typeof VIMSitesRPCToken;
};

export default (handlers: unknown) => {
  return createPlugin<RPCEnhancerDeps, any>({
    deps: {
      sitesRPC: VIMSitesRPCToken,
    },
    provides({ sitesRPC }) {
      return {
        // @ts-expect-error todo(ts-migration) TS2698 Spread types may only be created from object types.
        ...handlers,
        ...sitesRPC,
      };
    },
  });
};
