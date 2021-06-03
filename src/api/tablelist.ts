import http from './http'

import { Iresponse ,IfindRcMatchListParams} from '@/interface/commom';

export const findRcMatchList =(params:IfindRcMatchListParams):Promise<Iresponse> => http.post('/tcs/rcMatchInfo/findRcMatchList',params)