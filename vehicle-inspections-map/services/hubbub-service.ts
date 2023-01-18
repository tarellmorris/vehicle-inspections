import { createPlugin, createToken, type Context } from 'fusion-core';
import { LoggerToken } from 'fusion-tokens';
import { AtreyuToken } from '@uber/fusion-plugin-atreyu';
import { type Site } from '../types';
import { SafariServiceToken } from '../services/safari-service';
import { ACTIVE_SITE_STATUS, INSPECTIONS_SERVICE_ID } from '../constants';

export const HubbubServiceToken = createToken<HubbubServiceType>('HubbubServiceToken');

type HubbubServiceDeps = {
  logger: typeof LoggerToken;
  _atreyu: typeof AtreyuToken;
  safariServicePlugin: typeof SafariServiceToken;
};

type HubbubServiceType = {
  getAllSites: (ctx: Context) => Promise<Array<Site> | undefined | null>;
};

export const HUBBUB_INFO = '[vehicle-inspection-map-hubbub-service] Hubbub Result';
export const HUBBUB_ERROR = '[vehicle-inspection-map-hubbub-service] Hubbub Error';

const plugin = createPlugin<HubbubServiceDeps, HubbubServiceType>({
  deps: {
    logger: LoggerToken,
    _atreyu: AtreyuToken,
    safariServicePlugin: SafariServiceToken,
  },
  provides({ logger, _atreyu, safariServicePlugin }) {
    return {
      async getAllSites(ctx: Context): Promise<Array<Site> | undefined | null> {
        const safariService = await safariServicePlugin.getTerritoryId(ctx);

        const getSitesRequest = _atreyu.createAsyncRequest({
          service: 'hubbub',
          method: 'Hubbub::getSites',
          args: {
            request: {
              serviceIds: [INSPECTIONS_SERVICE_ID],
              cityIDs: [safariService?.[0]?.id ? safariService[0].id : 0],
              siteStatus: [ACTIVE_SITE_STATUS],
            },
          },
        });

        try {
          const atreyuRes: Promise<Array<Site> | undefined | null> = await getSitesRequest(
            null,
            ctx
          );

          logger.debug(HUBBUB_INFO, {
            ...atreyuRes,
          });

          return atreyuRes;
        } catch (err) {
          logger.error(HUBBUB_ERROR, {
            err,
          });

          throw err;
        }
      },
    };
  },
});

export default plugin;
