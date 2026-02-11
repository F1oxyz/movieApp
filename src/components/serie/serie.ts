import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movieService';
import { Cast, SerieDetail } from '../../interfaces/interface';
import { DatePipe, Location } from '@angular/common';
import { SanitizeUrlPipe } from '../../app/pipes/sanitiza-url.pipe';
import { ActorCard } from '../actor-card/actor-card';

@Component({
  selector: 'app-serie',
  imports: [DatePipe, SanitizeUrlPipe, ActorCard],
  templateUrl: './serie.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Serie {

  serie!: SerieDetail;
  cast: Cast[] = [];


  VIEW_KEY = environment.view_key;

  activeRoute = inject(ActivatedRoute); //nos permite acceder a los parametros de la ruta actual
  MovieS = inject(MovieService);
  location = inject(Location);


  constructor() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerSerie(id);
      this.obtenerCasting(id);

    }
  }

  obtenerSerie(id: string) {
    this.MovieS.obtenerSerie(id).subscribe({
      next: (serie) => {
        this.serie = serie;
      },
      error: (error) => {
        console.log('Error: ', error);
      }
    });
  }

  obtenerCasting(id: string) {
    this.MovieS.obtenerCast(id).subscribe({
      next: (cast) => {
        this.cast = cast.cast;
      },
      error: (error) => {
        console.log('Error: ', error);
      }
    });
  }

  volver(){
    this.location.back();
  }

}
