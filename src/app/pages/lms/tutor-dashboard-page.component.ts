import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    CURRENT_TUTOR_ID,
    SESSIONS,
    STUDENTS,
    formatDateTime,
    studentById,
    tutorById
} from './data/lms.mock-data';

@Component({
    selector: 'app-tutor-dashboard-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tutor-dashboard-page.component.html',
    styleUrl: './tutor-dashboard-page.component.scss'
})
export class TutorDashboardPageComponent {

    readonly tutor = tutorById(CURRENT_TUTOR_ID);
    readonly myStudents = STUDENTS.filter((student) => student.tutorId === CURRENT_TUTOR_ID);
    readonly mySchedule = SESSIONS
        .filter((session) => session.tutorId === CURRENT_TUTOR_ID && session.status === 'Scheduled')
        .map((session) => ({ ...session }))
        .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

    completedMinutesThisWeek = SESSIONS
        .filter((session) => session.tutorId === CURRENT_TUTOR_ID && session.status === 'Completed')
        .reduce((total, session) => total + session.durationMinutes, 0);

    readonly sessionActionState: Record<number, 'Pending' | 'Completed' | 'Reschedule Requested'> = {};
    readonly studentUpdateState: Record<number, 'Idle' | 'Sent'> = {};

    actionNote = '';

    constructor() {
        this.mySchedule.forEach((session) => {
            this.sessionActionState[session.id] = 'Pending';
        });

        this.myStudents.forEach((student) => {
            this.studentUpdateState[student.id] = 'Idle';
        });
    }

    dateLabel(value: string): string {
        return formatDateTime(value);
    }

    studentName(studentId: number): string {
        return studentById(studentId)?.name ?? 'Unknown Student';
    }

    markSessionCompleted(sessionId: number): void {
        const session = this.mySchedule.find((item) => item.id === sessionId);
        if (!session || this.sessionActionState[sessionId] === 'Completed') {
            return;
        }

        this.sessionActionState[sessionId] = 'Completed';
        this.completedMinutesThisWeek += session.durationMinutes;
        this.actionNote = `Session #${sessionId} marked as completed.`;
    }

    requestReschedule(sessionId: number): void {
        if (this.sessionActionState[sessionId] === 'Completed') {
            return;
        }

        this.sessionActionState[sessionId] = 'Reschedule Requested';
        this.actionNote = `Reschedule request sent for session #${sessionId}.`;
    }

    sendProgressUpdate(studentId: number): void {
        this.studentUpdateState[studentId] = 'Sent';
        const student = this.myStudents.find((item) => item.id === studentId);
        this.actionNote = `Progress update sent for ${student?.name ?? 'student'}.`;
    }

    get hoursWorkedThisWeek(): number {
        return Math.round((this.completedMinutesThisWeek / 60) * 10) / 10;
    }

}
