import http from './http'

import { Iresponse ,IloginParams} from '@/interface/commom';
export const login =(params:IloginParams):Promise<Iresponse> => http.post('/login',params)

import { IfindEnumList } from '@/interface/commom'
export const findEnumList = (params:IfindEnumList):Promise<Iresponse>=> http.post('/tcs/common/findEnumList',params)


import { IfindMatchRiskMatrixInfoList } from '@/interface/commom'
export const findMatchRiskMatrixInfoList = (params:IfindMatchRiskMatrixInfoList):Promise<Iresponse> => http.post('tcs/riskMatrix/findMatchRiskMatrixInfoList',params)