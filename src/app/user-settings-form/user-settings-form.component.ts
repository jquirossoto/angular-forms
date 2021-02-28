import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { UserSettingsI } from '../data/user-settings';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings: UserSettingsI = {
    emailOffers: null,
    name: null,
    interfaceStyle: null,
    notes: null,
    subscriptionType: null
  };
  userSettings: UserSettingsI = {...this.originalUserSettings};
  postError = false;
  postErrorMessage: string;
  subscriptionTypes: Observable<string[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes(); 
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;

  }

  onSubmit(form: NgForm){
    if(form.valid){
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log('sucess: ', result),
        error => this.onHttpError(error)
      );
    } else {
      this.postError = true;
      this.postErrorMessage = "Invalid form";
    }
  }

  onBlur (field: NgModel) {
    console.log('in on blur', field.valid);
  }

}
