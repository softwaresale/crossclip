import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipDisplayComponent } from './clip-display.component';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from 'src/app/state/state';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { firestore } from 'firebase';

describe('ClipDisplayComponent', () => {
  let component: ClipDisplayComponent;
  let fixture: ComponentFixture<ClipDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipDisplayComponent ],
      providers: [
        provideMockStore({ initialState }),
      ],
      imports: [
        MatSnackBarModule,
        MatDialogModule,
        BrowserAnimationsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipDisplayComponent);
    component = fixture.componentInstance;
    component.clip = {
      clipType: 'text/plain',
      content: 'Hello World',
      created: firestore.Timestamp.now(),
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display clip content', () => {
    // There should be only one pre
    const contentText = fixture.debugElement.query(By.css('pre')).nativeElement.textContent;
    
    expect(contentText).toContain(component.clip.content);
  });
});
