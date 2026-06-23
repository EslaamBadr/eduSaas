import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirm = control.get('confirmPassword');
  if (password && confirm && password.value !== confirm.value) {
    confirm.setErrors({ mismatch: true });
    return { mismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  languageService = inject(LanguageService);
  themeService = inject(ThemeService);

  loading = signal<boolean>(false);
  success = signal<boolean>(false);
  showPassword = signal<boolean>(false);
  showConfirm = signal<boolean>(false);

  roles = [
    { value: 'admin',    labelKey: 'LOGIN.ROLE_ADMIN',    icon: 'admin_panel_settings' },
    { value: 'teacher',  labelKey: 'LOGIN.ROLE_TEACHER',  icon: 'school' },
    { value: 'guardian', labelKey: 'LOGIN.ROLE_GUARDIAN', icon: 'family_restroom' },
    { value: 'student',  labelKey: 'LOGIN.ROLE_STUDENT',  icon: 'person' },
  ];

  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['student', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  }, { validators: passwordMatchValidator });

  togglePassword() { this.showPassword.update(v => !v); }
  toggleConfirm() { this.showConfirm.update(v => !v); }

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.loading.set(true);
    // Simulate API call
    setTimeout(() => {
      this.loading.set(false);
      this.success.set(true);
      setTimeout(() => this.router.navigate(['/login']), 2500);
    }, 1200);
  }
}
