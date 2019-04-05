import { Observable, of } from 'rxjs';
import { Pokemon } from '../model/pokemon.model';

export interface PokemonRepository {
  getAll(): Observable<Pokemon[]>;
  getById(id: string): Observable<Pokemon>;
  update(pokemon: Pokemon): Observable<Pokemon>;
}
