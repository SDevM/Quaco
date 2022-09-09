import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, take } from 'rxjs'
import { environment } from 'src/environments/environment'
import { GenericSubscribe } from '../interfaces/default'
import { JSONResponse } from '../interfaces/json.interface'
import { PaymentMethod } from '../interfaces/payment.interface'

@Injectable({
	providedIn: 'root',
})
export class PaymentsService {
	constructor(private http: HttpClient) {}

	/**
	 * Http request to add a payment method
	 * @param paymentMethod New payment method information
	 * @returns Observable
	 */
	addPayment(paymentMethod: PaymentMethod) {
		let obs = new Observable<PaymentMethod>((observer) => {
			this.http
				.post<JSONResponse<PaymentMethod>>(
					environment.apiUrl + '/payments',
					paymentMethod,
					{
						withCredentials: true,
					}
				)
				.pipe(take(1))
				.subscribe(GenericSubscribe(observer))
		})

		return obs
	}

	/**
	 * Http request to get payment methods
	 * @returns Observable
	 */
	getPayments() {
		let obs = new Observable<PaymentMethod[]>((observer) => {
			this.http
				.get<JSONResponse<PaymentMethod[]>>(
					environment.apiUrl + '/payments',
					{
						withCredentials: true,
					}
				)
				.pipe(take(1))
				.subscribe(GenericSubscribe(observer))
		})

		return obs
	}

	/**
	 * Http request to get payment methods
	 * @returns Observable
	 */
	deletePayments(id: string) {
		let obs = new Observable((observer) => {
			this.http
				.delete<JSONResponse<any>>(environment.apiUrl + `/payments/${id}`, {
					withCredentials: true,
				})
				.pipe(take(1))
				.subscribe(GenericSubscribe(observer))
		})

		return obs
	}
}
