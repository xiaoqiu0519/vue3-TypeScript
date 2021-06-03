import http from './http'

import { Iresponse ,IloginParams} from '@/interface/commom';

export const login =(params:IloginParams):Promise<Iresponse> => http.post('/login',params)
