import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LearningSession } from './models/lms.models';
import { formatDateTime, getUpcomingSessions, parentById, studentById, tutorById } from './data/lms.mock-data';
import { AuthService } from '../../auth/auth.service';
import { AttendanceState, LmsOpsService } from './data/lms-ops.service';

interface WeeklyDay {
    label: string;
    dateLabel: string;
    sessions: LearningSession[];
}

interface ClientBillingRow {
    parentId: number;
    parentName: string;
    hours: number;
}

interface TutorPayrollRow {
    tutorId: number;
    tutorName: string;
    hours: number;
}

@Component({
    selector: 'app-scheduling-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './scheduling-page.component.html',
    styleUrl: './scheduling-page.component.scss'
})
export class SchedulingPageComponent {

    readonly activeJurisdiction: 'ZA' | 'KE';
    readonly upcoming: LearningSession[];
    readonly weeklyCalendar: WeeklyDay[];

    readonly clientBillingRows: ClientBillingRow[];
    readonly tutorPayrollRows: TutorPayrollRow[];

    transferNote = '';

    constructor(
        private readonly authService: AuthService,
        private readonly lmsOpsService: LmsOpsService
    ) {
        this.activeJurisdiction = this.authService.activeJurisdiction();
        this.upcoming = getUpcomingSessions(this.activeJurisdiction);
        this.weeklyCalendar = this.buildWeeklyCalendar(this.upcoming);

        this.clientBillingRows = this.buildClientBillingRows();
        this.tutorPayrollRows = this.buildTutorPayrollRows();

        this.clientBillingRows.forEach((row) => {
            this.lmsOpsService.ensureBillingState(row.parentId);
        });

        this.tutorPayrollRows.forEach((row) => {
            this.lmsOpsService.ensurePayrollState(row.tutorId);
        });
    }

    get attendanceState() {
        return this.lmsOpsService.attendanceState;
    }

    get attendanceNote() {
        return this.lmsOpsService.attendanceNote;
    }

    get billingTransferState() {
        return this.lmsOpsService.billingTransferState;
    }

    get payrollTransferState() {
        return this.lmsOpsService.payrollTransferState;
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

    markAttendance(sessionId: number, status: AttendanceState): void {
        this.lmsOpsService.markAttendance(sessionId, status);
    }

    transferClientHours(parentId: number): void {
        this.lmsOpsService.markBillingTransferred(parentId);
        this.transferNote = 'Completed client hours transferred to billing.';
    }

    transferTutorHours(tutorId: number): void {
        this.lmsOpsService.markPayrollTransferred(tutorId);
        this.transferNote = 'Completed tutor hours transferred to payroll.';
    }

    private buildWeeklyCalendar(sessions: LearningSession[]): WeeklyDay[] {
        const anchorDate = this.resolveCalendarAnchorDate(sessions);
        const start = this.startOfWeek(anchorDate);
        const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        return labels.map((label, index) => {
            const dayDate = new Date(start);
            dayDate.setDate(start.getDate() + index);

            const daySessions = sessions
                .filter((session) => new Date(session.startAt).toDateString() === dayDate.toDateString())
                .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

            return {
                label,
                dateLabel: dayDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
                sessions: daySessions
            };
        });
    }

    private startOfWeek(date: Date): Date {
        const value = new Date(date);
        const day = value.getDay();
        const diff = day === 0 ? -6 : 1 - day;
        value.setHours(0, 0, 0, 0);
        value.setDate(value.getDate() + diff);
        return value;
    }

    private resolveCalendarAnchorDate(sessions: LearningSession[]): Date {
        if (!sessions.length) {
            return new Date();
        }

        const sortedSessions = [...sessions].sort((a, b) =>
            new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
        );

        return new Date(sortedSessions[0].startAt);
    }

    private buildClientBillingRows(): ClientBillingRow[] {
        const clientHours = new Map<number, number>();

        this.upcoming.forEach((session) => {
            const student = studentById(session.studentId);
            if (!student) {
                return;
            }

            const current = clientHours.get(student.parentId) ?? 0;
            clientHours.set(student.parentId, current + (session.durationMinutes / 60));
        });

        return [...clientHours.entries()].map(([parentId, hours]) => ({
            parentId,
            parentName: parentById(parentId)?.name ?? `Parent #${parentId}`,
            hours: Math.round(hours * 10) / 10
        }));
    }

    private buildTutorPayrollRows(): TutorPayrollRow[] {
        const tutorHours = new Map<number, number>();

        this.upcoming.forEach((session) => {
            const current = tutorHours.get(session.tutorId) ?? 0;
            tutorHours.set(session.tutorId, current + (session.durationMinutes / 60));
        });

        return [...tutorHours.entries()].map(([tutorId, hours]) => ({
            tutorId,
            tutorName: tutorById(tutorId)?.name ?? `Tutor #${tutorId}`,
            hours: Math.round(hours * 10) / 10
        }));
    }

}
