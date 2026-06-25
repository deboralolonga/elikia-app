import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { AppUserRole } from './auth.models';

export const authGuard: CanActivateFn = (_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        return true;
    }

    return router.createUrlTree(['/login'], {
        queryParams: {
            redirect: state.url
        }
    });
};

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const allowedRoles = (route.data['roles'] as AppUserRole[] | undefined) ?? [];

    if (!allowedRoles.length || authService.hasRole(allowedRoles)) {
        return true;
    }

    return router.createUrlTree([authService.defaultDashboardRoute()]);
};

export const guestOnlyGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
        return true;
    }

    return router.createUrlTree([authService.defaultDashboardRoute()]);
};
