import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { LivreComponent } from './livre.component';
import { LivreDetailComponent } from './livre-detail.component';
import { LivrePopupComponent } from './livre-dialog.component';
import { LivreDeletePopupComponent } from './livre-delete-dialog.component';

import { Principal } from '../../shared';


export const livreRoute: Routes = [
  {
    path: 'livre',
    component: LivreComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'socleJHipsterApp.livre.home.title'
    }
  }, {
    path: 'livre/:id',
    component: LivreDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'socleJHipsterApp.livre.home.title'
    }
  }
];

export const livrePopupRoute: Routes = [
  {
    path: 'livre-new',
    component: LivrePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'socleJHipsterApp.livre.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'livre/:id/edit',
    component: LivrePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'socleJHipsterApp.livre.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'livre/:id/delete',
    component: LivreDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'socleJHipsterApp.livre.home.title'
    },
    outlet: 'popup'
  }
];
