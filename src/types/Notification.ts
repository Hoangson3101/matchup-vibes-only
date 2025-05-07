
export interface Notification {
  id: string;
  type: 'system' | 'message' | 'match' | 'match_success';
  title: string;
  content: string;
  timestamp: Date;
  read: boolean;
  image?: string;
}
