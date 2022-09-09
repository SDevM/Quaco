import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { take } from 'rxjs'
import { User } from 'src/app/interfaces/users.interface'
import { UsersService } from 'src/app/services/users.service'

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
	user!: User
	collapse = false
	constructor(public uService: UsersService, private router: Router) {}

	ngOnInit(): void {
		this.uService
			.checkIn()
			.pipe(take(1))
			.subscribe({
				next: (data) => {
					this.user = data
				},
				error: (err) => {
					alert(err.message)
				},
			})
	}

	update() {
		this.uService
			.updateUser(this.user)
			.pipe(take(1))
			.subscribe({
				next: (data) => {
					this.user = data
				},
				error: (err) => {
					alert(err.message)
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
