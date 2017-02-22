import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SocleJHipsterSharedModule } from '../../shared';

import {
    LivreService,
    LivrePopupService,
    LivreComponent,
    LivreDetailComponent,
    LivreDialogComponent,
    LivrePopupComponent,
    LivreDeletePopupComponent,
    LivreDeleteDialogComponent,
    livreRoute,
    livrePopupRoute,
} from './';

let ENTITY_STATES = [
    ...livreRoute,
    ...livrePopupRoute,
];

@NgModule({
    imports: [
        SocleJHipsterSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LivreComponent,
        LivreDetailComponent,
        LivreDialogComponent,
        LivreDeleteDialogComponent,
        LivrePopupComponent,
        LivreDeletePopupComponent,
    ],
    entryComponents: [
        LivreComponent,
        LivreDialogComponent,
        LivrePopupComponent,
        LivreDeleteDialogComponent,
        LivreDeletePopupComponent,
    ],
    providers: [
        LivreService,
        LivrePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SocleJHipsterLivreModule {}
