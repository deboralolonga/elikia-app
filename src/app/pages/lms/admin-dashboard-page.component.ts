import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    activitiesByJurisdiction,
    parentsByJurisdiction,
    studentsByJurisdiction,
    tutorsByJurisdiction,
    formatDateTime,
    getUpcomingSessions,
    studentById,
    tutorById
} from './data/lms.mock-data';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-admin-dashboard-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './admin-dashboard-page.component.html',
    styleUrl: './admin-dashboard-page.component.scss'
})
export class AdminDashboardPageComponent {

    readonly signedInUser;
    readonly activeJurisdiction: 'ZA' | 'KE';

    readonly totalTutors: number;
    readonly totalParents: number;
    readonly totalStudents: number;
    readonly upcomingSessions;
    readonly recentActivity;

    readonly sessionActionState: Record<number, 'Pending' | 'Confirmed' | 'Cancelled'> = {};
    readonly sessionActionMessage: Record<number, string> = {};

    bulkActionNote = '';

    readonly statCards;
    readonly sessionsToday: number;

    constructor(private readonly authService: AuthService) {
        this.signedInUser = this.authService.currentUser();
        this.activeJurisdiction = this.authService.activeJurisdiction();
        this.totalTutors = tutorsByJurisdiction(this.activeJurisdiction).length;
        this.totalParents = parentsByJurisdiction(this.activeJurisdiction).length;
        this.totalStudents = studentsByJurisdiction(this.activeJurisdiction).length;
        this.upcomingSessions = getUpcomingSessions(this.activeJurisdiction).map((session) => ({ ...session }));
        this.recentActivity = [...activitiesByJurisdiction(this.activeJurisdiction)];

        this.statCards = [
            { label: 'Total Tutors', value: this.totalTutors, tone: 'teal' },
            { label: 'Total Parents', value: this.totalParents, tone: 'orange' },
            { label: 'Total Students', value: this.totalStudents, tone: 'sky' },
            { label: 'Upcoming Sessions', value: this.upcomingSessions.length, tone: 'indigo' }
        ];

        this.sessionsToday = this.upcomingSessions.filter((session) => {
            const sessionDate = new Date(session.startAt).toDateString();
            return sessionDate === new Date().toDateString();
        }).length;

        this.upcomingSessions.forEach((session) => {
            this.sessionActionState[session.id] = 'Pending';
            this.sessionActionMessage[session.id] = 'Awaiting admin action';
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

    confirmSession(sessionId: number): void {
        this.sessionActionState[sessionId] = 'Confirmed';
        this.sessionActionMessage[sessionId] = 'Confirmed and reminder sent';
        this.pushActivity(`Session #${sessionId} confirmed and reminder shared with tutor and parent.`);
    }

    cancelSession(sessionId: number): void {
        this.sessionActionState[sessionId] = 'Cancelled';
        this.sessionActionMessage[sessionId] = 'Cancelled and follow-up needed';
        this.pushActivity(`Session #${sessionId} cancelled by admin. Rebooking requested.`);
    }

    sendWeeklyDigest(): void {
        this.bulkActionNote = 'Weekly digest has been sent to tutors and parents.';
        this.pushActivity('Weekly digest emailed to all active tutors and parent contacts.');
    }

    publishTimetable(): void {
        this.bulkActionNote = 'Latest timetable was published to Learning Centre users.';
        this.pushActivity('Updated timetable published for all French4All participants.');
    }

    private pushActivity(message: string): void {
        this.recentActivity.unshift({
            id: Date.now(),
            jurisdiction: this.activeJurisdiction,
            type: 'Session',
            message,
            timestamp: new Date().toISOString(),
            actor: 'Admin Team'
        });
    }

}
