import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UsersRoutingModule } from './users-routing.module'
import { ProfileComponent } from './profile/profile.component'
import { WalletComponent } from './wallet/wallet.component'
import { DetailsComponent } from './details/details.component'
import { HistoryComponent } from './history/history.component'
import { CharterComponent } from './charter/charter.component'
import { GoogleMapsModule } from '@angular/google-maps'

@NgModule({
	declarations: [
		ProfileComponent,
		WalletComponent,
		DetailsComponent,
		HistoryComponent,
		CharterComponent,
	],
	imports: [CommonModule, UsersRoutingModule, GoogleMapsModule],
})
export class UsersModule {}
