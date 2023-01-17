import React, { Component } from 'react';
import { Map } from '@uber/wcb3-map';
import type { MapDataSiteType, MapProps, LocalizationType } from '@uber/wcb3-map';
import type { RoutesInputsGroupProps } from '@uber/dotcom-ui';
import type { Site } from '../types';

type Props = {
  backgroundColor?: string;
  body?: any;
  clientId?: string;
  currentBreakpoint?: string;
  directionLink?: any;
  eyebrow?: string;
  heading?: string;
  isLoadingDirections?: boolean;
  locations?: Array<MapDataSiteType>;
  localization?: LocalizationType;
  translations?: any;
  mapProps?: MapProps;
  rtl?: boolean;
  routesInputProps?: RoutesInputsGroupProps;
  textColor?: string;
  sites?: Array<Site>;
};

export class VehicleInspectionsMap extends Component<Props> {
  render() {
    const {
      backgroundColor,
      body,
      clientId,
      currentBreakpoint,
      directionLink,
      eyebrow,
      heading,
      isLoadingDirections,
      mapProps,
      localization,
      routesInputProps,
      locations = [],
      rtl,
      sites,
      textColor,
      translations,
    } = this.props;

    const sitesToLocationMapper = (sites: Array<Site>) => {
      const mappedSites = sites.map((site) => {
        const {
          name,
          cityName,
          state,
          postalCode,
          address1,
          address2,
          weeklyHours,
          contactInfo,
          latitude,
          longitude,
        } = site;

        const phoneFormatter = (phoneNumber: string) => {
          if (phoneNumber.length === 10) {
            var cleaned = ('' + phoneNumber).replace(/\D/g, '');
            var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
            if (match) {
              return '(' + match[1] + ') ' + match[2] + '-' + match[3];
            }
          }
          return phoneNumber;
        };

        return {
          title: name,
          address: `${address1} ${cityName}, ${state} ${postalCode}`,
          address2: address2,
          hours1: `Mon | ${
            String(weeklyHours.mon) === 'undefined' ? 'Closed' : String(weeklyHours.mon)
          }`,
          hours2: `Tues | ${
            String(weeklyHours.tue) === 'undefined' ? 'Closed' : String(weeklyHours.tue)
          }`,
          hours3: `Wed | ${
            String(weeklyHours.wed) === 'undefined' ? 'Closed' : String(weeklyHours.wed)
          }`,
          hours4: `Thurs | ${
            String(weeklyHours.thu) === 'undefined' ? 'Closed' : String(weeklyHours.thu)
          }`,
          hours5: `Fri | ${
            String(weeklyHours.fri) === 'undefined' ? 'Closed' : String(weeklyHours.fri)
          }`,
          hours6: `Sat | ${
            String(weeklyHours.sat) === 'undefined' ? 'Closed' : String(weeklyHours.sat)
          }`,
          hours7: `Sun | ${
            String(weeklyHours.sun) === 'undefined' ? 'Closed' : String(weeklyHours.sun)
          }`,
          phone: `${contactInfo.phoneNumber ? contactInfo.phoneCountryCode : ''} ${
            phoneFormatter(contactInfo.phoneNumber) || ''
          }`,
          lat: latitude,
          lng: longitude,
        };
      });
      return mappedSites;
    };

    const defaultProps = {
      localization: {
        pickupAriaLabel: 'Start',
        pickupPlaceholder: 'Enter start point',
        destinationAriaLabel: 'Destination',
        destinationPlaceholder: 'Enter destination point',
        clearPickupAriaLabel: 'clearPickupAriaLabel',
        clearDestinationAriaLabel: 'clearDestinationAriaLabel',
        locationLabel: 'Get current location',
        noDetectLocationPermissionError:
          "The acquisition of the geolocation information failed because the page didn't have the permission to do it.",
        commonDetectLocationError: 'Failed to fetch your location. Please, try type it manually.',
        commonError: 'Failed to retrieve data, please try again later.',
      },
    };
    const localizationProps = localization ? localization : defaultProps.localization;
    const transformedProps = {
      clientId,
      heading,
      eyebrow,
      body,
      locations: sites?.length ? sitesToLocationMapper(sites) : locations,
      backgroundColor,
      directionLink,
      textColor,
      mapProps,
      localization: localizationProps,
      routesInputProps,
      rtl,
      currentBreakpoint,
      isLoadingDirections,
      translations,
    };

    return <Map {...transformedProps} />;
  }
}
