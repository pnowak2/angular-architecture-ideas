import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElephantCardListComponent } from './elephant-card-list/elephant-card-list.component';
import { CoreModule } from '../core/core.module';
import { DataModule } from '../data/data.module';
import { GetAllPokemonsUsecase } from '../tutorial/usecases/get-all-pokemon.usecase';
import { InMemoryPokemonRepository } from '../tutorial/data/repository/in-memory-pokemon.repository';
import { PokemonBuilder } from '../tutorial/usecases/pokemon.builder';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { RouterModule } from '@angular/router';
import { GetByIdPokemonUsecase } from '../tutorial/usecases/get-by-id-pokemon.usecase';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    DataModule,
    RouterModule
  ],
  declarations: [
    ElephantCardListComponent,
    PokemonsComponent,
    PokemonComponent
  ],
  exports: [
    ElephantCardListComponent,
    PokemonsComponent,
    PokemonComponent
  ],
  providers: [
    {
      provide: GetAllPokemonsUsecase, useFactory: function () {
        return new GetAllPokemonsUsecase(
          new InMemoryPokemonRepository(data())
        );
      }
    },
    {
      provide: GetByIdPokemonUsecase, useFactory: function () {
        return new GetByIdPokemonUsecase(
          new InMemoryPokemonRepository(data())
        );
      }
    }
  ]
})
export class PresentationModule { }

function data() {
  return [
    new PokemonBuilder()
      .withId('1')
      .withName('Pikatchu')
      .build(),
    new PokemonBuilder()
      .withId('2')
      .withName('Buba')
      .build()
  ]
}