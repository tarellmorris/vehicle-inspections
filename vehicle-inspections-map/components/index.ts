import { connect } from 'react-redux';
import { compose } from 'redux';

import { VIMReducers, VIMInitialState } from '../reducers';
import VehicleInspectionsMap from './vehicle-inspections-map';

import { withLocalStore } from '@uber/fusion-plugin-redux-local-store';

import type { State } from '../../../redux';

type GlobalProps = {
  currentLanguage: string;
  countryCode: string;
};

/**
 * A place to map data from the global store.
 */
const mapStateToProps = ({ languages, locationAutocomplete }: State): GlobalProps => {
  const { currentLanguage } = languages;
  const { countryCode } = locationAutocomplete;

  return {
    currentLanguage,
    countryCode,
  };
};

export default compose(
  connect(mapStateToProps) as Function,
  withLocalStore({
    name: 'VIM Store',
    reducers: VIMReducers,
    initialState: VIMInitialState,
  })
)(VehicleInspectionsMap);
