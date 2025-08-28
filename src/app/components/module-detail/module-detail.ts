import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CurriculumService } from '../../services/curriculum.service';
import { Module, CurriculumItem } from '../../models/curriculum.model';

@Component({
  selector: 'app-module-detail',
  imports: [CommonModule],
  templateUrl: './module-detail.html',
  styleUrl: './module-detail.scss'
})
export class ModuleDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private curriculumService = inject(CurriculumService);
  private sanitizer = inject(DomSanitizer);

  module: Module | null = null;
  loading = true;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const moduleId = params['id'];
      this.loadModule(moduleId);
    });
  }

  loadModule(moduleId: string) {
    this.loading = true;
    this.curriculumService.getModuleById(moduleId).subscribe(module => {
      this.module = module || null;
      this.loading = false;
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

  goBack() {
    this.router.navigate(['/explorer']);
  }

  getVideoIcon(hasVideo: boolean): string {
    return hasVideo ? '✅' : '🕒';
  }

  getVideoIconTitle(hasVideo: boolean): string {
    return hasVideo ? 'Video Available' : 'Video Coming Soon';
  }
}
