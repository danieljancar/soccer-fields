import { Component, OnDestroy, OnInit } from '@angular/core'
import { MarkdownComponent } from 'ngx-markdown'
import { HttpClient } from '@angular/common/http'
import { Subscription } from 'rxjs'
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card'

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [MarkdownComponent, MatCard, MatCardContent, MatCardHeader],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
    constructor(private http: HttpClient) {}

    private subscription: Subscription = new Subscription()
    protected readme: string | undefined

    ngOnInit() {
        this.subscription.add(
            this.http
                .get(
                    'https://raw.githubusercontent.com/danieljancar/soccer-fields/master/README.md',
                    { responseType: 'text' }
                )
                .subscribe((data) => {
                    this.readme = data
                })
        )
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}
