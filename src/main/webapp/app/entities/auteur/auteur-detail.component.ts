import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Auteur } from './auteur.model';
import { AuteurService } from './auteur.service';

@Component({
    selector: 'jhi-auteur-detail',
    templateUrl: './auteur-detail.component.html'
})
export class AuteurDetailComponent implements OnInit, OnDestroy {

    auteur: Auteur;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private auteurService: AuteurService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['auteur']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.auteurService.find(id).subscribe(auteur => {
            this.auteur = auteur;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
