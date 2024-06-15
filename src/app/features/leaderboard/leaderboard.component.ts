import { Component, inject } from '@angular/core'
import { DataTableComponent } from '../data-table/data-table.component'
import { ResultsService } from '../../core/results.service'

@Component({
    selector: 'app-leaderboard',
    standalone: true,
    imports: [DataTableComponent],
    templateUrl: './leaderboard.component.html',
    styleUrl: './leaderboard.component.scss',
})
export class LeaderboardComponent {
  protected resultsService = inject(ResultsService)
}
