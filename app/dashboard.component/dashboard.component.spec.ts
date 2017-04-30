import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing'
import { Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent }  from './dashboard.component';
import { RepoService } from '../repo-info/repo.service'
import { RepoSearchComponent } from '../repo-info/repo-search.component'
import { RepoListComponent } from '../repo-info/repo-list.component'
import { CommitListComponent } from '../repo-info/commit-list.component'

describe('DashboardComponent', function () {
  let de: DebugElement;
  let comp: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        RouterTestingModule,
        NgbModule.forRoot()
      ],
      providers: [RepoService],
      declarations: [
    DashboardComponent,
    RepoSearchComponent,
    RepoListComponent,
    CommitListComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => expect(comp).toBeDefined() );

});
