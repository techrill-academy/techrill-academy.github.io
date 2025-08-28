import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CurriculumService } from '../../services/curriculum.service';
import { CurriculumItem, Module } from '../../models/curriculum.model';

@Component({
  selector: 'app-curriculum-explorer',
  imports: [CommonModule],
  templateUrl: './curriculum-explorer.html',
  styleUrl: './curriculum-explorer.scss'
})
export class CurriculumExplorer implements OnInit {
  private curriculumService = inject(CurriculumService);
  private router = inject(Router);

  allItems: CurriculumItem[] = [];
  filteredItems: CurriculumItem[] = [];
  modules: string[] = [];
  activeFilter: string = 'All';

  ngOnInit() {
    this.curriculumService.getAllItems().subscribe(items => {
      this.allItems = items;
      this.filteredItems = items;
      this.modules = ['All', ...new Set(items.map(item => item.module))];
    });
  }

  filterByModule(module: string) {
    this.activeFilter = module;
    if (module === 'All') {
      this.filteredItems = this.allItems;
    } else {
      this.filteredItems = this.allItems.filter(item => item.module === module);
    }
  }

  getModuleShortName(module: string): string {
    return module.split('. ')[1] || 'All Modules';
  }

  onCardClick(item: CurriculumItem) {
    // Navigate to module page with the module ID
    const moduleId = item.module.split('.')[0].trim();
    this.router.navigate(['/module', moduleId]);
  }

  getVideoIcon(hasVideo: boolean): string {
    return hasVideo ? '✅' : '🕒';
  }

  getVideoIconTitle(hasVideo: boolean): string {
    return hasVideo ? 'Video Available' : 'Video Coming Soon';
  }
}
