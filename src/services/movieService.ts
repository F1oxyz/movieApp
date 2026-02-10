import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { inject } from '@angular/core/primitives/di';
import { HttpClient } from '@angular/common/http';
import { Credits, MovieDetail, MoviesData, Result, SerieDetail, SeriesData } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  http = inject(HttpClient);
  API_URL = environment.api_url;
  API_KEY = environment.api_key;
  IMG_URL = environment.img_url;
  constructor() { }

  obtenerCartelera() {
    return this.http.get<MoviesData>(`${this.API_URL}movie/now_playing?language=es-ES&api_key=${this.API_KEY}`)
  }

  obtenerUpComing() {
    return this.http.get<MoviesData>(`${this.API_URL}movie/upcoming?language=es-ES&api_key=${this.API_KEY}`)
  }

  obtenerMovie(id:String){
    return this.http.get<MovieDetail>(`${this.API_URL}movie/${id}?language=es-ES&api_key=${this.API_KEY}`)
  }
  obtenerCast(id:String){
    return this.http.get<Credits>(`${this.API_URL}movie/${id}/credits?language=es-ES&api_key=${this.API_KEY}`)
  }

  obtenerTopRatedSeries(){
    return this.http.get<SeriesData>(`${this.API_URL}tv/top_rated?language=es-ES&api_key=${this.API_KEY}`)
  }

  obtenerSerie(id:String){
    return this.http.get<SerieDetail>(`${this.API_URL}tv/${id}?language=es-ES&api_key=${this.API_KEY}`)
  }

}
