import { DataSource } from '@angular/cdk/collections'
import { MatSort } from '@angular/material/sort'
import { map } from 'rxjs/operators'
import { Observable,  merge, BehaviorSubject } from 'rxjs'
import { ResultsService } from '../../core/results.service'

export interface DataTableItem {
    name: string
    rank: number
    points: number
    matchesPlayed: number
    wins: number
    losses: number
    draws: number
    scoredGoals: number
    receivedGoals: number
    goalDiff: number
}

export class DataTableDataSource extends DataSource<DataTableItem> {
    private data = new BehaviorSubject<DataTableItem[]>([])
    sort: MatSort | undefined

    constructor(private resultsService: ResultsService) {
        super()
        this.resultsService.leaderboard$.subscribe((data) => {
            this.data.next(data)
        })
    }

    connect(): Observable<DataTableItem[]> {
        if (this.sort) {
            return merge(this.data, this.sort.sortChange).pipe(
                map(() => {
                    return this.getSortedData([...this.data.value])
                })
            )
        } else {
            throw Error(
                'Please set the sort on the data source before connecting.'
            )
        }
    }

    disconnect(): void {
        this.data.complete()
    }

    private getSortedData(data: DataTableItem[]): DataTableItem[] {
        if (!this.sort || !this.sort.active || this.sort.direction === '') {
            return data
        }

        return data.sort((a, b) => {
            const isAsc = this.sort?.direction === 'asc'
            switch (this.sort?.active) {
                case 'rank':
                    return compare(+a.rank, +b.rank, isAsc)
                case 'points':
                    return compare(+a.points, +b.points, isAsc)
                case 'goalDiff':
                    return compare(+a.goalDiff, +b.goalDiff, isAsc)
                case 'wins':
                    return compare(+a.wins, +b.wins, isAsc)
                case 'name':
                    return compare(a.name, b.name, isAsc)
                default:
                    return 0
            }
        })
    }
}

function compare(
    a: string | number,
    b: string | number,
    isAsc: boolean
): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
}
