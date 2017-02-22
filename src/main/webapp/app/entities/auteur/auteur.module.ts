import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SocleJHipsterSharedModule } from '../../shared';

import {
    AuteurService,
    AuteurPopupService,
    AuteurComponent,
    AuteurDetailComponent,
    AuteurDialogComponent,
    AuteurPopupComponent,
    AuteurDeletePopupComponent,
    AuteurDeleteDialogComponent,
    auteurRoute,
    auteurPopupRoute,
} from './';

let ENTITY_STATES = [
    ...auteurRoute,
    ...auteurPopupRoute,
];

@NgModule({
    imports: [
        SocleJHipsterSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AuteurComponent,
        AuteurDetailComponent,
        AuteurDialogComponent,
        AuteurDeleteDialogComponent,
        AuteurPopupComponent,
        AuteurDeletePopupComponent,
    ],
    entryComponents: [
        AuteurComponent,
        AuteurDialogComponent,
        AuteurPopupComponent,
        AuteurDeleteDialogComponent,
        AuteurDeletePopupComponent,
    ],
    providers: [
        AuteurService,
        AuteurPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SocleJHipsterAuteurModule {}
