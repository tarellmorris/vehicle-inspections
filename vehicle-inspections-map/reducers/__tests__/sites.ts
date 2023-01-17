import {
  loadVIMSitesStart,
  loadVIMSitesSuccess,
  loadVIMSitesFailure,
  initialState,
} from '../sites';

describe('Hubbub - Reducer - Sites', () => {
  test('loadVIMSitesStart', () => {
    const testCases = [
      {
        initialState: undefined,
        wantState: {
          ...initialState,
          isLoading: true,
          error: '',
        },
      },
      {
        initialState,
        wantState: {
          ...initialState,
          isLoading: true,
          error: '',
        },
      },
    ];

    testCases.forEach((testCase) => {
      expect(loadVIMSitesStart(testCase.initialState)).toStrictEqual(testCase.wantState);
    });
  });

  test('loadVIMSitesSuccess', () => {
    const payloadMock: any = {
      sites: [],
    };
    const testCases = [
      {
        initialState: undefined,
        action: {
          payload: payloadMock,
        },
        wantState: {
          ...initialState,

          isLoading: false,
          sites: payloadMock.sites,
        },
      },
      {
        initialState: {
          ...initialState,
          isLoading: true,
        },
        action: {
          payload: payloadMock,
        },
        wantState: {
          ...initialState,

          isLoading: false,
          sites: payloadMock.sites,
        },
      },
    ];

    testCases.forEach((testCase) => {
      expect(loadVIMSitesSuccess(testCase.initialState, testCase.action)).toStrictEqual(
        testCase.wantState
      );
    });
  });

  test('loadVIMSitesFailure', () => {
    const errMessage = 'Some error';
    const testCases = [
      {
        initialState: undefined,
        action: {
          payload: {
            message: errMessage,
          },
        },
        wantState: {
          ...initialState,

          isLoading: false,
          error: errMessage,
        },
      },
      {
        initialState: {
          ...initialState,
          isLoading: true,
        },
        action: {
          payload: {
            message: errMessage,
          },
        },
        wantState: {
          ...initialState,

          isLoading: false,
          error: errMessage,
        },
      },
    ];

    testCases.forEach((testCase) => {
      expect(loadVIMSitesFailure(testCase.initialState, testCase.action)).toStrictEqual(
        testCase.wantState
      );
    });
  });
});
