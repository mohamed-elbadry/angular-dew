import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Skin } from './skin';

describe('Skin', () => {
  let component: Skin;
  let fixture: ComponentFixture<Skin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Skin],
    }).compileComponents();

    fixture = TestBed.createComponent(Skin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
