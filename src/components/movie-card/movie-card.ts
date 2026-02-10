import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Result } from '../../interfaces/interface';
import { DatePipe } from '@angular/common';
import { Router } from "@angular/router";

@Component({
    selector: 'app-movie-card',
    imports: [DatePipe],
    template: `
        <div class="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer flex-none w-[280px] sm:w-[320px] snap-start border-2 border-gray-200 hover:border-blue-500">
            <div class="relative aspect-[2/3]">
                <img 
                    src="https://image.tmdb.org/t/p/w500/{{movie.poster_path}}" 
                    alt="{{movie.title || movie.name}}"
                    class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>

                <!-- Info que aparece en hover -->
                <div class="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 class="text-gray-900 font-bold text-lg mb-2 line-clamp-2">
                        {{movie.title || movie.name}}
                    </h3>
                    <div class="flex items-center gap-2 mb-3">
                        <div class="flex items-center gap-1 bg-yellow-400 px-2 py-1 rounded-full">
                            <svg class="w-4 h-4 fill-gray-900" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <span class="text-gray-900 text-sm font-bold">{{movie.vote_average.toFixed(1)}}</span>
                        </div>
                        <span class="text-gray-700 text-sm font-semibold bg-gray-100 px-2 py-1 rounded-full">
                            {{(movie.release_date || movie.first_air_date) | date: 'yyyy'}}
                        </span>
                    </div>

                    <div class="flex flex-row gap-2">
                        <button
                            (click)="navigate()"
                            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors text-sm shadow-md">
                            Ver más
                        </button>
                        <a class="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-md" 
                           [href]="(movie.title ? 'https://vidlink.pro/movie/' : 'https://vidlink.pro/tv/') + movie.id"
                           target="_blank">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            <span class="text-sm">Play</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: `
        :host { display: block; }
    `,
    changeDetection: ChangeDetectionStrategy.Default,
})
export class MovieCard {
    @Input({ required: true }) movie!: Result;
    router = inject(Router);

    navigate() {
        // Si tiene title es película, si tiene name es serie
        const route = this.movie.title ? 'movie' : 'serie';
        this.router.navigateByUrl(`/${route}/${this.movie.id}`);
    }
}