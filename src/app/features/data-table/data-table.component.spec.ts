import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { DataTableComponent } from './data-table.component'

describe('DataTableComponent', () => {
    let component: DataTableComponent
    let fixture: ComponentFixture<DataTableComponent>

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(DataTableComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should compile', () => {
        expect(component).toBeTruthy()
    })
})
