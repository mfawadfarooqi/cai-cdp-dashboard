// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // url: 'http://172.17.53.161:8771',
  // url: 'http://172.17.54.210:8771',
  // url: 'http://localhost:8771/storage',
  // apiUrl: 'http://localhost:8771/storage',
  // socApiUrl: 'http://58.65.161.140:5656',
  // storageUrl: 'http://localhost:8771/storage',
  apiUrl: 'http://192.168.18.20:2020',
  feedsUrl: 'http://192.168.18.20:2020',
  socApiUrl: 'http://127.0.0.1:5656',
  storageUrl: 'http://192.168.18.20:2020/storage',
  lureUrl: 'http://192.168.18.20:2020/lures-service/lures',
  cuckooReportUrl: 'http://192.168.18.20:2020/cuckoo-service/cuckoo',
  webSocketUrl: 'ws://192.168.18.20:8005/ws'
};

/* Previous Port: 2052
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
