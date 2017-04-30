import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { RepoService } from './repo.service';

@Component({
  selector: 'repo-search',
  template: `
  <section>
    <label>Filter By Term: </label>
    <input [(ngModel)]="termFilter" placeholder="Search Text" >
  </section>
  `
})
export class RepoSearchComponent {
 
  private termFilter: string = '';

  constructor(private repoService : RepoService, private elementRef: ElementRef,){ }

  ngOnInit(): void {
        const eventStream = Observable.fromEvent(this.elementRef.nativeElement, 'keyup')
            .map(() => this.termFilter)
            .debounceTime(200); //added debounce to allow user to have time to finish typing before calling API

        eventStream.subscribe(input => this.repoService.filter(input));
    }

}