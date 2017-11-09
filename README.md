# Sample - Mobility App

:exclamation: **This app was made at Coovia.**
:exclamation: **All code is the property of Coovia.**
:exclamation: **Some code has been hidden to preserve confidentiality.**

## Context

When I arrived in August 2016, Coovia had a 4 years-old hybrid app.
At first my job was to maintain and improved that app's FrontEnd which used the Angular 1 framework. I made quite a few changes, mostly to improve User Experience (clarity of the scenes, forms, map itineraries, etc)

There was an ongoing discussion between the CEO, CTO and developers about recasting the whole app, for scalability and maintenance reasons. Given that the recast was agreed on but nothing was moving forward, I offered to start the gathering of needs in order to begin the process.

## Project Management

### User Stories
As I had never been responsible for the management of a project, I studied the Agile Methods and specifically the beginning of the process so I could get to work.

I consulted with everyone in the company to come up with a list of user stories. I worked it and gathered the company's different roles for a validation meeting.

### Design
Once the user stories were validated I started designing the new app, adding quite a few functional changes compared to the old app.

Unfortunately due to my lack of experience my initial designs were incomplete. I would realize this a few months later and I would have to work on new and improved versions for the main, more complex pages. For this purpose I sought the help of an experience designer who I consulted on my work. A functional prototype is available [on InVision](https://invis.io/UNCOWKSPA).

### Tutoring
With the consent of the CEO and CTO I recruited a part-time junior developer to help me on the FrontEnd development of the app. He's a smart yound man who has a master in Physics, tried teaching but chose to redirect his career towards web development. He is at school 1 week each month, the rest he spends with us. I am very proud of having found him out of the many applicants. I've been tutoring him trying to make the best of his abilities for the project as well as helping him grow as a new developer. He's also offered me a much needed perspective on the huge amount of work I was putting into the project. I have immensely appreciated having him under my wing and I would love to do something similar again.

### Product Owner
At first my role regarding the Agile Methods was quite blurry to me. I was the only one invested in the management of the project and I wasn't an expert in this field. Plus I was trying to balance managing the project and developing as fast as posible because of the lack of workforce and unrealistic deadline. I simply listed tasks as Github Issues on the FrontEnd project for my student and myself, leaving the 2 developers on the BackEnd to their own organization. Looking back, I should have been more confident and insisted on a common organization on both projects, despite my timidity regarding the absence of any kind of hierarchy for my role.

With time, I understood that my role should be limited to Product Owner (and developer of course) because I was the one who knew the project inside and out, its user stories, its priorities etc. With the help of a co-developer on the BackEnd we managed to estimate the backlog of the whole project, Front and Back. We realized the project was far more advanced than we thought, it would only take 3 months top to release the first version. That's when we learnt that the company was financialy unable to keep us on, or to finance this project, anymore.

## Technological Management

### Technological choices
I consulted with my fellow developers to chose the best and most suitable technologies for the new app. After reviewing the different possibilities, we agreed on React+Redux for the FrontEnd and Django for the BackEnd. Django was the CTO's choice, against the rest of the team's preference for Node.JS.

### Building the app
I built the FrontEnd from scratch, picking the best available tools for our needs. At first I created the app with the [Slingshot React Redux](https://github.com/coryhouse/react-slingshot) which included a lot of the tools I had picked like React, Redux, React-Router, Sass...

Later on, my protégé suggested reducing the stack we were using to go for a simpler environment. I agreed and gave him the green light so he migrated the app to its current version using [Create React App](https://github.com/facebookincubator/create-react-app)

### All the new tools
The first step was to learn about all the new tools I had picked, discarding the "false good ideas".
Everything was new to me, from React to Redux.
I implemented internalization with [React Intl](https://github.com/yahoo/react-intl) which was quite tricky. I'd never used internalization before.
I also made a router with [React Router](https://github.com/ReactTraining/react-router/tree/master/packages/react-router), which I'd never done before either.
I tried to build an architecture for the components and files that would be easily readable and maintainable, to the delight of the 2 other developers who worked on the project's FrontEnd later on.

### TDD
My first thought was to work in a test-driven development environment. Unfortunately, having never done TDD and being in the process of learning so many new tools, I soon had to drop the idea. I had to work fast and there were only so many new things I could implement at a time. I hope I will soon have the opportunity to work in a test-driven context.

## Conclusion
After a year, this ambitious project remains unfinished, due to difficulties in management and finances in the company.
The app works though, and can be checked out [here](https://refonte.coovia.fr).
Due to confidentiality issues, the current repository does not contain the whole code. It does however contain all the files (some have been emptied of their content) so the architecture can be appreciated.

Thank you for your interest :)
