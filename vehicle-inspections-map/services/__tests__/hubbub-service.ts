import type { Site } from '../../types';
import hubbubService from '../hubbub-service';
import { makeLogger } from '../../../../test-utils/mocks/logger';

describe('hubbub service', () => {
  const ctx = {};
  const sitesMock: {
    sites: Site[];
  } = {
    sites: [],
  };
  const loggerMock = {
    // @ts-expect-error todo(ts-migration) TS2554 Expected 1 arguments, but got 0.
    ...makeLogger(),
  };

  const safariServicePluginMock: any = { getTerritoryId: jest.fn() };

  test('Should correctly return sites', async () => {
    const sitesRequestMock = jest.fn().mockResolvedValue(
      Promise.resolve({
        sites: [],
      })
    );
    const atreyuMock = {
      createAsyncRequest: () => sitesRequestMock,
    };

    const hubbub = hubbubService.provides({
      logger: loggerMock,
      _atreyu: atreyuMock,
      safariServicePlugin: safariServicePluginMock,
    });

    // @ts-expect-error todo(ts-migration) TS2345 Argument of type '{}' is not assignable to parameter of type 'Context'.
    const result = await hubbub.getAllSites(ctx);

    expect(result).toEqual(sitesMock);
  });

  test('Should throw error', async () => {
    const errorMock = 'errorMock';
    const sitesRequestMock = jest.fn().mockRejectedValue(new Error(errorMock));
    const atreyuMock = {
      createAsyncRequest: () => sitesRequestMock,
    };

    const hubbub = hubbubService.provides({
      logger: loggerMock,
      _atreyu: atreyuMock,
      safariServicePlugin: safariServicePluginMock,
    });

    // @ts-expect-error todo(ts-migration) TS2345 Argument of type '{}' is not assignable to parameter of type 'Context'.
    await expect(hubbub.getAllSites(ctx)).rejects.toThrow(errorMock);
  });
});
