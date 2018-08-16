import { Component } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AuthService } from './user/auth.service';
import { MessageService } from './messages/message.service';

@Component({
    selector: 'pm-app',
    templateUrl: './app/app.component.html'
})
export class AppComponent {
    pageTitle: string = 'Acme Product Management';
    loading: boolean = true;

    constructor(
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService
    ) {
        router.events.subscribe((routerEvent: Event) => {
            this.checkRouterEvent(routerEvent);
        });
    }

    checkRouterEvent(routerEvent: Event) {
        if (routerEvent instanceof NavigationStart) {
            this.loading = true;
        }

        if (routerEvent instanceof NavigationEnd ||
            routerEvent instanceof NavigationCancel ||
            routerEvent instanceof NavigationError) {
            this.loading = false;
        }
    }

    displayMessages(): void {
        this.router.navigate([{ outlets: { popup: ['messages'] } }]);
        this.messageService.isDisplayed = true;
    }

    hideMessages(): void {
        this.messageService.isDisplayed = false;
    }

    logOut(): void {
        this.authService.logout();
        this.router.navigateByUrl('/welcome');
        console.log('Log out');
    }
}
