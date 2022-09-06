import { Component, OnInit } from '@angular/core'
import { UsersService } from 'src/app/services/users.service'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	active: boolean
	constructor(private uService: UsersService) {
		uService.checkIn().subscribe({
			next: (data) => {
				this.active = true
			},
		})
		this.active = false
	}

	ngOnInit(): void {}
}
