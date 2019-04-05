import { Component, OnInit } from '@angular/core';
import { GetByIdPokemonUsecase } from 'src/app/tutorial/usecases/get-by-id-pokemon.usecase';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/tutorial/domain/model/pokemon.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  pokemon$: Observable<Pokemon>;

  constructor(
    private route: ActivatedRoute,
    private useCase: GetByIdPokemonUsecase
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.pokemon$ = this.useCase.execute(id);
  }

}
