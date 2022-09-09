import {
	AfterViewInit,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { UsersService } from 'src/app/services/users.service'

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, AfterViewInit {
	@ViewChild('place') Place!: ElementRef<HTMLInputElement>
	user: any = {}
	collapse = false
	constructor(public uService: UsersService, private router: Router) {}

	ngAfterViewInit(): void {
		let auto = new google.maps.places.Autocomplete(this.Place.nativeElement, {
			componentRestrictions: { country: 'jm' },
			fields: ['formatted_address', 'geometry', 'icon', 'name'],
			strictBounds: false,
		})

		auto.addListener('place_changed', () => {
			this.user.address = auto.getPlace().formatted_address
		})
	}

	ngOnInit(): void {}

	submit(form: NgForm) {
		if (form.invalid) {
			alert('Please fill all fields appropriately')
			return
		} else if (!this.user.address) {
			alert('Please select a valid address from the suggestions list')
			return
		}
		this.uService.signUp(this.user).subscribe({
			next: (data) => {
				alert('Please check your email for the verification link.')
				this.router.navigate(['/login'])
			},
			error: (err) => {
				alert(err.message)
			},
		})
	}

	files(input: any) {
		input = input as HTMLInputElement
		this.user.profile_pic = input.files[0]
	}
}
