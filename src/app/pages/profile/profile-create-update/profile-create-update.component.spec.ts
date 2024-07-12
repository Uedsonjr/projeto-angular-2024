import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCreateUpdateComponent } from './profile-create-update.component';

describe('ProfileCreateUpdateComponent', () => {
  let component: ProfileCreateUpdateComponent;
  let fixture: ComponentFixture<ProfileCreateUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileCreateUpdateComponent]
    });
    fixture = TestBed.createComponent(ProfileCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
