import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output()  selectedSection = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedSection(sectionName: string) {
    this.selectedSection.emit(sectionName)
  }

}
