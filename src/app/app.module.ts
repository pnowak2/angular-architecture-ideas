import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DataModule } from './data/data.module';
import { CoreModule } from './core/core.module';
import { ElephantRepository } from './core/repositories/elephant.repository';
import { PresentationModule } from './presentation/presentation.module';
import { ElephantMockRepository } from './data/repository/elephant-mock-repository/elephant-mock.repository';
import { PokemonsComponent } from './presentation/pokemons/pokemons.component';
import { PokemonComponent } from './presentation/pokemon/pokemon.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DataModule,
    CoreModule,
    PresentationModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/pokemons',  pathMatch: 'full'  },
      { path: 'pokemons', component: PokemonsComponent },
      { path: 'pokemons/:id', component: PokemonComponent }
    ])
  ],
  providers: [
    { provide: ElephantRepository, useClass: ElephantMockRepository }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
