import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Iscription2Component } from './iscription2.component';

describe('Iscription2Component', () => {
  let component: Iscription2Component;
  let fixture: ComponentFixture<Iscription2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Iscription2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Iscription2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
