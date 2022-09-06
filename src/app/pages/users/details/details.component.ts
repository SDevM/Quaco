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
	constructor(private userService: UsersService, private router: Router) {}

	ngOnInit(): void {
		this.userService.checkIn().subscribe({
			next: (data) => {
				this.user = data
			},
			error: (err) => {
				alert(err.message)
			},
		})
	}

	logout() {
		this.userService.signOut().subscribe(() => {
			this.router.navigate(['/home'])
		})
	}
}
