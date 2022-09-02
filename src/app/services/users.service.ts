import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { GenericSubscribe } from '../interfaces/default'
import { JSONResponse } from '../interfaces/json.interface'
import { Title } from '../interfaces/titles.interface'
import { User } from '../interfaces/users.interface'

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	constructor(private http: HttpClient) {}

	/**
	 * Http request for creating a new user login
	 * @param user New user information
	 * @returns Observable
	 */
	signUp(user: User) {
		let obs = new Observable<User>((observer) => {
			this.http
				.post<JSONResponse<User>>(environment.apiUrl + '/users', user, {
					observe: 'response',
				})
				.subscribe(GenericSubscribe(observer))
		})
		return obs
	}

	/**
	 * Http request for updating a user
	 * @param user Updated user information
	 * @returns Observale
	 */
	updateUser(user: any) {
		let obs = new Observable<User>((observer) => {
			this.http
				.patch<JSONResponse<User>>(environment.apiUrl + '/users', user, {
					observe: 'response',
				})
				.subscribe(GenericSubscribe(observer))
		})
		return obs
	}

	/**
	 * Http request to delete the current account
	 * @returns Observable
	 */
	deleteUser() {
		let obs = new Observable<User>((observer) => {
			this.http
				.delete<JSONResponse<User>>(environment.apiUrl + '/users', {
					observe: 'response',
				})
				.subscribe(GenericSubscribe(observer))
		})
		return obs
	}

	/**
	 * Http request to sign into a user account
	 * @param user Email and Password
	 * @returns Observable
	 */
	signIn(user: Partial<User>) {
		let obs = new Observable<User>((observer) => {
			this.http
				.post<JSONResponse<User>>(
					environment.apiUrl + '/users/login',
					user,
					{ withCredentials: true }
				)
				.subscribe(GenericSubscribe(observer))
		})

		return obs
	}

	/**
	 * Http request to validate an active session
	 * @returns Observable
	 */
	checkIn() {
		let obs = new Observable<User>((observer) => {
			this.http
				.get(environment.apiUrl + '/users', {
					withCredentials: true,
				})
				.subscribe(GenericSubscribe(observer))
		})

		return obs
	}

	/**
	 * Http request to end the current login session
	 * @returns Observable
	 */
	signOut() {
		let obs = new Observable((observer) => {
			this.http
				.get<JSONResponse<undefined>>(
					environment.apiUrl + '/users/logout',
					{ observe: 'response' }
				)
				.subscribe(GenericSubscribe(observer))
		})

		return obs
	}

	/**
	 * Http request for the list of availible titles
	 * @returns Observable
	 */
	getTitles() {
		let obs = new Observable<Title[]>((observer) => {
			this.http
				.get<JSONResponse<Title[]>>(environment.apiUrl + '/titles', {
					observe: 'response',
				})
				.subscribe(GenericSubscribe(observer))
		})

		return obs
	}
}
