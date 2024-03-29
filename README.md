# Jentis Coding Challenge
In this repository you will find my solution to the JENTIS interview coding challenge. I quite enjoyed this challenge, and it allowed me to use bun and docker together for the first time.

## Running the service
The .env.example file would normally need to be renamed to .env, and the value filled in. However I have removed .env from .gitignore for ease of use.
To run the service, you can use the `compose` script with npm/yarn/bun which will spin up the necessary docker containers. The docker service will be available on port 4000. The development database will be empty, however can be populated using the endpoint:
`http://localhost:4000/dummy-data/populate-database`

## Documentation
The documentation for the api can be found here: https://www.postman.com/dark-crater-116584/workspace/jentis-coding-challenge
The documentation for individual collection can be viewed from the collections or API tab on the left, the documentation for the websocket is available within the websockets collection.

## Decisions
### Bun
I chose to use bun as the runtime for this over node.js because I prefer it. I find the developer experience to be much nicer as it requires less dependencies, scripts are more concise, and it runs much faster which speeds up container build times and ci/cd pipelines (even though they were not implemented in the end).
### NestJS
While I have familiarity with Express, in my opinion NestJS has much nicer design patterns that improve readability, and it is much easier to discern an understanding of the structure of the API.
Nest also provides an abstraction layer over socket.io, which makes implementing websockets simpler and more concise.

### MongoDB
MongoDB seemed like the most appropriate choice, (especially when I had originally intended to integrate the application with the Google Books API). The relationships between different entities are not complex, nor are they dependent on one another, so a relational database seemed excessive.
The structure of the MongoDB node driver also pairs nicely with the structure of NESTJS.

## How the service could be improved
There are several ways I would improve this service were it to be developed further:

-   ### Integration with google books
    -   Rather than create books manually, I would integrate with an external api, such as the google books API,
    -   This would reduce the requirements for storing data, as the data could be retrieved from the google books API when needed, and only data specific to the application would need to be stored.
    -   This would also mean additional endpoints could be created to search for books, rather than the end user having to manually enter all the details except for when a book does not exist in the api.
-   ### Authentication
    -  Currently there is no authentication, which means anyone can access the endpoints.
    -   I would add authentication to the endpoints, so that only authorised users can access them.
    -   This would also mean that the service could be used by multiple bookstores, and each bookstore would only be able to access their own data.
-   ### Queueing service
    -   Currently the API runs synchronously, large amounts of requests could cause the service to slow down. Whilst this is unlikely for a single bookstore, were the service to be used by multiple bookstores, this could become an issue.
    -   I would add a queueing service, such as RabbitMQ, to the service, so that requests are queued and processed asynchronously.
-   ### Testing
    -   Currently there are no tests for the service, I would add unit tests to the service to ensure that the service is working as expected.
    -   I would also add integration tests to ensure that the service is working as expected when interacting with the database.
-   ### CI/CD
    - I would add a CI/CD pipeline to the repository to ensure code quality when pushing to the remote repository.
    - I did attempt this however I was unable to get the pipeline to work correctly when bringing together bun, nest and docker, and is something I am still investigating for my personal project.

## What is missing from the challenge description
If the brief were a ticket, it would require more information on the data structure of the books, and the endpoints that would be required. Specifically what information the bookstore owner wishes to store about the book, as well as information about the structure of the endpoints and their expected behaviours and paths.