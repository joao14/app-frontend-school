import { Directive, Output, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { FileHandle } from 'src/models/FileHandle';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appDragdrop]'
})
export class DragdropDirective {

  @Output('files') files: EventEmitter<FileHandle[]> = new EventEmitter();

  @HostBinding('style.background') public background = '#f5fcff'
  @HostBinding('style.opacity') public opacity = '1'

  constructor(private sanitizer: DomSanitizer) { }

  //Dragover listener
  @HostListener('dragover', ['$event']) public onDragOver(evt: DragEvent) {    
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8'
  }

  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
  }

  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
    let files: FileHandle[] = [];
    for (let i = 0; i < evt.dataTransfer.files.length; i++) {
      const file = evt.dataTransfer.files[i];
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      files.push({
        file,
        url
      });
    }
    if (files.length > 0) {
      this.files.emit(files);
    }
  }

}
