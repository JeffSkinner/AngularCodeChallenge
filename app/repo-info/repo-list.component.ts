import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


import { Repo } from './repo';
import { Commit } from './commit';
import { RepoService } from './repo.service';
import { CommitListComponent } from './commit-list.component'


@Component({
    selector: 'repo-list',
    template: `
          <section *ngIf="isLoading && !errorMessage">
              Retrieving data...
          </section>
          <section *ngIf="errorMessage">
              {{errorMessage}}
          </section>

          <table class="table table-hover table-bordered" style="width:50%">
              <thead class="thead-default">
              <tr>
                  <th>Repository Name</th>
                  <th>Repository Description</th>
                  <th></th>
              </tr>
              </thead>
              <tbody>
              <tr *ngFor="let repo of repos | async">
                  <td>{{repo.name}}</td>
                  <td>{{repo.description}}</td>
                  <td><button (click)="open(repo)">Details</button></td>
              </tr>
              </tbody>
          </table>
  `
})
export class RepoListComponent implements OnInit{

    repos: Observable<Repo[]>
    commits: Observable<Commit[]>
    isLoading: boolean = true;

    constructor(private repoService : RepoService, private modalService: NgbModal){ }

ngOnInit(){
    this.repos = this.repoService.gitRepos;
    this.commits = this.repoService.gitCommits;
    this.repoService.loadRepos();
    this.isLoading = false;
}

open(repo : Repo) {
    this.repoService.loadCommits(repo.commits_url);
    const modalRef = this.modalService.open(CommitListComponent, {size: 'lg'});
    modalRef.componentInstance.repo = repo;
}

}