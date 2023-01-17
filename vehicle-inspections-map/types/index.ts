export type Hours = {
  [k in 'openTime' | 'closeTime']:
    | {
        hour: number;
        min: number;
      }
    | undefined
    | null;
};

export const DaysOfWeek = {
  MON: 'mon',
  TUE: 'tue',
  WED: 'wed',
  THU: 'thu',
  FRI: 'fri',
  SAT: 'sat',
  SUN: 'sun',
};

export type DaysOfWeekType = keyof typeof DaysOfWeek;
export type WeekType = typeof DaysOfWeek[keyof typeof DaysOfWeek];

export type WeeklyHours = {
  [k in WeekType]: Hours | undefined | null;
};

export type LocalizedWeeklyHours = {
  [k in WeekType]: string | undefined | null;
};

export type Site = {
  cityID: number;
  cityName: string;
  contactInfo: {
    phoneCountryCode: string;
    phoneNumber: string;
  };
  latitude: number;
  longitude: number;
  weeklyHours: WeeklyHours;
  state: string;
  address1: string;
  address2: string;
  id: string;
  name: string;
  languages: string[];
  postalCode: string;
  timezone: string;
  code: string;
  countryISO2?: string;
  entityStatus?: string;
  siteType: string;
};

export type MappedSite = {
  weeklyHours: LocalizedWeeklyHours;
} & Site;

export type TranslateFn = (
  key: string,
  data?: {
    [x: string]: string;
  }
) => string;
