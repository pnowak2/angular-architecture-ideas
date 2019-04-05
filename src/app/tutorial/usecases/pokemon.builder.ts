import { Pokemon } from '../domain/model/pokemon.model';

export class PokemonBuilder {
  protected _id: string;
  protected _name: string;
  protected _description: string;
  protected _weight: number;
  protected _height: number;
  protected _avatar: string;

  public withName(value: string): PokemonBuilder {
    this._name = value;
    return this;
  }

  public withId(value: string): PokemonBuilder {
    this._id = value;
    return this;
  }

  public withDescription(value: string): PokemonBuilder {
    this._description = value;
    return this;
  }

  public withWeight(value: number): PokemonBuilder {
    this._weight = value;
    return this;
  }

  public withHeight(value: number): PokemonBuilder {
    this._height = value;
    return this;
  }

  public withAvatar(value: string): PokemonBuilder {
    this._avatar = value;
    return this;
  }

  build(): Pokemon {
    return new Pokemon(
      this._id,
      this._name,
      this._description,
      this._weight,
      this._height,
      this._avatar
    );
  }
}
