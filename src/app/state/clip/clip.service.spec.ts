import { TestBed } from '@angular/core/testing';

import { ClipService } from './clip.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Clip } from './clip.model';
import { of } from 'rxjs';
import { FIREBASE_OPTIONS } from '@angular/fire';

describe('ClipService', () => {
  let service: ClipService;
  let mockFirestore: jasmine.SpyObj<AngularFirestore>;
  let mockCollection: jasmine.SpyObj<AngularFirestoreCollection<Clip>>;
  let mockDoc: jasmine.SpyObj<AngularFirestoreDocument<Clip>>;
  let mockSnapshot: jasmine.SpyObj<firestore.DocumentSnapshot>;
  let mockClip: Clip = {
    clipType: 'text/plain',
    content: 'Hello World',
    created: null,
  };

  beforeEach(() => {
    mockSnapshot = jasmine.createSpyObj(['data']);
    mockSnapshot.data.and.returnValue(mockClip);
    mockDoc = jasmine.createSpyObj(['get', 'delete', 'set']);
    mockDoc.get.and.returnValue(of(mockSnapshot));
    mockDoc.set.and.resolveTo();
    mockDoc.delete.and.resolveTo();
    mockCollection = jasmine.createSpyObj(['doc']);
    mockCollection.doc.and.returnValue(mockDoc);
    mockFirestore = jasmine.createSpyObj(['collection']);
    mockFirestore.collection.and.returnValue(mockCollection);

    TestBed.configureTestingModule({
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: {} },
        { provide: AngularFirestore, useValue: mockFirestore },
      ]
    });
    service = TestBed.inject(ClipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
