# Sample - Mobility App

[Pour le français, cliquer ici](https://github.com/alicerocheman/Sample-Mobility_App/blob/master/LISEZMOI.md)

**This app was made during my employment at Coovia.**

:exclamation: **All code is the property of Coovia.** :exclamation:

**Some code has been removed to preserve confidentiality. Files/folders that contain no code are taggued _REDACTED**

## TL;DR
This is the description of the work I have done on this mobility project.

I will start by explaining the context of my work at Coovia.

Then I will describe my work in project management.

Finally I will explain my technical work.

___

## Context

When I arrived in August 2016, Coovia had a 4 years-old hybrid app. The app combined public transportation and carpooling for short distance travel such as home/work commute.

At this stage my job was merely to maintain and improve that app's FrontEnd which used the AngularJS (1.x) framework. I made quite a few changes, mostly to improve User Experience (clarity of the scenes, forms, map itineraries, etc)

But there was an ongoing discussion between the CEO, CTO and developers about recasting the entire app, for scalability and maintenance reasons. Given that the recast was agreed on but nothing was moving forward, I offered to start the gathering of needs in order to begin the process. I ended up taking charge of the whole project.

## Project Management

### User Stories
As I had never been in charge of the management of a project, I studied the Agile Methods and specifically the beginning of the process so I could get to work.

I thoroughly talked to everyone in the company and I come up with a list of user stories. I worked on it and gathered the company's different roles for a validation meeting.

### Design
Once the user stories were validated I started designing the new app, adding quite a few functional changes compared to the old app.

Unfortunately due to my lack of experience my initial designs were incomplete. I would realize this a few months later and work on new and improved versions for the main, more complex pages. For this purpose I sought the help of an experienced designer whom I consulted on my work. A prototype is available [on InVision](https://invis.io/UNCOWKSPA).

### Tutoring
With the consent of the CEO and CTO I recruited @mathieux51 as a junior developer to help me on the FrontEnd development of the app. He's a smart yound man who has a master in Physics, but chose to redirect his career towards web development. He is at school 1 week each month, the rest he spends with us. I am very proud of having found him out of the many applicants. I've been tutoring him trying to make the best of his abilities for the project as well as helping him grow as a new developer. He's also offered me a much needed perspective on the quality and quantity of work I was putting into the project. I have immensely appreciated having him under my wing and I would love to do something similar again.

### Product Owner
At first my role regarding the Agile Methods was quite blurry to me. I was the only one invested in the management of the project and I wasn't an expert in this field. Plus I was trying to balance managing the project and developing as fast as possible because of the lack of workforce and unrealistic deadline. I simply listed tasks as Github Issues on the FrontEnd project for my student and myself, leaving the 2 developers on the BackEnd to their own organization. Looking back, I should have been more confident and insisted on a common organization on both projects, despite my timidity regarding the absence of any kind of hierarchy for my role.

With time, I understood that my role should be limited to Product Owner (and developer of course) because I was the one who knew the project inside and out, its user stories, its priorities etc. With the help of a co-developer on the BackEnd we managed to estimate the backlog of the whole project, Front and Back. We realized the project was far more advanced than we thought, it would only take 3 months top to release the first version. That's when we learnt that for reasons unrelated to our work, the company was not going to be able to support this project anymore.

## Technical Work

### Technological choices
I consulted with my fellow developers to choose the best and most suitable technologies for the new app. After reviewing the different possibilities, we agreed on React+Redux for the FrontEnd. Django was the CTO's choice for the BackEnd, against the rest of the team's preference for a full javascript stack with nodeJS. The CTO didn't know javascript and didn't trust Node's capability for a complex BackEnd so we followed his wishes.

### Building the FrontEnd app
I built the FrontEnd app from scratch, picking the best available tools for our needs. At first I created the app with the [Slingshot React Redux](https://github.com/coryhouse/react-slingshot) which included a lot of the tools I had picked like React, Redux, React-Router, Sass...

Later on, my protégé suggested reducing the huge stack we were using to go for a simpler environment. I agreed and gave him the green light so he successfully migrated the app to its current version using the much more popular [Create React App](https://github.com/facebookincubator/create-react-app). It is now much more lightweight and appropriate.

### All the new tools
The first step was to learn about all the new tools I had picked, discarding the "false good ideas".

Everything was new to me, from React to Redux.

* I had been studying ES6 for my own personal knowledge so this was the easiest part.
* I made a router with [React Router](https://github.com/ReactTraining/react-router/tree/master/packages/react-router), which I'd never done before either. The routing had always already been in place in my previous jobs and I never had to touch anything in that regard. Later on React Router released a new and improved version and I had to re-learn and re-implement the whole routing. Suffice to say that I've learnt a lot about React Router!
* I tried tweeking the [Webpack](https://webpack.github.io/) configuration but I didn't work on it enough to become any kind of expert on that matter.
* I implemented internationalization with [React Intl](https://github.com/yahoo/react-intl) which was quite tricky. I'd never worked with any kind of internalization before. This was a very interesting aspect of my work and I'm happy to have aquired this knowledge. Living in France, it seems to me that any web tool available to the public should at least be available in English.
* My amazing apprentice found out about [Redux Form](https://redux-form.com/7.1.2/) and implemented it to take control of the forms in the app.
* In order to save time in design work and development, I used [Material UI](http://www.material-ui.com/#/)'s [React Components](https://github.com/callemall/material-ui) for many elements. It turned out to be a lot of work to personalize (because of the mandatory inline style) and to maintain. Furthermore it has known performance issues.

I also tried to structure the components (and files) that would ease readability and maintenance, to the delight of the 2 other developers who worked on the project's FrontEnd later on and found it well organized and easy to apprehend. Inspiration was found on [this awesome article](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1).

For some of my self-study I subscribed to [EggHead](https://egghead.io), an incredible resource for the FrontEnd Developer. I have to thank my padawan for this excellent suggestion.

### TDD
My first ambition was to work in a test-driven development environment. Unfortunately, having never done TDD and being in the process of learning so many new tools, I soon had to drop the idea. I had to work fast and there were only so many new things I could implement at a time. I hope I will soon have the opportunity to work in a test-driven context.

## Conclusion
After a year, this ambitious project remains unfinished, due to difficulties with the very small workforce at hand and with management and financial issues in the company itself.
The app works though, and can be checked out [here](https://refonte.coovia.fr).
Due to confidentiality issues, the current repository does not contain the whole code (it lacks any code I didn't personnaly write, as well as irrelevant and random code). It does however contain all the files (some have been emptied of their content) so the architecture can be appreciated.

Appart from this, it was an incredible learning experience for me, as well as a very successful human collaboration. I was told several time that the work I did was improving the working environment of my coworkers and that feels great.


Thank you for your interest :)
