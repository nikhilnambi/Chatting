import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpboxComponent } from './gpbox.component';

describe('GpboxComponent', () => {
  let component: GpboxComponent;
  let fixture: ComponentFixture<GpboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GpboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
