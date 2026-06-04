export type SessionStatus = 'Scheduled' | 'Completed' | 'Cancelled';

export interface Tutor {
    id: number;
    name: string;
    email: string;
    phone: string;
    specialties: string[];
    availability: string[];
    assignedStudentIds: number[];
    weeklyHours: number;
    status: 'Active' | 'On Leave';
}

export interface Parent {
    id: number;
    name: string;
    email: string;
    phone: string;
    childrenIds: number[];
}

export interface Student {
    id: number;
    name: string;
    age: number;
    level: string;
    parentId: number;
    tutorId: number;
    focusArea: string;
}

export interface LearningSession {
    id: number;
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
    type: 'Session' | 'Enrollment' | 'Tutor' | 'Payment';
    message: string;
    timestamp: string;
    actor: string;
}
