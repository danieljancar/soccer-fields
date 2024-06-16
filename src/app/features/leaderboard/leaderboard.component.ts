import { Component, inject } from '@angular/core'
import { DataTableComponent } from '../data-table/data-table.component'
import { ResultsService } from '../../core/results.service'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
    selector: 'app-leaderboard',
    standalone: true,
    imports: [DataTableComponent, ReactiveFormsModule],
    templateUrl: './leaderboard.component.html',
    styleUrl: './leaderboard.component.scss',
})
export class LeaderboardComponent {
    protected resultsService = inject(ResultsService)
    leagueControl = new FormControl('bundesliga')
    dayControl = new FormControl(1)
    form = new FormGroup({
        league: this.leagueControl,
        day: this.dayControl,
    })

    onSubmit(): void {
        const league = this.form.value.league as string
        const day = this.form.value.day as number
        this.resultsService.setFilter(league, day)
    }
}
