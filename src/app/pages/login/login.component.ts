import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';

export type LoginRole = 'admin' | 'teacher' | 'guardian' | 'student';

interface RoleTab {
  key: LoginRole;
  labelKey: string;
  icon: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  languageService = inject(LanguageService);
  themeService = inject(ThemeService);

  loading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  showPassword = signal<boolean>(false);
  selectedRole = signal<LoginRole>('admin');

  roles: RoleTab[] = [
    { key: 'admin',    labelKey: 'LOGIN.ROLE_ADMIN',    icon: 'admin_panel_settings' },
    { key: 'teacher',  labelKey: 'LOGIN.ROLE_TEACHER',  icon: 'school' },
    { key: 'guardian', labelKey: 'LOGIN.ROLE_GUARDIAN', icon: 'family_restroom' },
    { key: 'student',  labelKey: 'LOGIN.ROLE_STUDENT',  icon: 'person' },
  ];

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  selectRole(role: LoginRole) {
    this.selectedRole.set(role);
    this.errorMessage.set(null);
  }

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading.set(true);
    this.errorMessage.set(null);

    const val = this.loginForm.value;
    this.authService.login({
      username: val.username!,
      password: val.password!,
      loginType: this.selectedRole()
    }).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/']);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('LOGIN.INVALID_CREDENTIALS');
      }
    });
  }
}
