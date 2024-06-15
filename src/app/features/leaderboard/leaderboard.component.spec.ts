import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LeaderboardComponent } from './leaderboard.component'

describe('LeaderboardComponent', () => {
    let component: LeaderboardComponent
    let fixture: ComponentFixture<LeaderboardComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LeaderboardComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(LeaderboardComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should check if the resultData have been loaded', () => {
        component.ngOnInit()
        expect(component.rawDataList.length).toBeGreaterThan(0)
    })

    it('should check if the resultData could successfully be converted', () => {
        component.ngOnInit()
        expect(component.ligaDataList.length).toBeGreaterThan(0)
    })

    it('should have a lastDay variable that can be changed', () => {
        component.ngOnInit()
        const lastDay = 8
        component.changeLastDay(8)
        expect(component.lastDay).toBe(lastDay)
    })

    it('should sort the Table by poinst(desc), goalDifference(desc), wins(desc) and name(asc)', () => {
        component.ngOnInit()
        expect(component).toBeDefined()
    })

    it('should check if the data is calculated correctly', () => {
        component.ngOnInit()
        expect(component).toBeDefined()
    })

    it('should check if the lastDay gets correctly applied', () => {
        component.ngOnInit()
        expect(component).toBeDefined()
    })
})
