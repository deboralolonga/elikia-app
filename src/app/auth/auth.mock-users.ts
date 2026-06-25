import { DemoLoginUser } from './auth.models';

export const DEMO_LOGIN_USERS: DemoLoginUser[] = [
    {
        id: 1,
        email: 'admin@elikia.test',
        password: 'Admin123!',
        name: 'Elikia Admin',
        role: 'admin',
        allowedJurisdictions: ['ZA'],
        defaultJurisdiction: 'ZA'
    },
    {
        id: 2,
        email: 'admin.ops@elikia.test',
        password: 'Admin123!',
        name: 'Operations Admin',
        role: 'admin',
        allowedJurisdictions: ['ZA', 'KE'],
        defaultJurisdiction: 'ZA'
    },
    {
        id: 7,
        email: 'admin.ke@elikia.test',
        password: 'Admin123!',
        name: 'Kenya Admin',
        role: 'admin',
        allowedJurisdictions: ['KE'],
        defaultJurisdiction: 'KE'
    },
    {
        id: 3,
        email: 'lucas.bernard@elikia.test',
        password: 'Tutor123!',
        name: 'Lucas Bernard',
        role: 'tutor',
        allowedJurisdictions: ['ZA'],
        defaultJurisdiction: 'ZA',
        tutorId: 2
    },
    {
        id: 4,
        email: 'nora.dupuis@elikia.test',
        password: 'Tutor123!',
        name: 'Nora Dupuis',
        role: 'tutor',
        allowedJurisdictions: ['KE'],
        defaultJurisdiction: 'KE',
        tutorId: 3
    },
    {
        id: 5,
        email: 'brigitte.nguema@elikia.test',
        password: 'Parent123!',
        name: 'Brigitte Nguema',
        role: 'parent',
        allowedJurisdictions: ['ZA'],
        defaultJurisdiction: 'ZA',
        parentId: 5
    },
    {
        id: 6,
        email: 'mireille.zola@elikia.test',
        password: 'Parent123!',
        name: 'Mireille Zola',
        role: 'parent',
        allowedJurisdictions: ['KE'],
        defaultJurisdiction: 'KE',
        parentId: 7
    }
];
