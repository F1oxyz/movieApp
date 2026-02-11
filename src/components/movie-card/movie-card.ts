import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Result } from '../../interfaces/interface';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <div
      [ngClass]="mode === 'carousel'
        ? 'flex-none w-[240px] sm:w-[280px]'
        : 'w-full'"
      class="group relative bg-white rounded-xl overflow-hidden
             shadow-lg hover:shadow-2xl
             transition-all duration-300
             hover:scale-[1.03]
             cursor-pointer
             border-2 border-gray-200 hover:border-blue-500">

      <div class="relative aspect-[2/3] w-full">
        <img
          loading="lazy"
          [src]="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
          [alt]="movie.title || movie.name"
          class="w-full h-full object-cover" />

        <div
          class="absolute inset-0 bg-gradient-to-t
                 from-white via-white/70 to-transparent
                 opacity-0 group-hover:opacity-100
                 transition-opacity duration-300">
        </div>

        <div
          class="absolute bottom-0 left-0 right-0 p-4
                 translate-y-full group-hover:translate-y-0
                 transition-transform duration-300">

          <h3 class="text-gray-900 font-bold text-base sm:text-lg mb-2 line-clamp-2">
            {{ movie.title || movie.name }}
          </h3>

          <div class="flex items-center gap-2 mb-3">
            <div class="flex items-center gap-1 bg-yellow-400 px-2 py-1 rounded-full">
              ⭐
              <span class="text-gray-900 text-sm font-bold">
                {{ movie.vote_average?.toFixed(1) }}
              </span>
            </div>

            <span
              class="text-gray-700 text-sm font-semibold
                     bg-gray-100 px-2 py-1 rounded-full">
              {{ (movie.release_date || movie.first_air_date) | date:'yyyy' }}
            </span>
          </div>

          <button
            (click)="navigate()"
            class="w-full bg-blue-600 hover:bg-blue-700
                   text-white font-semibold py-2
                   rounded-lg transition-colors
                   text-sm shadow-md">
            Ver más
          </button>

        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCard {

  @Input({ required: true }) movie!: Result;

  // 👇 Nuevo input
  @Input() mode: 'grid' | 'carousel' = 'grid';

  private router = inject(Router);

  navigate() {
    if (!this.movie?.id) return;
    const route = this.movie.title ? 'movie' : 'serie';
    this.router.navigate(['/', route, this.movie.id]);
  }
}
