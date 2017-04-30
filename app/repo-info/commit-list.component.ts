import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


import { Commit } from './commit';
import { Repo } from './repo';
import { RepoService } from './repo.service';

@Component({
  selector: 'commit-list',
  template: `
          <div class="modal-header">
              <h4 class="modal-title">{{repo.description}}</h4>
              <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
                  <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
              <b><u>Details for repository</u></b>
              <p>
                  Repo: {{repo.name}} <br>
                  URL: <a href="{{ repo.url }}" target="_blank">{{ repo.url }} </a><br>
                  Owner: {{ repo.owner }}  <img src="{{ repo.avatar }}" alt="{{ repo.owner }}" height="42" width="42" />
              </p>

              <table class="table table-hover table-bordered" >
                  <thead class="thead-default">
                  <tr>
                      <th>Commit Date</th>
                      <th>Author</th>
                      <th>Message</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr *ngFor="let commit of commits | async">
                      <td>{{commit.date}}</td>
                      <td>{{commit.login}}</td>
                      <td>{{commit.message}}</td>
                  </tr>
                  </tbody>
              </table>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Close</button>
          </div>
  `
})
export class CommitListComponent implements OnInit{

  @Input() repo;
  
  commits: Observable<Commit[]>
  isLoading: boolean = true;

  constructor(private repoService : RepoService, public activeModal: NgbActiveModal){ }

  ngOnInit(){
    
    this.commits = this.repoService.gitCommits; 
    
  }
 
}