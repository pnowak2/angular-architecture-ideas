import { Observable, of } from 'rxjs';
import { Pokemon } from '../model/pokemon.model';

export interface PokemonDatasource {
  getAll(): Observable<Pokemon[]>;
  getById(id: string): Observable<Pokemon>;
  update(pokemon: Pokemon): Observable<Pokemon>;
}
