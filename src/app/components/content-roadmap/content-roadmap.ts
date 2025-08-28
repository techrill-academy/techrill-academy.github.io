import { Component, OnInit, inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurriculumService } from '../../services/curriculum.service';
import { CurriculumItem } from '../../models/curriculum.model';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-content-roadmap',
  imports: [CommonModule],
  templateUrl: './content-roadmap.html',
  styleUrl: './content-roadmap.scss'
})
export class ContentRoadmap implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  private curriculumService = inject(CurriculumService);
  private chart: Chart | null = null;

  allItems: CurriculumItem[] = [];
  mappedCount = 0;
  futureCount = 0;

  ngOnInit() {
    this.curriculumService.getAllItems().subscribe(items => {
      this.allItems = items;
      this.mappedCount = items.filter(item => item.video).length;
      this.futureCount = items.length - this.mappedCount;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createChart();
    }, 100);
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart() {
    if (!this.chartCanvas) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Videos Mapped', 'Future Videos'],
        datasets: [{
          data: [this.mappedCount, this.futureCount],
          backgroundColor: ['#48BB78', '#F6E05E'],
          borderColor: ['#FDFBF8', '#FDFBF8'],
          borderWidth: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              font: {
                size: 14,
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
                const percentage = ((context.raw as number / total) * 100).toFixed(1);
                return `${label}: ${context.raw} topics (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }

  getModuleShortName(module: string): string {
    return module.split('. ')[1] || module;
  }
}
