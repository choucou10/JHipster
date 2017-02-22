import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Livre } from './livre.model';
import { LivrePopupService } from './livre-popup.service';
import { LivreService } from './livre.service';
import { Auteur, AuteurService } from '../auteur';
@Component({
    selector: 'jhi-livre-dialog',
    templateUrl: './livre-dialog.component.html'
})
export class LivreDialogComponent implements OnInit {

    livre: Livre;
    authorities: any[];
    isSaving: boolean;

    auteurs: Auteur[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private livreService: LivreService,
        private auteurService: AuteurService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['livre']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.auteurService.query().subscribe(
            (res: Response) => { this.auteurs = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.livre.id !== undefined) {
            this.livreService.update(this.livre)
                .subscribe((res: Livre) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.livreService.create(this.livre)
                .subscribe((res: Livre) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Livre) {
        this.eventManager.broadcast({ name: 'livreListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackAuteurById(index: number, item: Auteur) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-livre-popup',
    template: ''
})
export class LivrePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private livrePopupService: LivrePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.livrePopupService
                    .open(LivreDialogComponent, params['id']);
            } else {
                this.modalRef = this.livrePopupService
                    .open(LivreDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
