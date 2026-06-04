import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderStyleTwoComponent } from '../../common/header-style-two/header-style-two.component';
import { ThemeCustomizerService } from '../../common/theme-customizer/theme-customizer.service';

@Component({
    selector: 'app-lms-shell-page',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, HeaderStyleTwoComponent],
    templateUrl: './lms-shell-page.component.html',
    styleUrl: './lms-shell-page.component.scss'
})
export class LmsShellPageComponent {

    constructor(
        public themeService: ThemeCustomizerService
    ) {}

    readonly navItems = [
        { label: 'Admin Dashboard', route: 'admin' },
        { label: 'Tutors', route: 'tutors' },
        { label: 'Students', route: 'students' },
        { label: 'Scheduling', route: 'scheduling' },
        { label: 'Tutor Dashboard', route: 'tutor-dashboard' },
        { label: 'Parent Dashboard', route: 'parent-dashboard' }
    ];

}
