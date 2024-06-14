import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { MatTableModule, MatTable } from '@angular/material/table'
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator'
import { MatSortModule, MatSort } from '@angular/material/sort'
import { DataTableDataSource, DataTableItem } from './data-table-datasource'

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrl: './data-table.component.scss',
    standalone: true,
    imports: [MatTableModule, MatPaginatorModule, MatSortModule],
})
export class DataTableComponent implements AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator
    @ViewChild(MatSort) sort!: MatSort
    @ViewChild(MatTable) table!: MatTable<DataTableItem>
    dataSource = new DataTableDataSource()

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ['id', 'name']

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
        this.table.dataSource = this.dataSource
    }
}
