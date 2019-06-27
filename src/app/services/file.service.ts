import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { FileData } from '../model/file-data';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private ipc: IpcRenderer;

  constructor() {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (error) {
        throw error;
      }
    } else {
      console.warn('Could not load electron ipc');
    }
  }

  saveFile(fileData: FileData){
    this.ipc.send("save-file", fileData);
  }
}
