import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MovieService } from '../../services/movieService';
import { Result } from '../../interfaces/interface';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-movies',
  imports: [MovieCard],
  templateUrl: './movies.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Movies {

  movieS = inject(MovieService);

  peliculas = signal<Result[]>([]);
  currentPage = signal(1);
  totalPages = signal(1);
  loading = signal(false);

  constructor() {
    this.cargarPagina(1);
  }

  cargarPagina(page: number) {
    this.loading.set(true);
    this.movieS.obtenerPeliculasPagina(page).subscribe({
      next: (data) => {
        this.peliculas.set(data.results);
        this.currentPage.set(data.page);
        this.totalPages.set(data.total_pages > 500 ? 500 : data.total_pages); // TMDB max 500
        this.loading.set(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: () => this.loading.set(false)
    });
  }

  paginaAnterior() {
    if (this.currentPage() > 1) this.cargarPagina(this.currentPage() - 1);
  }

  paginaSiguiente() {
    if (this.currentPage() < this.totalPages()) this.cargarPagina(this.currentPage() + 1);
  }

  // Genera array de páginas visibles alrededor de la actual
  getPaginas(): number[] {
    const actual = this.currentPage();
    const total = this.totalPages();
    const rango = 2;
    const inicio = Math.max(1, actual - rango);
    const fin = Math.min(total, actual + rango);
    return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i);
  }

}
