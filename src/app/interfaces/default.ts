import { HttpErrorResponse } from '@angular/common/http'
import { Observer } from 'rxjs'

export let GenericSubscribe = (observer: Observer<any>) => {
	return {
		next: (data: any) => {
			console.log(data.body)
			observer.next(data.body?.data)
			observer.complete()
		},
		error: (err: HttpErrorResponse) => {
			console.error(err.error)
			observer.next(err.error.data)
			observer.complete()
		},
	}
}
