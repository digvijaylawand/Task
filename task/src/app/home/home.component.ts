import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsermanagerComponent } from "./usermanager/usermanager.component"
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  closeResult: string;
  registerForm: FormGroup;


  constructor(private modalService:NgbModal,private _router: Router) { }

  ngOnInit(): void {

    
    
  }


  onRegisterClick() {
    const modal= this.modalService.open(UsermanagerComponent,{size: 'lg'});
    modal.componentInstance.id=null; 
    modal.componentInstance.section='profile-data';
    console.log(modal.result); 
    modal.result.then(result=>{
     console.log(1);
      if(result.success) {
       console.log(2);
        console.log(result.id);
      
       this._router.navigate([`/user-profile/${result.id}`])
      }
      
    
    },err=> {
      console.log(err);
    })
 
 
   }
}
