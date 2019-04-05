import { PokemonRepository } from '../../domain/repository/pokemon.repository';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Pokemon } from '../../domain/model/pokemon.model';
import { map } from 'rxjs/operators';

export class InMemoryPokemonRepository implements PokemonRepository {
  private items$: Subject<Pokemon[]> = new BehaviorSubject(this.items);

  constructor(private items: Pokemon[]) { }

  getAll(): Observable<Pokemon[]> {
    return this.items$;
  }

  getById(id: string): Observable<Pokemon> {
    return this.items$.pipe(
      map(items => items.filter(item => item.id === id)[0])
    );
  }
}
