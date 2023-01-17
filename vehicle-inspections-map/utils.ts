import safeGet from 'just-safe-get';
import {
  type Site,
  type MappedSite,
  type LocalizedWeeklyHours,
  type WeeklyHours,
  type Hours,
} from './types';
import { LOCALE_TO_BASE_LANGUAGE_AND_LOCAL_LANGUAGE } from '../../mappers/locale-location';
import { transformStringToTime } from '../../utils/time-format';

/**
 * convert weeklyHours to strings with time format preferred to current locale
 * @param {string} currentLanguage
 * @param {WeeklyHours} weeklyHours
 * @returns {LocalizedWeeklyHours}
 * export only for testing
 */
export function localizeWeeklyHours(
  currentLanguage: string,
  weeklyHours: WeeklyHours
): LocalizedWeeklyHours {
  const localizedWeeklyHours: LocalizedWeeklyHours = {};
  for (let key in weeklyHours) {
    if (Object.prototype.hasOwnProperty.call(weeklyHours, key)) {
      const time: Hours | undefined | null = weeklyHours[key];
      const openTimeHours = safeGet(time, 'openTime.hour');
      const openTimeMin = safeGet(time, 'openTime.min');
      const closeTimeHours = safeGet(time, 'closeTime.hour');
      const closeTimeMin = safeGet(time, 'closeTime.min');

      if (openTimeHours != null && closeTimeHours != null) {
        const fromString = transformStringToTime({
          hoursString: openTimeHours.toString(),
          minutesString: openTimeMin.toString(),
          locale: currentLanguage,
        });
        const toString = transformStringToTime({
          hoursString: closeTimeHours.toString(),
          minutesString: closeTimeMin.toString(),
          locale: currentLanguage,
        });

        localizedWeeklyHours[key] = `${fromString} - ${toString}`;
      }
    }
  }

  return localizedWeeklyHours;
}

export function mapVIMSites(sites: Site[], currentLanguage: string): MappedSite[] {
  // @ts-expect-error todo(ts-migration) TS2322 Type '{ cityID: number; cityName: string; contactInfo: { phoneCountryCode: string; phoneNumber: string; }; latitude: number; longitude: number; weeklyHours: LocalizedWeeklyHours; ... 9 more ...; siteT...
  const mappedSites: MappedSite[] = sites.map((site: Site) => {
    const localizedWeeklyHours: LocalizedWeeklyHours = localizeWeeklyHours(
      currentLanguage,
      site.weeklyHours
    );

    const fullLanguages: string[] = site.languages.map(
      (lang: string) => LOCALE_TO_BASE_LANGUAGE_AND_LOCAL_LANGUAGE[lang].localLanguage
    );

    return {
      cityID: site.cityID,
      cityName: site.cityName,
      contactInfo: site.contactInfo,
      latitude: site.latitude,
      longitude: site.longitude,
      weeklyHours: localizedWeeklyHours,
      state: site.state,
      address1: site.address1,
      address2: site.address2,
      id: site.id,
      name: site.name,
      languages: fullLanguages,
      postalCode: site.postalCode,
      timezone: site.timezone,
      code: site.code,
      siteType: site.siteType,
    };
  });

  return mappedSites;
}
