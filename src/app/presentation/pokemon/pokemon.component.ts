import { Component, OnInit } from '@angular/core';
import { GetByIdPokemonUsecase } from 'src/app/tutorial/usecases/get-by-id-pokemon.usecase';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/tutorial/domain/model/pokemon.model';
import { ActivatedRoute } from '@angular/router';
import { tap, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  pokemon$: Observable<Pokemon>;
  isRead$: Observable<boolean>;
  isEdit$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private useCase: GetByIdPokemonUsecase
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
    this.pokemon$ = this.useCase.execute(id);
  }

}
