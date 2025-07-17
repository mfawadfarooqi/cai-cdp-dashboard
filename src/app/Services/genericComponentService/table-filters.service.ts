import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableFiltersService {
  private sourceFiltersSubject = new BehaviorSubject<string[]>([]);
  private categoryFiltersSubject = new BehaviorSubject<string[]>([]);
  private webMonitoringsourceFilterSubject = new BehaviorSubject<string[]>([]);

  private statusFiltersSubject = new BehaviorSubject<string[]>([]);
  private priorityFiltersSubject = new BehaviorSubject<string[]>([]);
  private assignToFiltersSubject = new BehaviorSubject<string[]>([]);
  private typeFiltersSubject = new BehaviorSubject<string[]>([]);

  sourceFilters$ = this.sourceFiltersSubject.asObservable();
  categoryFilters$ = this.categoryFiltersSubject.asObservable();
  webMonitoringFilters$ = this.webMonitoringsourceFilterSubject.asObservable() // web monitoring filter

  statusFilters$ = this.statusFiltersSubject
  priorityFilters$ = this.priorityFiltersSubject
  assignToFilters$ = this.assignToFiltersSubject
  typeFilters$ = this.typeFiltersSubject

  constructor() {
    this.initializeFilters();
  }


  setSourceFilters(sources: string[]) {
    sessionStorage.setItem('sourceFilters', JSON.stringify(sources));
    this.sourceFiltersSubject.next(sources);

  }

  // Set and broadcast category filters
  setCategoryFilters(categories: string[]) {
    sessionStorage.setItem('categoryFilters', JSON.stringify(categories));
    this.categoryFiltersSubject.next(categories);

  }

  // Retrieve filters from sessionStorage
  private initializeFilters() {
    const sourceFilters = this.getSourceFilters();
    const categoryFilters = this.getCategoryFilters();
    const webmonitoringFilter = this.getWebmonitoringFilter();

    const statusFilters = this.getStatusFilter()
    const priorityFilters = this.getPriorityFilter()
    const assignToFilters = this.getAssigntoFilters()
    const typeFilters = this.getTypeFilters()


    this.sourceFiltersSubject.next(sourceFilters);
    this.categoryFiltersSubject.next(categoryFilters);
    this.webMonitoringsourceFilterSubject.next(webmonitoringFilter);

    this.statusFiltersSubject.next(statusFilters)
    this.priorityFiltersSubject.next(priorityFilters);
    this.assignToFiltersSubject.next(assignToFilters);
    this.typeFiltersSubject.next(typeFilters)
  }

  // Get filters from sessionStorage
  getSourceFilters(): string[] {
    const filters = sessionStorage.getItem('sourceFilters');
    return filters ? JSON.parse(filters) : [];
  }

  getCategoryFilters(): string[] {
    const filters = sessionStorage.getItem('categoryFilters');
    return filters ? JSON.parse(filters) : [];
  }
  getStatusFilters(): string[] {
    const filters = sessionStorage.getItem('statusFilter');
    return filters ? JSON.parse(filters) : [];
  }

  ////////////////////////// web monitoring /////////////////////

  setWebmonitoringFilter(webMonitorFilter: string[]){
    sessionStorage.setItem('webMonitorFilter', JSON.stringify(webMonitorFilter));
    this.webMonitoringsourceFilterSubject.next(webMonitorFilter);
  }

  getWebmonitoringFilter() : string[]{
    const filters = sessionStorage.getItem('webMonitorFilter');
    return filters ? JSON.parse(filters) : [];
  }


  //////////////////// alert management //////////////////////////

  setStatusFilter(status: string[]){
    sessionStorage.setItem('statusFilter', JSON.stringify(status));
    this.statusFiltersSubject.next(status);
  }

  getStatusFilter(): string[]{
    const filters = sessionStorage.getItem('statusFilter');
    return filters ? JSON.parse(filters) : [];
  }


  setPriorityFilter(priority: string[]){
    sessionStorage.setItem('priorityFilter', JSON.stringify(priority));
    this.priorityFiltersSubject.next(priority);
  }

  getPriorityFilter(): string[]{
    const filters = sessionStorage.getItem('priorityFilter');
    return filters ? JSON.parse(filters) : [];
  }


  setAssigntoFilters(assignTo: string[]){
    sessionStorage.setItem('assignToFilter', JSON.stringify(assignTo));
    this.assignToFiltersSubject.next(assignTo);
  }

  getAssigntoFilters(): string[]{
    const filters = sessionStorage.getItem('assignToFilter');
    return filters ? JSON.parse(filters) : [];
  }

  setTypeFilters(type: string[]){
    sessionStorage.setItem('typeFilter', JSON.stringify(type));
    this.typeFiltersSubject.next(type);
  }

  getTypeFilters(): string[]{
    const filters = sessionStorage.getItem('typeFilter');
    return filters ? JSON.parse(filters) : [];
  }

}
