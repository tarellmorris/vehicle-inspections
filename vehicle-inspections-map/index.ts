import type FusionApp from 'fusion-core';
import RPCEnhancerPlugin from './enhancers/rpc';

import VIMSitesRPCPlugin, { VIMSitesRPCToken } from './rpc/sites';
import SafariServicePlugin, { SafariServiceToken } from './services/safari-service';
import HubbubServicePlugin, { HubbubServiceToken } from './services/hubbub-service';
import { createRegisterRPCToken } from '@uber/create-register-rpc-token';

import { RPCHandlersToken } from 'fusion-plugin-rpc';

export default (app: FusionApp) => {
  if (__NODE__) {
    const registerRPCToken = createRegisterRPCToken(app);

    registerRPCToken(VIMSitesRPCToken, VIMSitesRPCPlugin);
    app.register(HubbubServiceToken, HubbubServicePlugin);

    app.register(SafariServiceToken, SafariServicePlugin);

    app.enhance(RPCHandlersToken, RPCEnhancerPlugin);
  }
};
