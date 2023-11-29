export interface PayloadToken {
  uuid: string;
  role?: string;
  name?: string;
  email?: string;
  lastname?: string;
  iat?: number;
  exp?: number;
  session_uuid?: string;
}

export interface EmailToken {
  email: string;
  iat?: number;
  exp?: number;
}
