import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogiqueComponent } from './logique.component';

describe('LogiqueComponent', () => {
  let component: LogiqueComponent;
  let fixture: ComponentFixture<LogiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogiqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
