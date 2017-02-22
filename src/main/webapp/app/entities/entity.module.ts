import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SocleJHipsterAuteurModule } from './auteur/auteur.module';
import { SocleJHipsterLivreModule } from './livre/livre.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SocleJHipsterAuteurModule,
        SocleJHipsterLivreModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SocleJHipsterEntityModule {}
