import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing'
import { Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { RepoService } from './repo.service'
import { CommitListComponent } from './commit-list.component'


describe('CommitListComponent', function () {

  let comp: CommitListComponent;
  let fixture: ComponentFixture<CommitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        RouterTestingModule,
        NgbModule.forRoot()
      ],
      providers: [RepoService, NgbActiveModal],
      declarations: [
    CommitListComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitListComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => expect(comp).toBeDefined() );

});
