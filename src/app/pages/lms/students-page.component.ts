import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PARENTS, STUDENTS, TUTORS, parentById, tutorById } from './data/lms.mock-data';

@Component({
    selector: 'app-students-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './students-page.component.html',
    styleUrl: './students-page.component.scss'
})
export class StudentsPageComponent {

    readonly students = STUDENTS;
    readonly parentsCount = PARENTS.length;
    readonly tutorsCount = TUTORS.length;

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
