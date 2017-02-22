import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Livre } from './livre.model';
import { LivreService } from './livre.service';

@Component({
    selector: 'jhi-livre-detail',
    templateUrl: './livre-detail.component.html'
})
export class LivreDetailComponent implements OnInit, OnDestroy {

    livre: Livre;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private livreService: LivreService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['livre']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.livreService.find(id).subscribe(livre => {
            this.livre = livre;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
