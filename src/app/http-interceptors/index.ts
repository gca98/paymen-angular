
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { UserInterceptor } from './user.interceptor';


export const httpUserInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UserInterceptor,
    multi: true 
  },

];