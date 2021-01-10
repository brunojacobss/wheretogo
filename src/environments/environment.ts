// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authUserApi: {
    baseUrl: 'http://localhost:3027/users',
  },
  gmapsApi: {
    apiKey: 'AIzaSyBNXcbmORjL21_nziF443dTP0EBQY7V53c',
    defaultZoom: 14,
  },
  openTripMap: {
    defaultCity: 'Trujillo',
    apikey: 'apikey=5ae2e3f221c38a28845f05b67b5b1899ef8bd4920ab9d6441df07fc0',
    baseUrl: 'https://api.opentripmap.com/0.1/en/places/',
    radius: '1000',
    rate: '2',
    formatCount: 'count',
    formatJson: 'json',
  },

  urlAvatarDefaultImage:
    'https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
