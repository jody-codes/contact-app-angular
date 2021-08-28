import {Component, OnInit, Output, TemplateRef} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ContactService} from '../contact.service';
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ContactComponent implements OnInit {
  data: any;
  dataList = [];
  detailData = [];
  cell: any;
  faPlus = faPlus;
  faTrash = faTrash;
  public error: string | undefined;
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

  public open(contactModal): void {
    this.modalService.open(contactModal);
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


  public add(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var id = target.attributes.id;
    for (let d of this.data) {
      if (d.cell === id.value) {
        console.log(d);
        this.dataList.unshift(d);
      }
    }
    console.log('total: ' + this.dataList);
  }


  public detail(event, templateRef: TemplateRef<any>) {
    var target = event.target || event.srcElement || event.currentTarget;
    var id = target.attributes.id;
    console.log(id.value);
    this.dataList.forEach((value, index) => {
      if (value.cell == id.value) {
        this.detailData.splice(value);
        this.detailData.unshift(value);
        // this.mapDetail();
        this.openDetail(templateRef);
      }
    });
  }

// public mapDetail() {
//   this.detailData.forEach((value, index) => {
//     this.picture = value.picture.large;
//   });
// }

  public openDetail(contactDetailModal) {
    this.modalService.open(contactDetailModal);
  }

  public delete(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var id = target.attributes.id;
    console.log(id.value);
    this.dataList.forEach((value, index) => {
      if (value.cell == id.value) {
        this.dataList.splice(index, 1);
        this.modalService.dismissAll();
      }
    });
  }

}
