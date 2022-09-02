import {
	AfterViewInit,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core'
import { Router } from '@angular/router'
import { User } from 'src/app/interfaces/users.interface'
import { UsersService } from 'src/app/services/users.service'

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements AfterViewInit {
	user!: User
	map!: google.maps.Map
	@ViewChild('map') viewMap!: ElementRef<HTMLDivElement>
	constructor(private userService: UsersService, private router: Router) {}

	ngAfterViewInit(): void {
		new google.maps.Geocoder()
			.geocode({ address: this.user.address })
			.then((resp) => {
				// Initialize the map using the div element and these options
				this.map = new google.maps.Map(this.viewMap.nativeElement, {
					center: resp.results[0].geometry.location,
					zoom: 15,
					disableDefaultUI: true,
				})
				new google.maps.Marker({
					position: resp.results[0].geometry.location,
					map: this.map,
					animation: google.maps.Animation.DROP,
				})
			})
			.catch()
	}

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
