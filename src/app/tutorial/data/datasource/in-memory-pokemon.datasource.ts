import { PokemonDatasource } from '../../domain/datasource/pokemon.datasource';
import { Pokemon } from '../../domain/model/pokemon.model';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { PokemonBuilder } from '../../usecases/pokemon.builder';
import { map } from 'rxjs/operators';

export class InMemoryPokemonDatasource implements PokemonDatasource {
  private items$: Subject<Pokemon[]> = new BehaviorSubject(this.items);

  constructor(private items: Pokemon[]) { }

  getAll(): Observable<Pokemon[]> {
    return this.items$;
    // return new Observable((observable) => {
    //   observable.complete();
    // });
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
