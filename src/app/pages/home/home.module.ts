import { HomeComponent } from './components/home.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: HomeComponent }])],
  declarations: [HomeComponent],
})
export class HomeModule {}
