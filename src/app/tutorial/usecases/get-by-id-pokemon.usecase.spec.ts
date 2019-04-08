import { GetAllPokemonsUsecase } from './get-all-pokemon.usecase';
import { PokemonRepository } from '../domain/repository/pokemon.repository';
import { FlexiblePokemonRepository } from '../data/repository/flexible-pokemon.repository';
import { Pokemon } from '../domain/model/pokemon.model';
import { GetByIdPokemonUsecase } from './get-by-id-pokemon.usecase';
import { StubPokemonBuilder } from '../test/stub-pokemon.builder';
import { InMemoryPokemonDatasource } from '../data/datasource/in-memory-pokemon.datasource';


describe('GetByIdPokemonUsecase', () => {
  let pickachu: Pokemon;

  beforeEach(() => {
    pickachu = new StubPokemonBuilder()
      .withName('pikatchu')
      .build();
  });

  it('should provide item by id', (done) => {
    const usecase: GetByIdPokemonUsecase = createPokemonUsecase([pickachu]);
    usecase.execute('1').subscribe(item => {
      verifyOnePokemon(item, pickachu);
      done();
    });

  });

  function createPokemonUsecase(items: Pokemon[]) {
    const datasource1 = new InMemoryPokemonDatasource(items);
    const datasource2 = new InMemoryPokemonDatasource(items);
    const repository: PokemonRepository = new FlexiblePokemonRepository(datasource1, datasource2);
    return new GetByIdPokemonUsecase(repository);
  }

  function verifyOnePokemon(item: Pokemon, expectedItem: Pokemon) {
    expect(item.id).toEqual(expectedItem.id);
    expect(item.name).toEqual(expectedItem.name);
    expect(item.description).toEqual(expectedItem.description);
    expect(item.weight).toEqual(expectedItem.weight);
    expect(item.height).toEqual(expectedItem.height);
    expect(item.avatar).toEqual(expectedItem.avatar);
  }
});



