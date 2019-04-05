import { Observable, of } from 'rxjs';
import { PokemonRepository } from '../domain/repository/pokemon.repository';
import { Pokemon } from '../domain/model/pokemon.model';

export class UpdatePokemonUsecase {
  constructor(private repository: PokemonRepository) { }

  execute(pokemon: Pokemon): Observable<Pokemon> {
    return this.repository.update(pokemon);
  }
}
