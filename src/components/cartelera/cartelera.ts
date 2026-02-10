import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MovieService } from '../../services/movieService';
import { MoviesData, Result, SeriesData } from '../../interfaces/interface';
import { MovieCard } from '../movie-card/movie-card';

@Component({
  selector: 'app-cartelera',
  imports: [ MovieCard],
  templateUrl: './cartelera.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class Cartelera {
  movieS = inject(MovieService);
  Cartelera:Result[] = [];
  upComing: Result[] = [];
  topRatedSeries: Result[] = [];


  constructor() {
    this.movieS.obtenerCartelera().subscribe(
      {
        next: (pelis:MoviesData) => {
          this.Cartelera = pelis.results;
          // console.log('cartelera' + this.Cartelera);
        },
        error: (error) => console.error('Error al obtener la cartelera:', error)
      }
    );

    this.movieS.obtenerUpComing().subscribe(
      {
        next: (pelis: MoviesData) => {
          this.upComing = pelis.results;
          //¿ console.log('upcomming ' +this.upComing);
        },
        error: (error) => console.error('Error al obtener la cartelera:', error)
      }
    );

    this.movieS.obtenerTopRatedSeries().subscribe(
      {
        next: (series:SeriesData) => {
          this.topRatedSeries = series.results;
          //console.log( this.topRatedSeries);
        },
        error: (error) => console.error('Error al obtener la cartelera:', error)
      }
    );


  }

}
