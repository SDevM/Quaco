import {
	AfterViewInit,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core'
import { Router } from '@angular/router'
import { Title } from 'src/app/interfaces/titles.interface'
import { UsersService } from 'src/app/services/users.service'

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, AfterViewInit {
	@ViewChild('place') Place!: ElementRef<HTMLInputElement>

	titles: Title[] = []
	user: any = {}
	constructor(private uService: UsersService, private router: Router) {}

	ngAfterViewInit(): void {
		let auto = new google.maps.places.Autocomplete(this.Place.nativeElement, {
			componentRestrictions: { country: 'jm' },
			fields: ['address_components', 'geometry', 'icon', 'name'],
			strictBounds: false,
		})

		auto.addListener('place_changed', () => {
			this.user.address = auto.getPlace().formatted_address
		})
	}

	ngOnInit(): void {
		this.uService.getTitles().subscribe((data) => {
			this.titles.push(...data)
		})
	}

	submit() {
		this.uService.signUp(this.user).subscribe({
			next: (data) => {
				this.router.navigate(['/users'])
			},
			error: (err) => {
				alert(err.message)
			},
		})
	}

	files(input: any) {
		input = input as HTMLInputElement
		this.user.files = input.files
	}
}
