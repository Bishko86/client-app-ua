import { Component, OnInit } from '@angular/core';
import { DosService } from 'src/app/services/dos.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private dosServise: DosService) { }

  ngOnInit(): void {
  }
  dos() {
    this.dosServise.go('http://ca.ntssoft.ru').subscribe((d) => console.log(d))
  }

}
