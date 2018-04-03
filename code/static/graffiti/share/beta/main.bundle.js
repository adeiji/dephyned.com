webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ".wrapper {\n  height: 100%;\n  width: 65%;   \n  -ms-flex-line-pack: center;   \n      align-content: center;\n  color: white;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.invite {\n  width: 100%; /*can be in percentage also.*/\n  margin: 0 auto;\n  padding: 10px;\n  position: relative;\n}\n\n.flex {\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n}\n\n#tagline {\n  margin-right: auto;\n  margin-left: auto;\n  margin-top: 100px;\n  color: white;\n  width: 85%;\n  text-align: center;\n}\n\n.thank-you {\n  text-align: center;\n  margin-top: 35px;\n}\n\n.spacing {\n  height: 35px;\n}\n\nh2 {\n  font-weight: 300;\n}\n\nh1 {\n  font-size: 75px;\n  letter-spacing: 5px;\n  font-weight: 600;\n  \n}\n\np {\n  font-weight: 200;\n  font-size: 20px;  \n}\n\n.sign-up-section {\n  margin-top: 0px;\n  width: 75%;\n  height: 50px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.sign-up-section button {\n  width: 130px;\n  background-color: rgb(45, 179, 255);\n  border: none;\n}\n\n.photo img {\n  height: auto;\n  width: auto;\n  margin-top: 125px;\n}\n\n.share {\n  margin-left: auto;\n  margin-right: auto;  \n}\n\nstrong {\n  font-size: 25px;\n  /* color: rgb(45, 179, 255); */\n}\n\n@media only screen and (max-width: 1400px) {\n  .wrapper {\n    width: 85%;\n  }\n}\n\n@media only screen and (max-width: 700px) {\n  #tagline {\n      width: 100%;\n      margin-top: 15px;\n  }\n\n  .sign-up-section {\n    width: 100%;\n  }\n\n  h1 {\n    font-size: 55px;\n  }\n\n  .wrapper {\n    width: 95%;    \n  }\n\n  .bottom {\n    margin-bottom: 100px;\n  }\n\n  .promo {\n    font-size: 18px;\n  }\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div class=\"wrapper\">\n  <div class=\"row\">        \n    <div class=\"col-sm-12\">\n        <div class=\"invite d-flex\">\n          <div id=\"tagline\">\n              <h1>GRAFFITI</h1>\n              <h2>Never Forget the Cool Places You've Been</h2>\n              <br>              \n              <p><strong>Remember and share</strong> with friends all the cool places you've been and want to go.  Share your cool content with\n                <strong>tons</strong> of people.\n              <br>\n              </p>\n              <div class=\"spacing\"></div>\n              <p><strong>Sign up</strong> now to become a <strong>Beta Tester and App Influencer</strong> and get <strong>tons of free features</strong>.  Spots are limited so <strong>don't delay!</strong></p>\n              <div class=\"input-group mb-3 sign-up-section\">\n                  <input type=\"text\" class=\"form-control\" placeholder=\"Enter Your Email\" aria-label=\"Enter email address\" [(ngModel)]=\"email\" aria-describedby=\"basic-addon2\">\n                  <div class=\"input-group-append\">\n                    <button class=\"btn btn-primary\" (click)=\"addEmailClicked(email)\" type=\"button\">Get Free Stuff</button>\n                  </div>\n              </div>\n              <div class=\"alert alert-danger\" [hidden]=\"!error\">\n                {{error}}\n              </div>\n          </div>                    \n        </div>\n    </div>      \n  </div>  \n  <div class=\"row bottom\">\n    <div class=\"col-sm-12 thank-you\" [hidden]=\"hideSuccess\">\n      <div class=\"alert alert-success\">Thank you so much for signing up!  We just sent you a little introductory email.</div>\n      <p><strong>Know anyone else who might be interested?</strong>  \n      <br>\n      <strong>Share the link below.</strong>  Each user you have sign up means <strong>more free stuff for you.</strong></p>\n      <span class=\"promo\">{{promoPhrase}}</span>      \n    </div>    \n  </div>\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
// Constants must be outside the class
var httpOptions = {
    headers: new http_1.HttpHeaders({
        'Content-Type': 'application/json'
    })
};
var AppComponent = /** @class */ (function () {
    function AppComponent(http, route) {
        this.http = http;
        this.route = route;
        this.promoCode = "BETA" + (Math.floor(Math.random() * 90000) + 10000);
        this.promoPhrase = "https://dephyned.com/graffiti/share/beta?id=" + this.promoCode;
        this.referallCode = '';
        this.hideSuccess = true;
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.addEmailClicked = function (email) {
        var _this = this;
        this.referallCode = this.route.snapshot.queryParams.id;
        if (this.referallCode) {
            this.referallCode = this.referallCode.toUpperCase();
        }
        else {
            this.referallCode = "NOT REFERRED";
        }
        if (email) {
            var params = {
                contactEmailField: email,
                contactMessageTextarea: this.referallCode,
                personalPromoCode: this.promoCode
            };
            this.http.post('https://dephyned.com/sendEmail', params, httpOptions).subscribe(function (response) {
                _this.hideSuccess = false;
                _this.error = undefined;
            }, function (error) {
                _this.hideSuccess = true;
                _this.error = "Sorry, there was a problem adding you.  Please try again.";
            });
        }
        else {
            this.error = "Please enter a valid email";
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.ActivatedRoute])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var appRoutes = [
    { path: 'graffiti/share/beta', component: app_component_1.AppComponent }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                router_1.RouterModule.forRoot(appRoutes, { enableTracing: true })
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("./src/app/app.module.ts");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map