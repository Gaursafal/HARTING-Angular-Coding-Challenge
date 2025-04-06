import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HouseService } from '../../services/house.service';
import { CommonCardComponent } from '../common-card/common-card-detail.component';

@Component({
  standalone: true,
  selector: 'app-house-detail',
  imports: [CommonModule, RouterModule, CommonCardComponent],
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {
  house: any;
  basicInfo: { label: string; value: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private houseService: HouseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.houseService.getHouseById(id).subscribe(data => {
          this.house = data;
          console.log('House details loaded:', data);
          this.prepareHouseDetails();
        });
      }
    });
  }

  prepareHouseDetails(): void {
    if (!this.house) return;

    this.basicInfo = [
      { label: 'Titles', value: this.house.titles?.filter((title: any) => title)?.join(', ') || 'None' },
      { label: 'Region', value: this.house.region || 'Unknown' },
      { label: 'Words', value: this.house.words || 'None' },
      { label: 'Coat of Arms', value: this.house.coatOfArms || 'Not described' },
      { label: 'Seats', value: this.house.seats?.filter((seat: any) => seat)?.join(', ') || '0 Seats' },
      { label: 'Ancestral Weapons', value: `${this.house.ancestralWeapons?.length || 'None'}`},
      { label: 'Founded', value: this.house.founded || 'Unknown' },
      { label: 'Founder', value: this.house.founder || 'Unknown' },
      { label: 'Died Out', value: this.house.diedOut || 'Still active' },
      { label: 'Cadet Branches', value: `${this.house.cadetBranches?.length || 0} branches` },
      { label: 'Sworn Members', value: `${this.house.swornMembers?.length || 0} sworn members`},
      { label: 'Current Lord', value: this.house.currentLord || 'Unknown' },
      { label: 'Heir', value: this.house.heir || 'Unknown' },
      { label: 'Over Lord', value: this.house.overlord || 'Unknown' },
    ];
  }
}
