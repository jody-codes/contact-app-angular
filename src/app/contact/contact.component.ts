import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ContactService} from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ContactComponent implements OnInit {
  public error: string | undefined;
  data: any;
  gender: any;
  private loading: boolean;

  constructor(config: NgbModalConfig,
              private modalService: NgbModal,
              private contactService: ContactService
  ) {
    // customize default values of modals used by this component tree
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



}
