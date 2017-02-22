import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { AuteurComponent } from './auteur.component';
import { AuteurDetailComponent } from './auteur-detail.component';
import { AuteurPopupComponent } from './auteur-dialog.component';
import { AuteurDeletePopupComponent } from './auteur-delete-dialog.component';

import { Principal } from '../../shared';


export const auteurRoute: Routes = [
  {
    path: 'auteur',
    component: AuteurComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'socleJHipsterApp.auteur.home.title'
    }
  }, {
    path: 'auteur/:id',
    component: AuteurDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'socleJHipsterApp.auteur.home.title'
    }
  }
];

export const auteurPopupRoute: Routes = [
  {
    path: 'auteur-new',
    component: AuteurPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'socleJHipsterApp.auteur.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'auteur/:id/edit',
    component: AuteurPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'socleJHipsterApp.auteur.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'auteur/:id/delete',
    component: AuteurDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'socleJHipsterApp.auteur.home.title'
    },
    outlet: 'popup'
  }
];
