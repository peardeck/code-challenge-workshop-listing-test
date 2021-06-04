# code-challenge-workshop-listing
A straight forward and generalized code challenge to showcase the skills of candidates applying for the position of Full Stack Engineer

# Rules

At GoGuardian our Pear Deck Development team values the ability to: think through a project methodically, solve problems creatively, balance simplicity with innovation, write clear code that is easy to read and understand, follow sustainable standards and accepted best practices, make well reasoned decisions, and learn and grown through your work.

We've developed this code challenge to allow you, as a candidate, to showcase these abilities through executing a standard piece of work that touches on all the core competencies of a Full Stack Engineer.

### Logistics
  * Please read the exercise in full before planning and beginning your work
  * You are welcome to reach out to ask any questions, gain clarification or gather requirements at any time

### Execution
  * We ask that you execute the challenge in `JavaScript/TypeScript`, `React` and `git` as it most closely reflects the work you will do on the Pear Deck team at GoGuardian
  * Your work methodology is shown through your commit history, so please consider this in your work
  * Comments and documentation to mark your decisions, explain your solutions and show your reasoning are exepcted 

### Timing
  * You will have one week, from the time you receive the challenge, to complete and return your work 
  * We ask that you try to spend 3 hours or less on your solution within that week

### Delivery
  * Please return your solution as a zipfile or tarball of your git repo according to the instructions of the recruiter

### Review
  * After you deliver your work, one of our Developers will review your work
  * Should you pass and move onto team interviews with our Development Team there will likely be questions or discussions relating to this work, so please be prepared to help explain/teach your work!

# How this challenge will be judged
  * First and foremost, your ability to develop a working solution using the tech stack specified in the rules
  * Your execution of coding best practices and the readability of your code
  * Source control and work methodology is *important* so please use git, use meaningful commit messages and organize your work accordingly
  * There is not one *correct* solution and so your solution will be unique.  We will be paying attention to how you decide to solve the challenge, so please ensure that it reflect your strengths
  * Explaining your thinking, decision points and solution are critical. Comments and documentation will be reviewed and should provide context and clarity around your completed code.

# The Task

This is a riff on the Full-Stack web coding challenge originally from:
( https://github.com/hiddenfounders/web-coding-challenge/blob/master/README.md )

* We expect at least the *Core Functionality* to be fully implemented in your completed solution
* We expect that the *Secondary Fuctionality* should be attempted, though you may not have time to complete it successfully within the time cap
* If you do successfully complete all prior functionality, you are welcome to attempt the *Bonuses* to further showcase your skill
* Feel free to make significant changes or improvements to the code as you see fit!
* For places to start, search for `TODO-code-challenge` in the codebase

Your task is to:
* Create a responsive application for users to help manage the virtual workshops/classes they are interested in taking
    * Core Functionality: As a User, I can sign up using my email & password
    * Core Functionality: As a User, I can sign in using my email & password
    * Core Functionality: As a User, I can display the list of workshops sorted by distance
    * Secondary Functionality: As a User, I can like a workshop, so it can be added to my preferred workshops
      - Acceptance criteria: liked workshops shouldn’t be displayed on the main page
    * Bonus: As a User, I can dislike a workshop, so it won’t be displayed within “Nearby WorkShops” list during the next 2 hours
    * Bonus: As a User, I can display the list of preferred workshops
    * Bonus: As a User, I can remove a workshop from my preferred workshops list

## Technical spec
- Database: MongoDB
- Backend: Express JS
- Frontend: React

## Folder structure
- The backend folder contains the Express JS app
- The frontend folder contains the React app

## Setup
  0. Ensure you have `git` installed on your computer
  1. Fork this gitrepo or download the zip onto your computer and `cd` into it with a terminal
  2. Ensure you have docker installed on your computer
  3. Follow instructions below to instantiate stack with docker-compose
     - Run `docker-compose build --no-cache` to build frontend and backend images
     - Run `docker-compose up` to bring up full stack
  4. Create the index for geolocalisation
     - Run `docker exec -it mongodb /bin/sh` to exec into mongodb container
     - Run `mongo` to drop into mongodb shell
     - Run `use workshops_dev_db` and `db.workshops.createIndex({location: "2dsphere"})` to create index

Notes:
- Docker-compose is currently configured to allow live refresh of code in the `/frontend` and `/backend` directories without rebuilding the containers
- By default the backend app runs at localhost:8080
- By default the frontend app runs at localhost:3000
- A proxy is setup in the package.json of the frontend app to route the requests.
