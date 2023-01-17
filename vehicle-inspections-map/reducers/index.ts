import VIMSites, { initialState as VIMSitesInitialState } from './sites';

import type { State as VIMSitesState } from './sites';

export const VIMInitialState: VIMStateType = {
  VIMSites: VIMSitesInitialState,
};

export type VIMStateType = {
  VIMSites: VIMSitesState;
};

export const VIMReducers: VIMStateType = {
  // @ts-expect-error todo(ts-migration) TS2322 Type 'Reducer<unknown>' is not assignable to type 'Readonly<{ sites: Site[]; isLoading: boolean; error: string; }>'.
  VIMSites,
};
