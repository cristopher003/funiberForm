import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Countries, Country, State, States } from '../interfaces/response';
import ariasAndPrograms from 'src/assets/data/data.json';

const headers = {
  'api-token': environment.apiToken, 
  'user-email': environment.userEmail 
}

const API='https://www.universal-tutorial.com/api/';
const API_FUNIBER='http://localhost:8080/api/';

@Injectable()
export class DataService {

  token: string | null='';
  countries:Country[]  =[] ;
  states:string[]  =[] ;
  cities:string[]  =[] ;
  ariasAndProgram=ariasAndPrograms;
  areas: string[]=[];
  programs:  string[]=[];

  constructor(private http: HttpClient) { 
    this.ValidateToken();
    this.getCountries();
    this.getAreas();
  }

  getAccessToken(){
    this.http.get<any>(`${API}getaccesstoken`, { headers }).subscribe(data => {
     localStorage.setItem('token',data['auth_token']);
     this.token=data['auth_token'];
  })
  }

  ValidateToken(){
    if (!localStorage.getItem('token')) {
    this.getAccessToken();
    }else{
      this.token=localStorage.getItem('token');
      console.log(localStorage.getItem('token'));
    }
  }

  getCountries(){
    if (!localStorage.getItem('countries')) {
      let headers = {'Authorization':`Bearer ${this.token}`}
      this.http.get<any>(`${API}countries`, { headers }).subscribe(
        (countries)=>{
          countries.forEach((countrie:Country) => {
            this.countries.push(countrie);
          })
          localStorage.setItem('countries',JSON.stringify(this.countries));
        }
      )
      // this.http.get<Countries>(`${API}countries`, { headers }).pipe(
      //   map((countries:Countries)=>{
      //     this.countries=countries.countries;
      //     localStorage.setItem('countries',JSON.stringify(this.countries));
      //   } )
      // )
    }else{
      this.countries=JSON.parse(localStorage.getItem('countries') || "[]");
    //  console.log(this.countries+JSON.stringify(localStorage.getItem('countries')));
    }
  }

  getStates(countrie:string='Ecuador'){
    this.states=[];
    let headers = {'Authorization':`Bearer ${this.token}`}
    this.http.get<any>(`${API}states/${countrie}`, { headers}).subscribe( resp=>{
      resp.forEach((element: any) => {
        // console.log(element.state_name);
        this.states.push(element.state_name);
      });
    } );
  }

  getCities(state:string='Guayas'){
    this.cities=[];
    let headers = {'Authorization':`Bearer ${this.token}`}
    this.http.get<any>(`${API}cities/${state}`, { headers}).subscribe( resp=>{
      if (resp.length==0) {
        this.cities.push("there are no cities");
      }else{
        resp.forEach((element: any) => {
          // console.log(element.city_name);
          this.cities.push(element.city_name);
        });
      }
    
    } );
  }

  getAreas(){
    this.ariasAndProgram.forEach((element: any) => {
    this.areas.push(element['area']);
    });
    // console.log(this.areas);
  }

  getProgram(area:string){
    this.programs=[];
    this.ariasAndProgram.forEach((element: any) => {
      if (element['area']===area) {
        element['program'].forEach((program :any)=> {
          this.programs.push(program);
        });
      }});
    // console.log(this.programs);
  }

  // private statesArray(statesObj :Object){
  //   const states:State[]=[];

  //   if (statesObj===null) {
  //     return [];
  //   }

  //   Object.keys(statesObj).forEach(key=>{

  //     const state:State= statesObj[key];
  //     states.push(state);
  //   });

  //   return states;
  // }

  savedata(dataform: any){
    const body = JSON.stringify(dataform);
    console.log(JSON.stringify(dataform))
    this.http.post<any>(`${API_FUNIBER}cliente`, body).subscribe( resp=>{
      resp.forEach((element: any) => {
        // console.log(element.state_name);
        console.log(element);
      });
    } );
  }

}
