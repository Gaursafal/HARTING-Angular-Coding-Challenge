import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  standalone: true,
  selector: 'app-common-card-detail',
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './common-card-detail.component.html',
  styleUrls: ['./common-card-detail.component.css']
})
export class CommonCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() info: { label: string, value: string }[] = [];
  @Input() loading: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {     
          const currentUrl = this.router.url;
          if (currentUrl.includes('character')) {
            this.navigateToEntity(`characters/${id}`);
          } else if (currentUrl.includes('house')) {
            this.navigateToEntity(`houses/${id}`);
          } else if (currentUrl.includes('book')) {
            this.navigateToEntity(`books/${id}`);
          } else {
            console.warn('No valid entity type found in URL.');
          }
        
      }
    });
  }

  isUrl(value: string): boolean {
    return value.startsWith('http');
  }

  navigateToEntity(url: string): void {
    if (!url) return;
    const matches = url.match(/\/(characters|houses|books)\/(\d+)$/);
    if (matches) {
      const [, type, id] = matches;
      this.router.navigate([`/${type.slice(0, -1)}`, id]);
    } else {
      console.warn('Unrecognized URL:', url);
    }
  }
}
