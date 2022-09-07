import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'
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
	avatar_url!: string
	collapse = false
	@ViewChild('map') viewMap!: ElementRef<HTMLElement>
	@ViewChild('avatar') avatar!: ElementRef<HTMLImageElement>
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
			.catch((err) => {
				console.error(err)
				this.map = new google.maps.Map(this.viewMap.nativeElement, {
					zoom: 15,
					disableDefaultUI: true,
				})
			})
	}

	ngOnInit(): void {
		this.userService.checkIn().subscribe({
			next: (data) => {
				this.user = data
				this.avatar_url = (this.user.profile_pic as any).link
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
