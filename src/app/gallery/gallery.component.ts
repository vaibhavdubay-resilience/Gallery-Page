import { animate, style, transition, trigger, AnimationEvent } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
interface Images { 
  ImageSrc : string;
  ImageAlt : string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [
    trigger('animation',[
      transition("void => visible",[
        style({transform: 'scale(0.5)'}),
        animate('150ms', style({transform: 'scale(1)'}))
      ]),
      transition("visible => void",[
        style({transform: 'scale(1)'}),
        animate('150ms', style({transform: 'scale(0.5)'}))
      ]),
    ]),
    trigger('animation2',[
      transition(':leave',[
        style({opacity:1}),
        animate('50ms',style({opacity: 0.8}))
      ])
    ])
  ]
})
export class GalleryComponent implements OnInit {
  
  @Input() GalleryData : Images[] = [];
  @Input() showCount = false;

  previewImage = false;
  showmask = false;
  currentLightboximg : Images = this.GalleryData[0];
  currentIndex = 0;
  controls = true;

  constructor() { }

  ngOnInit(): void {
  }
  PreviewImage(img: number){
    this.showmask = true;
    this.previewImage = true;
    this.currentIndex = img;
    this.currentLightboximg = this.GalleryData[img]
  }
  AnimationEnd(e: AnimationEvent){
    if(e.toState === 'void'){
      this.showmask = false;
    }
  }
  closePreview(){
    this.previewImage = false;
  }
  prevImage(){
    this.currentIndex = this.currentIndex - 1;
    if(this.currentIndex < 0){
      this.currentIndex = this.GalleryData.length - 1;
    }
    this.currentLightboximg = this.GalleryData[this.currentIndex];
  }
  nextImage(){
    this.currentIndex = this.currentIndex + 1;
    if(this.currentIndex > this.GalleryData.length-1){
      this.currentIndex = 0;
    }
    this.currentLightboximg = this.GalleryData[this.currentIndex];
  }
}
