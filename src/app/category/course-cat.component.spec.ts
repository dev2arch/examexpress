import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCatComponent } from './course-cat.component';

describe('CourseCatComponent', () => {
  let component: CourseCatComponent;
  let fixture: ComponentFixture<CourseCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
