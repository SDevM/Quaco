import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { GenericSubscribe } from '../interfaces/default'
import { JSONResponse } from '../interfaces/json.interface'
import { Report } from '../interfaces/reports.interface'

@Injectable({
	providedIn: 'root',
})
export class ReportsService {
	constructor(private http: HttpClient) {}

	/**
	 * Http request to create a report thread
	 * @param report
	 * @returns Observable
	 */
	placeReport(report: Report) {
		let obs = new Observable<Report>((observer) => {
			this.http
				.post<JSONResponse<Report>>(
					environment.apiUrl + '/reports',
					report,
					{
						observe: 'response',
					}
				)
				.subscribe(GenericSubscribe(observer))
		})

		return obs
	}

	/**
	 * Http request to collect all reports attached to this user
	 * @returns Observable
	 */
	getReports() {
		let obs = new Observable<Report[]>((observer) => {
			this.http
				.get<JSONResponse<Report[]>>(environment.apiUrl + '/reports', {
					observe: 'response',
				})
				.subscribe(GenericSubscribe(observer))
		})

		return obs
	}

	/**
	 * Http request to continue a report thread
	 * @returns Observable
	 */
	patchReports(report: Report) {
		let obs = new Observable<Report>((observer) => {
			this.http
				.patch<JSONResponse<Report>>(
					environment.apiUrl + '/reports',
					report,
					{
						observe: 'response',
					}
				)
				.subscribe(GenericSubscribe(observer))
		})

		return obs
	}
}
