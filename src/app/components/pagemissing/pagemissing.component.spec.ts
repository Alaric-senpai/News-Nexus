import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagemissingComponent } from './pagemissing.component';

describe('PagemissingComponent', () => {
  let component: PagemissingComponent;
  let fixture: ComponentFixture<PagemissingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagemissingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagemissingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
