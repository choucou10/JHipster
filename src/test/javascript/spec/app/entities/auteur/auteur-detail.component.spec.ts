import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AuteurDetailComponent } from '../../../../../../main/webapp/app/entities/auteur/auteur-detail.component';
import { AuteurService } from '../../../../../../main/webapp/app/entities/auteur/auteur.service';
import { Auteur } from '../../../../../../main/webapp/app/entities/auteur/auteur.model';

describe('Component Tests', () => {

    describe('Auteur Management Detail Component', () => {
        let comp: AuteurDetailComponent;
        let fixture: ComponentFixture<AuteurDetailComponent>;
        let service: AuteurService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [AuteurDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    AuteurService
                ]
            }).overrideComponent(AuteurDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AuteurDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AuteurService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN
            spyOn(service, 'find').and.returnValue(Observable.of(new Auteur(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.auteur).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
