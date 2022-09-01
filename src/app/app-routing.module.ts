import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { PricingComponent } from './pages/pricing/pricing.component'
import { ServicesComponent } from './pages/services/services.component'
import { SignupComponent } from './pages/signup/signup.component'
import { TeamComponent } from './pages/team/team.component'

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'services', component: ServicesComponent },
	{ path: 'prices', component: PricingComponent },
	{ path: 'team', component: TeamComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{
		path: 'users',
		loadChildren: () =>
			import('./pages/users/users.module').then((m) => m.UsersModule),
	},
	{
		path: '**',
		redirectTo: 'home',
		pathMatch: 'full',
	},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
