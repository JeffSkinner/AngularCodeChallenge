import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id.replace("/dist/", "/app/"),
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ]
})
export class DashboardComponent { }
