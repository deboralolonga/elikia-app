import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    formatDateTime,
    parentById,
    sessionsByJurisdiction,
    studentsByJurisdiction,
    studentById,
    tutorById
} from './data/lms.mock-data';
import { AuthService } from '../../auth/auth.service';
import { LearningSession, Parent, Student } from './models/lms.models';
import { AttendanceState, LmsOpsService, SessionClockState } from './data/lms-ops.service';

interface WeeklyDay {
    label: string;
    dateLabel: string;
    sessions: LearningSession[];
}

@Component({
    selector: 'app-parent-dashboard-page',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './parent-dashboard-page.component.html',
    styleUrl: './parent-dashboard-page.component.scss'
})
export class ParentDashboardPageComponent {

    readonly signedInUserName: string;
    readonly signedInRole = 'Parent';
    readonly activeJurisdiction: 'ZA' | 'KE';

    readonly currentParentId: number;
    readonly parent: Parent | undefined;
    readonly myChildren: Student[];
    readonly assignedTutorIds: number[];

    readonly upcomingSessions: LearningSession[];

    readonly sessionHistory: LearningSession[];
    readonly myOnlineSessions: LearningSession[];
    readonly weeklyCalendar: WeeklyDay[];
    readonly allFamilySessions: LearningSession[];
    readonly monthOptions: string[];
    selectedMonthKey: string;

    readonly upcomingActionState: Record<number, 'Pending' | 'Attendance Confirmed' | 'Makeup Requested'> = {};
    readonly reportState: Record<number, 'Not downloaded' | 'Downloaded'> = {};

    parentActionNote = '';

    constructor(
        private readonly authService: AuthService,
        private readonly lmsOpsService: LmsOpsService
    ) {
        this.signedInUserName = this.authService.currentUser()?.name ?? 'Parent User';
        this.activeJurisdiction = this.authService.activeJurisdiction();

        const authParentId = this.authService.currentUser()?.parentId;
        this.currentParentId = authParentId ?? 8;
        this.parent = parentById(this.currentParentId);
        this.myChildren = studentsByJurisdiction(this.activeJurisdiction)
            .filter((student) => student.parentId === this.currentParentId);
        this.allFamilySessions = sessionsByJurisdiction(this.activeJurisdiction)
            .filter((session) => this.myChildren.some((child) => child.id === session.studentId))
            .map((session) => ({ ...session }))
            .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
        this.assignedTutorIds = [...new Set(this.myChildren.map((child) => child.tutorId))];
        this.upcomingSessions = sessionsByJurisdiction(this.activeJurisdiction)
            .filter((session) => session.status === 'Scheduled' && this.myChildren.some((child) => child.id === session.studentId))
            .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
        this.sessionHistory = sessionsByJurisdiction(this.activeJurisdiction)
            .filter((session) => session.status === 'Completed' && this.myChildren.some((child) => child.id === session.studentId))
            .sort((a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime());
        this.myOnlineSessions = this.upcomingSessions.filter((session) => session.location === 'Online');
        this.weeklyCalendar = this.buildWeeklyCalendar(
            this.allFamilySessions
        );
        this.monthOptions = this.buildMonthOptions(this.allFamilySessions);
        this.selectedMonthKey = this.monthOptions[0] ?? this.toMonthKey(new Date().toISOString());

        this.upcomingSessions.forEach((session) => {
            this.upcomingActionState[session.id] = 'Pending';
        });

        this.sessionHistory.forEach((session) => {
            this.reportState[session.id] = 'Not downloaded';
        });

        this.lmsOpsService.ensureBillingState(this.currentParentId);
    }

    get billingTransferState() {
        return this.lmsOpsService.billingTransferState;
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

    attendanceStatus(sessionId: number): AttendanceState {
        return this.lmsOpsService.attendanceState[sessionId] ?? 'Pending';
    }

    attendanceNote(sessionId: number): string {
        return this.lmsOpsService.attendanceNote[sessionId] ?? 'Attendance not recorded yet';
    }

    transferClientHours(): void {
        this.lmsOpsService.markBillingTransferred(this.currentParentId);
        this.parentActionNote = 'Hours transferred to billing workflow.';
    }

    get completedSessionsInSelectedMonth(): LearningSession[] {
        return this.allFamilySessions
            .filter((session) => this.toMonthKey(session.startAt) === this.selectedMonthKey)
            .filter((session) => this.ledgerMinutes(session) > 0)
            .sort((a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime());
    }

    get monthlyCompletedHours(): number {
        const minutes = this.completedSessionsInSelectedMonth
            .reduce((total, session) => total + this.ledgerMinutes(session), 0);
        return Math.round((minutes / 60) * 10) / 10;
    }

    get monthlyBillingOwed(): number {
        const total = this.completedSessionsInSelectedMonth.reduce((sum, session) => {
            const hours = this.ledgerMinutes(session) / 60;
            const tutorRate = tutorById(session.tutorId)?.billingRatePerHour ?? 0;
            return sum + (hours * tutorRate);
        }, 0);

        return Math.round(total * 100) / 100;
    }

    get monthlyBillingPending(): number {
        if (this.billingTransferState[this.currentParentId] === 'Transferred') {
            return 0;
        }

        return this.monthlyBillingOwed;
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

    signInQrCode(sessionId: number): string {
        return this.lmsOpsService.signInQrCode[sessionId] ?? '';
    }

    signOutQrCode(sessionId: number): string {
        return this.lmsOpsService.signOutQrCode[sessionId] ?? '';
    }

    sessionClockStatus(sessionId: number): SessionClockState {
        return this.lmsOpsService.sessionClockState[sessionId] ?? 'Not Started';
    }

    trackedSessionHours(sessionId: number): number {
        return this.lmsOpsService.trackedHours(sessionId);
    }

    get hoursForBilling(): number {
        return Math.round((this.sessionHistory.reduce((total, session) => total + session.durationMinutes, 0) / 60) * 10) / 10;
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
