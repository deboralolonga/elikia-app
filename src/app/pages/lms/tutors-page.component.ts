import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { studentsByJurisdiction, studentById, tutorsByJurisdiction } from './data/lms.mock-data';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-tutors-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tutors-page.component.html',
    styleUrl: './tutors-page.component.scss'
})
export class TutorsPageComponent {

    readonly activeJurisdiction: 'ZA' | 'KE';
    readonly tutors;
    readonly totalAssigned: number;

    constructor(private readonly authService: AuthService) {
        this.activeJurisdiction = this.authService.activeJurisdiction();
        this.tutors = tutorsByJurisdiction(this.activeJurisdiction);
        this.totalAssigned = studentsByJurisdiction(this.activeJurisdiction).length;
    }

    assignedStudents(studentIds: number[]): string[] {
        return studentIds.map((id) => studentById(id)?.name ?? 'Unknown Student');
    }

}
