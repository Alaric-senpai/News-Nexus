import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { TrendingComponent } from './components/trending/trending.component';
import { CategoryComponent } from './components/category/category.component';
import { NewsdetailsComponent } from './components/newsdetails/newsdetails.component';
import { SectionsComponent } from './components/sections/sections.component';
import { PagemissingComponent } from './components/pagemissing/pagemissing.component';
import { SearchComponent } from './components/search/search.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login page'
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: "Register "

    },
    {
        path: 'home',
        component: HomeComponent,
        // canActivate: [authGuard],
        title: 'News Nexus',
        children: [
            {
                path: '',
                component: TrendingComponent
            },
            {
                path: 'sections',
                component: SectionsComponent,
                children: [
                    {
                        path: 'category/:cat',
                        component: CategoryComponent
                    }
                ]
            },
            {
                path : 'category/:cat',
                component: CategoryComponent
            },
            {
                path: 'details/:url',
                component: NewsdetailsComponent
            },
            {
                path: 'search',
                component: SearchComponent,
                title: 'search for article'
            },
            {
                path: '**',
                component: PagemissingComponent
            }
        ]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
