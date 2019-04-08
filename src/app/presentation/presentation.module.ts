import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ElephantCardListComponent } from './elephant-card-list/elephant-card-list.component';
import { CoreModule } from '../core/core.module';
import { DataModule } from '../data/data.module';
import { GetAllPokemonsUsecase } from '../tutorial/usecases/get-all-pokemon.usecase';
import { FlexiblePokemonRepository } from '../tutorial/data/repository/flexible-pokemon.repository';
import { PokemonBuilder } from '../tutorial/usecases/pokemon.builder';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { RouterModule } from '@angular/router';
import { GetByIdPokemonUsecase } from '../tutorial/usecases/get-by-id-pokemon.usecase';
import { UpdatePokemonUsecase } from '../tutorial/usecases/update-pokemon.usecase';
import { InMemoryPokemonDatasource } from '../tutorial/data/datasource/in-memory-pokemon.datasource';
import { DatabasePokemonDatasource } from '../tutorial/data/datasource/database-pokemon.datasource';

const data = [
  new PokemonBuilder()
    .withId('1')
    .withName('Pikatchu')
    .build(),
  new PokemonBuilder()
    .withId('2')
    .withName('Buba')
    .build()
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    DataModule,
    ReactiveFormsModule,
    FormsModule,
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
      provide: InMemoryPokemonDatasource, useFactory: function () {
         return new InMemoryPokemonDatasource(data);
      }
    },
    {
      provide: DatabasePokemonDatasource, useFactory: function () {
         return new DatabasePokemonDatasource();
      }
    },
    {
      provide: GetAllPokemonsUsecase, useFactory: function (memoryDS, databaseDS) {
        return new GetAllPokemonsUsecase(
          new FlexiblePokemonRepository(memoryDS, databaseDS)
        );
      }, deps: [InMemoryPokemonDatasource, DatabasePokemonDatasource]
    },
    {
      provide: GetByIdPokemonUsecase, useFactory: function (memoryDS, databaseDS) {
        return new GetByIdPokemonUsecase(
          new FlexiblePokemonRepository(memoryDS, databaseDS)
        );
      }, deps: [InMemoryPokemonDatasource, DatabasePokemonDatasource]
    },
    {
      provide: UpdatePokemonUsecase, useFactory: function (memoryDS, databaseDS) {
        return new UpdatePokemonUsecase(
          new FlexiblePokemonRepository(memoryDS, databaseDS)
        );
      }, deps: [InMemoryPokemonDatasource, DatabasePokemonDatasource]
    }
  ]
})
export class PresentationModule { }


