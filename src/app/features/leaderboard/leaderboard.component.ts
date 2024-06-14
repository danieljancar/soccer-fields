import { Component } from '@angular/core'
import { DataTableComponent } from '../data-table/data-table.component'

@Component({
    selector: 'app-leaderboard',
    standalone: true,
    imports: [DataTableComponent],
    templateUrl: './leaderboard.component.html',
    styleUrl: './leaderboard.component.scss',
})
export class LeaderboardComponent {}
