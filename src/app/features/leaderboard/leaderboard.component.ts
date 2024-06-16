import { Component, inject, OnInit } from '@angular/core'
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { ResultsService } from '../../core/results.service'
import { saveAs } from 'file-saver'
import { DataTableItem } from '../data-table/data-table-datasource'
import { MatOption } from '@angular/material/core'
import { MatFormField, MatLabel, MatSelect } from '@angular/material/select'
import { MatInput } from '@angular/material/input'
import { MatButton } from '@angular/material/button'
import { DataTableComponent } from '../data-table/data-table.component'

@Component({
    selector: 'app-leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.scss'],
    standalone: true,
    imports: [
        MatOption,
        MatSelect,
        MatLabel,
        MatFormField,
        ReactiveFormsModule,
        MatInput,
        MatButton,
        DataTableComponent,
    ],
})
export class LeaderboardComponent implements OnInit {
    protected resultsService = inject(ResultsService)
    leagues: string[] = []
    leagueControl = new FormControl('', Validators.required)
    dayControl = new FormControl(1, [Validators.required, Validators.min(1)])
    form = new FormGroup({
        league: this.leagueControl,
        day: this.dayControl,
    })

    ngOnInit(): void {
        this.resultsService.getAvailableLeagues().subscribe((leagues) => {
            this.leagues = ['All Leagues', ...leagues]
            if (this.leagues.length > 0) {
                this.leagueControl.setValue(this.leagues[0])
            }
        })
    }

    onSubmit(): void {
        if (this.form.valid) {
            const league =
                this.form.value.league === 'All Leagues'
                    ? null
                    : (this.form.value.league as string)
            const day = this.form.value.day as number
            this.resultsService.setFilter(league, day)
        }
    }

    downloadCSV(): void {
        this.resultsService.getLeaderboardData().subscribe((data) => {
            const csvData = this.convertToCSV(data)
            const blob = new Blob([csvData], { type: 'text/csv' })
            saveAs(blob, 'leaderboard.csv')
        })
    }

    copyToClipboard(): void {
        this.resultsService.getLeaderboardData().subscribe((data) => {
            const csvData = this.convertToCSV(data)
            navigator.clipboard.writeText(csvData).then(() => {
                console.log('Copied to clipboard')
            })
        })
    }

    private convertToCSV(data: DataTableItem[]): string {
        const header = [
            'Rank',
            'Name',
            'Points',
            'Matches Played',
            'Wins',
            'Losses',
            'Draws',
            'Scored Goals',
            'Received Goals',
            'Goal Difference',
        ]
        const rows = data.map((team) => [
            team.rank,
            team.name,
            team.points,
            team.matchesPlayed,
            team.wins,
            team.losses,
            team.draws,
            team.scoredGoals,
            team.receivedGoals,
            team.goalDiff,
        ])

        return [header, ...rows].map((e) => e.join(',')).join('\n')
    }
}
