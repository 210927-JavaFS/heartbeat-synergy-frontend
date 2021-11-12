import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JunkBranchComponent } from './junk-branch.component';

describe('JunkBranchComponent', () => {
  let component: JunkBranchComponent;
  let fixture: ComponentFixture<JunkBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JunkBranchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JunkBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
