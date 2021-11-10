import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialMatchComponent } from './potential-match.component';

describe('PotentialMatchComponent', () => {
  let component: PotentialMatchComponent;
  let fixture: ComponentFixture<PotentialMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
