import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { parentById, parentsByJurisdiction, studentsByJurisdiction, tutorById, tutorsByJurisdiction } from './data/lms.mock-data';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-students-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './students-page.component.html',
    styleUrl: './students-page.component.scss'
})
export class StudentsPageComponent {

    readonly activeJurisdiction: 'ZA' | 'KE';
    readonly students;
    readonly parentsCount: number;
    readonly tutorsCount: number;

    constructor(private readonly authService: AuthService) {
        this.activeJurisdiction = this.authService.activeJurisdiction();
        this.students = studentsByJurisdiction(this.activeJurisdiction);
        this.parentsCount = parentsByJurisdiction(this.activeJurisdiction).length;
        this.tutorsCount = tutorsByJurisdiction(this.activeJurisdiction).length;
    }

    parentName(parentId: number): string {
        return parentById(parentId)?.name ?? 'Unknown Parent';
    }

    parentContact(parentId: number): string {
        const parent = parentById(parentId);
        return parent ? `${parent.phone} • ${parent.email}` : 'N/A';
    }

    tutorName(tutorId: number): string {
        return tutorById(tutorId)?.name ?? 'Unknown Tutor';
    }

}
