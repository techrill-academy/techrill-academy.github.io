import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { CurriculumItem, Module } from '../models/curriculum.model';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {
  private curriculumData: CurriculumItem[] = [];
  private dataSubject = new BehaviorSubject<CurriculumItem[]>([]);
  private dataLoaded = false;

  constructor(private http: HttpClient) {
    this.loadCurriculumData();
  }

  private loadCurriculumData(): void {
    this.http.get<CurriculumItem[]>('/assets/data/curriculum-data.json')
      .pipe(
        catchError(error => {
          console.error('Error loading curriculum data:', error);
          return of([]);
        })
      )
      .subscribe(data => {
        this.curriculumData = data;
        this.dataSubject.next(data);
        this.dataLoaded = true;
      });
  }

  getAllItems(): Observable<CurriculumItem[]> {
    return this.dataSubject.asObservable();
  }

  getModules(): Observable<Module[]> {
    const modules = this.groupByModule();
    return new BehaviorSubject(modules).asObservable();
  }

  getModuleById(moduleId: string): Observable<Module | undefined> {
    const modules = this.groupByModule();
    const module = modules.find(m => m.id === moduleId);
    return new BehaviorSubject(module).asObservable();
  }

  private groupByModule(): Module[] {
    const moduleMap = new Map<string, Module>();
    
    this.curriculumData.forEach(item => {
      const moduleId = item.module.split('.')[0].trim();
      const moduleName = item.module;
      
      if (!moduleMap.has(moduleId)) {
        moduleMap.set(moduleId, {
          id: moduleId,
          name: moduleName,
          description: item.moduleDescription || '',
          topics: []
        });
      }
      
      const module = moduleMap.get(moduleId)!;
      let topic = module.topics.find(t => t.name === item.topic);
      
      if (!topic) {
        topic = {
          id: `${moduleId}-${item.topic.toLowerCase().replace(/\s+/g, '-')}`,
          moduleId: moduleId,
          name: item.topic,
          subtopics: []
        };
        module.topics.push(topic);
      }
      
      topic.subtopics.push(item);
    });
    
    return Array.from(moduleMap.values());
  }
}