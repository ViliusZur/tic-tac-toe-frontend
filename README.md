<h1>About</h1>

This is the frontend of a game Tic-Tac-Toe. The backend can be found [here](https://github.com/ViliusZur/tic-tac-toe-backend).

Frontend displays the game board, game state, and logs. Every event in the game is sent to the backend API to store in the session. If the page is refreshed, frontend sends a GET request to the API to retrieve logs and game state at which point the game resumes. Frontend also has two buttons - New Game, for starting a new game, and Clear Logs, which starts a new session in the backend clearing the logs and game state.

<h2>How to run the project</h2>

Please note: the game will render, but will not work if [backend](https://github.com/ViliusZur/tic-tac-toe-backend) is not running.

If you have [docker desktop](https://www.docker.com/products/docker-desktop) installed on your machine, run:

* `git clone https://github.com/ViliusZur/tic-tac-toe-frontend.git` to clone the repository
* `cd tic-tac-toe-frontend` change directory into project
* `docker-compose up -d` to run the project
* The website will be located at `http://localhost:3000`

If you do not have [docker desktop](https://www.docker.com/products/docker-desktop) installed, simply run:

* `git clone https://github.com/ViliusZur/tic-tac-toe-frontend.git` to clone the repository
* `cd tic-tac-toe-frontend` change directory into project
* `npm install` to download the package and its' dependencies
* `npm start` to run the project
* The website will be located at `http://localhost:3000`

<h2>Unit tests</h2>

Some unit tests were produced using [Jest](https://jestjs.io/en/) and [jest-fetch-mock](https://www.npmjs.com/package/jest-fetch-mock). The unit tests mainly test whether the components are rendered correctly.

To run the tests, run:
* `git clone https://github.com/ViliusZur/tic-tac-toe-frontend.git` to clone the repository
* `cd tic-tac-toe-frontend` change directory into project
* `npm install` to download the package and its' dependencies
* `npm test` to run the tests
