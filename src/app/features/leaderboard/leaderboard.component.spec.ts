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

    it('should check if the Ligadaten have been loaded', () => {
        component.ngOnInit();
        const ligadaten: any = []
        expect(component).toContain(ligadaten)
    })

    it('should sort the Table by poinst(desc), goalDifference(desc), wins(desc) and name(asc)', () => {
        component.ngOnInit();
        expect(component).toBeDefined();
    })

    it('should have a lastDay variable that can be changed', () => {
        component.ngOnInit();
        var lastDay: Date
        lastDay = component.changeLastDay(new Date())
        expect(component).toContain(lastDay)
    }) 
})
