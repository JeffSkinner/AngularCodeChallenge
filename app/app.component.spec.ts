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

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent }  from './dashboard.component/dashboard.component';
import { RepoService } from './repo-info/repo.service'
import { RepoSearchComponent } from './repo-info/repo-search.component'
import { RepoListComponent } from './repo-info/repo-list.component'
import { CommitListComponent } from './repo-info/commit-list.component'

describe('AppComponent', function () {
  let de: DebugElement;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        RouterTestingModule,
        NgbModule.forRoot()
      ],
      declarations: [
        AppComponent,
        DashboardComponent,
    RepoSearchComponent,
    RepoListComponent,
    CommitListComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
  });

  

  it('should create component', () => expect(comp).toBeDefined() );

  it('should have expected "Repository Finder" heading', () => {
    TestBed.compileComponents;
    fixture.detectChanges();
    const h1 = de.nativeElement;

    expect(h1.innerText).toEqual('Repository Finder');
    
  });
});
