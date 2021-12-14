
import { HttpErrorResponse } from "@angular/common/http"
import { throwError } from "rxjs"

export function errorHandler (err: HttpErrorResponse) {
  console.log( err.error.errors)
  if(err.status < 500)
    return throwError(err.error.errors)
  else
    return throwError(`Server-side error code: ${err.status}\nMessage: ${err.message}`)
}