import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movieService';
import { Result } from '../../interfaces/interface';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-search',
  imports: [MovieCard],
  templateUrl: './search.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Search {
  private route = inject(ActivatedRoute);
  private movieS = inject(MovieService);

  resultados = signal<Result[]>([]);
  query = signal('');
  currentPage = signal(1);
  totalPages = signal(1);
  totalResults = signal(0);
  loading = signal(false);
  buscado = signal(false); // para saber si ya se hizo al menos una búsqueda

  constructor() {
    // Escucha cambios en el query param ?q=
    this.route.queryParams.subscribe(params => {
      const q = params['q'] ?? '';
      if (q.trim().length > 0) {
        this.query.set(q);
        this.buscar(q, 1);
      }
    });
  }

  buscar(q: string, page: number) {
    this.loading.set(true);
    this.buscado.set(true);
    this.movieS.buscar(q, page).subscribe({
      next: (data) => {
        // Filtra solo películas y series (excluye personas, etc.)
        const filtrados = data.results.filter(
          (r: any) => r.media_type === 'movie' || r.media_type === 'tv'
        );
        this.resultados.set(filtrados);
        this.currentPage.set(data.page);
        this.totalPages.set(data.total_pages > 500 ? 500 : data.total_pages);
        this.totalResults.set(data.total_results);
        this.loading.set(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: () => this.loading.set(false)
    });
  }

  paginaAnterior() {
    if (this.currentPage() > 1) this.buscar(this.query(), this.currentPage() - 1);
  }

  paginaSiguiente() {
    if (this.currentPage() < this.totalPages()) this.buscar(this.query(), this.currentPage() + 1);
  }

  cargarPagina(page: number) {
    this.buscar(this.query(), page);
  }

  getPaginas(): number[] {
    const actual = this.currentPage();
    const total = this.totalPages();
    const inicio = Math.max(1, actual - 2);
    const fin = Math.min(total, actual + 2);
    return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i);
  }
  

}
