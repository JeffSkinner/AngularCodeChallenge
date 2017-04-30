import { Component, OnInit } from '@angular/core';


@Component({
  moduleId: module.id.replace("/dist/", "/app/"),
  selector: 'dashboard',
  template: `
  <div>
  <repo-search></repo-search>
  <repo-list></repo-list>
</div>
  `
})
export class DashboardComponent { }
