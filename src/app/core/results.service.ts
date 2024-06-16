import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Results } from './results.model'
import { map } from 'rxjs/operators'
import { DataTableItem } from '../features/data-table/data-table-datasource'
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root',
})
export class ResultsService {
    private jsonUrl = '../../../public/results.json'

    constructor(private http: HttpClient) {}

    getResults(): Observable<Results> {
        return this.http.get<Results>(this.jsonUrl)
    }

    getLeaderboard(league: string): Observable<DataTableItem[]> {
        return this.getResults().pipe(
            map((results) => {
                const leaderboard: Record<string, DataTableItem> = {}

                const leagueData = results[league as keyof Results]

                for (const day in leagueData) {
                    leagueData[day].forEach((match) => {
                        this.updateTeamStats(
                            leaderboard,
                            match.home,
                            match.away
                        )
                        this.updateTeamStats(
                            leaderboard,
                            match.away,
                            match.home
                        )
                    })
                }

                const sortedLeaderboard = Object.values(leaderboard).sort(
                    (a, b) => b.points - a.points || b.diff - a.diff
                )

                sortedLeaderboard.forEach((team, index) => {
                    team.rank = index + 1
                })

                return sortedLeaderboard
            })
        )
    }

    private updateTeamStats(
        leaderboard: Record<string, DataTableItem>,
        team: {
            name: string
            score: number
        },
        opponent: { name: string; score: number }
    ) {
        const teamStats = leaderboard[team.name]
        teamStats.scoredGoals += team.score
        teamStats.receivedGoals += opponent.score
        teamStats.diff = teamStats.scoredGoals - teamStats.receivedGoals
        teamStats.scoreCount += 1

        if (team.score > opponent.score) {
            teamStats.wins += 1
            teamStats.points += 3
        } else if (team.score < opponent.score) {
            teamStats.losses += 1
        } else {
            teamStats.draws += 1
            teamStats.points += 1
        }
    }
}
