import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FormsModule],
  templateUrl: './navbar.html',
  styles: `:host { display: block; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  router = inject(Router);
  searchQuery = '';

  buscar() {
    if (this.searchQuery.trim().length === 0) return;
    this.router.navigate(['/search'], { queryParams: { q: this.searchQuery.trim() } });
    this.searchQuery = '';
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') this.buscar();
  }
}