import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
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
		this.uService.checkIn().subscribe({
			next: (data) => {
				this.user = data
			},
			error: (err) => {
				alert(err.message)
			},
		})
	}

	update() {
		this.uService.updateUser(this.user).subscribe({
			next: (data) => {
				this.user = data
				console.log(this.uService.titles.find((e) => e._id == data.title))
			},
			error: (err) => {
				alert(err.message)
			},
		})
	}

	logout() {
		this.uService.signOut().subscribe(() => {
			this.router.navigate(['/home'])
		})
	}
}
