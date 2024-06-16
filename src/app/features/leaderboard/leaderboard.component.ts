import { Component, inject, OnInit } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ResultsService } from '../../core/results.service'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatOption, MatSelect } from '@angular/material/select'
import { DataTableComponent } from '../data-table/data-table.component'
import { MatButton } from '@angular/material/button'
import { MatInput } from '@angular/material/input'

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
    DataTableComponent,
    MatButton,
    MatInput,
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
      this.leagues = leagues
      if (this.leagues.length > 0) {
        this.leagueControl.setValue(this.leagues[0])
      }
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const league = this.form.value.league as string
      const day = this.form.value.day as number
      this.resultsService.setFilter(league, day)
    }
  }
}
