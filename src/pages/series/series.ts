import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MovieService } from '../../services/movieService';
import { Result } from '../../interfaces/interface';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-series',
  imports: [MovieCard],
  templateUrl: './series.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Series {

  movieS = inject(MovieService);

  series = signal<Result[]>([]);
  currentPage = signal(1);
  totalPages = signal(1);
  loading = signal(false);

  constructor() {
    this.cargarPagina(1);
  }

  cargarPagina(page: number) {
    this.loading.set(true);
    this.movieS.obtenerSeriesPagina(page).subscribe({
      next: (data) => {
        this.series.set(data.results);
        this.currentPage.set(data.page);
        this.totalPages.set(data.total_pages > 500 ? 500 : data.total_pages);
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

  getPaginas(): number[] {
    const actual = this.currentPage();
    const total = this.totalPages();
    const rango = 2;
    const inicio = Math.max(1, actual - rango);
    const fin = Math.min(total, actual + rango);
    return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i);
  }

}
