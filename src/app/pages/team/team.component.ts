import { Component, OnInit } from '@angular/core'
import { take } from 'rxjs'
import { UsersService } from 'src/app/services/users.service'

@Component({
	selector: 'app-team',
	templateUrl: './team.component.html',
	styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
	active: boolean
	collapse = false
	constructor(private uService: UsersService) {
		uService
			.checkIn()
			.pipe(take(1))
			.subscribe({
				next: (data) => {
					this.active = true
				},
			})
		this.active = false
	}

	ngOnInit(): void {}
}
