import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjudicatorLoginComponent } from './adjudicator-login.component';

describe('AdjudicatorLoginComponent', () => {
  let component: AdjudicatorLoginComponent;
  let fixture: ComponentFixture<AdjudicatorLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjudicatorLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdjudicatorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
