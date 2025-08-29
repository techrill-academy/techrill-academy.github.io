import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { CurriculumItem, Module } from '../models/curriculum.model';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {
  private modules: Module[] = [];
  private allItems: CurriculumItem[] = [];
  private dataSubject = new BehaviorSubject<CurriculumItem[]>([]);
  private modulesSubject = new BehaviorSubject<Module[]>([]);
  private dataLoaded = false;

  constructor(private http: HttpClient) {
    this.loadCurriculumData();
  }

  private loadCurriculumData(): void {
    this.http.get<Module[]>('/assets/data/curriculum-data.json')
      .pipe(
        catchError(error => {
          console.error('Error loading curriculum data:', error);
          return of([]);
        })
      )
      .subscribe(modules => {
        this.modules = modules;
        this.modulesSubject.next(modules);
        
        // Flatten the modules into a list of items for backwards compatibility
        this.allItems = this.flattenModulesToItems(modules);
        this.dataSubject.next(this.allItems);
        this.dataLoaded = true;
      });
  }

  private flattenModulesToItems(modules: Module[]): CurriculumItem[] {
    const items: CurriculumItem[] = [];
    modules.forEach(module => {
      module.topics.forEach(topic => {
        items.push(...topic.subtopics);
      });
    });
    return items;
  }

  getAllItems(): Observable<CurriculumItem[]> {
    return this.dataSubject.asObservable();
  }

  getModules(): Observable<Module[]> {
    return this.modulesSubject.asObservable();
  }

  getModuleById(moduleId: string): Observable<Module | undefined> {
    const module = this.modules.find(m => m.id === moduleId);
    return new BehaviorSubject(module).asObservable();
  }
}