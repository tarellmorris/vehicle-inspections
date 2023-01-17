import SitesRPC from '../sites';

test('getAllSites should load correctly', async () => {
  const ctx: any = {};
  const responseMock = 'responseMock';
  const hubbubServiceMock = {
    getAllSites: jest.fn().mockReturnValueOnce(Promise.resolve(responseMock)),
  };

  const sitesRPCApi = SitesRPC.provides({
    hubbubService: hubbubServiceMock,
  });
  const response = await sitesRPCApi.loadVIMSites(null, ctx);

  expect(response).toBe(responseMock);
}, 10000);

test('loadVIMSites should throw error', async () => {
  const testErr = new Error('test');
  const ctx: any = {};
  const hubbubServiceMock = {
    getAllSites: jest.fn().mockRejectedValue(testErr),
  };

  const sitesRPCApi = SitesRPC.provides({
    hubbubService: hubbubServiceMock,
  });
  await expect(sitesRPCApi.loadVIMSites(null, ctx)).rejects.toThrow('test');
});
