import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamCompteComponent } from './param-compte.component';

describe('ParamCompteComponent', () => {
  let component: ParamCompteComponent;
  let fixture: ComponentFixture<ParamCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamCompteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParamCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
