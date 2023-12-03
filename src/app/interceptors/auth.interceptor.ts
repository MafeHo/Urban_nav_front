import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SecurityService } from "../services/security.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private securityService: SecurityService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.securityService.getTokenFromLocalStorage();
        request = request.clone({
                setHeaders: {Authorization: `Bearer ${token}`}
            });
        return next.handle(request);
        
    }
}