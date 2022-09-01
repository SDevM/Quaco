import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { nextTick } from 'process'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { JSONResponse } from '../interfaces/json.interface'
import { User, UserLogin } from '../interfaces/users.interface'

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	constructor(private http: HttpClient) {}

	signUp(user: User) {
		let obs = new Observable<User>((observer) => {
			this.http
				.post<JSONResponse<User>>(environment.apiUrl + '/users', user, {
					observe: 'response',
				})
				.subscribe({
					next: (data) => {
						console.log(data.body)
						observer.next(data.body?.data)
						observer.complete()
					},
					error: (err: HttpErrorResponse) => {
						console.error(err.error)
						observer.next(err.error.data)
						observer.complete()
					},
				})
		})
		return obs
	}

	updateUser(user: User) {
		let obs = new Observable<User>((observer) => {
			this.http
				.patch<JSONResponse<User>>(environment.apiUrl + '/users', user, {
					observe: 'response',
				})
				.subscribe({
					next: (data) => {
						console.log(data.body)
						observer.next(data.body?.data)
						observer.complete()
					},
					error: (err: HttpErrorResponse) => {
						console.error(err.error)
						observer.next(err.error.data)
						observer.complete()
					},
				})
		})
		return obs
	}

	deleteUser(user: User) {
		let obs = new Observable<User>((observer) => {
			this.http
				.delete<JSONResponse<User>>(environment.apiUrl + '/users', {
					observe: 'response',
				})
				.subscribe({
					next: (data) => {
						console.log(data.body)
						observer.next(data.body?.data)
						observer.complete()
					},
					error: (err: HttpErrorResponse) => {
						console.error(err.error)
						observer.next(err.error.data)
						observer.complete()
					},
				})
		})
		return obs
	}

	signIn(user: UserLogin) {
		let obs = new Observable((observer) => {
			this.http
				.post<JSONResponse<User>>(
					environment.apiUrl + '/users/login',
					user,
					{ observe: 'response' }
				)
				.subscribe({
					next: (data) => {
						console.log(data.body)
						observer.next(data.body?.data)
						observer.complete()
					},
					error: (err) => {
						console.error(err.error)
						observer.next(err.error.data)
						observer.complete()
					},
				})
		})

		return obs
	}

	signOut() {
		let obs = new Observable((observer) => {
			this.http
				.get<JSONResponse<undefined>>(
					environment.apiUrl + '/users/logout',
					{ observe: 'response' }
				)
				.subscribe({
					next: (data) => {
						console.log(data.body)
						observer.next(data.body?.data)
						observer.complete()
					},
					error: (err) => {
						console.error(err.error)
						observer.next(err.error.data)
						observer.complete()
					},
				})
		})

		return obs
	}
}
