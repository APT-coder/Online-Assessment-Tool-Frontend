// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: '3e9c1906-7312-4d14-9d96-d7f3482190d1',
      authority: 'https://login.microsoftonline.com/5b751804-232f-410d-bb2f-714e3bb466eb',
    },
  },
  apiConfig: {
    scopes: ['ENTER_SCOPE'],
    uri: 'ENTER_URI',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
