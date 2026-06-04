import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    CURRENT_PARENT_ID,
    SESSIONS,
    STUDENTS,
    formatDateTime,
    parentById,
    studentById,
    tutorById
} from './data/lms.mock-data';

@Component({
    selector: 'app-parent-dashboard-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './parent-dashboard-page.component.html',
    styleUrl: './parent-dashboard-page.component.scss'
})
export class ParentDashboardPageComponent {

    readonly parent = parentById(CURRENT_PARENT_ID);
    readonly myChildren = STUDENTS.filter((student) => student.parentId === CURRENT_PARENT_ID);
    readonly assignedTutorIds = [...new Set(this.myChildren.map((child) => child.tutorId))];

    readonly upcomingSessions = SESSIONS
        .filter((session) => session.status === 'Scheduled' && this.myChildren.some((child) => child.id === session.studentId))
        .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

    readonly sessionHistory = SESSIONS
        .filter((session) => session.status === 'Completed' && this.myChildren.some((child) => child.id === session.studentId))
        .sort((a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime());

    readonly upcomingActionState: Record<number, 'Pending' | 'Attendance Confirmed' | 'Makeup Requested'> = {};
    readonly reportState: Record<number, 'Not downloaded' | 'Downloaded'> = {};

    parentActionNote = '';

    constructor() {
        this.upcomingSessions.forEach((session) => {
            this.upcomingActionState[session.id] = 'Pending';
        });

        this.sessionHistory.forEach((session) => {
            this.reportState[session.id] = 'Not downloaded';
        });
    }

    tutorName(tutorId: number): string {
        return tutorById(tutorId)?.name ?? 'Unknown Tutor';
    }

    studentName(studentId: number): string {
        return studentById(studentId)?.name ?? 'Unknown Student';
    }

    dateLabel(value: string): string {
        return formatDateTime(value);
    }

    confirmAttendance(sessionId: number): void {
        this.upcomingActionState[sessionId] = 'Attendance Confirmed';
        this.parentActionNote = `Attendance confirmed for session #${sessionId}.`;
    }

    requestMakeup(sessionId: number): void {
        this.upcomingActionState[sessionId] = 'Makeup Requested';
        this.parentActionNote = `Makeup request sent for session #${sessionId}.`;
    }

    downloadSessionReport(sessionId: number): void {
        this.reportState[sessionId] = 'Downloaded';
        this.parentActionNote = `Session report #${sessionId} downloaded.`;
    }

}
