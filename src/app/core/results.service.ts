import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'
import { Results } from './results.model'
import { map } from 'rxjs/operators'
import { DataTableItem } from '../features/data-table/data-table-datasource'
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root',
})
export class ResultsService {
    private jsonUrl = './results.json'
    private leaderboardSubject = new BehaviorSubject<DataTableItem[]>([])
    leaderboard$ = this.leaderboardSubject.asObservable()

    constructor(private http: HttpClient) {}

    getResults(): Observable<Results> {
        return this.http.get<Results>(this.jsonUrl)
    }

    getAvailableLeagues(): Observable<string[]> {
        return this.getResults().pipe(map((results) => Object.keys(results)))
    }

    setFilter(league: string | null, maxDay: number): void {
        this.getResults()
            .pipe(
                map((results) => {
                    const leaderboard: Record<string, DataTableItem> = {}

                    if (league) {
                        this.processLeague(
                            results[league as keyof Results],
                            maxDay,
                            leaderboard
                        )
                    } else {
                        for (const league in results) {
                            this.processLeague(
                                results[league as keyof Results],
                                maxDay,
                                leaderboard
                            )
                        }
                    }

                    const sortedLeaderboard = Object.values(leaderboard).sort(
                        (a, b) =>
                            b.points - a.points ||
                            b.goalDiff - a.goalDiff ||
                            b.wins - a.wins ||
                            a.name.localeCompare(b.name)
                    )

                    sortedLeaderboard.forEach((team, index) => {
                        team.rank = index + 1
                    })

                    this.leaderboardSubject.next(sortedLeaderboard)
                })
            )
            .subscribe()
    }

    private processLeague(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        leagueData: any,
        maxDay: number,
        leaderboard: Record<string, DataTableItem>
    ) {
        for (const day in leagueData) {
            if (parseInt(day.replace('day', ''), 10) > maxDay) continue

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            leagueData[day].forEach((match: any) => {
                this.updateTeamStats(leaderboard, match.home, match.away)
                this.updateTeamStats(leaderboard, match.away, match.home)
            })
        }
    }

    private updateTeamStats(
        leaderboard: Record<string, DataTableItem>,
        team: { name: string; score: number },
        opponent: { name: string; score: number }
    ) {
        if (!leaderboard[team.name]) {
            leaderboard[team.name] = {
                name: team.name,
                rank: 0,
                points: 0,
                matchesPlayed: 0,
                wins: 0,
                losses: 0,
                draws: 0,
                scoredGoals: 0,
                receivedGoals: 0,
                goalDiff: 0,
            }
        }

        const teamStats = leaderboard[team.name]
        teamStats.scoredGoals += team.score
        teamStats.receivedGoals += opponent.score
        teamStats.goalDiff = teamStats.scoredGoals - teamStats.receivedGoals
        teamStats.matchesPlayed += 1

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

    getLeaderboardData(): Observable<DataTableItem[]> {
        return this.leaderboard$
    }
}
