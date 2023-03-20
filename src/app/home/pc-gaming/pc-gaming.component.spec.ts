import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcGamingComponent } from './pc-gaming.component';

describe('PcGamingComponent', () => {
  let component: PcGamingComponent;
  let fixture: ComponentFixture<PcGamingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcGamingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcGamingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
