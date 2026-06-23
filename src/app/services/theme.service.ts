import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal<boolean>(false);

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode.set(savedTheme === 'dark' || (!savedTheme && prefersDark));

    // Update body class dynamically when isDarkMode signal changes
    effect(() => {
      const dark = this.isDarkMode();
      localStorage.setItem('theme', dark ? 'dark' : 'light');
      if (dark) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    });
  }

  toggleTheme() {
    this.isDarkMode.set(!this.isDarkMode());
  }
}
