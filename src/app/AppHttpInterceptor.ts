import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

    constructor(
        private router: Router
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            console.log(`${request.method}: ${request.url}`);
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if ((err.status === 401) || (err.status === 403)) {
                    this.router.navigate(["/public/login"]);
                    localStorage.removeItem('token');
                }
            }
        }));
    }
}