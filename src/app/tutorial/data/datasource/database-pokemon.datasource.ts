import { PokemonDatasource } from '../../domain/datasource/pokemon.datasource';
import { Pokemon } from '../../domain/model/pokemon.model';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { PokemonBuilder } from '../../usecases/pokemon.builder';
import { map } from 'rxjs/operators';

const data = [
  new PokemonBuilder()
    .withId('1')
    .withName('Pikatchu db')
    .build(),
  new PokemonBuilder()
    .withId('2')
    .withName('Buba db')
    .build()
];

export class DatabasePokemonDatasource implements PokemonDatasource {
  private items$: Subject<Pokemon[]> = new BehaviorSubject(data);

  constructor() { }

  getAll(): Observable<Pokemon[]> {
    return this.items$;
  }

  getById(id: string): Observable<Pokemon> {
    return this.items$.pipe(
      map(items => items.filter(item => item.id === id)[0])
    );
  }

  update(pokemon: Pokemon): Observable<Pokemon> {
    const idx = data.findIndex(it => it.id === pokemon.id);
    const found = data[idx];
    const pok = new PokemonBuilder().withId(found.id).withName(pokemon.name).build();
    data.splice(idx, 1, pok);
    return of(pok);
  }
}
