import { PokemonRepository } from '../../domain/repository/pokemon.repository';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { Pokemon } from '../../domain/model/pokemon.model';
import { InMemoryPokemonDatasource } from '../datasource/in-memory-pokemon.datasource';
import { concat } from 'rxjs';
import { take } from 'rxjs/operators';
import { DatabasePokemonDatasource } from '../datasource/database-pokemon.datasource';
import { PokemonDatasource } from '../../domain/datasource/pokemon.datasource';

export class FlexiblePokemonRepository implements PokemonRepository {

  constructor(
    private memoryDatasource: PokemonDatasource,
    private databaseDatasource: PokemonDatasource,
    ) { }

  getAll(): Observable<Pokemon[]> {
    return concat(
      this.memory(),
      this.localStorage(),
      this.database()
    ).pipe(take(1));
  }

  private memory(): Observable<Pokemon[]> {
    return this.memoryDatasource.getAll();
  }

  private localStorage(): Observable<Pokemon[]> {
    return this.memoryDatasource.getAll();
  }

  private database(): Observable<Pokemon[]> {
    return this.databaseDatasource.getAll();
  }

  getById(id: string): Observable<Pokemon> {
    return this.memoryDatasource.getById(id);
  }

  update(pokemon: Pokemon): Observable<Pokemon> {
    return this.memoryDatasource.update(pokemon);
  }
}


