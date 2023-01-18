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

export const urlParser = (url: string) => {
  const urlToArray = url.split('/').filter((string) => string !== '');

  const driveCheck = urlToArray[2] === 'drive';
  const inspectionsCheck = urlToArray[4] === 'inspections';

  const lastStringCheck = urlToArray[urlToArray.length - 1];

  const isMultipleParams = lastStringCheck.includes('&');
  const isSingularParam = lastStringCheck.split('=')[0] === '?city';
  const isDriveInspectionsPage = driveCheck && inspectionsCheck;

  if (isMultipleParams) {
    const searchSplit = lastStringCheck.split('?').filter((string) => string !== '');
    const searchMap = searchSplit[0].split('&').map((query) => query.split('='));
    const searchFilter = searchMap.filter((query) => query[0] === 'city')[0][1];

    return searchFilter.replace('-', ' ');
  }
  if (isSingularParam) {
    return lastStringCheck.split('=')[1].replace('-', ' ');
  }
  if (isDriveInspectionsPage) {
    return url
      .split('/')
      .filter((string) => string !== '')[3]
      .replace('-', ' ');
  }

  return '';
};

const plugin = createPlugin<SafariServiceDeps, SafariServiceType>({
  deps: {
    logger: LoggerToken,
    _atreyu: AtreyuToken,
  },
  provides({ logger, _atreyu }) {
    return {
      async getTerritoryId(ctx: Context): Promise<any> {
        const { request } = ctx;
        const url = request.url;

        const getTerritoryIdRequest = _atreyu.createAsyncRequest({
          service: 'safari',
          method: 'Safari::searchTerritories',
          args: {
            request: {
              likeName: urlParser(url),
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
