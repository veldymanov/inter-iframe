# AngularJS Empeek Test Application

## AngularJS Test App Requirements

Create dynamic Application using Angularjs and pure CSS

1.	Pay attention to details
2.	I should be able add new items and comment those items
3.	Save structure to browser Local Storage
4.	Two panels should be able to expand endless to the bottom
5.	Please upload everything to git repository (Github)
6.	Host project on Github using https://pages.github.com/
7.	Hosted url should look like this: http://somestring.github.io   
8.	Submit hosted url via google form: http://bit.ly/empeek_ui_test_result 


## Workings of the Application

- The application filesystem layout structure is based on the [angular-seed][angular-seed] project.
- There is no dynamic backend (no application server) for this application. Instead we fake the
  application server by fetching static JSON files.
- Read the _Development_ section at the end to familiarize yourself with running and developing
  an Angular application.

### Installing Dependencies

The application relies upon various Node.js tools, such as [Bower][bower], [Karma][karma] and
[Protractor][protractor]. You can install these by running:

```
npm install
```

Detecting Updates with npm:

```
npm outdated
```


### Running the Application during Development

- Run `npm start`.
- Navigate your browser to [http://localhost:8000/](http://localhost:8000/) to see the application 
  running.
  
### Running the Application during Development with Browser-Sync

- From folder `C:\Users\User\Documents\GitHub\empeek\empeek-angular-test\docs`
- Run `browser-sync start --server --files "*.*"`

### Unit Testing

- Start Karma with `npm test`.
- A browser will start and connect to the Karma server. Chrome (and Firefox) is the default browser,
  others can be captured by loading the same URL or by changing the `karma.conf.js` file.
- Karma will sit and watch your application and test JavaScript files. To run or re-run tests just
  change any of your these files.

### End-to-End Testing

We recommend using [Protractor][protractor] for end-to-end (e2e) testing.

It requires a webserver that serves the application. See the
_Running the Application during Development_ section, above.

- Serve the application with: `npm start`
- In a separate terminal/command line window run the e2e tests: `npm run protractor`.
- Protractor will execute the e2e test scripts against the web application itself. The project is
  set up to run the tests on Chrome directly. If you want to run against other browsers, you must 
  modify the configuration at `e2e-tests/protractor-conf.js`.

**Note:**
Under the hood, Protractor uses the [Selenium Standalone Server][selenium], which in turn requires 
the [Java Development Kit (JDK)][jdk] to be installed on your local machine. Check this by running 
`java -version` from the command line.

If JDK is not already installed, you can download it [here][jdk-download].


## References

For more information on AngularJS, please check out https://angularjs.org/.

[angular-seed]: https://github.com/angular/angular-seed/
[bower]: http://bower.io/
[git-home]: https://git-scm.com/
[git-setup]: https://help.github.com/articles/set-up-git
[google-phone-gallery]: http://web.archive.org/web/20131215082038/http://www.android.com/devices
[jasmine]: https://jasmine.github.io/
[jdk]: https://wikipedia.org/wiki/Java_Development_Kit
[jdk-download]: http://www.oracle.com/technetwork/java/javase/downloads
[karma]: https://karma-runner.github.io/
[node]: https://nodejs.org/
[protractor]: http://www.protractortest.org/
[selenium]: http://docs.seleniumhq.org/
[]: https://github.com/IamAdamJowett/angular-click-outside/
[]: https://www.webcodegeeks.com/javascript/angular-js/magic-parse-service-angularjs/