import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DEMO_LOGIN_USERS } from './auth.mock-users';
import { AppUserRole, AuthUser, DemoLoginUser, JurisdictionCode } from './auth.models';

interface LoginResult {
    ok: boolean;
    message?: string;
    user?: AuthUser;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly storageKey = 'elikia-auth-user';
    private readonly jurisdictionStorageKey = 'elikia-active-jurisdiction';
    private readonly browser: boolean;

    private readonly currentUserSignal = signal<AuthUser | null>(null);
    readonly currentUser = this.currentUserSignal.asReadonly();
    private readonly activeJurisdictionSignal = signal<JurisdictionCode>('ZA');
    readonly activeJurisdiction = this.activeJurisdictionSignal.asReadonly();

    constructor(@Inject(PLATFORM_ID) platformId: object) {
        this.browser = isPlatformBrowser(platformId);

        if (this.browser) {
            this.restoreFromStorage();
        }
    }

    login(email: string, password: string): LoginResult {
        const normalizedEmail = email.trim().toLowerCase();
        const matchedUser = DEMO_LOGIN_USERS.find((user) =>
            user.email.toLowerCase() === normalizedEmail && user.password === password
        );

        if (!matchedUser) {
            return {
                ok: false,
                message: 'Invalid email or password. Use one of the demo accounts listed below.'
            };
        }

        const user = this.toAuthUser(matchedUser);
        this.currentUserSignal.set(user);
        this.setActiveJurisdiction(user.defaultJurisdiction);
        this.persistToStorage(user);

        return {
            ok: true,
            user
        };
    }

    logout(): void {
        this.currentUserSignal.set(null);
        this.activeJurisdictionSignal.set('ZA');

        if (this.browser) {
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.jurisdictionStorageKey);
        }
    }

    isAuthenticated(): boolean {
        return !!this.currentUserSignal();
    }

    hasRole(roles: AppUserRole[]): boolean {
        const user = this.currentUserSignal();
        return !!user && roles.includes(user.role);
    }

    jurisdictionOptions(): JurisdictionCode[] {
        const user = this.currentUserSignal();
        return user?.allowedJurisdictions ?? [];
    }

    canSwitchJurisdiction(): boolean {
        return this.jurisdictionOptions().length > 1;
    }

    setActiveJurisdiction(jurisdiction: JurisdictionCode): void {
        const user = this.currentUserSignal();

        if (!user || !user.allowedJurisdictions.includes(jurisdiction)) {
            return;
        }

        this.activeJurisdictionSignal.set(jurisdiction);

        if (this.browser) {
            localStorage.setItem(this.jurisdictionStorageKey, jurisdiction);
        }
    }

    jurisdictionLabel(jurisdiction: JurisdictionCode): string {
        if (jurisdiction === 'ZA') {
            return 'South Africa';
        }

        return 'Kenya';
    }

    dashboardRouteForRole(role: AppUserRole): string {
        switch (role) {
            case 'admin':
                return '/learning-centre/admin';
            case 'tutor':
                return '/learning-centre/tutor-dashboard';
            case 'parent':
                return '/learning-centre/parent-dashboard';
            default:
                return '/learning-centre/admin';
        }
    }

    defaultDashboardRoute(): string {
        const user = this.currentUserSignal();

        if (!user) {
            return '/login';
        }

        return this.dashboardRouteForRole(user.role);
    }

    private persistToStorage(user: AuthUser): void {
        if (!this.browser) {
            return;
        }

        localStorage.setItem(this.storageKey, JSON.stringify(user));
    }

    private restoreFromStorage(): void {
        const rawValue = localStorage.getItem(this.storageKey);

        if (!rawValue) {
            return;
        }

        try {
            const parsedUser = JSON.parse(rawValue) as Partial<AuthUser>;
            const restoredUser = this.normalizeRestoredUser(parsedUser);

            if (restoredUser) {
                this.currentUserSignal.set(restoredUser);

                const storedJurisdiction = localStorage.getItem(this.jurisdictionStorageKey) as JurisdictionCode | null;
                const fallbackJurisdiction = restoredUser.defaultJurisdiction;

                if (storedJurisdiction && restoredUser.allowedJurisdictions.includes(storedJurisdiction)) {
                    this.activeJurisdictionSignal.set(storedJurisdiction);
                } else {
                    this.activeJurisdictionSignal.set(fallbackJurisdiction);
                }
            }
        } catch {
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.jurisdictionStorageKey);
        }
    }

    private toAuthUser(user: DemoLoginUser): AuthUser {
        const { password: _password, ...safeUser } = user;
        return safeUser;
    }

    private normalizeRestoredUser(user: Partial<AuthUser>): AuthUser | null {
        if (!user?.email || !user?.name || !user?.role) {
            return null;
        }

        const matchedDemoUser = DEMO_LOGIN_USERS.find((demoUser) =>
            demoUser.email.toLowerCase() === user.email?.toLowerCase()
        );

        const fallbackJurisdiction = matchedDemoUser?.defaultJurisdiction ?? 'ZA';
        const fallbackAllowedJurisdictions = matchedDemoUser?.allowedJurisdictions ?? [fallbackJurisdiction];
        const allowedJurisdictions = user.allowedJurisdictions?.length
            ? user.allowedJurisdictions
            : fallbackAllowedJurisdictions;

        const defaultJurisdiction = user.defaultJurisdiction && allowedJurisdictions.includes(user.defaultJurisdiction)
            ? user.defaultJurisdiction
            : fallbackJurisdiction;

        return {
            id: user.id ?? matchedDemoUser?.id ?? 0,
            email: user.email,
            name: user.name,
            role: user.role,
            tutorId: user.tutorId ?? matchedDemoUser?.tutorId,
            parentId: user.parentId ?? matchedDemoUser?.parentId,
            allowedJurisdictions,
            defaultJurisdiction
        };
    }

}
