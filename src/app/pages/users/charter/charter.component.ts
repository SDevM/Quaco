import {
	AfterViewInit,
	Component,
	ElementRef,
	NgZone,
	OnInit,
	ViewChild,
} from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { ChartersService } from 'src/app/services/charters.service'
import { UsersService } from 'src/app/services/users.service'

@Component({
	selector: 'app-charter',
	templateUrl: './charter.component.html',
	styleUrls: ['./charter.component.scss'],
})
export class CharterComponent implements OnInit, AfterViewInit {
	@ViewChild('form') form!: NgForm
	@ViewChild('map') mapDiv!: ElementRef<HTMLDivElement>
	@ViewChild('start') start!: ElementRef<HTMLInputElement>
	@ViewChild('end') end!: ElementRef<HTMLInputElement>

	stage = 0
	map!: google.maps.Map
	markerA = new google.maps.Marker()
	markerB = new google.maps.Marker({
		draggable: true,
		label: 'D',
		animation: google.maps.Animation.DROP,
	})
	curdir!: google.maps.DirectionsLeg
	charter: any = {}
	collapse = false
	onChangeHandler!: (originQuery: string, destinationQuery: string) => void

	constructor(
		private ngZone: NgZone,
		public uService: UsersService,
		private cService: ChartersService,
		private router: Router
	) {}

	ngAfterViewInit(): void {
		// Initialize the map using the div element and these options
		this.map = new google.maps.Map(this.mapDiv.nativeElement, {
			zoom: 15,
			center: { lng: -76.8019, lat: 17.9962 },
			gestureHandling: 'none',
		})

		// Directions objects needed to create and manage the directions object
		const directionsService = new google.maps.DirectionsService()
		// Provides mad to renderer
		const directionsRenderer = new google.maps.DirectionsRenderer({
			map: this.map,
		})

		this.onChangeHandler = (
			originQuery: string,
			destinationQuery: string
		) => {
			this.calculateAndDisplayRoute(
				directionsService,
				directionsRenderer,
				originQuery,
				destinationQuery
			)
		}

		// Set places options, such as resticting it to jamaica
		const options = {
			componentRestrictions: { country: 'jm' },
			fields: ['formatted_address', 'geometry', 'icon', 'name'],
			strictBounds: false,
		}

		// Create the autocomplete objects and give them input elements to manage
		const autocompleteA = new google.maps.places.Autocomplete(
			this.start.nativeElement,
			options
		)
		const autocompleteB = new google.maps.places.Autocomplete(
			this.end.nativeElement,
			options
		)

		// Listen for the event of the place being updated, and respond with update logic
		autocompleteA.addListener('place_changed', () => {
			this.ngZone.run(() => {
				if (this.end.nativeElement.value !== '') {
					this.onChangeHandler(
						this.start.nativeElement.value.trim(),
						this.end.nativeElement.value.trim()
					)
				}
			})
		})

		autocompleteB.addListener('place_changed', () => {
			this.ngZone.run(() => {
				if (this.start.nativeElement.value !== '') {
					this.onChangeHandler(
						this.start.nativeElement.value.trim(),
						this.end.nativeElement.value.trim()
					)
				}
			})
		})

		// Add gragging event end event listener to update directions when a drag is complete
		this.markerB.addListener('dragend', () => {
			const latLng: google.maps.LatLng = this.markerB.getPosition()!
			// Find address with latitude and longitude
			new google.maps.Geocoder()
				.geocode({ location: latLng })
				.then((resp) => {
					this.end.nativeElement.value = resp.results[0].formatted_address
					if (this.start.nativeElement.value !== '') {
						this.calculateAndDisplayRoute(
							directionsService,
							directionsRenderer,
							this.start.nativeElement.value,
							latLng
						)
					}
				})
				.catch((err) => {
					//Error handling
				})
		})
	}

	/**
	 * Prepare and render new route information
	 * @param directionsService
	 * @param directionsRenderer
	 * @param origin Address of origin
	 * @param destination Address of destination
	 */
	calculateAndDisplayRoute(
		directionsService: google.maps.DirectionsService,
		directionsRenderer: google.maps.DirectionsRenderer,
		origin:
			| string
			| google.maps.LatLng
			| google.maps.LatLngLiteral
			| google.maps.Place,
		destination:
			| string
			| google.maps.LatLng
			| google.maps.LatLngLiteral
			| google.maps.Place
	) {
		// Create the directions request
		directionsService
			.route({
				origin,
				destination,
				travelMode: google.maps.TravelMode.DRIVING,
				avoidTolls: true,
				optimizeWaypoints: true,
				drivingOptions: {
					departureTime: new Date(),
				},
			})
			.then((response) => {
				// Use directions response to set the direction values in the directions renderer
				this.curdir = response.routes[0].legs[0]
				directionsRenderer.setDirections(response)
				directionsRenderer.setOptions({ suppressMarkers: true })
				// Establish markers at point A and B
				this.markerA.setOptions({
					position: {
						lat: response.routes[0].legs[0].start_location.lat(),
						lng: response.routes[0].legs[0].start_location.lng(),
					},
					map: this.map,
				})
				this.markerB.setOptions({
					position: {
						lat: response.routes[0].legs[0].end_location.lat(),
						lng: response.routes[0].legs[0].end_location.lng(),
					},
					map: this.map,
				})
				// Set map centre
				this.map.setCenter(this.markerB.getPosition()!)
			})
			.catch((e) => console.log(e))
	}

	ngOnInit(): void {}

	submit() {
		this.cService.placeCharter(this.charter).subscribe({
			next: (data) => {
				this.router.navigate(['/users'])
				//Success message
			},
			error: (err) => {
				//Error message
			},
		})
	}

	logout() {
		this.uService.signOut().subscribe((data) => {
			this.router.navigate(['/home'])
		})
	}
}
