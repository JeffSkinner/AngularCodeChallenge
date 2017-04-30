import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent }  from './dashboard.component/dashboard.component';
import { RepoService } from './repo-info/repo.service'
import { RepoSearchComponent } from './repo-info/repo-search.component'
import { RepoListComponent } from './repo-info/repo-list.component'
import { CommitListComponent } from './repo-info/commit-list.component'


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  declarations: [ 
    AppComponent,
    DashboardComponent,
    RepoSearchComponent,
    RepoListComponent,
    CommitListComponent
    ],
    entryComponents: [CommitListComponent],
  providers: [RepoService,
              {provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
