import { Component, EventEmitter, Output } from '@angular/core';

import * as screenfull from 'screenfull';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { LogoutDialogComponent } from 'src/app/dialogs/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleNotificationSidenav = new EventEmitter<void>();

  constructor(public dialog: MatDialog) {
  }
  
  openLogoutDialog() {
    const dialogConfig = new MatDialogConfig();
	
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    
    this.dialog.open(LogoutDialogComponent, dialogConfig);
    
  }

  fullScreenToggle(): void {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }
}
