import { Component, inject } from '@angular/core';
import { ThemeCustomizerService } from '../theme-customizer/theme-customizer.service';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../language/language.service';

@Component({
    selector: 'app-instructors-style-two',
    imports: [],
    templateUrl: './instructors-style-two.component.html',
    styleUrls: ['./instructors-style-two.component.scss']
})
export class InstructorsStyleTwoComponent {

    readonly lang = inject(LanguageService);

    constructor(
        public themeService: ThemeCustomizerService
    ) {}

}
