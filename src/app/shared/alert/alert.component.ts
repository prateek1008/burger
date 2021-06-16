import { BehaviorSubject } from 'rxjs';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit, AfterViewInit {
  @Input() errorMessage;
  @ViewChild('openModalButton', { static: false })
  openModalButton: ElementRef<HTMLElement>;
  isClosed = new BehaviorSubject<boolean>(false);
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.openModalButton.nativeElement.click();
  }

  onClose() {
    this.isClosed.next(true);
  }
}
