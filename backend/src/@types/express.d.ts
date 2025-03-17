declare namespace Express {
  interface Permission {
    clientId: '*' | number;
    shopIds?: '*' | number[];
  }
  interface Request {
    user?: string | JwtPayload;
    resources?: Permission[];
    id: string;
    app_id?: string;
  }
}
