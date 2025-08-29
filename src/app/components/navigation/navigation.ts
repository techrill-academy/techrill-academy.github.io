import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class Navigation implements OnInit {
  private navigationService = inject(NavigationService);
  isMobileMenuOpen = signal(false);

  ngOnInit(): void {
    // Initialize navigation service tracking
    this.navigationService.getCurrentRoute();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  onNavigate(route: string): void {
    this.closeMobileMenu();
    this.navigationService.navigateWithLoading(route);
  }
}
