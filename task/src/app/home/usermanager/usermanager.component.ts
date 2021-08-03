import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {CustomValidatorsService} from "../../custom-validators.service";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { UserService } from "../../user.service";
import { User } from "../../user";

@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.css']
})
export class UsermanagerComponent implements OnInit {
  imageError : string;
  registerForm: FormGroup;
  userDetailsedit : User;

  message: string;
  interestList: string[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  public formSubmit: boolean = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(public activeModal: NgbActiveModal, private _router: Router,private _userservice: UserService) { }
  @Input() id;
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      fname: new FormControl('', [Validators.required, CustomValidatorsService.validateName]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email ]),
      mobile: new FormControl('', [Validators.required]),
      age: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      address: new FormControl(''),
      address1: new FormControl(''),
      address2: new FormControl(''),
      interests: new FormControl([]),
      image: new FormControl(null),
      image1: new FormControl(null, CustomValidatorsService.validateImage),
      ischeck: new FormControl('', [Validators.required])
    });
    console.log('ng on init');
    console.log(this._userservice.editId);
    this.id=this._userservice.editId;
    if (this.id)
    {

      console.log(this.id);
      this.getUpdatedUser();
    }

  }


  getUpdatedUser(){
    this._userservice.getUserData(this.id).subscribe(data=>{
      console.log(data);
      this.userDetailsedit=data[0];
      console.log(this.userDetailsedit.fname);
      this.registerForm.patchValue({ 
        fname: this.userDetailsedit.fname,
        lname: this.userDetailsedit.lname,
        email: this.userDetailsedit.email,
        mobile: this.userDetailsedit.mobile,
        state: this.userDetailsedit.state,
        country: this.userDetailsedit.country,
        age: this.userDetailsedit.age,
        address: this.userDetailsedit.address,
        address1: this.userDetailsedit.address1,
        address2: this.userDetailsedit.address2,
        interests: this.userDetailsedit.interests,
        image: this.userDetailsedit.image
     })
    })
    
    

}

onSubmit() {
  this.formSubmit = true;
  console.log("submit clicked");
  console.log("id:",this.id);
 if (this.id) {
   console.log(this.id);
  
    this._userservice.updateUser(this.registerForm.value,this.id).subscribe(data => {
      console.log(data)
      console.log("after update user")
      this.activeModal.close({success: true,id: data.id})
      this.getUpdatedUser() 
      console.log("after getupdated user")
      this._router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this._router.navigate(['user-profile/'+this.id]);
    });
      
      
     },err => {
      console.log(err)
    });
  
  }
  else {
    console.log("else");
    
      console.log("valid");
      this._userservice.addUsers(this.registerForm.value).subscribe(data => {
        console.log(data)
        this.activeModal.close({success: true,id: data.id})
        console.log("success");
        // this._router.navigate(['/user-profile/'])
       },err => {
        console.log("err")
        console.log(err)
      });
    
  }

}

  onFileSelected(event: Event) {
    this.imageError=null;
    window.URL = window.URL;
    const file = (<HTMLInputElement>event.target).files[0];
    console.log(file +"1");
    if (file) {
      
      this.registerForm.get('image1').patchValue(file.name);
      
      const img = new Image();
       img.src = window.URL.createObjectURL( file );
       console.log(img.src +"2");
       const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // const img = new Image();
        img.src = reader.result as string;
        console.log(img.src +"3");
        img.onload = () => {
          const height = img.naturalHeight;
          const width = img.naturalWidth;
          if( width > 310 && height > 325 ) {
                 console.log(width); 
                 console.log(height);
                 this.registerForm.get('image').patchValue('../../assets/images/user-default-img.jfif');
                   this.imageError=("Please upload an image with in 310*325px resolution");
                 } 
          console.log('Width and Height', width, height);
        } ;
      };
    
         console.log(4);
       var readerr = new FileReader();
       readerr.onload = this._handleReaderLoaded.bind(this);
       readerr.readAsBinaryString(file);
       console.log(img.src +"4");
      }
      }
      _handleReaderLoaded(readerEvt) {
        console.log(5);
        var binaryString = readerEvt.target.result;
        this.registerForm.get('image').patchValue('data:image/png;base64,' + btoa(binaryString));
      }

      add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
    
       
        if ((value || '').trim()) {
          this.interestList.push(value);
          this.registerForm.patchValue({
            interests: this.interestList
          })
        }
    
        // Reset the input value
        if (input) {
          input.value = '';
        }
      }
    
      remove(item): void {
        const index = this.interestList.indexOf(item);
    
        if (index >= 0) {
          this.registerForm.patchValue({
            interests: this.interestList
          })
        }
      }
    
      validationField(type: string, field: string) {
        return (
          this.registerForm.get(`${field}`).hasError(type) &&
          (this.registerForm.get(`${field}`).dirty ||
            this.registerForm.get(`${field}`).touched ||
            this.formSubmit)
        );
      }
}
