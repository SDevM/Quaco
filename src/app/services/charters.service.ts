import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Charter } from '../interfaces/charters.interface'
import { GenericSubscribe } from '../interfaces/default'
import { JSONResponse } from '../interfaces/json.interface'

@Injectable({
	providedIn: 'root',
})
export class ChartersService {
	constructor(private http: HttpClient) {}

	/**
	 * Http request to establish a new charter request
	 * @param charter New charter information
	 * @returns Observable
	 */
	placeCharter(charter: Charter) {
		let obs = new Observable<Charter>((observer) => {
			this.http
				.post<JSONResponse<Charter>>(
					environment.apiUrl + '/charters',
					charter,
					{
						observe: 'response',
					}
				)
				.subscribe(GenericSubscribe(observer))
		})

		return obs
	}

	/**
	 * Http request to cancel a charter
	 * @param id Charter id
	 * @returns Observable
	 */
	cancelCharter(id: string) {
		let obs = new Observable<Charter>((observer) => {
			this.http
				.delete<JSONResponse<Charter>>(
					environment.apiUrl + `/charters/${id}`,
					{
						observe: 'response',
					}
				)
				.subscribe(GenericSubscribe(observer))
		})

		return obs
	}
}
