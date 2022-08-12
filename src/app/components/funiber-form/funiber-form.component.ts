import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, pipe } from 'rxjs';
import { Country, State, States } from 'src/app/interfaces/response';
import { DataService } from 'src/app/services/data.service';



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
  console.log(this.countries)
  }

  onSubmit(){
    if (this.funiberForm.invalid) {
      this.data.savedata(this.funiberForm.value);

      if(this.funiberForm.get('policy')?.value){

      }else{

      }
      console.log(this.funiberForm.value)
    }else{
      this.data.savedata(this.funiberForm.value);
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
}
