import { Directive, Input } from '@angular/core'
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms'

@Directive({
	selector: '[mustExist]',
})
export class MustExistDirective implements Validator {
	constructor() {}

	validate(control: AbstractControl<any, any>): ValidationErrors | null {
		if (this.target.every((e) => e)) return null
		else return { mustExistMatch: false }
	}

	@Input('mustExist') target!: any[]
}
