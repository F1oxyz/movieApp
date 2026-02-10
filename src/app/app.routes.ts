import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { Movie } from '../components/movie/movie';
import { Serie } from '../components/serie/serie';
import { Movies } from '../pages/movies/movies';
import { Series } from '../pages/series/series';
import { Animes } from '../pages/animes/animes';

export const routes: Routes = [
    {
        path : 'home',
        component: Home
    },
    {
        path : 'movie/:id',
        component: Movie
    },
    {
        path : 'serie/:id',
        component: Serie
    },
    {
        path : 'movies',
        component: Movies
    },
    {
        path : 'series',
        component: Series
    },
    {
        path : 'animes',
        component: Animes
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'home'
    }
];
