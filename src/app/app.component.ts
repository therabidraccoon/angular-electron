import { Component, OnInit } from '@angular/core';
import { FileData } from './model/file-data';
import { FileService } from './services/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'angular-electron';

  file: FileData;

  constructor(private fileService: FileService) {
  }

  ngOnInit() {
    this.file = new FileData();
  }

  save() {
    if (this.file.name
      && this.file.name !== null
      && this.file.name.trim() !== '') {
      this.fileService.saveFile(this.file);
    }
  }

}
