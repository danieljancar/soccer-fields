import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-leaderboard',
    standalone: true,
    imports: [],
    templateUrl: './leaderboard.component.html',
    styleUrl: './leaderboard.component.scss',
})
export class LeaderboardComponent implements OnInit
{
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    changeLastDay(newLastDay: Date){
        throw new Error('Method not implemented.');
        return newLastDay
    }
}
