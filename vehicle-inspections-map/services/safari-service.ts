import { createPlugin, createToken, type Context } from 'fusion-core';
import { LoggerToken } from 'fusion-tokens';
import { AtreyuToken } from '@uber/fusion-plugin-atreyu';

export const SafariServiceToken = createToken<SafariServiceType>('SafariServiceToken');

type SafariServiceDeps = {
  logger: typeof LoggerToken;
  _atreyu: typeof AtreyuToken;
};

type SafariServiceType = {
  getTerritoryId: (ctx: Context) => Promise<any>;
};

export const SAFARI_INFO = '[vehicle-inspection-map-safari-service] Safari Result';
export const SAFARI_ERROR = '[vehicle-inspection-map-safari-service] Safari Error';

const plugin = createPlugin<SafariServiceDeps, SafariServiceType>({
  deps: {
    logger: LoggerToken,
    _atreyu: AtreyuToken,
  },
  provides({ logger, _atreyu }) {
    return {
      async getTerritoryId(ctx: Context): Promise<any> {
        const { request } = ctx;
        const url = request?.url;
        const driveCheck = url.split('/').filter((string) => string !== '')[2] === 'drive';
        const inspectionsCheck =
          url.split('/').filter((string) => string !== '')[4] === 'inspections';
        const cityName = url
          .split('/')
          .filter((string) => string !== '')[3]
          .replace('-', ' ');

        const getTerritoryIdRequest = _atreyu.createAsyncRequest({
          service: 'safari',
          method: 'Safari::searchTerritories',
          args: {
            request: {
              likeName: `${driveCheck && inspectionsCheck ? String(cityName) : ''}`,
            },
          },
        });

        try {
          const atreyuRes: Promise<any> = await getTerritoryIdRequest(null, ctx);

          logger.debug(SAFARI_INFO, {
            ...atreyuRes,
          });

          return atreyuRes;
        } catch (err) {
          logger.error(SAFARI_ERROR, {
            err,
          });

          throw err;
        }
      },
    };
  },
});

export default plugin;
