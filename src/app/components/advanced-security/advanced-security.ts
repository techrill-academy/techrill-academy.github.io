import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SecurityService } from '../../services/security.service';
import { SecurityModule } from '../../models/security.model';

@Component({
  selector: 'app-advanced-security',
  imports: [CommonModule, RouterLink],
  templateUrl: './advanced-security.html',
  styleUrl: './advanced-security.scss'
})
export class AdvancedSecurity implements OnInit {
  securityModules: SecurityModule[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private securityService: SecurityService
  ) {}

  ngOnInit() {
    this.securityService.getAllSecurityModules().subscribe(modules => {
      this.securityModules = modules;
    });
  }

  getEmbedUrl(videoUrl: string): SafeResourceUrl {
    // Convert YouTube URLs to embed URLs
    let embedUrl = videoUrl;
    
    if (videoUrl.includes('youtube.com/shorts/')) {
      const videoId = videoUrl.split('/shorts/')[1];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes('youtube.com/watch?v=')) {
      const videoId = videoUrl.split('watch?v=')[1].split('&')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes('youtu.be/')) {
      const videoId = videoUrl.split('youtu.be/')[1];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}