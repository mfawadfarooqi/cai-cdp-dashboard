import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  private sortOrder = true; // true for ascending, false for descending

  constructor() { }
 
  private sortKey = '';

  sortTable(data: any[], key: string): any[] {
    this.sortKey = key;
    this.sortOrder = !this.sortOrder;
    return data.sort((a, b) => {
      if (a[key] < b[key]) {
        return this.sortOrder ? -1 : 1;
      } else if (a[key] > b[key]) {
        return this.sortOrder ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  getSortOrder(): boolean {
    return this.sortOrder;
  }

  getSortKey(): string {
    return this.sortKey;
  }
  // sortTable(data: any[], key: string): any[] {
  //   this.sortOrder = !this.sortOrder;
  //   return data.sort((a, b) => {
  //     if (a[key] < b[key]) {
  //       return this.sortOrder ? -1 : 1;
  //     } else if (a[key] > b[key]) {
  //       return this.sortOrder ? 1 : -1;
  //     } else {
  //       return 0;
  //     }
  //   });
  // }
}
