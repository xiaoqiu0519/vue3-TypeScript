export interface Iresponse{
  code:number,
  message:null | string,
  success:boolean,
  data:any
}
export interface IloginParams{
  password:string,
  name:string,
  googleCode:string | number,
  systemId:number,
}
export interface IfindRcMatchListParams{
  current?: number,
  matchQueryType: number,
  matchStatus?: [],
  matchType?: number,
  size?: number,
  status?: number | string | "",
}
export interface IfindEnumList{
  rcEnum:string[]
}

export interface IfindMatchRiskMatrixInfoList{
  current?: number,
  matchId?: number | string,
  matchQueryType?: number,
  matchStatus?: [],
  matchType?: number,
  salePeriods?: [],
  size?: number | string,
  sportId?: number | string
}

