import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LearningSession } from './models/lms.models';
import { formatDateTime, getUpcomingSessions, studentById, tutorById } from './data/lms.mock-data';

@Component({
    selector: 'app-scheduling-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './scheduling-page.component.html',
    styleUrl: './scheduling-page.component.scss'
})
export class SchedulingPageComponent {

    readonly upcoming = getUpcomingSessions();
    readonly weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    sessionsByDay(day: string): LearningSession[] {
        return this.upcoming.filter((session) => {
            const weekday = new Date(session.startAt).toLocaleDateString('en-US', { weekday: 'long' });
            return weekday === day;
        });
    }

    studentName(studentId: number): string {
        return studentById(studentId)?.name ?? 'Unknown Student';
    }

    tutorName(tutorId: number): string {
        return tutorById(tutorId)?.name ?? 'Unknown Tutor';
    }

    dateLabel(value: string): string {
        return formatDateTime(value);
    }

}
