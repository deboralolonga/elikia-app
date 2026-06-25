import { JurisdictionCode } from '../../../auth/auth.models';
import { ActivityItem, LearningSession, Parent, Student, Tutor } from '../models/lms.models';

export const TUTORS: Tutor[] = [
    {
        id: 1,
        jurisdiction: 'ZA',
        name: 'Amelia Hart',
        email: 'amelia.hart@elikia-cf.com',
        phone: '+27 81 220 1140',
        payrollRatePerHour: 220,
        billingRatePerHour: 290,
        specialties: ['French Conversation', 'Beginner Grammar'],
        availability: ['Monday 09:00-13:00', 'Wednesday 14:00-18:00', 'Friday 09:00-12:00'],
        assignedStudentIds: [1, 2, 7],
        weeklyHours: 12,
        status: 'Active'
    },
    {
        id: 2,
        jurisdiction: 'ZA',
        name: 'Lucas Bernard',
        email: 'lucas.bernard@elikia-cf.com',
        phone: '+27 83 501 7721',
        payrollRatePerHour: 250,
        billingRatePerHour: 320,
        specialties: ['DELF Prep', 'Intermediate Writing'],
        availability: ['Tuesday 10:00-16:00', 'Thursday 09:00-15:00'],
        assignedStudentIds: [3, 4, 8, 9],
        weeklyHours: 16,
        status: 'Active'
    },
    {
        id: 3,
        jurisdiction: 'KE',
        name: 'Nora Dupuis',
        email: 'nora.dupuis@elikia-cf.com',
        phone: '+254 712 341 229',
        payrollRatePerHour: 1900,
        billingRatePerHour: 2600,
        specialties: ['Kids Learning', 'Pronunciation'],
        availability: ['Monday 14:00-18:00', 'Wednesday 09:00-12:00', 'Saturday 10:00-13:00'],
        assignedStudentIds: [5, 6, 10],
        weeklyHours: 11,
        status: 'Active'
    },
    {
        id: 4,
        jurisdiction: 'KE',
        name: 'Thierry Moreau',
        email: 'thierry.moreau@elikia-cf.com',
        phone: '+254 798 116 430',
        payrollRatePerHour: 2400,
        billingRatePerHour: 3200,
        specialties: ['Business French', 'Presentation Skills'],
        availability: ['Tuesday 08:00-12:00', 'Friday 14:00-18:00'],
        assignedStudentIds: [11, 12],
        weeklyHours: 8,
        status: 'On Leave'
    },
    {
        id: 5,
        jurisdiction: 'KE',
        name: 'Sophie Renard',
        email: 'sophie.renard@elikia-cf.com',
        phone: '+254 711 774 310',
        payrollRatePerHour: 2100,
        billingRatePerHour: 2900,
        specialties: ['Exam Strategy', 'Advanced Reading'],
        availability: ['Monday 08:30-11:30', 'Thursday 13:00-18:00'],
        assignedStudentIds: [13, 14],
        weeklyHours: 9,
        status: 'Active'
    }
];

export const PARENTS: Parent[] = [
    { id: 1, jurisdiction: 'ZA', name: 'Marie Koffi', email: 'marie.koffi@email.com', phone: '+27 72 541 1910', childrenIds: [1, 2] },
    { id: 2, jurisdiction: 'ZA', name: 'Jean Ndaye', email: 'jean.ndaye@email.com', phone: '+27 74 883 3106', childrenIds: [3] },
    { id: 3, jurisdiction: 'ZA', name: 'Alice Yao', email: 'alice.yao@email.com', phone: '+27 78 024 4722', childrenIds: [4] },
    { id: 5, jurisdiction: 'ZA', name: 'Brigitte Nguema', email: 'brigitte.nguema@email.com', phone: '+27 74 299 7708', childrenIds: [7, 8] },
    { id: 6, jurisdiction: 'ZA', name: 'Karim Toure', email: 'karim.toure@email.com', phone: '+27 76 540 1013', childrenIds: [9] },
    { id: 4, jurisdiction: 'KE', name: 'David Mbenza', email: 'david.mbenza@email.com', phone: '+254 769 110 754', childrenIds: [6] },
    { id: 7, jurisdiction: 'KE', name: 'Mireille Zola', email: 'mireille.zola@email.com', phone: '+254 759 876 644', childrenIds: [10, 11] },
    { id: 8, jurisdiction: 'KE', name: 'Eric Diarra', email: 'eric.diarra@email.com', phone: '+254 772 304 402', childrenIds: [12, 13, 14] }
];

export const STUDENTS: Student[] = [
    { id: 1, jurisdiction: 'ZA', name: 'Lina Koffi', age: 9, level: 'A1', parentId: 1, tutorId: 1, focusArea: 'Vocabulary Building' },
    { id: 2, jurisdiction: 'ZA', name: 'Noah Koffi', age: 12, level: 'A2', parentId: 1, tutorId: 1, focusArea: 'Sentence Structure' },
    { id: 3, jurisdiction: 'ZA', name: 'Eva Ndaye', age: 13, level: 'B1', parentId: 2, tutorId: 2, focusArea: 'DELF A2 Prep' },
    { id: 4, jurisdiction: 'ZA', name: 'Maya Yao', age: 11, level: 'A2', parentId: 3, tutorId: 2, focusArea: 'Reading Fluency' },
    { id: 7, jurisdiction: 'ZA', name: 'Adam Nguema', age: 14, level: 'B1', parentId: 5, tutorId: 1, focusArea: 'Conversation Skills' },
    { id: 8, jurisdiction: 'ZA', name: 'Nia Nguema', age: 13, level: 'B1', parentId: 5, tutorId: 2, focusArea: 'Written Expression' },
    { id: 9, jurisdiction: 'ZA', name: 'Yasmine Toure', age: 15, level: 'B2', parentId: 6, tutorId: 2, focusArea: 'Exam Strategy' },
    { id: 5, jurisdiction: 'KE', name: 'Leo Yao', age: 8, level: 'A1', parentId: 8, tutorId: 3, focusArea: 'Pronunciation' },
    { id: 6, jurisdiction: 'KE', name: 'Iris Mbenza', age: 10, level: 'A1', parentId: 4, tutorId: 3, focusArea: 'Listening Confidence' },
    { id: 10, jurisdiction: 'KE', name: 'Chris Zola', age: 9, level: 'A1', parentId: 7, tutorId: 3, focusArea: 'Basic Grammar' },
    { id: 11, jurisdiction: 'KE', name: 'Elodie Zola', age: 16, level: 'B2', parentId: 7, tutorId: 4, focusArea: 'Business Communication' },
    { id: 12, jurisdiction: 'KE', name: 'Sam Diarra', age: 15, level: 'B2', parentId: 8, tutorId: 4, focusArea: 'Presentation Skills' },
    { id: 13, jurisdiction: 'KE', name: 'Aya Diarra', age: 12, level: 'A2', parentId: 8, tutorId: 5, focusArea: 'Reading Comprehension' },
    { id: 14, jurisdiction: 'KE', name: 'Milan Diarra', age: 11, level: 'A2', parentId: 8, tutorId: 5, focusArea: 'Confidence in Speaking' }
];

export const SESSIONS: LearningSession[] = [
    { id: 1, jurisdiction: 'ZA', studentId: 1, tutorId: 1, subject: 'Pronunciation Lab', startAt: '2026-06-05T09:00:00', durationMinutes: 60, location: 'Online', status: 'Scheduled' },
    { id: 2, jurisdiction: 'ZA', studentId: 3, tutorId: 2, subject: 'DELF Practice', startAt: '2026-06-05T11:00:00', durationMinutes: 90, location: 'Cape Town Centre', status: 'Scheduled' },
    { id: 4, jurisdiction: 'ZA', studentId: 9, tutorId: 2, subject: 'Exam Writing Workshop', startAt: '2026-06-06T14:00:00', durationMinutes: 90, location: 'Online', status: 'Scheduled' },
    { id: 6, jurisdiction: 'ZA', studentId: 2, tutorId: 1, subject: 'Sentence Structure', startAt: '2026-06-07T16:00:00', durationMinutes: 60, location: 'Johannesburg Campus', status: 'Scheduled' },
    { id: 7, jurisdiction: 'ZA', studentId: 8, tutorId: 2, subject: 'Written Expression', startAt: '2026-06-08T10:00:00', durationMinutes: 60, location: 'Online', status: 'Scheduled' },
    { id: 11, jurisdiction: 'ZA', studentId: 4, tutorId: 2, subject: 'Fluency Sprint', startAt: '2026-05-30T17:00:00', durationMinutes: 60, location: 'Cape Town Centre', status: 'Completed' },
    { id: 3, jurisdiction: 'KE', studentId: 5, tutorId: 3, subject: 'French Basics', startAt: '2026-06-06T10:00:00', durationMinutes: 60, location: 'Nairobi Hub', status: 'Scheduled' },
    { id: 5, jurisdiction: 'KE', studentId: 13, tutorId: 5, subject: 'Reading Practice', startAt: '2026-06-07T09:30:00', durationMinutes: 60, location: 'Online', status: 'Scheduled' },
    { id: 8, jurisdiction: 'KE', studentId: 10, tutorId: 3, subject: 'Listening Practice', startAt: '2026-06-08T15:00:00', durationMinutes: 60, location: 'Nairobi Hub', status: 'Scheduled' },
    { id: 9, jurisdiction: 'KE', studentId: 11, tutorId: 4, subject: 'Business Pitching', startAt: '2026-06-02T13:00:00', durationMinutes: 90, location: 'Mombasa Centre', status: 'Completed' },
    { id: 10, jurisdiction: 'KE', studentId: 14, tutorId: 5, subject: 'Confidence Coaching', startAt: '2026-06-01T10:30:00', durationMinutes: 60, location: 'Online', status: 'Completed' },
    { id: 12, jurisdiction: 'KE', studentId: 12, tutorId: 4, subject: 'Presentation Polish', startAt: '2026-06-09T14:30:00', durationMinutes: 60, location: 'Mombasa Centre', status: 'Cancelled' }
];

export const ACTIVITIES: ActivityItem[] = [
    { id: 1, jurisdiction: 'ZA', type: 'Enrollment', message: 'New student Lina Koffi enrolled in A1 program.', timestamp: '2026-06-04T08:30:00', actor: 'Admin Team' },
    { id: 2, jurisdiction: 'ZA', type: 'Session', message: 'Lucas Bernard completed DELF Practice for Eva Ndaye.', timestamp: '2026-06-04T11:45:00', actor: 'Lucas Bernard' },
    { id: 3, jurisdiction: 'KE', type: 'Tutor', message: 'Sophie Renard submitted updated weekly availability.', timestamp: '2026-06-04T13:10:00', actor: 'Sophie Renard' },
    { id: 4, jurisdiction: 'ZA', type: 'Payment', message: 'Invoice for Nguema family marked as paid.', timestamp: '2026-06-04T14:20:00', actor: 'Finance' },
    { id: 5, jurisdiction: 'KE', type: 'Session', message: 'Pronunciation Lab moved online due to weather alerts.', timestamp: '2026-06-04T15:05:00', actor: 'Operations' }
];

export const tutorsByJurisdiction = (jurisdiction: JurisdictionCode): Tutor[] =>
    TUTORS.filter((tutor) => tutor.jurisdiction === jurisdiction);

export const parentsByJurisdiction = (jurisdiction: JurisdictionCode): Parent[] =>
    PARENTS.filter((parent) => parent.jurisdiction === jurisdiction);

export const studentsByJurisdiction = (jurisdiction: JurisdictionCode): Student[] =>
    STUDENTS.filter((student) => student.jurisdiction === jurisdiction);

export const sessionsByJurisdiction = (jurisdiction: JurisdictionCode): LearningSession[] =>
    SESSIONS.filter((session) => session.jurisdiction === jurisdiction);

export const activitiesByJurisdiction = (jurisdiction: JurisdictionCode): ActivityItem[] =>
    ACTIVITIES.filter((activity) => activity.jurisdiction === jurisdiction);

export const studentById = (id: number): Student | undefined => STUDENTS.find((student) => student.id === id);
export const tutorById = (id: number): Tutor | undefined => TUTORS.find((tutor) => tutor.id === id);
export const parentById = (id: number): Parent | undefined => PARENTS.find((parent) => parent.id === id);

export const formatDateTime = (value: string): string =>
    new Date(value).toLocaleString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });

export const getUpcomingSessions = (jurisdiction: JurisdictionCode): LearningSession[] =>
    sessionsByJurisdiction(jurisdiction)
        .filter((session) => session.status === 'Scheduled')
        .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
