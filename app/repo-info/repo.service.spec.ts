import {ReflectiveInjector} from '@angular/core';
import {fakeAsync, tick} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions, RequestMethod} from '@angular/http';
import {Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import { RepoService } from './repo.service';

describe('RepoService', () => {

    beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      Http,
      RepoService,
    ]);
    this.repoService = this.injector.get(RepoService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

it('should create a service', (() => {
    expect(this.repoService).toBeTruthy();
  }));

it('should get repository results', <any>fakeAsync((): void => {
 
    const expectedUrl = 'https://api.github.com/repositories?since=0';

    var connection;
    this.backend.connections.subscribe(c => connection = c);
  
    this.repoService.loadRepos(); 
    connection.mockRespond(new Response(new ResponseOptions({ body: mockRepoResponse }))); 
    expect(connection.request.method).toBe(RequestMethod.Get);
    expect(connection.request.url).toBe(expectedUrl);         
    expect(this.lastConnection.request.url).toEqual(expectedUrl);
    
    this.repoService.gitRepos
        .subscribe(res => {
          expect(res[0].name).toEqual('angularjs');
          expect(res[0].description).toEqual('AngularJS tutorial for AccioCode');
          expect(res[0].url).toEqual('https://github.com/colorfest/angularjs');
          expect(res[0].owner).toEqual('colorfest');
          expect(res[0].avatar).toEqual('https://avatars0.githubusercontent.com/u/6611620?v=3');
          expect(res[0].commits_url).toEqual('https://api.github.com/repos/colorfest/angularjs/commits');

          expect(res[1].name).toEqual('angularjs');
          expect(res[1].description).toEqual('angularjs官方教程(ng-book)源代码：anguarjs 1.5.7 source code 。(keywords:angular angularjs angularjs1.x angular1.x )');
          expect(res[1].url).toEqual('https://github.com/xiaomoinfo/angularjs');
          expect(res[1].owner).toEqual('xiaomoinfo');
          expect(res[1].avatar).toEqual('https://avatars0.githubusercontent.com/u/12625278?v=3');
          expect(res[1].commits_url).toEqual('https://api.github.com/repos/xiaomoinfo/angularjs/commits');

          expect(res[2].name).toEqual('angularjs-cn');
          expect(res[2].description).toEqual('AngularJS');
          expect(res[2].url).toEqual('https://github.com/peiransun/angularjs-cn');
          expect(res[2].owner).toEqual('peiransun');
          expect(res[2].avatar).toEqual('https://avatars0.githubusercontent.com/u/3963045?v=3');
          expect(res[2].commits_url).toEqual('https://api.github.com/repos/peiransun/angularjs-cn/commits');
     });

     tick();
}));

it('should get filtered repository results', <any>fakeAsync((): void => {
 
    const expectedUrl = 'https://api.github.com/search/repositories?q=Angularjs%20in:description&page=1&per_page=30';

    var connection;
    this.backend.connections.subscribe(c => connection = c);
  
    this.repoService.filter('Angularjs'); 
    connection.mockRespond(new Response(new ResponseOptions({ body: mockRepoResponse }))); 
    expect(connection.request.method).toBe(RequestMethod.Get);
    expect(connection.request.url).toBe(expectedUrl);         
    expect(this.lastConnection.request.url).toEqual(expectedUrl);
    
    
      this.repoService.gitRepos
        .subscribe(res => {
          expect(res[0].name).toEqual('angularjs');
          expect(res[0].description).toEqual('AngularJS tutorial for AccioCode');
          expect(res[0].url).toEqual('https://github.com/colorfest/angularjs');
          expect(res[0].owner).toEqual('colorfest');
          expect(res[0].avatar).toEqual('https://avatars0.githubusercontent.com/u/6611620?v=3');
          expect(res[0].commits_url).toEqual('https://api.github.com/repos/colorfest/angularjs/commits');

          expect(res[1].name).toEqual('angularjs');
          expect(res[1].description).toEqual('angularjs官方教程(ng-book)源代码：anguarjs 1.5.7 source code 。(keywords:angular angularjs angularjs1.x angular1.x )');
          expect(res[1].url).toEqual('https://github.com/xiaomoinfo/angularjs');
          expect(res[1].owner).toEqual('xiaomoinfo');
          expect(res[1].avatar).toEqual('https://avatars0.githubusercontent.com/u/12625278?v=3');
          expect(res[1].commits_url).toEqual('https://api.github.com/repos/xiaomoinfo/angularjs/commits');

          expect(res[2].name).toEqual('angularjs-cn');
          expect(res[2].description).toEqual('AngularJS');
          expect(res[2].url).toEqual('https://github.com/peiransun/angularjs-cn');
          expect(res[2].owner).toEqual('peiransun');
          expect(res[2].avatar).toEqual('https://avatars0.githubusercontent.com/u/3963045?v=3');
          expect(res[2].commits_url).toEqual('https://api.github.com/repos/peiransun/angularjs-cn/commits');
        });

     tick();
}));


it('should get commit results', <any>fakeAsync((): void => {
 
    const expectedUrl = 'https://api.github.com/repos/colorfest/angularjs/commits?&sort=pushed&order=desc&per_page=5';

    var connection;
    this.backend.connections.subscribe(c => connection = c);
  
    this.repoService.loadCommits('https://api.github.com/repos/colorfest/angularjs/commits');

    connection.mockRespond(new Response(new ResponseOptions({ body: mockCommitResponse }))); 
    expect(connection.request.method).toBe(RequestMethod.Get);
    expect(connection.request.url).toBe(expectedUrl);         
    expect(this.lastConnection.request.url).toEqual(expectedUrl);
    
    this.repoService.gitCommits
        .subscribe(res => {
          expect(res[0].login).toEqual('K.C. Hunter');
          expect(res[0].message).toEqual('Updating readme with the final videos.');
          expect(res[0].date).toEqual('2016-02-11T22:35:43Z');

          expect(res[1].login).toEqual('K.C. Hunter');
          expect(res[1].message).toEqual('updating readme');
          expect(res[1].date).toEqual('2016-01-26T01:24:55Z');

          expect(res[2].login).toEqual('K.C. Hunter');
          expect(res[2].message).toEqual('fixing readme file.');
          expect(res[2].date).toEqual('2015-09-02T02:44:19Z');

          expect(res[3].login).toEqual('K.C. Hunter');
          expect(res[3].message).toEqual('updating master file structure.');
          expect(res[3].date).toEqual('2015-07-03T14:48:36Z');

          expect(res[4].login).toEqual('K.C. Hunter');
          expect(res[4].message).toEqual('updating README.md');
          expect(res[4].date).toEqual('2015-07-02T18:29:38Z');
          
        });

     tick();
}));


   const mockRepoResponse = {
  "total_count": 75873,
  "incomplete_results": false,
  "items": [
    {
      "id": 26496724,
      "name": "angularjs",
      "full_name": "colorfest/angularjs",
      "owner": {
        "login": "colorfest",
        "id": 6611620,
        "avatar_url": "https://avatars0.githubusercontent.com/u/6611620?v=3"
      },
      "private": false,
      "html_url": "https://github.com/colorfest/angularjs",
      "description": "AngularJS tutorial for AccioCode",
      "commits_url": "https://api.github.com/repos/colorfest/angularjs/commits{/sha}"
    },
    {
      "id": 56208882,
      "name": "angularjs",
      "full_name": "xiaomoinfo/angularjs",
      "owner": {
        "login": "xiaomoinfo",
        "avatar_url": "https://avatars0.githubusercontent.com/u/12625278?v=3"
      },
      "private": false,
      "html_url": "https://github.com/xiaomoinfo/angularjs",
      "description": "angularjs官方教程(ng-book)源代码：anguarjs 1.5.7 source code 。(keywords:angular angularjs angularjs1.x angular1.x )",
      "commits_url": "https://api.github.com/repos/xiaomoinfo/angularjs/commits{/sha}"
    },
    {
      "id": 10782129,
      "name": "angularjs-cn",
      "full_name": "peiransun/angularjs-cn",
      "owner": {
        "login": "peiransun",
        "avatar_url": "https://avatars0.githubusercontent.com/u/3963045?v=3"
      },
      "private": false,
      "html_url": "https://github.com/peiransun/angularjs-cn",
      "description": "AngularJS",
      "commits_url": "https://api.github.com/repos/peiransun/angularjs-cn/commits{/sha}"
    }
  ]
}; 

const mockCommitResponse = [
  {
    "sha": "9afcb0349d277e92ea426c6a9a4794b86ba3247c",
    "commit": {
      "author": {
        "name": "K.C. Hunter",
        "email": "kchunter@connectionseducation.com",
        "date": "2016-02-11T22:35:43Z"
      },
      "message": "Updating readme with the final videos."
    }
  },
  {
    "sha": "16d1c455bc54fe725e8560ee3a2853e37d7a29d3",
    "commit": {
      "author": {
        "name": "K.C. Hunter",
        "email": "kchunter@connectionseducation.com",
        "date": "2016-01-26T01:24:55Z"
      },
      "message": "updating readme"
    }
  },
  {
    "sha": "456f60d4f360e42894e5a2a53926a5c8f50d30b1",
    "commit": {
      "author": {
        "name": "K.C. Hunter",
        "email": "kchunter@connectionseducation.com",
        "date": "2015-09-02T02:44:19Z"
      },
      "message": "fixing readme file."
    }
  },
  {
    "sha": "01ce1253abeb3839147f7ccc1962612f41757e85",
    "commit": {
      "author": {
        "name": "K.C. Hunter",
        "email": "kchunter@connectionseducation.com",
        "date": "2015-07-03T14:48:36Z"
      },
      "message": "updating master file structure."
    }
  },
  {
    "sha": "88c9ff80c2cc38e685bb283b1c2196aa64d7d8eb",
    "commit": {
      "author": {
        "name": "K.C. Hunter",
        "email": "kchunter@connectionseducation.com",
        "date": "2015-07-02T18:29:38Z"
      },
      "message": "updating README.md"
    }
  }
]; 

});
