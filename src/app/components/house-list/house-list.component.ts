import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HouseService } from '../../services/house.service';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  standalone: true,
  selector: 'app-house-list',
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit {
  houses: any[] = [];
  loading: boolean = true;

  constructor(private houseService: HouseService, private router: Router) {}

  ngOnInit(): void {
    this.houseService.getAllHouses().subscribe({
      next: (data) => {
        this.houses = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch houses:', err);
        this.loading = false;
      }
    });
  }

  goToDetail(url: string): void {
    const id = url.split('/').pop();
    this.router.navigate(['/house', id]);
  }
}
