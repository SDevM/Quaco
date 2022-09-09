import { Injectable } from '@angular/core'
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router'
import { Observable, take } from 'rxjs'
import { UsersService } from '../services/users.service'

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private uService: UsersService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		let obs = new Observable<boolean>((observer) => {
			this.uService
				.checkIn()
				.pipe(take(1))
				.subscribe({
					next: (data) => {
						observer.next(true)
						observer.complete()
					},
					error: (err) => {
						this.router.navigate(['/login'])
						observer.next(false)
						observer.complete()
					},
				})
		})

		return obs
	}
}
