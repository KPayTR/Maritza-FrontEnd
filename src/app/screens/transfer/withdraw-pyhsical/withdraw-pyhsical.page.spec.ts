import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WithdrawPyhsicalPage } from './withdraw-pyhsical.page';

describe('WithdrawPyhsicalPage', () => {
  let component: WithdrawPyhsicalPage;
  let fixture: ComponentFixture<WithdrawPyhsicalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawPyhsicalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WithdrawPyhsicalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
