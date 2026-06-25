import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    formatDateTime,
    sessionsByJurisdiction,
    studentsByJurisdiction,
    studentById,
    tutorById
} from './data/lms.mock-data';
import { AuthService } from '../../auth/auth.service';
import { LearningSession, Student, Tutor } from './models/lms.models';
import { AttendanceState, LmsOpsService, SessionClockState } from './data/lms-ops.service';

interface WeeklyDay {
    label: string;
    dateLabel: string;
    sessions: LearningSession[];
}

@Component({
    selector: 'app-tutor-dashboard-page',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './tutor-dashboard-page.component.html',
    styleUrl: './tutor-dashboard-page.component.scss'
})
export class TutorDashboardPageComponent {

    readonly signedInUserName: string;
    readonly signedInRole = 'Tutor';
    readonly activeJurisdiction: 'ZA' | 'KE';

    readonly currentTutorId: number;
    readonly tutor: Tutor | undefined;
    readonly myStudents: Student[];
    readonly mySchedule: LearningSession[];
    readonly myOnlineSessions: LearningSession[];
    readonly weeklyCalendar: WeeklyDay[];
    readonly allTutorSessions: LearningSession[];
    readonly monthOptions: string[];
    selectedMonthKey: string;

    completedMinutesThisWeek: number;

    readonly sessionActionState: Record<number, 'Pending' | 'Completed' | 'Reschedule Requested'> = {};
    readonly studentUpdateState: Record<number, 'Idle' | 'Sent'> = {};
    readonly qrScanCodeBySession: Record<number, string> = {};

    actionNote = '';

    constructor(
        private readonly authService: AuthService,
        private readonly lmsOpsService: LmsOpsService
    ) {
        this.signedInUserName = this.authService.currentUser()?.name ?? 'Tutor User';
        this.activeJurisdiction = this.authService.activeJurisdiction();

        const authTutorId = this.authService.currentUser()?.tutorId;
        this.currentTutorId = authTutorId ?? 2;
        this.tutor = tutorById(this.currentTutorId);
        this.myStudents = studentsByJurisdiction(this.activeJurisdiction)
            .filter((student) => student.tutorId === this.currentTutorId);
        this.allTutorSessions = sessionsByJurisdiction(this.activeJurisdiction)
            .filter((session) => session.tutorId === this.currentTutorId)
            .map((session) => ({ ...session }))
            .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
        this.mySchedule = sessionsByJurisdiction(this.activeJurisdiction)
            .filter((session) => session.tutorId === this.currentTutorId && session.status === 'Scheduled')
            .map((session) => ({ ...session }))
            .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
        this.completedMinutesThisWeek = sessionsByJurisdiction(this.activeJurisdiction)
            .filter((session) => session.tutorId === this.currentTutorId && session.status === 'Completed')
            .reduce((total, session) => total + session.durationMinutes, 0);
        this.myOnlineSessions = this.mySchedule.filter((session) => session.location === 'Online');
        this.weeklyCalendar = this.buildWeeklyCalendar(
            this.allTutorSessions
        );
        this.monthOptions = this.buildMonthOptions(this.allTutorSessions);
        this.selectedMonthKey = this.monthOptions[0] ?? this.toMonthKey(new Date().toISOString());

        this.mySchedule.forEach((session) => {
            this.sessionActionState[session.id] = 'Pending';
            this.qrScanCodeBySession[session.id] = '';
        });

        this.myStudents.forEach((student) => {
            this.studentUpdateState[student.id] = 'Idle';
        });

        this.lmsOpsService.ensurePayrollState(this.currentTutorId);
    }

    get payrollTransferState() {
        return this.lmsOpsService.payrollTransferState;
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

    get completedSessionsInSelectedMonth(): LearningSession[] {
        return this.allTutorSessions
            .filter((session) => this.toMonthKey(session.startAt) === this.selectedMonthKey)
            .filter((session) => this.ledgerMinutes(session) > 0)
            .sort((a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime());
    }

    get monthlyCompletedHours(): number {
        const minutes = this.completedSessionsInSelectedMonth
            .reduce((total, session) => total + this.ledgerMinutes(session), 0);
        return Math.round((minutes / 60) * 10) / 10;
    }

    get monthlyPayrollAccumulated(): number {
        const payrollRate = this.tutor?.payrollRatePerHour ?? 0;
        return Math.round(this.monthlyCompletedHours * payrollRate * 100) / 100;
    }

    get monthlyPayrollPending(): number {
        if (this.payrollTransferState[this.currentTutorId] === 'Transferred') {
            return 0;
        }

        return this.monthlyPayrollAccumulated;
    }

    monthLabel(monthKey: string): string {
        const [year, month] = monthKey.split('-').map((value) => Number(value));
        return new Date(year, month - 1, 1).toLocaleDateString('en-GB', {
            month: 'long',
            year: 'numeric'
        });
    }

    onMonthChange(monthKey: string): void {
        this.selectedMonthKey = monthKey;
    }

    formatCurrency(amount: number): string {
        return new Intl.NumberFormat(this.activeJurisdiction === 'ZA' ? 'en-ZA' : 'en-KE', {
            style: 'currency',
            currency: this.activeJurisdiction === 'ZA' ? 'ZAR' : 'KES',
            maximumFractionDigits: 2
        }).format(amount);
    }

    attendanceStatus(sessionId: number): AttendanceState {
        return this.lmsOpsService.attendanceState[sessionId] ?? 'Pending';
    }

    sessionClockStatus(sessionId: number): SessionClockState {
        return this.lmsOpsService.sessionClockState[sessionId] ?? 'Not Started';
    }

    trackedSessionHours(sessionId: number): number {
        return this.lmsOpsService.trackedHours(sessionId);
    }

    scanSignInQr(sessionId: number): void {
        const scannedCode = this.qrScanCodeBySession[sessionId] ?? '';
        const result = this.lmsOpsService.scanSignIn(sessionId, scannedCode);
        this.actionNote = result.message;

        if (result.ok) {
            this.qrScanCodeBySession[sessionId] = '';
        }
    }

    scanSignOutQr(sessionId: number): void {
        const scannedCode = this.qrScanCodeBySession[sessionId] ?? '';
        const result = this.lmsOpsService.scanSignOut(sessionId, scannedCode);
        this.actionNote = result.message;

        if (result.ok) {
            this.sessionActionState[sessionId] = 'Completed';
            this.qrScanCodeBySession[sessionId] = '';
        }
    }

    attendanceNote(sessionId: number): string {
        return this.lmsOpsService.attendanceNote[sessionId] ?? 'Attendance not recorded yet';
    }

    markAttendance(sessionId: number, status: AttendanceState): void {
        this.lmsOpsService.markAttendance(sessionId, status);
        this.actionNote = `Attendance updated for session #${sessionId}.`;
    }

    transferTutorHours(): void {
        this.lmsOpsService.markPayrollTransferred(this.currentTutorId);
        this.actionNote = 'Hours transferred to payroll workflow.';
    }

    sessionTime(value: string): string {
        return new Date(value).toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    private buildWeeklyCalendar(sessions: LearningSession[]): WeeklyDay[] {
        const anchorDate = this.resolveCalendarAnchorDate(sessions);
        const start = this.startOfWeek(anchorDate);
        const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        return labels.map((label, index) => {
            const dayDate = new Date(start);
            dayDate.setDate(start.getDate() + index);

            const daySessions = sessions
                .filter((session) => {
                    const sessionDate = new Date(session.startAt);
                    return sessionDate.toDateString() === dayDate.toDateString();
                })
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

    private buildMonthOptions(sessions: LearningSession[]): string[] {
        const monthSet = new Set(sessions.map((session) => this.toMonthKey(session.startAt)));
        return Array.from(monthSet).sort((a, b) => b.localeCompare(a));
    }

    private toMonthKey(value: string): string {
        const date = new Date(value);
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        return `${date.getFullYear()}-${month}`;
    }

    private ledgerMinutes(session: LearningSession): number {
        const trackedMinutes = this.lmsOpsService.sessionTrackedMinutes[session.id] ?? 0;
        if (trackedMinutes > 0) {
            return trackedMinutes;
        }

        return session.status === 'Completed' ? session.durationMinutes : 0;
    }

}
