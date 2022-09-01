import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CharterComponent } from './charter/charter.component'
import { DetailsComponent } from './details/details.component'
import { HistoryComponent } from './history/history.component'
import { ProfileComponent } from './profile/profile.component'
import { WalletComponent } from './wallet/wallet.component'

const routes: Routes = [
	{ path: 'profile', component: ProfileComponent },
	{ path: 'wallet', component: WalletComponent },
	{ path: 'charter', component: CharterComponent },
	{ path: 'details', component: DetailsComponent },
	{ path: 'history', component: HistoryComponent },
	{
		path: '**',
		redirectTo: 'profile',
		pathMatch: 'full',
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UsersRoutingModule {}
