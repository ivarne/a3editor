export interface LayoutValidationError {
  pageIndex: number;
  componentIndex: number;
  message: string;
  data?: any; // Any raw json that might make sense to display
}
