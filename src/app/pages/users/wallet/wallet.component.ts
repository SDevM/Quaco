import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { take } from 'rxjs'
import { PaymentMethod } from 'src/app/interfaces/payment.interface'
import { PaymentsService } from 'src/app/services/payments.service'
import { UsersService } from 'src/app/services/users.service'

@Component({
	selector: 'app-wallet',
	templateUrl: './wallet.component.html',
	styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
	collapse = false
	wallet: PaymentMethod[] = []
	constructor(
		private uService: UsersService,
		private pService: PaymentsService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.pService
			.getPayments()
			.pipe(take(1))
			.subscribe((data) => {
				this.wallet.push(...data)
			})
	}

	submit(form: NgForm) {
		if (form.invalid) {
			alert('Please fill all fields')
			return
		}
		this.pService
			.addPayment(form.value)
			.pipe(take(1))
			.subscribe({
				next: (data) => {
					this.wallet.push(data)
				},
				error: (err) => {
					alert(err.message ?? 'Fatal error')
				},
			})
	}

	remove(id: string) {
		this.pService
			.deletePayments(id)
			.pipe(take(1))
			.subscribe({
				next: () => {
					this.wallet = this.wallet.filter((val) => {
						console.log(val._id, id)
						return val._id !== id
					})
				},
				error: (err) => {
					alert(err.message ?? 'Fatal error')
				},
			})
	}

	logout() {
		this.uService
			.signOut()
			.pipe(take(1))
			.subscribe(() => {
				this.router.navigate(['/home'])
			})
	}
}
