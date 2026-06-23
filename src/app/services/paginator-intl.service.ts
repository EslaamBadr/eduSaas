import { Injectable, inject, effect } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { LanguageService } from './language.service';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  private langService = inject(LanguageService);

  override changes = new Subject<void>();

  constructor() {
    super();
    // Reactively update labels whenever language changes
    effect(() => {
      this.applyLabels(this.langService.currentLang());
      this.changes.next();
    });
  }

  private applyLabels(lang: string) {
    if (lang === 'ar') {
      this.itemsPerPageLabel = 'عناصر في الصفحة';
      this.nextPageLabel     = 'الصفحة التالية';
      this.previousPageLabel = 'الصفحة السابقة';
      this.firstPageLabel    = 'الصفحة الأولى';
      this.lastPageLabel     = 'الصفحة الأخيرة';
      this.getRangeLabel     = this.arabicRangeLabel;
    } else {
      this.itemsPerPageLabel = 'Items per page';
      this.nextPageLabel     = 'Next page';
      this.previousPageLabel = 'Previous page';
      this.firstPageLabel    = 'First page';
      this.lastPageLabel     = 'Last page';
      this.getRangeLabel     = this.englishRangeLabel;
    }
  }

  private arabicRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) return `0 من ${length}`;
    const safeLength = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < safeLength
      ? Math.min(startIndex + pageSize, safeLength)
      : startIndex + pageSize;
    return `${startIndex + 1} – ${endIndex} من ${safeLength}`;
  };

  private englishRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) return `0 of ${length}`;
    const safeLength = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < safeLength
      ? Math.min(startIndex + pageSize, safeLength)
      : startIndex + pageSize;
    return `${startIndex + 1} – ${endIndex} of ${safeLength}`;
  };
}
