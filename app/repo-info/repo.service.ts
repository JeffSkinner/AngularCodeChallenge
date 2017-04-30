import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { Repo } from './repo';
import { Commit } from './commit';

@Injectable()
export class RepoService{
  private _baseUrl: string;
  private _repos: BehaviorSubject<Repo[]>;
  private _dataStore: {
    repos: Repo[],
    commits: Commit[]
  };
  private _commits: BehaviorSubject<Commit[]>;
  private _repo: BehaviorSubject<Repo>;
  private filterString: string;
  private _lastRepoID: number;
  private _lastPageNumber: number;
  

  constructor(private http : Http){
    this._baseUrl  = 'https://api.github.com';
    this._dataStore = { repos: [], commits: [] };
    this._repos = <BehaviorSubject<Repo[]>>new BehaviorSubject([]);
    this._commits = <BehaviorSubject<Commit[]>>new BehaviorSubject([]);
    this.filterString = '';
    /* For future enhancement to allow paging through results. */
    this._lastRepoID = 0;
    this._lastPageNumber = 1;
  }

  /* The service communicates the data changes to the other components through subscribing to observables */
  get gitRepos() {
    return this._repos.asObservable();
  }

  get gitCommits() {
    return this._commits.asObservable();
  }

  /* The last 5 commits are loaded when the repository is selected. */
  loadCommits(commitUrl: string) {
    this._dataStore.commits=[];
    this._commits.next(Object.assign({}, this._dataStore).commits);
    this.http.get(`${commitUrl + '?&sort=pushed&order=desc&per_page=5'}`).map(mapCommits).subscribe(data => {
      this._dataStore.commits = data;
      this._commits.next(Object.assign({}, this._dataStore).commits);
    }, error => console.log('Could not load commits.'));

    return this._commits;
  }
  
  /* The repository query has some limitations. 
      - A generic query for a list of respositories is limited to 30 records
      - A query with a filter is limited to 1000 records with a maximum of 100 records per 
        call to the api (indexed by page number)
      - The call limit for the API is 30x per minute

      For this example to keep the queries consistent, they are both limited to 30.  A possible 
      enhancement would be to include paging as noted above
  */
  loadRepos() {
    let searchUrl = '/repositories?since=' + this._lastRepoID;
    if (this.filterString!=''){
        searchUrl = '/search/repositories?q=' + this.filterString + 'in:description&page=' + this._lastPageNumber + '&per_page=30';
    };
    this.http.get(`${this._baseUrl + searchUrl}`).map(mapRepos).subscribe(data => {
      this._dataStore.repos = data;
      this._repos.next(Object.assign({}, this._dataStore).repos);
    }, error => console.log('Could not load repos.' + error));
  }

  /* Filter text from the search box. */
  filter(term: string = '') {
    if (term===''){
      this.filterString = term;
    }else{
      this.filterString = encodeURIComponent(term + ' ');
    }
    this.loadRepos()
  }

}

/*  Mapping the data to object arrays is done in the functions below */
function mapRepos(response:Response): Repo[]{

  if (response.json().items){
    return response.json().items.map(toRepo)
  }
   return response.json().map(toRepo)
}

function toRepo(r:any): Repo{
 
  let repo = <Repo>({
    id: r.id,
    name: r.name,
    description: r.description || 'This repository has no description (' + r.name + ')',
    url: r.html_url,
    owner: r.owner.login,
    avatar: r.owner.avatar_url,
    commits_url: r.commits_url.replace('{/sha}',''),
  });

  console.log('Parsed repo:', repo);
  
  return repo;
}

function mapCommits(response:Response): Commit[]{

  if (response.json().items){
    return response.json().items.map(toCommit)
  }
   return response.json().map(toCommit)
}

function toCommit(r:any): Commit{
 
  let commit = <Commit>({
    login: r.commit.author.name,
    message: r.commit.message,
    date: r.commit.author.date,
  });

  console.log('Parsed commit:', commit);
  
  return commit;
}

