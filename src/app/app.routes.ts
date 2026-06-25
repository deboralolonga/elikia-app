import { Routes } from '@angular/router';
import { OnlineEducationPortalComponent } from './demos/online-education-portal/online-education-portal.component';
import { CoursePortalOnlineComponent } from './demos/course-portal-online/course-portal-online.component';
import { DistantLearningComponent } from './demos/distant-learning/distant-learning.component';
import { ModernTeachingComponent } from './demos/modern-teaching/modern-teaching.component';
import { OnlineSchoolingComponent } from './demos/online-schooling/online-schooling.component';
import { LearningSchoolOnlineComponent } from './demos/learning-school-online/learning-school-online.component';
import { RemoteTrainingOnlineComponent } from './demos/remote-training-online/remote-training-online.component';
import { BusinessCoachingComponent } from './demos/business-coaching/business-coaching.component';
import { HealthCoachingComponent } from './demos/health-coaching/health-coaching.component';
import { LanguageSchoolComponent } from './demos/language-school/language-school.component';
import { GymCoachingComponent } from './demos/gym-coaching/gym-coaching.component';
import { OnlineMotivationCourseComponent } from './demos/online-motivation-course/online-motivation-course.component';
import { OnlineEducationCourseComponent } from './demos/online-education-course/online-education-course.component';
import { OnlineTrainingCourseComponent } from './demos/online-training-course/online-training-course.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AboutPageOneComponent } from './pages/about-page-one/about-page-one.component';
import { AboutPageTwoComponent } from './pages/about-page-two/about-page-two.component';
import { InstructorsPageOneComponent } from './pages/instructors-page-one/instructors-page-one.component';
import { InstructorsPageTwoComponent } from './pages/instructors-page-two/instructors-page-two.component';
import { InstructorsPageThreeComponent } from './pages/instructors-page-three/instructors-page-three.component';
import { InstructorsDetailsPageComponent } from './pages/instructors-details-page/instructors-details-page.component';
import { GalleryPageComponent } from './pages/gallery-page/gallery-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { EventsDetailsPageComponent } from './pages/events-details-page/events-details-page.component';
import { PricingPageComponent } from './pages/pricing-page/pricing-page.component';
import { FeedbackPageComponent } from './pages/feedback-page/feedback-page.component';
import { PartnerPageComponent } from './pages/partner-page/partner-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { FaqPageComponent } from './pages/faq-page/faq-page.component';
import { ComingSoonPageComponent } from './pages/coming-soon-page/coming-soon-page.component';
import { CategoryPageOneComponent } from './pages/category-page-one/category-page-one.component';
import { CategoryPageTwoComponent } from './pages/category-page-two/category-page-two.component';
import { CategoryPageThreeComponent } from './pages/category-page-three/category-page-three.component';
import { CoursesListPageComponent } from './pages/courses-list-page/courses-list-page.component';
import { CoursesGsocTwoPageComponent } from './pages/courses-gsoc-two-page/courses-gsoc-two-page.component';
import { CoursesGsocThreePageComponent } from './pages/courses-gsoc-three-page/courses-gsoc-three-page.component';
import { CoursesGsocFourPageComponent } from './pages/courses-gsoc-four-page/courses-gsoc-four-page.component';
import { CoursesGstwcTwoPageComponent } from './pages/courses-gstwc-two-page/courses-gstwc-two-page.component';
import { CoursesGstwcThreePageComponent } from './pages/courses-gstwc-three-page/courses-gstwc-three-page.component';
import { CoursesGstwcFourPageComponent } from './pages/courses-gstwc-four-page/courses-gstwc-four-page.component';
import { CoursesGstcTwoPageComponent } from './pages/courses-gstc-two-page/courses-gstc-two-page.component';
import { CoursesGstcThreePageComponent } from './pages/courses-gstc-three-page/courses-gstc-three-page.component';
import { CoursesGstcFourPageComponent } from './pages/courses-gstc-four-page/courses-gstc-four-page.component';
import { CoursesDetailsPageComponent } from './pages/courses-details-page/courses-details-page.component';
import { MyDashboardPageComponent } from './pages/my-dashboard-page/my-dashboard-page.component';
import { LmsShellPageComponent } from './pages/lms/lms-shell-page.component';
import { AdminDashboardPageComponent } from './pages/lms/admin-dashboard-page.component';
import { TutorsPageComponent } from './pages/lms/tutors-page.component';
import { StudentsPageComponent } from './pages/lms/students-page.component';
import { SchedulingPageComponent } from './pages/lms/scheduling-page.component';
import { TutorDashboardPageComponent } from './pages/lms/tutor-dashboard-page.component';
import { ParentDashboardPageComponent } from './pages/lms/parent-dashboard-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { DownloadsPageComponent } from './pages/downloads-page/downloads-page.component';
import { EditAddressPageComponent } from './pages/edit-address-page/edit-address-page.component';
import { EditAccountPageComponent } from './pages/edit-account-page/edit-account-page.component';
import { EditBillingAddressPageComponent } from './pages/edit-billing-address-page/edit-billing-address-page.component';
import { EditShippingAddressPageComponent } from './pages/edit-shipping-address-page/edit-shipping-address-page.component';
import { BlogGridPageComponent } from './pages/blog-grid-page/blog-grid-page.component';
import { BlogRightSidebarPageComponent } from './pages/blog-right-sidebar-page/blog-right-sidebar-page.component';
import { BlogFullWidthPageComponent } from './pages/blog-full-width-page/blog-full-width-page.component';
import { BlogDetailsPageComponent } from './pages/blog-details-page/blog-details-page.component';
import { ShopGridPageComponent } from './pages/shop-grid-page/shop-grid-page.component';
import { ShopFullWidthPageComponent } from './pages/shop-full-width-page/shop-full-width-page.component';
import { ProductsDetailsPageComponent } from './pages/products-details-page/products-details-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { authGuard, guestOnlyGuard, roleGuard } from './auth/auth.guards';

export const routes: Routes = [
    {path: 'online-education-portal', component: OnlineEducationPortalComponent},
    {path:'', component: CoursePortalOnlineComponent},
    {path: 'distant-learning', component: DistantLearningComponent},
    {path: 'modern-teaching', component: ModernTeachingComponent},
    {path: 'online-schooling', component: OnlineSchoolingComponent},
    {path: 'learning-school-online', component: LearningSchoolOnlineComponent},
    {path: 'remote-training-online', component: RemoteTrainingOnlineComponent},
    {path: 'business-coaching', component: BusinessCoachingComponent},
    {path: 'health-coaching', component: HealthCoachingComponent},
    {path: 'language-school', component: LanguageSchoolComponent},
    {path: 'gym-coaching', component: GymCoachingComponent},
    {path: 'online-motivation-course', component: OnlineMotivationCourseComponent},
    {path: 'online-education-course', component: OnlineEducationCourseComponent},
    {path: 'online-training-course', component: OnlineTrainingCourseComponent},
    {path: 'about-us', component: AboutPageOneComponent},
    {path: 'about-style-2', component: AboutPageTwoComponent},
    {path: 'instructor-1', component: InstructorsPageOneComponent},
    {path: 'instructor-2', component: InstructorsPageTwoComponent},
    {path: 'instructor-3', component: InstructorsPageThreeComponent},
    {path: 'single-instructor', component: InstructorsDetailsPageComponent},
    {path: 'gallery', component: GalleryPageComponent},
    {path: 'events', component: EventsPageComponent},
    {path: 'single-event', component: EventsDetailsPageComponent},
    {path: 'pricing', component: PricingPageComponent},
    {path: 'feedback', component: FeedbackPageComponent},
    {path: 'partner', component: PartnerPageComponent},
    {path: 'login', component: LoginPageComponent, canActivate: [guestOnlyGuard]},
    {path: 'register', component: RegisterPageComponent},
    {path: 'faqs', component: FaqPageComponent},
    {path: 'coming-soon', component: ComingSoonPageComponent},
    {path: 'courses-category-style-1', component: CategoryPageOneComponent},
    {path: 'courses-category-style-2', component: CategoryPageTwoComponent},
    {path: 'courses-category-style-3', component: CategoryPageThreeComponent},
    {path: 'courses-list', component: CoursesListPageComponent},
    {path: 'courses-2-columns-style-1', component: CoursesGsocTwoPageComponent},
    {path: 'our-programs', component: CoursesGsocThreePageComponent},
    {path: 'courses-4-columns-style-1', component: CoursesGsocFourPageComponent},
    {path: 'courses-2-columns-style-2', component: CoursesGstwcTwoPageComponent},
    {path: 'courses-3-columns-style-2', component: CoursesGstwcThreePageComponent},
    {path: 'courses-4-columns-style-2', component: CoursesGstwcFourPageComponent},
    {path: 'courses-2-columns-style-3', component: CoursesGstcTwoPageComponent},
    {path: 'courses-3-columns-style-3', component: CoursesGstcThreePageComponent},
    {path: 'courses-4-columns-style-3', component: CoursesGstcFourPageComponent},
    {path: 'single-course', component: CoursesDetailsPageComponent},
    {path: 'my-dashboard', component: MyDashboardPageComponent},
    {
        path: 'learning-centre',
        component: LmsShellPageComponent,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'admin', pathMatch: 'full' },
            {
                path: 'admin',
                component: AdminDashboardPageComponent,
                canActivate: [roleGuard],
                data: { roles: ['admin'] }
            },
            {
                path: 'tutors',
                component: TutorsPageComponent,
                canActivate: [roleGuard],
                data: { roles: ['admin'] }
            },
            {
                path: 'students',
                component: StudentsPageComponent,
                canActivate: [roleGuard],
                data: { roles: ['admin'] }
            },
            {
                path: 'scheduling',
                component: SchedulingPageComponent,
                canActivate: [roleGuard],
                data: { roles: ['admin'] }
            },
            {
                path: 'tutor-dashboard',
                component: TutorDashboardPageComponent,
                canActivate: [roleGuard],
                data: { roles: ['tutor', 'admin'] }
            },
            {
                path: 'parent-dashboard',
                component: ParentDashboardPageComponent,
                canActivate: [roleGuard],
                data: { roles: ['parent', 'admin'] }
            }
        ]
    },
    {path: 'orders', component: OrdersPageComponent},
    {path: 'downloads', component: DownloadsPageComponent},
    {path: 'edit-address', component: EditAddressPageComponent},
    {path: 'edit-account', component: EditAccountPageComponent},
    {path: 'edit-billing-address', component: EditBillingAddressPageComponent},
    {path: 'edit-shipping-address', component: EditShippingAddressPageComponent},
    {path: 'blog-style-1', component: BlogGridPageComponent},
    {path: 'blog-style-2', component: BlogRightSidebarPageComponent},
    {path: 'blog-style-3', component: BlogFullWidthPageComponent},
    {path: 'single-blog', component: BlogDetailsPageComponent},
    {path: 'shop-grid', component: ShopGridPageComponent},
    {path: 'shop-grid-fullwidth', component: ShopFullWidthPageComponent},
    {path: 'single-product', component: ProductsDetailsPageComponent},
    {path: 'cart', component: CartPageComponent},
    {path: 'checkout', component: CheckoutPageComponent},
    {path: 'contact', component: ContactPageComponent},
    // Here add new pages component

    {path: '**', component: ErrorPageComponent} // This line will remain down from the whole pages component list
];
