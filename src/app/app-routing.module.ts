import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth-guard.service';

const ROUTES = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'products', canActivate: [AuthGuard], loadChildren: 'app/products/product.module#ProductModule' },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES,
      {
        enableTracing: true,
        preloadingStrategy: PreloadAllModules
      }
    ),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
