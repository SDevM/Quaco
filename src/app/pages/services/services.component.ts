import { Component, OnInit } from '@angular/core'
import { take } from 'rxjs'
import { UsersService } from 'src/app/services/users.service'

@Component({
	selector: 'app-services',
	templateUrl: './services.component.html',
	styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
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
