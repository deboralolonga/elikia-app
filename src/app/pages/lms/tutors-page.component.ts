import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { STUDENTS, TUTORS, studentById } from './data/lms.mock-data';

@Component({
    selector: 'app-tutors-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tutors-page.component.html',
    styleUrl: './tutors-page.component.scss'
})
export class TutorsPageComponent {

    readonly tutors = TUTORS;
    readonly totalAssigned = STUDENTS.length;

    assignedStudents(studentIds: number[]): string[] {
        return studentIds.map((id) => studentById(id)?.name ?? 'Unknown Student');
    }

}
