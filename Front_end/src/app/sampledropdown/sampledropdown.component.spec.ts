import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampledropdownComponent } from './sampledropdown.component';

describe('SampledropdownComponent', () => {
  let component: SampledropdownComponent;
  let fixture: ComponentFixture<SampledropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampledropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampledropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
