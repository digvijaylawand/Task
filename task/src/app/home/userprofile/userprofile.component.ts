import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
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
  id = null;
  profileImage: string;
  public userDetails : User;  
  constructor( private sanitizer:DomSanitizer,private _modalCtrl: NgbModal,private _route: ActivatedRoute, private _userService: UserService) {
    this.id = +this._route.snapshot.paramMap.get('id');
    }
 

  ngOnInit(): void {
    console.log(this.id);
     this._userService.getUserData(this.id).subscribe(data=>{
      console.log(data);
    
      this.userDetails=data[this.id-1];

    })
  }


  profileEdit() {
   

    const modal= this._modalCtrl.open(UsermanagerComponent,{size: 'lg'});
    modal.componentInstance.id=null; 
    modal.componentInstance.section='profile-data'; 
   
    this._userService.editId=this.id;
    console.log("profile edit id",this.id)
   }
}
