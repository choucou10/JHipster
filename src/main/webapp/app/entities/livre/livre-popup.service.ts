import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Livre } from './livre.model';
import { LivreService } from './livre.service';
@Injectable()
export class LivrePopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private livreService: LivreService
    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.livreService.find(id).subscribe(livre => {
                if (livre.datePublication) {
                    livre.datePublication = {
                        year: livre.datePublication.getFullYear(),
                        month: livre.datePublication.getMonth() + 1,
                        day: livre.datePublication.getDate()
                    };
                }
                this.livreModalRef(component, livre);
            });
        } else {
            return this.livreModalRef(component, new Livre());
        }
    }

    livreModalRef(component: Component, livre: Livre): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.livre = livre;
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
