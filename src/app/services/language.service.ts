import { Injectable, signal, effect } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLang = signal<string>('ar');

  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('lang') || 'ar';
    this.currentLang.set(savedLang);

    effect(() => {
      const lang = this.currentLang();
      localStorage.setItem('lang', lang);
      this.translate.use(lang);

      const html = document.documentElement;
      html.setAttribute('lang', lang);
      if (lang === 'ar') {
        html.setAttribute('dir', 'rtl');
      } else {
        html.setAttribute('dir', 'ltr');
      }
    });
  }

  setLanguage(lang: string) {
    this.currentLang.set(lang);
  }

  toggleLanguage() {
    this.currentLang.set(this.currentLang() === 'ar' ? 'en' : 'ar');
  }
}
