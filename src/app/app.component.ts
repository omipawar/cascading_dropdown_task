import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dropdown-binding-task';
  states: any;
  id: any;
  divisions: any;
  districts: any;
  taluka: any;
  village:any;
  records:any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.showAll();

    this.records = new FormGroup({
      state: new FormControl(""),
      division: new FormControl(""),
      district: new FormControl(""),
      taluka: new FormControl(""),
      village: new FormControl("")
    })

  }
  submitdata(records:any){
    alert("Hello")
   }

  showAll() {
    this.api.getAll("http://awsmaster.mahamining.com/master/states/GetState").subscribe((data: any) => {
      this.states = data;
      this.states = this.states.responseData;
      // console.log(this.states);
    });
  }

  statechanged(event: Event) {
    let stateid = (<HTMLInputElement>event.target).value;
    this.api.getAll("http://awsmaster.mahamining.com/master/divisions/" + stateid).subscribe((result: any) => {
      // console.log(result.responseData);
      this.divisions = result.responseData;
      // console.log(this.divisions);

    });
  }

  divchange(event: Event) {
    let divcode = (<HTMLInputElement>event.target).value;
    // alert(divcode);
    this.api.getAll("http://awsmaster.mahamining.com/master/districts/GetDistrictByDivisionId?UserId=1&DivisionId=" + divcode).subscribe((data: any) => {
      // console.log(data.responseData);
      this.districts = data.responseData;
    })
  }

  distchange(event: Event) {
    let distid = (<HTMLInputElement>event.target).value;
    // alert(distid);
    this.api.getAll("http://awsmaster.mahamining.com/master/talukas/GetTalukaByDistrictId/" + distid).subscribe((data: any) => {
      this.taluka = data.responseData;
      // console.log(this.taluka);
    });
  }

  talukachange(event: Event) {
    let talukaid = (<HTMLInputElement>event.target).value;
    // alert(talukaid);
    this.api.getAll("http://awsmaster.mahamining.com/master/villages/GetVillagesByCriteria/" + talukaid).subscribe((data: any) => {
      this.village = data.responseData;
      // console.log(this.village);
    });
  }

  save()
  {
    let stateSelect = <HTMLSelectElement>document.getElementById("state");
    let state =  stateSelect.options[stateSelect.selectedIndex].text;
    let divisionselect = <HTMLSelectElement>document.getElementById("division");
    let division =  divisionselect.options[divisionselect.selectedIndex].text;
    alert(division);
  }




}
