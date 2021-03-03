import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {

  @Input()
  onFileUpload: (file: File) => void;


  files: File[] = [];

  fileUrlSelected: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  selectedFile(event) {
    this.files.push(...event.addedFiles);
    const file = event.addedFiles[0];
    this.onFileUpload(file);
  }

  removeFile(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

}
