import {Component, OnInit, Output} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ContactService} from '../contact.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {EventEmitter} from 'events';
import {newArray} from '@angular/compiler/src/util';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ContactComponent implements OnInit {
  faPlus = faPlus;
  public error: string | undefined;
  data: any;
  cell: any;
  @Output() selected = new EventEmitter<{key: any, value: any, payload: any}>();
  contactForm: any;
  private loading: boolean;
  constructor(config: NgbModalConfig,
              private modalService: NgbModal,
              private contactService: ContactService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }


  ngOnInit(): void {
    this.fetchContact();
  }

  public open(content): void {
    this.modalService.open(content);
  }

  public fetchContact(): void {
    this.contactService.findContact().subscribe(
      (data: any) => {
        this.data = data.results;
        console.log(this.data);
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  dataList = [
  ];

public add(event) {
  var target = event.target || event.srcElement || event.currentTarget;
  var id = target.attributes.id;
  for (let d of this.data) {
    if (d.cell === id.value) {
      console.log(d);
      this.dataList.unshift({d});
    }
  }
  console.log('total: ' + this.dataList);
}

}
