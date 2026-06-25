import { Injectable } from '@angular/core';
import { SESSIONS, studentById } from './lms.mock-data';

export type AttendanceState = 'Pending' | 'Present' | 'Absent' | 'Excused';
export type SessionClockState = 'Not Started' | 'In Progress' | 'Completed';

@Injectable({
    providedIn: 'root'
})
export class LmsOpsService {

    readonly attendanceState: Record<number, AttendanceState> = {};
    readonly attendanceNote: Record<number, string> = {};

    readonly billingTransferState: Record<number, 'Not Transferred' | 'Transferred'> = {};
    readonly payrollTransferState: Record<number, 'Not Transferred' | 'Transferred'> = {};

    readonly sessionClockState: Record<number, SessionClockState> = {};
    readonly sessionClockStartedAt: Record<number, string> = {};
    readonly sessionClockEndedAt: Record<number, string> = {};
    readonly sessionTrackedMinutes: Record<number, number> = {};

    readonly signInQrCode: Record<number, string> = {};
    readonly signOutQrCode: Record<number, string> = {};

    constructor() {
        SESSIONS.forEach((session) => {
            this.attendanceState[session.id] = 'Pending';
            this.attendanceNote[session.id] = 'Attendance not recorded yet';

            const parentId = studentById(session.studentId)?.parentId ?? 0;
            this.signInQrCode[session.id] = this.buildQrCode('IN', session.id, parentId, session.tutorId);
            this.signOutQrCode[session.id] = this.buildQrCode('OUT', session.id, parentId, session.tutorId);

            if (session.status === 'Completed') {
                const startedAt = new Date(session.startAt);
                const endedAt = new Date(startedAt.getTime() + session.durationMinutes * 60000);
                this.sessionClockState[session.id] = 'Completed';
                this.sessionClockStartedAt[session.id] = startedAt.toISOString();
                this.sessionClockEndedAt[session.id] = endedAt.toISOString();
                this.sessionTrackedMinutes[session.id] = session.durationMinutes;
                this.attendanceState[session.id] = 'Present';
                this.attendanceNote[session.id] = 'Marked present from completed session log';
                return;
            }

            this.sessionClockState[session.id] = 'Not Started';
            this.sessionTrackedMinutes[session.id] = 0;
        });
    }

    scanSignIn(sessionId: number, scannedCode: string): { ok: boolean; message: string } {
        if ((scannedCode ?? '').trim() !== this.signInQrCode[sessionId]) {
            return {
                ok: false,
                message: `Invalid sign-in QR for session #${sessionId}.`
            };
        }

        const currentState = this.sessionClockState[sessionId] ?? 'Not Started';
        if (currentState === 'In Progress') {
            return {
                ok: false,
                message: `Session #${sessionId} is already started.`
            };
        }

        if (currentState === 'Completed') {
            return {
                ok: false,
                message: `Session #${sessionId} is already completed.`
            };
        }

        this.sessionClockState[sessionId] = 'In Progress';
        this.sessionClockStartedAt[sessionId] = new Date().toISOString();
        this.sessionClockEndedAt[sessionId] = '';
        this.sessionTrackedMinutes[sessionId] = 0;
        this.attendanceState[sessionId] = 'Pending';
        this.attendanceNote[sessionId] = 'Session started via parent sign-in QR';

        return {
            ok: true,
            message: `Session #${sessionId} started successfully.`
        };
    }

    scanSignOut(sessionId: number, scannedCode: string): { ok: boolean; message: string } {
        if ((scannedCode ?? '').trim() !== this.signOutQrCode[sessionId]) {
            return {
                ok: false,
                message: `Invalid sign-out QR for session #${sessionId}.`
            };
        }

        const currentState = this.sessionClockState[sessionId] ?? 'Not Started';
        if (currentState !== 'In Progress') {
            return {
                ok: false,
                message: `Session #${sessionId} is not currently in progress.`
            };
        }

        const end = new Date();
        const start = this.sessionClockStartedAt[sessionId] ? new Date(this.sessionClockStartedAt[sessionId]) : end;
        const trackedMinutes = Math.max(1, Math.round((end.getTime() - start.getTime()) / 60000));

        this.sessionClockState[sessionId] = 'Completed';
        this.sessionClockEndedAt[sessionId] = end.toISOString();
        this.sessionTrackedMinutes[sessionId] = trackedMinutes;
        this.attendanceState[sessionId] = 'Present';
        this.attendanceNote[sessionId] = `Session completed with ${trackedMinutes} tracked minutes`;

        return {
            ok: true,
            message: `Session #${sessionId} ended with ${trackedMinutes} tracked minutes.`
        };
    }

    trackedHours(sessionId: number): number {
        const minutes = this.sessionTrackedMinutes[sessionId] ?? 0;
        return Math.round((minutes / 60) * 10) / 10;
    }

    markAttendance(sessionId: number, status: AttendanceState): void {
        this.attendanceState[sessionId] = status;

        if (status === 'Present') {
            this.attendanceNote[sessionId] = 'Marked present for billing and payroll transfer';
            return;
        }

        if (status === 'Absent') {
            this.attendanceNote[sessionId] = 'Marked absent';
            return;
        }

        if (status === 'Excused') {
            this.attendanceNote[sessionId] = 'Marked excused';
            return;
        }

        this.attendanceNote[sessionId] = 'Attendance not recorded yet';
    }

    markBillingTransferred(parentId: number): void {
        this.billingTransferState[parentId] = 'Transferred';
    }

    markPayrollTransferred(tutorId: number): void {
        this.payrollTransferState[tutorId] = 'Transferred';
    }

    ensureBillingState(parentId: number): void {
        if (!this.billingTransferState[parentId]) {
            this.billingTransferState[parentId] = 'Not Transferred';
        }
    }

    ensurePayrollState(tutorId: number): void {
        if (!this.payrollTransferState[tutorId]) {
            this.payrollTransferState[tutorId] = 'Not Transferred';
        }
    }

    private buildQrCode(
        action: 'IN' | 'OUT',
        sessionId: number,
        parentId: number,
        tutorId: number
    ): string {
        return `ELK-${action}-${sessionId}-${parentId}-${tutorId}`;
    }

}
