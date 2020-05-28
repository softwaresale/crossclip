import { TestBed } from '@angular/core/testing';

import { ClipService } from './clip.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firestore, User } from 'firebase';
import { Clip } from './clip.model';
import { of, EMPTY } from 'rxjs';
import { FIREBASE_OPTIONS } from '@angular/fire';
import { AuthService } from 'src/app/auth/auth.service';

describe('ClipService', () => {
  let service: ClipService;
  let mockFirestore: jasmine.SpyObj<AngularFirestore>;
  let mockCollection: jasmine.SpyObj<AngularFirestoreCollection<Clip>>;
  let mockDoc: jasmine.SpyObj<AngularFirestoreDocument<Clip>>;
  let mockSnapshot: jasmine.SpyObj<firestore.DocumentSnapshot>;
  let mockUser = {
    uid: '142'
  };
  let mockClip: Clip = {
    clipType: 'text/plain',
    content: 'Hello World',
    created: null,
    id: '1234',
    synced: false,
  };
  let mockSyncedClip: Clip = {
    ...mockClip,
    synced: true,
    uid: mockUser.uid
  };
  let mockAuthService: AuthService;

  beforeEach(() => {
    mockSnapshot = jasmine.createSpyObj(['data']);
    // TODO ask Jeremy about this practice
    mockSnapshot.data.and.returnValue(mockClip).and.returnValue(mockSyncedClip);
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
    mockAuthService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('syncClip', () => {

    it('should return a truthy value', done => {
      spyOn(mockAuthService, 'user').and.returnValue(of((mockUser as unknown) as User));
      service.syncClip(mockClip).subscribe(value => {
        expect(value).toBeTruthy();
        done();
      })
    });

    it('should call authService#user', () => {
      spyOn(mockAuthService, 'user').and.returnValue(EMPTY);
      service.syncClip(mockClip);
      expect(mockAuthService.user).toHaveBeenCalled();
    });

    it('should call #doc with clip id', () => {
      service.syncClip(mockClip);
      expect(mockCollection.doc).toHaveBeenCalledWith(mockClip.id);
    });

    it('should set synced flag and uid', done => {
      spyOn(mockAuthService, 'user').and.returnValue(of((mockUser as unknown) as User));
      service.syncClip(mockClip).subscribe(updatedClip => {
        expect(updatedClip.synced).toBeTrue();
        expect(updatedClip.uid).toBeTruthy();
        expect(updatedClip.uid).toBe(mockUser.uid);
        done();
      })
    });
  });

  describe('deleteRemoteClip', () => {

    it('should return clip id', done => {
      service.deleteRemoteClip(mockClip).subscribe(id => {
        expect(id).toBe(mockClip.id);
        done();
      });
    });

    it('should call clipRef#delete', () => {
      service.deleteRemoteClip(mockClip);
      expect(mockDoc.delete).toHaveBeenCalled();
    });
  });
});
