import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Livre } from './livre.model';
import { LivrePopupService } from './livre-popup.service';
import { LivreService } from './livre.service';

@Component({
    selector: 'jhi-livre-delete-dialog',
    templateUrl: './livre-delete-dialog.component.html'
})
export class LivreDeleteDialogComponent {

    livre: Livre;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private livreService: LivreService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['livre']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.livreService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'livreListModification',
                content: 'Deleted an livre'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-livre-delete-popup',
    template: ''
})
export class LivreDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private livrePopupService: LivrePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.livrePopupService
                .open(LivreDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
