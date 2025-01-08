# NextonChallenge

## Setup:
* Open a terminal.
* Clone the repository: `git clone https://github.com/faustodidomenico/NextonChallenge`
* run `cd NextonChallenge`.
* run `npm install express`

## Manual test:
* Open a terminal in this folder.
* run `node server.js`. It is set to be run in port:2000.
* send a POST request to `http://localhost:2000/calculator` with a JSON content like: `{ "expression": "EXPR" }` and the response is the answer (I used a VSCode extension called "Thunder Client" for this step), where EXPR should be a well formed equation as string like the following:
    - "10 * (2+5) * 10"
    - " 10 * (1+2) * 3 / (5+15)"

## Test file:
* Open a terminal in this folder.
* run `npm install jest`
* run `npm test`
* If you want to add a new test, go to `test/calculator.test.js` and write the new test.
