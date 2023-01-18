import React from 'react';
import { compose } from 'redux';
import { withTranslations } from 'fusion-plugin-i18n-react';
import VehicleInspectionsMap from '@uber/dotcom-vehicle-inspections-map';

import withVIMWrapper from './wrapper';
import type { ComponentProps as VIMWrapperProps } from './wrapper';
import { type TranslateFn } from '../types';
import { GOOGLE_MAPS_CLIENT_ID } from '../../../constants';

type State = {
  translations: {
    hoursLabel: string;
    daysLabels: {
      mon: string;
      tue: string;
      wed: string;
      thu: string;
      fri: string;
      sat: string;
      sun: string;
    };
  };
  directionLink: string;
};

type VIMProps = VIMWrapperProps & {
  translate: TranslateFn;
};

export class VIMBlock extends React.Component<VIMProps, State> {
  state = {
    sites: [],
    translations: {
      hoursLabel: this.props.translate('vehicle-inspections-map.hours-label'),
      daysLabels: {
        mon: this.props.translate('vehicle-inspections-map.days.mon'),
        tue: this.props.translate('vehicle-inspections-map.days.tue'),
        wed: this.props.translate('vehicle-inspections-map.days.wed'),
        thu: this.props.translate('vehicle-inspections-map.days.thu'),
        fri: this.props.translate('vehicle-inspections-map.days.fri'),
        sat: this.props.translate('vehicle-inspections-map.days.sat'),
        sun: this.props.translate('vehicle-inspections-map.days.sun'),
      },
      languagesLabel: this.props.translate('vehicle-inspections-map.languages.label'),
    },
    directionLink: this.props.translate('vehicle-inspections-map.driving-directions-link'),
  };

  render() {
    const { translations, directionLink } = this.state;
    const { isLoading, rtl, error, sites } = this.props;

    if (isLoading || error) {
      if (__DEV__) {
        if (isLoading) {
          return <div>Loading...</div>;
        } else {
          return <div>{error}</div>;
        }
      }
      return <noscript />;
    }
    return (
      <VehicleInspectionsMap
        {...this.props}
        mapProps={{ clientId: GOOGLE_MAPS_CLIENT_ID }}
        translations={translations}
        directionLink={directionLink}
        sites={sites}
        rtl={rtl}
      />
    );
  }
}

export default compose(
  withVIMWrapper,
  withTranslations([
    'vehicle-inspections-map.hours-label',
    'vehicle-inspections-map.days.mon',
    'vehicle-inspections-map.days.tue',
    'vehicle-inspections-map.days.wed',
    'vehicle-inspections-map.days.thu',
    'vehicle-inspections-map.days.fri',
    'vehicle-inspections-map.days.sat',
    'vehicle-inspections-map.days.sun',
    'vehicle-inspections-map.driving-directions-link',
    'vehicle-inspections-map.languages.label',
  ])
)(VIMBlock);
