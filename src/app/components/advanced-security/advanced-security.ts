import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-advanced-security',
  imports: [CommonModule, RouterLink],
  templateUrl: './advanced-security.html',
  styleUrl: './advanced-security.scss'
})
export class AdvancedSecurity implements OnInit {
  securityModules: any[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.securityModules = [
      {
        id: 'secret-risk-assessment',
        title: 'Secret Risk Assessment',
        description: 'Evaluate and assess potential security risks from exposed secrets in your codebase.',
        icon: '🔍',
        videoUrl: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/CpiOAHxJb6w'),
        features: [
          'Comprehensive risk analysis',
          'Priority-based vulnerability scoring',
          'Impact assessment reports',
          'Remediation recommendations'
        ]
      },
      {
        id: 'secret-scanning',
        title: 'Secret Scanning',
        description: 'Automatically detect and prevent secrets from being committed to your repository.',
        icon: '🔐',
        videoUrl: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/5SjvrSMP3CM'),
        features: [
          'Real-time secret detection',
          'Custom pattern matching',
          'Historical repository scanning',
          'Integration with CI/CD pipelines'
        ]
      }
    ];
  }
}