import { Directive, Input } from '@angular/core'
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms'

@Directive({
	selector: '[mustBe]',
})
export class MustBeDirective implements Validator {
	constructor() {}

	validate(control: AbstractControl<any, any>): ValidationErrors | null {
		if (this.target == this.accessory) return null
		else return { mustBeMatch: false }
	}

	@Input('mustBe') target: any
	@Input('equalTo') accessory!: any
}
