import { JurisdictionCode } from '../../../auth/auth.models';

export type SessionStatus = 'Scheduled' | 'Completed' | 'Cancelled';

export interface Tutor {
    id: number;
    jurisdiction: JurisdictionCode;
    name: string;
    email: string;
    phone: string;
    payrollRatePerHour: number;
    billingRatePerHour: number;
    specialties: string[];
    availability: string[];
    assignedStudentIds: number[];
    weeklyHours: number;
    status: 'Active' | 'On Leave';
}

export interface Parent {
    id: number;
    jurisdiction: JurisdictionCode;
    name: string;
    email: string;
    phone: string;
    childrenIds: number[];
}

export interface Student {
    id: number;
    jurisdiction: JurisdictionCode;
    name: string;
    age: number;
    level: string;
    parentId: number;
    tutorId: number;
    focusArea: string;
}

export interface LearningSession {
    id: number;
    jurisdiction: JurisdictionCode;
    studentId: number;
    tutorId: number;
    subject: string;
    startAt: string;
    durationMinutes: number;
    location: string;
    status: SessionStatus;
}

export interface ActivityItem {
    id: number;
    jurisdiction: JurisdictionCode;
    type: 'Session' | 'Enrollment' | 'Tutor' | 'Payment';
    message: string;
    timestamp: string;
    actor: string;
}
