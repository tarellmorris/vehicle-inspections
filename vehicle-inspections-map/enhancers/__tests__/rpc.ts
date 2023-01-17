import rpcEnhancer from '../rpc';

const mockedRPCHandlers = { mockedRPCHandlers: 'mockedRPCHandlers' };
const mockSitesRPC = { mockSitesRPC: 'mockSitesRPC' };

describe('Greenlight - RPC - Sites', () => {
  test('Enhancer', () => {
    const RPCEnhancer = rpcEnhancer(mockedRPCHandlers);

    const result = RPCEnhancer.provides({
      // @ts-expect-error todo(ts-migration) TS2741 Property 'loadVIMSites' is missing in type '{ mockSitesRPC: string; }' but required in type 'SitesRPCPluginType'.
      sitesRPC: mockSitesRPC,
    });

    expect(result).toStrictEqual({
      ...mockedRPCHandlers,
      ...mockSitesRPC,
    });
  });
});
