import { HttpErrorResponse } from '@angular/common/http'
import { Observer } from 'rxjs'

export let GenericSubscribe = (
	observer: Observer<any>,
	success?: Function,
	failure?: Function
) => {
	return {
		next: (data: any) => {
			console.log(data)
			observer.next(data?.data)
			observer.complete()
			if (success) success(data?.data)
		},
		error: (err: HttpErrorResponse) => {
			console.error(err.error)
			observer.error(err.error.error)
			observer.complete()
			if (failure) failure(err.error.error)
		},
	}
}
