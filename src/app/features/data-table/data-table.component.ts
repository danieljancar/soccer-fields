import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { MatTableModule, MatTable } from '@angular/material/table'
import { MatSortModule, MatSort } from '@angular/material/sort'
import { DataTableDataSource, DataTableItem } from './data-table-datasource'

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrl: './data-table.component.scss',
    standalone: true,
    imports: [MatTableModule, MatSortModule],
})
export class DataTableComponent implements AfterViewInit {
    @ViewChild(MatSort) sort!: MatSort
    @ViewChild(MatTable) table!: MatTable<DataTableItem>
    dataSource = new DataTableDataSource()

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
        'rank',
        'name',
        'points',
        'matchesPlayed',
        'gameResults',
        'goalStats',
        'goalDiff',
    ]

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort
        this.table.dataSource = this.dataSource
    }
}
