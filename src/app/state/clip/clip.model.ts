
import { firestore } from 'firebase';

export interface Clip {
  id?: string;
  content: string; // For now, only support text
  clipType: string;
  created: firestore.Timestamp;
  synced?: boolean;
  comment?: string;
}
