import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeamName } from './edit-team-name';

describe('EditTeamName', () => {
  let component: EditTeamName;
  let fixture: ComponentFixture<EditTeamName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTeamName]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTeamName);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
