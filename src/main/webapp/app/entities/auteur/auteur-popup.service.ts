import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Auteur } from './auteur.model';
import { AuteurService } from './auteur.service';
@Injectable()
export class AuteurPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private auteurService: AuteurService
    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.auteurService.find(id).subscribe(auteur => {
                if (auteur.dateNaissance) {
                    auteur.dateNaissance = {
                        year: auteur.dateNaissance.getFullYear(),
                        month: auteur.dateNaissance.getMonth() + 1,
                        day: auteur.dateNaissance.getDate()
                    };
                }
                this.auteurModalRef(component, auteur);
            });
        } else {
            return this.auteurModalRef(component, new Auteur());
        }
    }

    auteurModalRef(component: Component, auteur: Auteur): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.auteur = auteur;
        modalRef.result.then(result => {
            console.log(`Closed with: ${result}`);
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            console.log(`Dismissed ${reason}`);
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
