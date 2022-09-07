import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { GenericSubscribe } from '../interfaces/default'
import { JSONResponse } from '../interfaces/json.interface'
import { Lang, Music, Title } from '../interfaces/accessories.interface'
import { User } from '../interfaces/users.interface'

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	constructor(private http: HttpClient) {
		this.getTitles().subscribe((data) => {
			this._titles = data
		})
		this.getMusic().subscribe((data) => {
			this._music = data
		})
		this.getLangs().subscribe((data) => {
			this._languages = data
		})
	}
	private _titles: Title[] = []
	public get titles(): Title[] {
		return this._titles
	}
	private _music: Music[] = []
	public get music(): Music[] {
		return this._music
	}
	private _languages: Lang[] = []
	public get languages(): Lang[] {
		return this._languages
	}

	/**
	 * Http request for creating a new user login
	 * @param user New user information
	 * @returns Observable
	 */
	signUp(user: User) {
		let obs = new Observable<User>((observer) => {
			let data = new FormData()
			Object.keys(user).forEach((e) => {
				if (e === 'profile_pic')
					data.append(e, user[e as keyof User] as File)
				else data.set(e, user[e as keyof User] as string)
			})
			this.http
				.post<JSONResponse<User>>(environment.apiUrl + '/users', data, {
					withCredentials: true,
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
					withCredentials: true,
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
					withCredentials: true,
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
					{
						withCredentials: true,
					}
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
					{ withCredentials: true }
				)
				.subscribe(GenericSubscribe(observer))
		})

		return obs
	}

	/**
	 * Http request for the list of availible titles
	 * @returns Observable
	 */
	private getTitles() {
		let obs = new Observable<Title[]>((observer) => {
			this.http
				.get<JSONResponse<Title[]>>(environment.apiUrl + '/titles', {
					withCredentials: true,
				})
				.subscribe(GenericSubscribe(observer))
		})

		return obs
	}
	/**
	 * Http request for the list of availible titles
	 * @returns Observable
	 */
	private getMusic() {
		let obs = new Observable<Music[]>((observer) => {
			this.http
				.get<JSONResponse<Music[]>>(environment.apiUrl + '/music', {
					withCredentials: true,
				})
				.subscribe(GenericSubscribe(observer))
		})

		return obs
	}
	/**
	 * Http request for the list of availible titles
	 * @returns Observable
	 */
	private getLangs() {
		let obs = new Observable<Lang[]>((observer) => {
			this.http
				.get<JSONResponse<Lang[]>>(environment.apiUrl + '/languages', {
					withCredentials: true,
				})
				.subscribe(GenericSubscribe(observer))
		})

		return obs
	}
}
