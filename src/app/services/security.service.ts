import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { SecurityModule } from '../models/security.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private securityModulesData: SecurityModule[] = [];
  private dataSubject = new BehaviorSubject<SecurityModule[]>([]);
  private dataLoaded = false;

  constructor(private http: HttpClient) {
    this.loadSecurityModulesData();
  }

  private loadSecurityModulesData(): void {
    this.http.get<SecurityModule[]>('/assets/data/security-modules.json')
      .pipe(
        catchError(error => {
          console.error('Error loading security modules data:', error);
          return of([]);
        })
      )
      .subscribe(data => {
        this.securityModulesData = data;
        this.dataSubject.next(data);
        this.dataLoaded = true;
      });
  }

  getAllSecurityModules(): Observable<SecurityModule[]> {
    return this.dataSubject.asObservable();
  }

  getSecurityModuleById(id: string): Observable<SecurityModule | undefined> {
    const module = this.securityModulesData.find(m => m.id === id);
    return new BehaviorSubject(module).asObservable();
  }

  addSecurityModule(module: SecurityModule): void {
    this.securityModulesData.push(module);
    this.dataSubject.next([...this.securityModulesData]);
  }

  updateSecurityModule(id: string, updatedModule: Partial<SecurityModule>): void {
    const index = this.securityModulesData.findIndex(m => m.id === id);
    if (index !== -1) {
      this.securityModulesData[index] = { ...this.securityModulesData[index], ...updatedModule };
      this.dataSubject.next([...this.securityModulesData]);
    }
  }

  removeSecurityModule(id: string): void {
    this.securityModulesData = this.securityModulesData.filter(m => m.id !== id);
    this.dataSubject.next([...this.securityModulesData]);
  }
}
