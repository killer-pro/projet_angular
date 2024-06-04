import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Iscription1Component } from './iscription1.component';

describe('Iscription1Component', () => {
  let component: Iscription1Component;
  let fixture: ComponentFixture<Iscription1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Iscription1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Iscription1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
