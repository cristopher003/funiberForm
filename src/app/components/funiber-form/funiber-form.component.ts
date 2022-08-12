import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country} from 'src/app/interfaces/response';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-funiber-form',
  templateUrl: './funiber-form.component.html',
  styleUrls: ['./funiber-form.component.css']
})
export class FuniberFormComponent implements OnInit {

  funiberForm!:FormGroup;
  countries:Country[]=[];
  states:string[]=[];
  cities:string[]=[];
  areas: string[]=[];
  programs:  string[]=[];

  constructor(private readonly fb:FormBuilder,private data:DataService) {
   }

  ngOnInit(): void {
  this.funiberForm=this.initForm();
  this.countries=this.data.countries;
  this.areas=this.data.areas;
  }

  onSubmit(){
    if (this.funiberForm.invalid) {
   
        this.showAlert("please enter all the data  ","error")
    
    }else{
     const resp= this.data.savedata(this.funiberForm.value);
      if (!resp) {
        this.showAlert("Data Send");
        this.funiberForm.reset();
      }else{ this.showAlert("Error")}
    }
  }

  initForm(): FormGroup {
   return this.fb.group({
      area:['',[Validators.required]],
      program:['',[Validators.required]],
      names:['',[Validators.required]],
      lastNames:['',[Validators.required]],
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone:['',[Validators.required,]],
      country:['',[Validators.required]],
      state:['',[Validators.required]],
      city:['',[Validators.required]],
      comment:[''],
      policy:[false,[Validators.required]],
    });
 
  }

  onPathValue():void{
     this.funiberForm.patchValue({});
  }

  chargueState( $event: any){
    const countrie=$event.target.value;
    //console.log(this.states);
    this.data.getStates(countrie);
   this.states= this.data.states;
   //console.log(this.states); 
  }

  chargueCity( $event: any){
    const state=$event.target.value;
    this.data.getCities(state);
    this.cities= this.data.cities;
 
  }

  chargueArea($event:any){
    const area=$event.target.value;
    this.data.getProgram(area);
    this.programs=this.data.programs;
    
  }

 showAlert(message:string,icon:any='success'){
  Swal.fire({
    icon: icon,
    title: message,
  })
 }
}
