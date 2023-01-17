import reduceReducers from 'reduce-reducers';
import type { ErrorPayload } from '../../../types/common';

import type { Site } from '../types';
import { createRPCReducer } from 'fusion-rpc-redux';

export type State = Readonly<{
  sites: Array<Site> | undefined | null;
  isLoading: boolean;
  error: string;
}>;

type SuccessAction = {
  payload: {
    sites: Site[];
  };
};

type FailureAction = {
  payload: ErrorPayload;
};

export const initialState: State = {
  sites: null,
  isLoading: false,
  error: '',
};

export function loadVIMSitesStart(state: State | void): State {
  const safeState = state || initialState;

  return {
    ...safeState,

    isLoading: true,
    error: '',
  };
}

export function loadVIMSitesSuccess(state: State | void, action: SuccessAction): State {
  const safeState = state || initialState;

  const { sites } = action.payload || {};

  return {
    ...safeState,

    sites,
    isLoading: false,
  };
}

export function loadVIMSitesFailure(state: State | void, action: FailureAction): State {
  const safeState: State = state || initialState;
  return {
    ...safeState,

    isLoading: false,
    error: action.payload.message,
  };
}

const loadVIMSitesRPCReducer = createRPCReducer('loadVIMSites', {
  start: loadVIMSitesStart as any,
  success: loadVIMSitesSuccess as any,
  failure: loadVIMSitesFailure as any,
});

export default reduceReducers((state) => state || initialState, loadVIMSitesRPCReducer);
