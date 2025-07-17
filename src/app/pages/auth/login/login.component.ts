import {Component, OnInit} from '@angular/core';
import {AppLabelConstants} from '../../../constants/AppLabelConstant';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {GuardService} from '../../../Services/guard.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormErrorService} from '../../../Services/genericComponentService/form-error.service';
import {Login} from '../../../Services/guards/guards-interfece';
import {AuthService} from '../../../Services/auth.service';
import {NgClass, NgIf} from '@angular/common';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {DateRangeServiceService} from '../../../Services/genericComponentService/date-range-service.service';

@Component({
  selector: 'app-login',
  imports: [
    NgClass,
    FormsModule,
    NgbAlert,
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public labelContent = AppLabelConstants
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  showPassword: boolean = false;
  hideFormSubscription: boolean = false;
  emailQueryParam: boolean = false;
  responseMsgSubscription:string
  loginResponse: any;
  constructor(private fb: FormBuilder ,private router: Router,
              private guardService: AuthService, private formErrorService: FormErrorService,
              private route: ActivatedRoute,private dateRangeService: DateRangeServiceService
  ) {
  }

  ngOnInit() {
    this.removesessionStorage()
    this.loginFBgroup();
    this.hideFormSubscription = false;
    this.route.queryParams.subscribe(params => {
      this.emailQueryParam = params['email'] === 'true';
    });


    const reverse = (str: string) => str.split('').reverse().join('');

    function sortByName(users: { name: string, age: number }[]): any[] {
      return users.sort((a, b) => a.name.localeCompare(b.name));
    }

  }

  removesessionStorage(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('UserFirstName');
    sessionStorage.removeItem('organizationName');
    sessionStorage.removeItem('organization');
    sessionStorage.removeItem('selected_org')
    sessionStorage.removeItem('sourceFilters')
    sessionStorage.removeItem('categoryFilters')
    sessionStorage.removeItem('webMonitorFilter')
    sessionStorage.removeItem('startDate');
    sessionStorage.removeItem('endDate');
    sessionStorage.removeItem('typeFilter')
    sessionStorage.removeItem('assignToFilter')
    sessionStorage.removeItem('priorityFilter')
    sessionStorage.removeItem('statusFilter')
    sessionStorage.removeItem('GTIanalysisFilters');
    sessionStorage.removeItem('GTIsourceFilters');
    sessionStorage.removeItem('GTIthreatLevelFilters');
    sessionStorage.removeItem('rangeValue')
    sessionStorage.removeItem('organizationDomain')
    sessionStorage.removeItem('daysLeft')
  }
  loginFBgroup() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  getEmailErrorMessage(): string {
    return this.formErrorService.getEmailErrorMessage(this.formControls['email'], this.labelContent);
  }

  getPasswordErrorMessage(): string {
    return this.formErrorService.getPasswordErrorMessage(this.formControls['password'], this.labelContent);
  }
  trimInputField(value: any) {
    this.formErrorService.trimInputField(value)
  }
  onSubmit(): void {

    this.submitted = true;

    if (this.loginForm.valid) {

      const encriptedValue = {
        userName: this.loginForm.value.email,
        userPassword: this.loginForm.value.password,
      };

      this.guardService.login(encriptedValue).subscribe(
          (loginResponse: any) => {
          this.loading = true;
          this.loginResponse = loginResponse;


          if (this.loginResponse.responseCode === "200") {
            this.hideFormSubscription = false
            const now = new Date();

            let startDate = new Date(now.getTime() - 1096 * 24 * 60 * 60 * 1000)
            startDate.setHours(0, 0, 0, 0);
            startDate.setHours(startDate.getHours() + 5)

            // startDate = this.adjustAndAddHours(startDate, 0, 0, 0, 0);
            const endDate = new Date(now);
            endDate.setHours(23, 59, 59, 999);
            endDate.setHours(endDate.getHours() + 5);

            // Set the date range
            this.dateRangeService.setDateRange(startDate, endDate);
            sessionStorage.setItem('rangeValue', 'noFilter');
              this.router.navigate(['modules']);
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('user', JSON.stringify(this.loginResponse.uaaLoginDto.accessToken));
              localStorage.setItem('role', JSON.stringify(this.loginResponse.uaaLoginDto.role));
              localStorage.setItem('expiresIn', JSON.stringify(this.loginResponse.uaaLoginDto.expiresIn));

              const timeLeft: any = new Date();
              const MINUTES_UNITL_AUTO_LOGOUT = Math.floor(parseInt(<string>(localStorage.getItem('expiresIn')), 10) / 60);
              localStorage.setItem('timeUntilLogout', timeLeft.getTime() + MINUTES_UNITL_AUTO_LOGOUT * 60000);
              const s = timeLeft.getTime() + MINUTES_UNITL_AUTO_LOGOUT * 60000;
              // localStorage.setItem('email', loginData.userName);
              // this.userSubject.next(this.loginResponse);

          }
        },
          (error: { error: { responseCode: number; }; }) => {
          console.log(error)
          if (error?.error?.responseCode === 403){
            this.hideFormSubscription = true
            this.responseMsgSubscription = 'Your subscription has expired. To regain access to the platform, please renew your subscription.'

          }  if (error?.error?.responseCode === 401){
            this.hideFormSubscription = true
            this.responseMsgSubscription = 'Incorrect email or password.'

          }
        }
      );

    }
  }
  adjustAndAddHours(
    date: Date,
    hours: number,
    minutes: number = 0,
    seconds: number = 0,
    milliseconds: number = 0
  ): Date {
    const adjustedDate = new Date(date);
    adjustedDate.setHours(hours, minutes, seconds, milliseconds);
    return adjustedDate;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
