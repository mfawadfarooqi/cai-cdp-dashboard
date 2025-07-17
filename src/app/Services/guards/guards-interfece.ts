export interface Login {
  statusCode: number;
  responseMsg: string;
  data: LoginDto;
}
export interface LoginDto {
  accessToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  refreshToken: string;
  username: string;
  organizationName: string;
  role: string;
  client?: string;
  moduleStatus: ModuleStatus;
  sector: string;
  domain: string;
  daysCount: any;
}
export interface ModuleStatus {
  infraMonitoring: boolean;
  ddp: boolean;
  skurio: boolean;
  apt: boolean;
  riskXchange: boolean;
  tip: boolean;
  vp: boolean;
  siem: boolean;
  community: boolean;
  sour: boolean;
}
