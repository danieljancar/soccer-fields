import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-leaderboard',
    standalone: true,
    imports: [],
    templateUrl: './leaderboard.component.html',
    styleUrl: './leaderboard.component.scss',
})
export class LeaderboardComponent implements OnInit {
    public lastDay: number = 0
    public rawDataList: any = []
    public ligaDataList: any = []

    ngOnInit(): void {
        // Daten aus results.json ins radDataList laden und mit convertData() konvertieren
    }

    convertData() {
        // Daten von rawDataList nehmen, für die Tabelle konvertieren und in ligaDataList abspeichern
        throw new Error('Not implemented yet')
    }

    changeLastDay(newLastDay: number) {
        this.lastDay = newLastDay
    }
}
