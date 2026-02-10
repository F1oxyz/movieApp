import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Cast } from '../../interfaces/interface';

@Component({
  selector: 'app-actor-card',
  imports: [],
  template: `
    <div class="flex-none w-32 snap-start">
      <div class="bg-gray-50 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-all hover:shadow-lg">
        @if (actor.profile_path) {
          <img 
            [src]="'https://image.tmdb.org/t/p/w185' + actor.profile_path"
            [alt]="actor.name"
            class="w-full aspect-[2/3] object-cover">
        } @else {
          <div class="w-full aspect-[2/3] bg-gray-300 flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
        }
        <div class="p-2">
          <p class="text-gray-900 font-semibold text-sm line-clamp-1">{{actor.name}}</p>
          <p class="text-gray-600 text-xs line-clamp-2">{{actor.character}}</p>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActorCard {
  @Input({ required: true }) actor!: Cast;
}