import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeCustomizerService } from '../../common/theme-customizer/theme-customizer.service';
import { HeaderStyleTwoComponent } from '../../common/header-style-two/header-style-two.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-my-dashboard-page',
    imports: [CommonModule, HeaderStyleTwoComponent, RouterLink],
    templateUrl: './my-dashboard-page.component.html',
    styleUrls: ['./my-dashboard-page.component.scss']
})
export class MyDashboardPageComponent {

    readonly roleCards = [
        {
            title: 'Admin View',
            description: 'Track tutors, parents, students, upcoming sessions, and operations updates.',
            route: '/learning-centre/admin',
            cta: 'Open Admin Dashboard'
        },
        {
            title: 'Tutor View',
            description: 'Review learner progress, weekly timetable, and hours delivered this week.',
            route: '/learning-centre/tutor-dashboard',
            cta: 'Open Tutor Dashboard'
        },
        {
            title: 'Parent View',
            description: 'Monitor children sessions, assigned tutor details, and lesson history.',
            route: '/learning-centre/parent-dashboard',
            cta: 'Open Parent Dashboard'
        }
    ];

    readonly upcomingSessions = [
        {
            learner: 'Aya Diarra',
            tutor: 'Sophie Renard',
            program: 'A2 Reading Confidence',
            dateLabel: 'Fri 05 Jun, 09:30',
            status: 'Scheduled'
        },
        {
            learner: 'Eva Ndaye',
            tutor: 'Lucas Bernard',
            program: 'DELF Preparation',
            dateLabel: 'Fri 05 Jun, 11:00',
            status: 'Scheduled'
        },
        {
            learner: 'Noah Koffi',
            tutor: 'Amelia Hart',
            program: 'A2 Grammar Builder',
            dateLabel: 'Sun 07 Jun, 16:00',
            status: 'Scheduled'
        }
    ];

    readonly recentActivity = [
        'New enrollment completed for Lina Koffi in the Beginner Pathway.',
        'Tutor availability updated for next week: Lucas Bernard.',
        'Parent report generated for Diarra family weekly review.'
    ];

    constructor(
        public themeService: ThemeCustomizerService
    ) {}

}
