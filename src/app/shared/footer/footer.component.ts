import { Component } from '@angular/core'
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar'
import { NgOptimizedImage } from '@angular/common'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { RouterLink } from '@angular/router'

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [
        MatToolbar,
        MatToolbarRow,
        NgOptimizedImage,
        MatButton,
        MatIcon,
        MatIconButton,
        RouterLink,
    ],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent {
    protected currentYear = new Date().getFullYear()
}
