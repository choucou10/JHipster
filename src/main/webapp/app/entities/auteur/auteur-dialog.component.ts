import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Auteur } from './auteur.model';
import { AuteurPopupService } from './auteur-popup.service';
import { AuteurService } from './auteur.service';
import { Livre, LivreService } from '../livre';
@Component({
    selector: 'jhi-auteur-dialog',
    templateUrl: './auteur-dialog.component.html'
})
export class AuteurDialogComponent implements OnInit {

    auteur: Auteur;
    authorities: any[];
    isSaving: boolean;

    livres: Livre[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private auteurService: AuteurService,
        private livreService: LivreService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['auteur']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.livreService.query().subscribe(
            (res: Response) => { this.livres = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.auteur.id !== undefined) {
            this.auteurService.update(this.auteur)
                .subscribe((res: Auteur) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.auteurService.create(this.auteur)
                .subscribe((res: Auteur) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Auteur) {
        this.eventManager.broadcast({ name: 'auteurListModification', content: 'OK'});
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

    trackLivreById(index: number, item: Livre) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-auteur-popup',
    template: ''
})
export class AuteurPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private auteurPopupService: AuteurPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.auteurPopupService
                    .open(AuteurDialogComponent, params['id']);
            } else {
                this.modalRef = this.auteurPopupService
                    .open(AuteurDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
