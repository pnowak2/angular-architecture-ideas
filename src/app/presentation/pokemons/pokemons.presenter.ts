import { Observable } from 'rxjs';
import { PokemonViewModel } from './pokemon.viewmodel';
import { PokemonsView } from './pokemons.view';
import { GetAllPokemonsUsecase } from 'src/app/tutorial/usecases/get-all-pokemon.usecase';
import { map } from 'rxjs/operators';
import { PokemonViewMapper } from './pokemon.view.mapper';

export class PokemonsPresenter {
  constructor(
    private view: PokemonsView,
    private useCase: GetAllPokemonsUsecase) { }

  init() {
    const items$: Observable<PokemonViewModel[]> = this.useCase.execute().pipe(
      map(domain => domain.map((it) => new PokemonViewMapper().mapTo(it)))
    );

    this.view.setItems(items$);
  }
}
