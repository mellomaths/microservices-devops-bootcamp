export interface ServiceResponse {
  status: number;
  description: string;
  payload: any;
  errors: ServiceError[];
}

export interface ServiceError {
  code: string;
  field: string;
  message: string;
}

export interface ServiceValidationResponse {
  isOk: boolean;
  errors: ServiceError[];
}
