import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { Funciones } from '../pages/funciones/funciones';
import { Cartelera } from '../components/cartelera/cartelera';
import { Movie } from '../components/movie/movie';
import { Serie } from '../components/serie/serie';

export const routes: Routes = [
    {
        path : 'home',
        component: Home
    },
    {
        path : 'funciones',
        component: Funciones
    },
    {
        path : 'cartelera',
        component: Cartelera
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
        path: '**',
        pathMatch: 'full',
        redirectTo: 'home'
    }
];
