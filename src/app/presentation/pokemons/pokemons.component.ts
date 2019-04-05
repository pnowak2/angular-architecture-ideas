import { Component, OnInit } from '@angular/core';
import { GetAllPokemonsUsecase } from 'src/app/tutorial/usecases/get-all-pokemon.usecase';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/tutorial/domain/model/pokemon.model';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit {
  pokemons$: Observable<Pokemon[]>;

  constructor(private useCase: GetAllPokemonsUsecase) { }

  ngOnInit() {
    this.pokemons$ = this.useCase.execute();
  }

}
