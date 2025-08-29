import { Injectable, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private currentRoute = signal<string>('');

  constructor(private router: Router) {
    // Track route changes for enhanced navigation experience
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute.set(event.url);
        this.handleRouteChange(event.url);
      });
  }

  getCurrentRoute() {
    return this.currentRoute();
  }

  private handleRouteChange(url: string): void {
    // Smooth scroll to top on route change
    this.scrollToTop();
    
    // Update document title based on route
    this.updateDocumentTitle(url);
  }

  private scrollToTop(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  private updateDocumentTitle(url: string): void {
    const baseTitle = 'TechRill Academy';
    let pageTitle = baseTitle;

    switch (url) {
      case '/landing':
        pageTitle = `${baseTitle} - Empowering Tech Education`;
        break;
      case '/copilot':
        pageTitle = `${baseTitle} - GitHub Copilot Training`;
        break;
      case '/advanced-security':
        pageTitle = `${baseTitle} - Advanced Security Training`;
        break;
      default:
        pageTitle = baseTitle;
    }

    document.title = pageTitle;
  }

  // Method to handle smooth navigation with loading states
  navigateWithLoading(route: string): void {
    // Add any loading logic here if needed
    this.router.navigate([route]);
  }
}
