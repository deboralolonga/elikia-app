export type AppUserRole = 'admin' | 'tutor' | 'parent';
export type JurisdictionCode = 'ZA' | 'KE';

export interface AuthUser {
    id: number;
    email: string;
    name: string;
    role: AppUserRole;
    allowedJurisdictions: JurisdictionCode[];
    defaultJurisdiction: JurisdictionCode;
    tutorId?: number;
    parentId?: number;
}

export interface DemoLoginUser extends AuthUser {
    password: string;
}
