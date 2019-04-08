import { GetAllPokemonsUsecase } from './get-all-pokemon.usecase';
import { PokemonRepository } from '../domain/repository/pokemon.repository';
import { FlexiblePokemonRepository } from '../data/repository/flexible-pokemon.repository';
import { Pokemon } from '../domain/model/pokemon.model';
import { StubPokemonBuilder } from '../test/stub-pokemon.builder';
import { InMemoryPokemonDatasource } from '../data/datasource/in-memory-pokemon.datasource';


describe('GetAllPokemonsUsecase Usecase', () => {
  let pickachu: Pokemon;

  beforeEach(() => {
    pickachu = new StubPokemonBuilder()
      .withName('pikatchu')
      .build();
  });

  it('should provide no results if repo has no items', (done) => {
    const usecase: GetAllPokemonsUsecase = createPokemonUsecase([]);

    usecase.execute().subscribe(pokemons => {
      verifyListOfPokemons(pokemons, []);
      done();
    });
  });

  it('should provide one item from repo having one item', (done) => {
    const usecase: GetAllPokemonsUsecase = createPokemonUsecase([pickachu]);

    usecase.execute().subscribe(pokemons => {
      verifyListOfPokemons(pokemons, [pickachu]);
      done();
    });
  });

  it('should provide two items from repo two items', (done) => {
    const salameche = new StubPokemonBuilder()
      .withId('2')
      .withName('salameche')
      .build();
    const usecase: GetAllPokemonsUsecase = createPokemonUsecase([pickachu, salameche]);

    usecase.execute().subscribe(pokemons => {
      verifyListOfPokemons(pokemons, [pickachu, salameche]);
      done();
    });
  });

  function createPokemonUsecase(items: Pokemon[]) {
    const datasource1 = new InMemoryPokemonDatasource(items);
    const datasource2 = new InMemoryPokemonDatasource(items);
    const repository: PokemonRepository = new FlexiblePokemonRepository(datasource1, datasource2);
    return new GetAllPokemonsUsecase(repository);
  }

  function verifyListOfPokemons(items: Pokemon[], expectedItems: Pokemon[]) {
    expect(items).toEqual(expectedItems);
  }
});



