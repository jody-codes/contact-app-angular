import {Component, OnInit, Output} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ContactService} from '../contact.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {EventEmitter} from 'events';
import {FormBuilder, FormGroup} from '@angular/forms';

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
  dataList: any;
  @Output() selected = new EventEmitter<{key: any, value: any, payload: any}>();
  public contactForm: FormGroup;
  private loading: boolean;
  constructor(private fb: FormBuilder,
              config: NgbModalConfig,
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

private createForm() {
  this.contactForm = this.fb.group({
  cell: [''],
  });
}

public add() {
    let cell = this.contactForm.value;
    console.log(cell);
}

}
