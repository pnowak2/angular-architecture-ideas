import { Component, OnInit } from '@angular/core';
import { GetByIdPokemonUsecase } from 'src/app/tutorial/usecases/get-by-id-pokemon.usecase';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/tutorial/domain/model/pokemon.model';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, filter, map } from 'rxjs/operators';
import { UpdatePokemonUsecase } from 'src/app/tutorial/usecases/update-pokemon.usecase';
import { PokemonBuilder } from 'src/app/tutorial/usecases/pokemon.builder';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  name: string;
  pokemon$: Observable<Pokemon>;
  isRead$: Observable<boolean>;
  isEdit$: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private getByIdUsecase: GetByIdPokemonUsecase,
    private updateUseCase: UpdatePokemonUsecase
  ) {
    this.isEdit$ = this.route.params.pipe(
      map(params => params['mode'] === 'edit' ? true : false)
    );
    this.isRead$ = this.isEdit$.pipe(
      map(edit => !edit)
    );
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.pokemon$ = this.getByIdUsecase.execute(id);

    this.pokemon$.subscribe(p => this.name = p.name);
  }

  onUpdate() {
    const id = this.route.snapshot.params['id'];

    this.updateUseCase.execute(
      new PokemonBuilder()
        .withId(id)
        .withName(this.name)
        .build()
    );
    this.router.navigate(['pokemons', id]);
  }

}
