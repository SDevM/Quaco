import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { FooterComponent } from './components/footer/footer.component'
import { HomeComponent } from './pages/home/home.component'
import { ServicesComponent } from './pages/services/services.component'
import { PricingComponent } from './pages/pricing/pricing.component'
import { TeamComponent } from './pages/team/team.component'
import { LoginComponent } from './pages/login/login.component'
import { SignupComponent } from './pages/signup/signup.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms'
import { GoogleMapsModule } from '@angular/google-maps'

@NgModule({
	declarations: [
		AppComponent,
		FooterComponent,
		HomeComponent,
		ServicesComponent,
		PricingComponent,
		TeamComponent,
		LoginComponent,
		SignupComponent
	],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule, FormsModule, GoogleMapsModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
