import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultingAssemblyComponent } from './resulting-assembly.component';

describe('ResultingAssemblyComponent', () => {
  let component: ResultingAssemblyComponent;
  let fixture: ComponentFixture<ResultingAssemblyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultingAssemblyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultingAssemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
