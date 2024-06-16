import { DataSource } from '@angular/cdk/collections'
import { MatSort } from '@angular/material/sort'
import { map } from 'rxjs/operators'
import { Observable, of as observableOf, merge } from 'rxjs'
import { ResultsService } from '../../core/results.service'

export interface DataTableItem {
    name: string
    rank: number
    points: number
    scoreCount: number
    wins: number
    losses: number
    draws: number
    scoredGoals: number
    receivedGoals: number
    diff: number
}

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
    data!: DataTableItem[]
    sort: MatSort | undefined
    selectedLeague = 'bundesliga'

    constructor(private resultsService: ResultsService) {
        super()
        this.loadLeaderboard(this.selectedLeague)
    }

    loadLeaderboard(league: string): void {
        this.resultsService.getLeaderboard(league).subscribe((data) => {
            this.data = data
        })
    }

    onLeagueChange(league: string): void {
        this.selectedLeague = league
        this.loadLeaderboard(league)
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<DataTableItem[]> {
        if (this.sort) {
            // Combine everything that affects the rendered data into one update
            // stream for the data-table to consume.
            return merge(observableOf(this.data), this.sort.sortChange).pipe(
                map(() => {
                    return this.getSortedData([...this.data])
                })
            )
        } else {
            throw Error(
                'Please set the sort on the data source before connecting.'
            )
        }
    }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect(): void {
        //
    }

    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
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
                case 'diff':
                    return compare(+a.diff, +b.diff, isAsc)
                case 'wins':
                    return compare(+a.wins, +b.wins, isAsc)
                case 'name':
                    return compare(+a.wins, +b.wins, isAsc)
                default:
                    return 0
            }
        })
    }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
    a: string | number,
    b: string | number,
    isAsc: boolean
): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
}
