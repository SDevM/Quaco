import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { UsersService } from 'src/app/services/users.service'

@Component({
	selector: 'app-wallet',
	templateUrl: './wallet.component.html',
	styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
	collapse = false
	constructor(private userService: UsersService, private router: Router) {}

	ngOnInit(): void {}

	logout() {
		this.userService.signOut().subscribe(() => {
			this.router.navigate(['/home'])
		})
	}
}
