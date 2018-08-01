import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-graphcontainer',
  templateUrl: './graphcontainer.component.html',
  styleUrls: ['./graphcontainer.component.css']
})
export class GraphcontainerComponent implements OnInit {
  @HostBinding('class.json-data')
  jsonData : JSON;

  constructor() { }

  ngOnInit() {
    
  }



}
