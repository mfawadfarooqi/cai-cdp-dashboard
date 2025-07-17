import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.staging';


@Injectable({
  providedIn: 'root'
})
export class ConfigApiService {

  baseUrl: any;
  storageUrl: any;
  socApiUrl: any;
  lureUrl: any;
  feedsUrl: any;
  cuckooReportUrl: any;

  constructor() {
    this.baseUrl = environment.apiUrl;
    this.storageUrl = environment.storageUrl;
    this.socApiUrl = environment.socApiUrl;
    this.lureUrl = environment.lureUrl;
    this.cuckooReportUrl = environment.cuckooReportUrl;
    this.feedsUrl = environment.feedsUrl;
  }

  login(): string {
    return this.baseUrl + '/uaa/get-token';
  }
  //
  getCounts(endDate, startDate): string {
    return this.storageUrl + '/severity-count?startDate=' + startDate + '&endDate=' + endDate;
  }

  getLookupServices(country, type, endDate, startDate): string {
    if (country) {
      return this.storageUrl + '/lookup?endDate=' + endDate + '&startDate=' + startDate + '&type=' + type + '&country=' + country + '&size=5';
    } else {
      return this.storageUrl + '/lookup?endDate=' + endDate + '&startDate=' + startDate + '&type=' + type + '&size=5';
    }
  }
  //
  // getTopCountriesTools(endDate, startDate, onTheBasisOf, type): string {
  //   return this.storageUrl + '/top-countries-tools?endDate=' + endDate + '&startDate=' + startDate + '&onTheBasisOf=' + onTheBasisOf + '&size=10&type=' + type;
  // }
  //
  // getTopIpAddresses(endDate, startDate, type): string {
  //   return this.storageUrl + '/top-ips?endDate=' + endDate + '&startDate=' + startDate + '&onTheBasisOf=' + type + '&size=10';
  // }
  //
  // getMapViewData(endDate, startDate): string {
  //   return this.storageUrl + '/deception-map-view?endDate=' + endDate + '&startDate=' + startDate + '&type=decoyy&size=10';
  // }
  //
  // getSensorCounts(endDate, startDate): string {
  //   return this.storageUrl + '/sensor-count?endDate=' + endDate + '&startDate=' + startDate;
  // }
  //
  getDashboardCounts(endDate, startDate, type): string {
    return this.storageUrl + '/count?type=' + type + '&endDate=' + endDate + '&startDate=' + startDate;
  }
  //
  // getInfectedAssetCounts(endDate, startDate): string {
  //   return this.storageUrl + '/private-ip-count?endDate=' + endDate + '&startDate=' + startDate;
  // }
  //
  // getAttackCounts(endDate, startDate): string {
  //   return this.storageUrl + '/attack-count?endDate=' + endDate + '&startDate=' + startDate;
  // }
  //
  // getTopMalwareCounts(endDate, startDate): string {
  //   return this.storageUrl + '/malware-attack-count?startDate=' + startDate + '&endDate=' + endDate;
  // }
  //
  // getCredentialCounts(endDate, startDate, type): string {
  //   if (type === 'INPUT' || type === 'PASSWORD' || type === 'USER' || type === 'dionaea') {
  //     return this.storageUrl + '/top-credentials?startDate=' + startDate + '&endDate=' + endDate + '&onTheBasisOf=' + type + '&size=10';
  //   } else if (type === 'Credentials' || type === 'Credential') {
  //     return this.storageUrl + '/combo-top-user?startDate=' + startDate + '&endDate=' + endDate;
  //   }
  // }
  //
  getAttacksList(endDate, startDate): string {
    return this.storageUrl + '/attacks-by-severity?endDate=' + endDate + '&startDate=' + startDate;
  }
  //
  // getAllMalware(endDate, startDate, page): string {
  //   return this.storageUrl + '/all-malware?endDate=' + endDate + '&startDate=' + startDate + '&page=' + page + '&size=10';
  // }
  //
  // getMd5(md5, endDate, startDate, page): string {
  //   return this.storageUrl + '/malware-details-by-md5?endDate=' + endDate + '&startDate=' +
  //     startDate + '&md5=' + md5 + '&page=' + page + '&size=10';
  // }
  //
  // getAttackDetailsById(id, endDate, startDate): string {
  //   return this.storageUrl + '/id?endDate=' + endDate + '&startDate=' + startDate + '&id=' + id;
  // }
  //
  // forgotPassword(): string {
  //   return this.baseUrl + '/uaa/forgot-password';
  // }
  //
  // changePassword(): string {
  //   return this.baseUrl + '/uaa/change-password';
  // }
  //
  // createUser(): string {
  //   return this.baseUrl + '/uaa/create-non-admin-user';
  // }
  //
  // updateUser(): string {
  //   return this.baseUrl + '/uaa/update-user-admin';
  // }
  //
  // userList(userListstatus, userIndex): string {
  //   if (userListstatus === 'all') {
  //     return this.baseUrl + '/uaa/get-all-user-of-organization?page=' + userIndex + '&item-per-page=10';
  //   } else {
  //     return this.baseUrl + '/uaa/get-all-user-of-organization?page=' + userIndex + '&item-per-page=10' +
  //       '&status=' + userListstatus;
  //   }
  // }
  //
  // userProfile(userid): string {
  //   return this.baseUrl + '/uaa/get-profile-with-id?user-id=' + userid;
  // }
  //
  // deleteUser(deleteUserID): string {
  //   return this.baseUrl + '/uaa/delete-user-by-id?delete-user-id=' + deleteUserID;
  // }
  //
  // connectSocket(): string {
  //   return this.socApiUrl;
  // }
  //
  // subscribeData(): string {
  //   return '/user/queue/enrichment';
  // }
  //
  // fetchData(): string {
  //   return '/register';
  // }
  //
  // disconnectSocket(): string {
  //   return '/un-register';
  // }
  //
  // getSubscriptionList(): string {
  //   return this.baseUrl + '/socket-service/subscribe/list';
  // }
  //
  // subscription(): string {
  //   return this.baseUrl + '/socket-service/subscribe';
  // }
  //
  // subscriptionById(id): string {
  //   return this.baseUrl + '/socket-service/subscribe?id=' + id;
  // }
  //
  // getPriorityList(): string {
  //   return this.baseUrl + '/socket-service/subscribe/priority';
  // }
  //
  // getLuresList(): string {
  //   return this.baseUrl + '/lures-service/lures/type';
  // }
  //
  // getAttackTypeList(): string {
  //   return this.baseUrl + '/socket-service/subscribe/attack-type';
  // }
  //
  // getProtocolList(id): string {
  //   return this.baseUrl + '/socket-service/subscribe/protocol?attackTypeId=' + id;
  // }
  //
  // getAttackPhaseList(): string {
  //   return this.baseUrl + '/socket-service/subscribe/phase';
  // }
  //
  // getAllPagedFeeds(pageNumber): string {
  //   return this.feedsUrl + '/feeds/allPaged?size=10&page=' + pageNumber;
  // }
  //
  // getIncidentsList(endDate, startDate): string {
  //   return this.storageUrl + '/incident-analysis?startDate=' + startDate + '&endDate=' + endDate;
  // }
  //
  // getRiskFactorList(riskFactor, pageNumber): string {
  //   return this.feedsUrl + '/feeds/feedsriskfactor?size=10&page=' + pageNumber + '&riskFactor=' + riskFactor;
  // }
  //
  // getFirstSeenList(firstSeenDate, pageNumber): string {
  //   return this.feedsUrl + '/feeds/feedsfirstSeen?size=10&page=' + pageNumber + '&firstSeen=' + firstSeenDate;
  // }
  //
  // getLastSeenList(lastSeenDate, pageNumber): string {
  //   return this.feedsUrl + '/feeds/feedslastSeen?size=10&page=' + pageNumber + '&lastSeen=' + lastSeenDate;
  // }
  //
  // getIpDetails(ip, boolScan, boolHistory): string {
  //   return this.storageUrl + '/ip-scanning?input=' + ip + '&type=IPv4&intenseScan=' + boolScan + '&history=' + boolHistory;
  // }
  //
  // getIncidentDetailsById(ip, endDate, startDate): string {
  //   return this.storageUrl + '/ip-attacks?startDate=' + startDate + '&endDate=' + endDate + '&ip=' + ip + '&size=5&page=0';
  // }
  //
  // getIncidentFeedsById(ip): string {
  //   if (ip) {
  //     return this.feedsUrl + '/feeds/search?indicator=' + ip;
  //   } else {
  //     return this.feedsUrl + '/feeds/download';
  //   }
  // }
  //
  // downloadStixById(ip): string {
  //   if (ip) {
  //     return this.feedsUrl + '/feeds/stix?indicator=' + ip;
  //   } else {
  //     return this.feedsUrl + '/feeds/download';
  //   }
  // }
  //
  // getIncidentById(id, endDate, startDate): string {
  //   return this.storageUrl + '/incident-analysis-by-id?id=' + id + '&startDate=' + startDate + '&endDate=' + endDate;
  // }
  //
  // getIncidentCounts(endDate, startDate): string {
  //   return this.storageUrl + '/incident-analysis-section?startDate=' + startDate + '&endDate=' + endDate;
  // }
  //
  // getSimilarAttacks(endDate, startDate, ip, id): string {
  //   return this.storageUrl + '/similar-attacks?startDate=' + startDate + '&endDate='
  //     + endDate + '&ip=' + ip + '&size=10&page=0&id=' + id;
  // }
  //
  // downloadIncidentById(id, endDate, startDate): string {
  //   return this.storageUrl + '/download-by-id?id=' + id + '&startDate=' + startDate + '&endDate=' + endDate;
  // }
  //
  // downloadRdp(): string {
  //   return this.lureUrl + '/download-msi';
  // }
  //
  // downloadBinary(md5New): string {
  //   return this.cuckooReportUrl + '/binaryfiles?md5=' + md5New;
  // }
  //
  // downloadMalwareReport(md5New): string {
  //   return this.cuckooReportUrl + '/tarreport?md5=' + md5New;
  // }
  //
  // downloadMalwareReportJson(md5New): string {
  //   return this.cuckooReportUrl + '/jsonreport?md5=' + md5New;
  // }
  //
  // deleteIncidentById(id): string {
  //   return this.storageUrl + '/delete-by-id?id=' + id;
  // }
  //
  // createLures(): string {
  //   return this.lureUrl + '/lures-by-type';
  // }
}
