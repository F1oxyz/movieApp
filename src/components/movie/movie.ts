import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movieService';
import { Cast, MovieDetail } from '../../interfaces/interface';
import { DatePipe, Location } from '@angular/common';
import { ActorCard } from '../actor-card/actor-card';
import { SanitizeUrlPipe } from '../../app/pipes/sanitiza-url.pipe';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-movie',
  imports: [DatePipe, SanitizeUrlPipe, ActorCard],
  templateUrl: './movie.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Movie {

  VIEW_KEY = environment.view_key;

  activeRoute = inject(ActivatedRoute); //nos permite acceder a los parametros de la ruta actual
  MovieS = inject(MovieService);
  location = inject(Location);


  movie !: MovieDetail;
  cast: Cast[] = [];


  constructor() {
    const id = this.activeRoute.snapshot.paramMap.get('id'); //obtenemos el id de la pelicula desde los parametros de la ruta
    if (id) {
      this.obternerPelicula(id);
      this.obtenerCasting(id);
    }
  }

  obternerPelicula(id: String) {
    this.MovieS.obtenerMovie(id).subscribe({
      next: (peli) => {
        this.movie = peli;
        console.log('Pelicula: ', this.movie);
      },
      error: (error) => {
        console.log('Error: ', error);

      }
    });
  }


  obtenerCasting(id: String) {
    this.MovieS.obtenerCast(id).subscribe({
      next: (cast) => {
        this.cast = cast.cast;
        // console.log('Credits: ', cast);
      },
      error: (error) => {
        console.log('Error: ', error);

      }
    });
  }

  volver() {
    this.location.back();
  }

}
