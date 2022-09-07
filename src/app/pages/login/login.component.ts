import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { UsersService } from 'src/app/services/users.service'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	user: any = {}
	collapse = false
	constructor(private userService: UsersService, private router: Router) {}

	ngOnInit(): void {}

	submit() {
		this.userService.signIn(this.user).subscribe({
			next: () => {
				this.router.navigate(['/users'])
			},
			error: (err) => {
				alert(err.message)
			},
		})
	}
}
