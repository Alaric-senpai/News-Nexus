import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectiondetailsComponent } from './sectiondetails.component';

describe('SectiondetailsComponent', () => {
  let component: SectiondetailsComponent;
  let fixture: ComponentFixture<SectiondetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectiondetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
