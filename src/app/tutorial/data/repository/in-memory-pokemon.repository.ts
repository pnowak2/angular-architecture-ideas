import { PokemonRepository } from '../../domain/repository/pokemon.repository';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { Pokemon } from '../../domain/model/pokemon.model';
import { map } from 'rxjs/operators';
import { PokemonBuilder } from '../../usecases/pokemon.builder';

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

  update(pokemon: Pokemon): Observable<Pokemon> {
    const idx = this.items.findIndex(it => it.id === pokemon.id);
    const found = this.items[idx];
    const pok = new PokemonBuilder().withId(found.id).withName(pokemon.name).build();
    this.items.splice(idx, 1, pok);
    return of(pok);
  }
}
