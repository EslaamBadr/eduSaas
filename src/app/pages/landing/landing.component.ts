import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslatePipe,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingPageComponent {
  router = inject(Router);
  languageService = inject(LanguageService);
  themeService = inject(ThemeService);

  isYearly = signal<boolean>(false);
  openFaq = signal<number | null>(null);

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleFaq(index: number) {
    if (this.openFaq() === index) {
      this.openFaq.set(null);
    } else {
      this.openFaq.set(index);
    }
  }

  getPrice(basePrice: number): string {
    if (this.isYearly()) {
      // 20% discount * 12 months
      const discountedYearly = Math.round((basePrice * 0.8) * 12);
      return `$${discountedYearly}`;
    }
    return `$${basePrice}`;
  }

  playPromoVideo() {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  }

  contactSales() {
    window.open('mailto:sales@edusaas.example.com?subject=EduSaaS%20Enterprise%20Inquiry', '_blank');
  }
}
