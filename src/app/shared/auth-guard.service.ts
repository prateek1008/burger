import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate,CanActivateChild {
    constructor(private authService: AuthService, private router : Router) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
        
        return this.authService.isAuthenticated().then((authenticated : boolean) => {
            if(!authenticated) {
                this.router.navigate(['/shopping-list']);
                return false;
            } else {
                return true;
            }
        })
        
    } 

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean>| Promise<boolean> | boolean {
        return this.canActivate(route, state);
    } 


}