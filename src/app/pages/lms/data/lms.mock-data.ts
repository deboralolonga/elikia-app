import { ActivityItem, LearningSession, Parent, Student, Tutor } from '../models/lms.models';

export const TUTORS: Tutor[] = [
    {
        id: 1,
        name: 'Amelia Hart',
        email: 'amelia.hart@elikia-cf.com',
        phone: '+33 6 82 44 11 90',
        specialties: ['French Conversation', 'Beginner Grammar'],
        availability: ['Monday 09:00-13:00', 'Wednesday 14:00-18:00', 'Friday 09:00-12:00'],
        assignedStudentIds: [1, 2, 7],
        weeklyHours: 12,
        status: 'Active'
    },
    {
        id: 2,
        name: 'Lucas Bernard',
        email: 'lucas.bernard@elikia-cf.com',
        phone: '+33 6 75 55 22 44',
        specialties: ['DELF Prep', 'Intermediate Writing'],
        availability: ['Tuesday 10:00-16:00', 'Thursday 09:00-15:00'],
        assignedStudentIds: [3, 4, 8, 9],
        weeklyHours: 16,
        status: 'Active'
    },
    {
        id: 3,
        name: 'Nora Dupuis',
        email: 'nora.dupuis@elikia-cf.com',
        phone: '+33 6 91 34 73 21',
        specialties: ['Kids Learning', 'Pronunciation'],
        availability: ['Monday 14:00-18:00', 'Wednesday 09:00-12:00', 'Saturday 10:00-13:00'],
        assignedStudentIds: [5, 6, 10],
        weeklyHours: 11,
        status: 'Active'
    },
    {
        id: 4,
        name: 'Thierry Moreau',
        email: 'thierry.moreau@elikia-cf.com',
        phone: '+33 6 48 11 64 30',
        specialties: ['Business French', 'Presentation Skills'],
        availability: ['Tuesday 08:00-12:00', 'Friday 14:00-18:00'],
        assignedStudentIds: [11, 12],
        weeklyHours: 8,
        status: 'On Leave'
    },
    {
        id: 5,
        name: 'Sophie Renard',
        email: 'sophie.renard@elikia-cf.com',
        phone: '+33 6 53 77 43 10',
        specialties: ['Exam Strategy', 'Advanced Reading'],
        availability: ['Monday 08:30-11:30', 'Thursday 13:00-18:00'],
        assignedStudentIds: [13, 14],
        weeklyHours: 9,
        status: 'Active'
    }
];

export const PARENTS: Parent[] = [
    { id: 1, name: 'Marie Koffi', email: 'marie.koffi@email.com', phone: '+33 7 54 22 19 10', childrenIds: [1, 2] },
    { id: 2, name: 'Jean Ndaye', email: 'jean.ndaye@email.com', phone: '+33 7 48 83 31 06', childrenIds: [3] },
    { id: 3, name: 'Alice Yao', email: 'alice.yao@email.com', phone: '+33 7 80 24 47 22', childrenIds: [4, 5] },
    { id: 4, name: 'David Mbenza', email: 'david.mbenza@email.com', phone: '+33 7 69 11 07 54', childrenIds: [6] },
    { id: 5, name: 'Brigitte Nguema', email: 'brigitte.nguema@email.com', phone: '+33 7 42 99 77 08', childrenIds: [7, 8] },
    { id: 6, name: 'Karim Toure', email: 'karim.toure@email.com', phone: '+33 7 65 40 10 13', childrenIds: [9] },
    { id: 7, name: 'Mireille Zola', email: 'mireille.zola@email.com', phone: '+33 7 59 87 66 44', childrenIds: [10, 11] },
    { id: 8, name: 'Eric Diarra', email: 'eric.diarra@email.com', phone: '+33 7 72 30 44 02', childrenIds: [12, 13, 14] }
];

export const STUDENTS: Student[] = [
    { id: 1, name: 'Lina Koffi', age: 9, level: 'A1', parentId: 1, tutorId: 1, focusArea: 'Vocabulary Building' },
    { id: 2, name: 'Noah Koffi', age: 12, level: 'A2', parentId: 1, tutorId: 1, focusArea: 'Sentence Structure' },
    { id: 3, name: 'Eva Ndaye', age: 13, level: 'B1', parentId: 2, tutorId: 2, focusArea: 'DELF A2 Prep' },
    { id: 4, name: 'Maya Yao', age: 11, level: 'A2', parentId: 3, tutorId: 2, focusArea: 'Reading Fluency' },
    { id: 5, name: 'Leo Yao', age: 8, level: 'A1', parentId: 3, tutorId: 3, focusArea: 'Pronunciation' },
    { id: 6, name: 'Iris Mbenza', age: 10, level: 'A1', parentId: 4, tutorId: 3, focusArea: 'Listening Confidence' },
    { id: 7, name: 'Adam Nguema', age: 14, level: 'B1', parentId: 5, tutorId: 1, focusArea: 'Conversation Skills' },
    { id: 8, name: 'Nia Nguema', age: 13, level: 'B1', parentId: 5, tutorId: 2, focusArea: 'Written Expression' },
    { id: 9, name: 'Yasmine Toure', age: 15, level: 'B2', parentId: 6, tutorId: 2, focusArea: 'Exam Strategy' },
    { id: 10, name: 'Chris Zola', age: 9, level: 'A1', parentId: 7, tutorId: 3, focusArea: 'Basic Grammar' },
    { id: 11, name: 'Elodie Zola', age: 16, level: 'B2', parentId: 7, tutorId: 4, focusArea: 'Business Communication' },
    { id: 12, name: 'Sam Diarra', age: 15, level: 'B2', parentId: 8, tutorId: 4, focusArea: 'Presentation Skills' },
    { id: 13, name: 'Aya Diarra', age: 12, level: 'A2', parentId: 8, tutorId: 5, focusArea: 'Reading Comprehension' },
    { id: 14, name: 'Milan Diarra', age: 11, level: 'A2', parentId: 8, tutorId: 5, focusArea: 'Confidence in Speaking' }
];

export const SESSIONS: LearningSession[] = [
    { id: 1, studentId: 1, tutorId: 1, subject: 'Pronunciation Lab', startAt: '2026-06-05T09:00:00', durationMinutes: 60, location: 'Online', status: 'Scheduled' },
    { id: 2, studentId: 3, tutorId: 2, subject: 'DELF Practice', startAt: '2026-06-05T11:00:00', durationMinutes: 90, location: 'Room A2', status: 'Scheduled' },
    { id: 3, studentId: 5, tutorId: 3, subject: 'French Basics', startAt: '2026-06-06T10:00:00', durationMinutes: 60, location: 'Online', status: 'Scheduled' },
    { id: 4, studentId: 9, tutorId: 2, subject: 'Exam Writing Workshop', startAt: '2026-06-06T14:00:00', durationMinutes: 90, location: 'Room B1', status: 'Scheduled' },
    { id: 5, studentId: 13, tutorId: 5, subject: 'Reading Practice', startAt: '2026-06-07T09:30:00', durationMinutes: 60, location: 'Online', status: 'Scheduled' },
    { id: 6, studentId: 2, tutorId: 1, subject: 'Sentence Structure', startAt: '2026-06-07T16:00:00', durationMinutes: 60, location: 'Room C3', status: 'Scheduled' },
    { id: 7, studentId: 8, tutorId: 2, subject: 'Written Expression', startAt: '2026-06-08T10:00:00', durationMinutes: 60, location: 'Online', status: 'Scheduled' },
    { id: 8, studentId: 10, tutorId: 3, subject: 'Listening Practice', startAt: '2026-06-08T15:00:00', durationMinutes: 60, location: 'Room A1', status: 'Scheduled' },
    { id: 9, studentId: 11, tutorId: 4, subject: 'Business Pitching', startAt: '2026-06-02T13:00:00', durationMinutes: 90, location: 'Room B2', status: 'Completed' },
    { id: 10, studentId: 14, tutorId: 5, subject: 'Confidence Coaching', startAt: '2026-06-01T10:30:00', durationMinutes: 60, location: 'Online', status: 'Completed' },
    { id: 11, studentId: 4, tutorId: 2, subject: 'Fluency Sprint', startAt: '2026-05-30T17:00:00', durationMinutes: 60, location: 'Room C1', status: 'Completed' },
    { id: 12, studentId: 12, tutorId: 4, subject: 'Presentation Polish', startAt: '2026-06-09T14:30:00', durationMinutes: 60, location: 'Room B2', status: 'Cancelled' }
];

export const ACTIVITIES: ActivityItem[] = [
    { id: 1, type: 'Enrollment', message: 'New student Lina Koffi enrolled in A1 program.', timestamp: '2026-06-04T08:30:00', actor: 'Admin Team' },
    { id: 2, type: 'Session', message: 'Lucas Bernard completed DELF Practice for Eva Ndaye.', timestamp: '2026-06-04T11:45:00', actor: 'Lucas Bernard' },
    { id: 3, type: 'Tutor', message: 'Sophie Renard submitted updated weekly availability.', timestamp: '2026-06-04T13:10:00', actor: 'Sophie Renard' },
    { id: 4, type: 'Payment', message: 'Invoice for Diarra family marked as paid.', timestamp: '2026-06-04T14:20:00', actor: 'Finance' },
    { id: 5, type: 'Session', message: 'Pronunciation Lab moved to online due to rain.', timestamp: '2026-06-04T15:05:00', actor: 'Operations' }
];

export const CURRENT_TUTOR_ID = 2;
export const CURRENT_PARENT_ID = 8;

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

export const getUpcomingSessions = (): LearningSession[] =>
    SESSIONS
        .filter((session) => session.status === 'Scheduled')
        .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
