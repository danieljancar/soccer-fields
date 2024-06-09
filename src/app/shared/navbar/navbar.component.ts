import { Component, OnInit } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar'
import { NgOptimizedImage } from '@angular/common'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { RouterLink } from '@angular/router'

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        MatIcon,
        MatIconButton,
        MatToolbarRow,
        MatToolbar,
        NgOptimizedImage,
        MatButton,
        RouterLink,
    ],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    isSmallScreen = false

    constructor(private breakpointObserver: BreakpointObserver) {}

    ngOnInit() {
        this.breakpointObserver
            .observe([Breakpoints.Handset])
            .subscribe((result) => {
                this.isSmallScreen = result.matches
            })
    }
}
