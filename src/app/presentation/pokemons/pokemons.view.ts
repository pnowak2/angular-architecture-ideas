import { Observable } from 'rxjs';
import { PokemonViewModel } from './pokemon.viewmodel';

export interface PokemonsView {
  setItems(items: Observable<PokemonViewModel[]>);
}
