import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { take } from 'rxjs'
import { UsersService } from 'src/app/services/users.service'

@Component({
	selector: 'app-history',
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
	constructor(private uService: UsersService, private router: Router) {}

	ngOnInit(): void {}

	logout() {
		this.uService
			.signOut()
			.pipe(take(1))
			.subscribe(() => {
				this.router.navigate(['/home'])
			})
	}
}
