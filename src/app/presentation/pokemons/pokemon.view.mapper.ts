import { PokemonViewModel } from './pokemon.viewmodel';
import { Pokemon } from 'src/app/tutorial/domain/model/pokemon.model';
import { Mapper } from 'src/app/core/base/mapper';

export class PokemonViewMapper extends Mapper<PokemonViewModel, Pokemon> {
  mapFrom(param: PokemonViewModel): Pokemon {
    return {
      id: param.name,
      name: param.name,
      description: '',
      weight: 0,
      height: 0,
      avatar: ''
    } as Pokemon;
  }

  mapTo(param: Pokemon): PokemonViewModel {
    return {
      id: param.id,
      name: `${param.id} - ${param.name}`
    };
  }
}
