import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderStyleTwoComponent } from '../../common/header-style-two/header-style-two.component';
import { ThemeCustomizerService } from '../../common/theme-customizer/theme-customizer.service';
import { AuthService } from '../../auth/auth.service';
import { AppUserRole, JurisdictionCode } from '../../auth/auth.models';

@Component({
    selector: 'app-lms-shell-page',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, HeaderStyleTwoComponent],
    templateUrl: './lms-shell-page.component.html',
    styleUrl: './lms-shell-page.component.scss'
})
export class LmsShellPageComponent {

    constructor(
        public themeService: ThemeCustomizerService,
        public authService: AuthService,
        private readonly router: Router
    ) {}

    readonly navItems = [
        { label: 'Admin Dashboard', route: 'admin', roles: ['admin'] as AppUserRole[] },
        { label: 'Tutors', route: 'tutors', roles: ['admin'] as AppUserRole[] },
        { label: 'Students', route: 'students', roles: ['admin'] as AppUserRole[] },
        { label: 'Scheduling', route: 'scheduling', roles: ['admin'] as AppUserRole[] },
        { label: 'Tutor Dashboard', route: 'tutor-dashboard', roles: ['admin', 'tutor'] as AppUserRole[] },
        { label: 'Parent Dashboard', route: 'parent-dashboard', roles: ['admin', 'parent'] as AppUserRole[] }
    ];

    get visibleNavItems() {
        const user = this.authService.currentUser();

        if (!user) {
            return [];
        }

        return this.navItems.filter((item) => item.roles.includes(user.role));
    }

    get dashboardHomeRoute(): string {
        const user = this.authService.currentUser();

        if (!user) {
            return 'admin';
        }

        if (user.role === 'tutor') {
            return 'tutor-dashboard';
        }

        if (user.role === 'parent') {
            return 'parent-dashboard';
        }

        return 'admin';
    }

    get activeJurisdiction(): JurisdictionCode {
        return this.authService.activeJurisdiction();
    }

    get canSwitchJurisdiction(): boolean {
        return this.authService.canSwitchJurisdiction();
    }

    get jurisdictionOptions(): JurisdictionCode[] {
        return this.authService.jurisdictionOptions();
    }

    jurisdictionLabel(jurisdiction: JurisdictionCode): string {
        return this.authService.jurisdictionLabel(jurisdiction);
    }

    switchJurisdiction(jurisdiction: JurisdictionCode): void {
        if (jurisdiction === this.activeJurisdiction) {
            return;
        }

        this.authService.setActiveJurisdiction(jurisdiction);
        void this.router.navigate(['/learning-centre', this.dashboardHomeRoute]);
    }

    logout(): void {
        this.authService.logout();
        void this.router.navigate(['/login']);
    }

}
