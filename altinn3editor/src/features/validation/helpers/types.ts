export interface LayoutValidationError {
  pageIndex: number;
  componentIndex?: number;
  message: string;
  data: any;
}
