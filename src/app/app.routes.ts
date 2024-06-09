import { Routes } from '@angular/router'
import { HomeComponent } from './features/home/home.component'
import { LeaderboardComponent } from './features/leaderboard/leaderboard.component'

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'leaderboard',
        component: LeaderboardComponent,
    },
    {
        path: '**',
        redirectTo: '',
    },
]
