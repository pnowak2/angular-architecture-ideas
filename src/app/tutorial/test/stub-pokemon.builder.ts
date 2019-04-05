import { PokemonBuilder } from '../usecases/pokemon.builder';

export class StubPokemonBuilder extends PokemonBuilder {
  protected _id = '1';
  protected _name = 'pickachu';
  protected _description = 'Lorem ipsum';
  protected _weight = 0.6;
  protected _height = 1;
  protected _avatar = 'avatar';

}
