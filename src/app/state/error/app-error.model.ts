export interface AppError {
  id: string;
  errorType: 'app' | 'network' | 'permissions';
  message: string;
  content?: any;
  causingComponent: string;
}
