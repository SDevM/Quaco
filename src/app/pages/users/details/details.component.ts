import {
	AfterViewInit,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core'
import { Router } from '@angular/router'
import { take } from 'rxjs'
import { User } from 'src/app/interfaces/users.interface'
import { UsersService } from 'src/app/services/users.service'

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, AfterViewInit {
	user!: User
	collapse = false
	@ViewChild('place') Place!: ElementRef<HTMLInputElement>
	constructor(public uService: UsersService, private router: Router) {}

	ngAfterViewInit(): void {
		let auto = new google.maps.places.Autocomplete(
			this.Place.nativeElement,
			{
				componentRestrictions: { country: 'jm' },
				fields: ['formatted_address', 'geometry', 'icon', 'name'],
				strictBounds: false,
			}
		)

		auto.addListener('place_changed', () => {
			this.user.address = auto.getPlace().formatted_address!
		})
	}

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
