import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

// Constants must be outside the class
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  promoCode = "BETA" + (Math.floor(Math.random()*90000) + 10000);
  promoPhrase = "https://dephyned.com/graffiti/share/beta?id=" + this.promoCode
  referallCode = '';
  error;
  hideSuccess = true;
  email;

  constructor (private http:HttpClient, private route:ActivatedRoute) {}

  ngOnInit() {
    
  }

  addEmailClicked (email) {
    
    this.referallCode = this.route.snapshot.queryParams.id;
    if (this.referallCode) {
      this.referallCode = this.referallCode.toUpperCase()
    } else {
      this.referallCode = "NOT REFERRED"
    }

    if (email) {
      var params = {
        contactEmailField: email,
        contactMessageTextarea: this.referallCode,
        personalPromoCode: this.promoCode
      }
  
      this.http.post('https://dephyned.com/sendEmail', params, httpOptions).subscribe(
        response => {
          this.hideSuccess = false;
          this.error = undefined;
        }, error => {
          this.hideSuccess = true;
          this.error = "Sorry, there was a problem adding you.  Please try again."
        }
      )
    } else {
      this.error = "Please enter a valid email"
    }    
  }
}
