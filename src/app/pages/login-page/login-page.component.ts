import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeCustomizerService } from '../../common/theme-customizer/theme-customizer.service';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-login-page',
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

    email = '';
    password = '';
    errorMessage = '';

    constructor(
        public themeService: ThemeCustomizerService,
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly route: ActivatedRoute
    ) {}

    onLogin(): void {
        this.errorMessage = '';

        const result = this.authService.login(this.email, this.password);

        if (!result.ok || !result.user) {
            this.errorMessage = result.message ?? 'Login failed. Please check your credentials.';
            return;
        }

        const redirect = this.route.snapshot.queryParamMap.get('redirect');
        const destination = redirect || this.authService.dashboardRouteForRole(result.user.role);
        void this.router.navigateByUrl(destination);
    }

}
