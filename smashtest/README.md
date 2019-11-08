## Running the E2E (smashtest) tests

1. You must install drivers for all the browsers you want to test with, except
   safari which must be enabled See https://smashtest.io/getting-started/setup
2. Run one of the following commands We _from the root directory_:
    - `npm run smashtest` to run the tests headless without screenshots
    - `npm run smashtest-screenshots` to run the tests with screenshots
    - `npm run smashtest-headed` to run the tests in headed mode (see the
      actions in browser windows)
    - `npm run smashtest-screenshots-headed` to run the tests in headed mode
      with screenshots
3. Open `react-workshop/smashtest/report.html` in a browser to see the report
