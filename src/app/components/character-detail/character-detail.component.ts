import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonCardComponent } from '../common-card/common-card-detail.component';
import { CharacterService } from '../../services/house.service';

@Component({
  standalone: true,
  selector: 'app-character-detail',
  imports: [CommonModule, RouterModule, CommonCardComponent],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character: any;
  characterInfo: { label: string, value: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.characterService.getCharacterById(id).subscribe(data => {
          this.character = data;
          console.log('Character details loaded:', data);
          this.prepareCharacterInfo();
        });
      }
    });
  }

  prepareCharacterInfo(): void {
    if (!this.character) return;

    this.characterInfo = [
      { label: 'Gender', value: this.character.gender || 'Unknown' },
      { label: 'Culture', value: this.character.culture || 'Unknown' },
      { label: 'Born', value: this.character.born || 'Unknown' },
      { label: 'Died', value: this.character.died || 'Alive' },
      { label: 'Titles', value: this.character.titles?.filter((t: any) => t)?.join(', ') || 'None' },
      { label: 'Aliases', value: this.character.aliases?.filter((a: any) => a)?.join(', ') || 'None' },
      { label: 'Father', value: this.character.father || 'Unknown' },
      { label: 'Mother', value: this.character.mother || 'Unknown' },
      { label: 'Spouse', value: this.character.spouse || 'Unknown' },
      { label: 'Allegiances', value: `${this.character.allegiances.length}` || 'None' },
      { label: 'Books', value: `${this.character.books.length}` || 'None' },
      { label: 'PovBooks', value: `${this.character.povBooks.length}` || 'None' },
      { label: 'TV Series', value: `${this.character.tvSeries.length} Seasons` || 'None' },
      { label: 'Played By', value: this.character.playedBy?.filter((p: any) => p)?.join(', ') || 'Unknown' }
    ];
  }
}
