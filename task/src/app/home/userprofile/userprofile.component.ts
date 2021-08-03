import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute,Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { UsermanagerComponent } from '../usermanager/usermanager.component';
import { User } from 'src/app/user';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  imageError: string;
    isImageSaved: boolean;
    cardImageBase64: string;
    image:any;
  id = null;
  profileImage: string;
  public userDetails : User;  
  constructor( private sanitizer:DomSanitizer,private _modalCtrl: NgbModal,private _route: ActivatedRoute, private _userService: UserService,private _router: Router) {
    this.id = +this._route.snapshot.paramMap.get('id');
    }
 

  ngOnInit(): void {
    console.log(this.id);
     this._userService.getUserData(this.id).subscribe(data=>{
      console.log(data);
    
      this.userDetails=data[0];

    })
  }


  profileEdit() {
   

    const modal= this._modalCtrl.open(UsermanagerComponent,{size: 'lg'});
    modal.componentInstance.id=null; 
    modal.componentInstance.section='profile-data'; 
   
    this._userService.editId=this.id;
    console.log("profile edit id",this.id)
   }


   fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 128000;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 310;
        const max_width = 325;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is '+ '1024 Kb';

            return false;
        }

        
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];

                console.log(img_height, img_width);


                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                    this.image={ image:this.cardImageBase64,
                                 id:this.id }
                                 console.log(this.image);
                    console.log(this.cardImageBase64);
                    this._userService.updateImage(this.image,this.id).subscribe(data =>{
                      console.log(data);
                      
                    });
                    // this.previewImagePath = imgBase64Path;
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
}
}


