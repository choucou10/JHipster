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
import { LivreDetailComponent } from '../../../../../../main/webapp/app/entities/livre/livre-detail.component';
import { LivreService } from '../../../../../../main/webapp/app/entities/livre/livre.service';
import { Livre } from '../../../../../../main/webapp/app/entities/livre/livre.model';

describe('Component Tests', () => {

    describe('Livre Management Detail Component', () => {
        let comp: LivreDetailComponent;
        let fixture: ComponentFixture<LivreDetailComponent>;
        let service: LivreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [LivreDetailComponent],
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
                    LivreService
                ]
            }).overrideComponent(LivreDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LivreDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LivreService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN
            spyOn(service, 'find').and.returnValue(Observable.of(new Livre(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.livre).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
