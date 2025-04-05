import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HouseService } from '../../services/house.service';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  standalone: true,
  selector: 'app-house-detail',
  imports: [CommonModule, LoadingComponent],
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {
  house: any;
  basicInfo: { label: string; value: string }[] = [];
  extraInfo: { label: string; value: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private houseService: HouseService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.houseService.getHouseById(id).subscribe(data => {
        this.house = data;
        console.log('House details loaded:', data);
        this.prepareHouseDetails();
      });
    }
  }

  prepareHouseDetails(): void {
    if (!this.house) return;

    this.basicInfo = [
      { label: 'Region', value: this.house.region || 'Unknown' },
      { label: 'Coat of Arms', value: this.house.coatOfArms || 'Not described' },
      { label: 'Words', value: this.house.words || 'None' },
      { label: 'Titles', value: `${this.house.titles?.length || 'None'}` },
      { label: 'Seats', value: `${this.house.seats?.length || 0} Seat` },
      { label: 'Ancestral Weapons', value: `${this.house.ancestralWeapons?.length || 'None'}`},
      { label: 'Founded', value: this.house.founded || 'Unknown' },
      { label: 'Died Out', value: this.house.diedOut || 'Still active' },
      { label: 'Cadet Branches', value: `${this.house.cadetBranches?.length || 0} branches` },
      { label: 'Sworn Members', value: `${this.house.swornMembers?.length || 0} sworn members`},
      { label: 'Current Lord', value: this.house.currentLord || 'Unknown' },
      { label: 'Heir', value: this.house.heir || 'Unknown' },
      { label: 'Overlord', value: this.house.overlord || 'Unknown' },
    ];
  }
}
