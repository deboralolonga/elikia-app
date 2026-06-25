import { Component, HostListener, inject } from '@angular/core';
import { ThemeCustomizerService } from '../theme-customizer/theme-customizer.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AppLanguage, LanguageService } from '../language/language.service';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-header-style-two',
    imports: [RouterLinkActive, NgClass, RouterLink],
    templateUrl: './header-style-two.component.html',
    styleUrls: ['./header-style-two.component.scss']
})
export class HeaderStyleTwoComponent {

    /** Expose service publicly so templates call lang.t('key') directly */
    readonly lang = inject(LanguageService);
    readonly themeService = inject(ThemeCustomizerService);
    readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    readonly languages: Record<AppLanguage, { shortLabel: string; flag: string; alt: string }> = {
        en: {
            shortLabel: 'Eng',
            flag: 'images/uk-flag.png',
            alt: 'English flag'
        },
        fr: {
            shortLabel: 'Fre',
            flag: 'images/france-flag.png',
            alt: 'French flag'
        }
    };

    // Header Sticky
    isSticky: boolean = false;
    @HostListener('window:scroll')
    checkScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    get selectedLanguage() {
        return this.languages[this.lang.currentLanguage()];
    }

    setLanguage(language: AppLanguage, event: Event): void {
        event.preventDefault();
        this.lang.setLanguage(language);
        this.classApplied2 = false;
    }

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    classApplied2 = false;
    toggleClass2() {
        this.classApplied2 = !this.classApplied2;
    }

    classApplied3 = false;
    toggleClass3() {
        this.classApplied3 = !this.classApplied3;
    }

    get isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }

    get dashboardLink(): string {
        return this.authService.defaultDashboardRoute();
    }

    onLogout(): void {
        this.authService.logout();
        this.classApplied = false;
        void this.router.navigate(['/']);
    }

}
