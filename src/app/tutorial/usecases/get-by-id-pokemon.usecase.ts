import { Observable, of } from 'rxjs';
import { PokemonRepository } from '../domain/repository/pokemon.repository';
import { Pokemon } from '../domain/model/pokemon.model';


export class GetByIdPokemonUsecase {
  constructor(private repository: PokemonRepository) { }

  execute(id: string): Observable<Pokemon> {
    return this.repository.getById(id);
  }
}
