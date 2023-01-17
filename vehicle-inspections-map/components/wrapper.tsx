import React, { type ComponentType } from 'react';
import { prepared } from 'fusion-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';

import type { VIMStateType } from '../reducers';
import rtlDetect from 'rtl-detect';
import { mapVIMSites } from '../utils';
import { type Site, type MappedSite } from '../types';

export type ComponentProps = {
  rtl: boolean;
  countryCode: string;
  currentLanguage: string;
  loadVIMSites: () => void;
  sites: Array<Site> | undefined | null;
  isLoading: boolean;
  error: string;
};

type ComponentState = {
  mappedSites: MappedSite[];
  sites: Site[];
};

export function withVIM(WrappedComponent: ComponentType<any>) {
  return class WrappingComponent extends React.Component<ComponentProps, ComponentState> {
    state = {
      sites: [],
      mappedSites: [],
    };

    static getDerivedStateFromProps(props: ComponentProps, state: ComponentState) {
      if (props.sites && props.sites !== state.sites && !props.isLoading) {
        const { sites, currentLanguage } = props;
        return {
          sites: props.sites,
          mappedSites: mapVIMSites(sites, currentLanguage),
        };
      }

      return null;
    }

    render() {
      const { mappedSites } = this.state;
      return <WrappedComponent {...this.props} sites={mappedSites} />;
    }
  };
}

export function mapStateToProps({ VIMSites }: VIMStateType, ownProps: ComponentProps) {
  const { currentLanguage } = ownProps;

  return {
    sites: VIMSites.sites,
    error: VIMSites.error,
    isLoading: VIMSites.isLoading,
    rtl: rtlDetect.isRtlLang(currentLanguage),
  };
}

export default compose(
  withRPCRedux('loadVIMSites'),
  connect(mapStateToProps),
  prepared((props) => {
    if (props.sites) {
      return Promise.resolve();
    }
    return props.loadVIMSites();
  }),
  withVIM
) as Function;
