import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Auteur } from './auteur.model';
import { AuteurPopupService } from './auteur-popup.service';
import { AuteurService } from './auteur.service';

@Component({
    selector: 'jhi-auteur-delete-dialog',
    templateUrl: './auteur-delete-dialog.component.html'
})
export class AuteurDeleteDialogComponent {

    auteur: Auteur;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private auteurService: AuteurService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['auteur']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.auteurService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'auteurListModification',
                content: 'Deleted an auteur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-auteur-delete-popup',
    template: ''
})
export class AuteurDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private auteurPopupService: AuteurPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.auteurPopupService
                .open(AuteurDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
