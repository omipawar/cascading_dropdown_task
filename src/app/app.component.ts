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
  village: any;
  records: any;
  allRecords: any;

  mystateid = 0;
  mydivisionid = 0;
  mydistrictid = 0;
  mytalukaid = 0;
  myvillageid = 0;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.showAll();
    this.getRecords();

    this.records = new FormGroup({
      state: new FormControl(""),
      division: new FormControl(""),
      district: new FormControl(""),
      taluka: new FormControl(""),
      village: new FormControl("")
    });
  }
  submitdata(records: any) {
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

  save() {
    // json-server --watch db.json
    // npm i -g json-server

    let stateSelect = <HTMLSelectElement>document.getElementById("state");
    let state = stateSelect.options[stateSelect.selectedIndex].text;

    let divisionselect = <HTMLSelectElement>document.getElementById("division");
    let division = divisionselect.options[divisionselect.selectedIndex].text;

    let districtselect = <HTMLSelectElement>document.getElementById("district");
    let district = districtselect.options[districtselect.selectedIndex].text;

    let talukaselect = <HTMLSelectElement>document.getElementById("taluka");
    let taluka = talukaselect.options[talukaselect.selectedIndex].text;

    let villageselect = <HTMLSelectElement>document.getElementById("village");
    let village = villageselect.options[villageselect.selectedIndex].text;

    let data = { state: state, stateid: stateSelect.value, division: division, divisionid: divisionselect.value, district: district, districtid: districtselect.value, taluka: taluka, talukaid: talukaselect.value, village: village, villageid: villageselect.value };
    // console.log(data);

    this.api.postRecord(data).subscribe((data: any) => {
      console.log(data);
      alert("data added")
      window.location.href = "/records";
    });

  }
  getRecords() {
    this.api.getAll("http://localhost:3000/records/").subscribe((data: any) => {
      // console.log(data);
      this.allRecords = data;
    });
  }

  editProduct(id: any) {
    this.api.getRecord("http://localhost:3000/records/" + id).subscribe((data: any) => {
      // console.log(data);
      this.mystateid = data.stateid;
      this.mydivisionid = data.divisionid;
      this.mydistrictid = data.districtid;
      this.mytalukaid = data.talukaid;
      this.myvillageid = data.villageid;

      this.api.getAll("http://awsmaster.mahamining.com/master/divisions/" + this.mystateid).subscribe((result: any) => {
        this.divisions = result.responseData;
        // console.log(this.divisions);

      });
      this.api.getAll("http://awsmaster.mahamining.com/master/divisions/" + this.mystateid).subscribe((result: any) => {
        this.districts = result.responseData;
      });
      this.api.getAll("http://awsmaster.mahamining.com/master/talukas/GetTalukaByDistrictId/" + this.mydistrictid).subscribe((result: any) => {
        this.taluka = result.responseData;
      })
      this.api.getAll("http://awsmaster.mahamining.com/master/villages/GetVillagesByCriteria/" + this.mytalukaid).subscribe((result: any) => {
        this.village = result.responseData;
        this.api.deleteRecord("http://localhost:3000/records/"+id).subscribe((data:any)=>{
          
        });
      });

    });
  }

  deleteproduct(id: any) {
    confirm("Sure to delete")
    this.api.deleteRecord("http://localhost:3000/records/" + id).subscribe((data: any) => {
      // console.log(data);
      window.location.href = "/records";
    });

  }



}
