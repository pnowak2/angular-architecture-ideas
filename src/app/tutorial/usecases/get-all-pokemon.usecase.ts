import { Observable, of } from 'rxjs';
import { PokemonRepository } from '../domain/repository/pokemon.repository';
import { Pokemon } from '../domain/model/pokemon.model';


export class GetAllPokemonsUsecase {
  constructor(private repository: PokemonRepository) { }

  execute(): Observable<Pokemon[]> {
    return this.repository.getAll();
  }
}
