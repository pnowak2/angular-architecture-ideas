import { Component, OnInit } from '@angular/core';
import { GetAllPokemonsUsecase } from 'src/app/tutorial/usecases/get-all-pokemon.usecase';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/tutorial/domain/model/pokemon.model';
import { PokemonsView } from './pokemons.view';
import { PokemonViewModel } from './pokemon.viewmodel';
import { PokemonsPresenter } from './pokemons.presenter';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements PokemonsView, OnInit {
  pokemons$: Observable<PokemonViewModel[]>;
  presenter: PokemonsPresenter;

  constructor(private useCase: GetAllPokemonsUsecase) {
    this.presenter = new PokemonsPresenter(this, this.useCase);
  }

  ngOnInit() {
    this.presenter.init();
  }

  setItems(items: Observable<PokemonViewModel[]>) {
    this.pokemons$ = items;
  }

  onRefresh() {
    this.presenter.refresh();
  }
}
