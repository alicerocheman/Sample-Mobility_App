# Echantillon - Application Mobilité
(=Sample - Mobility App)

[For English, click here](https://github.com/alicerocheman/Sample-Mobility_App/blob/master/README.md)

**Cette application a été réalisée dans le cadre de mon emploi chez Coovia.**

:exclamation: **Tout le code est la propriété de Coovia.** :exclamation:

**Du code a été supprimé pour préserver la confidentialité. Les dossiers/fichiers ne contenant pas de code sont marqués _REDACTED**

## TL;DR
Ceci est la description du travail que j'ai effectué sur ce projet de mobilité.

Je commencerai par expliquer le contexte de mon travail chez Coovia.

Puis je décrirai mon travail en gestion de projet.

Enfin j'expliquerai mon travail technique.

## Contexte

Quand je suis arrivée en août 2016, Coovia avait une application hybride qui avait évolué pendant 4 ans. L'application combinait transports publics et covoiturage pour des trajets courte-distance, typiquement les trajets maison/travail.

À ce stade mon travail consistait essentiellement à maintenir et améliorer le FrontEnd de l'app en AngularJS (1.x). J'ai effectué de nombreuses amélioration, notamment pour améliorer l'Expérience Utilisateur (la clarté des pages, formulaires, itineraires routiers, etc)

Mais une discussion était en cours entre le CEO, le CTO et l'équipe technique pour faire une refonte de toute l'application, pour des raisons de scalabilité et de maintenance. Après le projet de refonte validé par la direction, comme rien ne se mettait en place, je me suis proposer pour réunir les besoins afin de lancer le processus. J'ai finis par piloter tout le projet.

## Gestion Projet

### User Stories
N'ayant jamais eu pour responsabilité la gestion d'un projet, j'ai étudié les méthodes Agile et spécifiquement le début du processus pour pouvoir commencer à travailler.

J'ai discuté avec chaque employé de Coovia sur les différents besoins utilisateur de l'application (déjà en place et désirés) et j'ai créé une liste de user stories. Après y avoir travaillé, je l'ai fait valider par l'ensemble de mes collègues en réunion.

### Design
Une fois les user stories validées, j'ai commencé à designer la nouvelle application, en y ajoutant plusieurs nouvelles/différentes fonctionnalités par rapport à l'application en place.

Malheureusement, par manque d'expérience, mes designs initiaux se sont avéré incomplets. J'ai fait ce constat après quelque mois de travail et j'ai travailler à produire de nouveaux bien meilleurs designs pour les pages principales (et plus complexes) de l'application. Pour ce faire j'ai fait appel à un designer expert que j'ai consulté sur mon travail. Un prototype est consultable [sur InVision](https://invis.io/72EKUHRB8).

### Tutorat
Avec l'accord du CEO et du CTO, j'ai recruté @mathieux51 comme développeur junior pour m'aider à développer le FrontEnd de l'application. @mathieux51 est un jeune homme fin et sympathique, titulaire d'un master en Physique, et qui a choisi de réorienter sa carrière vers le développement Web dans une formation en alterance. Il va en cours une semaine par mois, et passe le reste du temps avec nous. Je suis fière de l'avoir trouvé parmis les nombreux candidats. Je l'ai accompagné pour qu'il apporte autant que possible au projet tout en l'aidant à se réaliser en tant que développeur. Il m'a aussi beaucoup apporté, notamment une perspective précieuse sur le travail que j'effectuais sur le projet. J'ai énormément apprécié l'avoir eu sous mon aile et j'aimerais beaucoup réitérer une telle expérience.

### Product Owner
Dans un premier temps, mon role par rapport aux méthodes Agile était très flou à mes yeux. J'étais la seule à être investie dans la gestion du projet et j'étais loin d'être experte sur le sujet. De plus j'essayais d'équilibrer la gestion de projet et le développement le plus rapide et efficace possible, par manque de main d'oeuvre mais aussi à cause d'une deadline irréaliste. J'ai simplement listé les tâches de développement FrontEnd sous forme d'issues GitHub pour mon étudiant et moi-même, laissant les 2 développeurs BackEnd à leur propre organisation. Avec le recul, j'aurais du avoir plus confiance en moi et imposer une organisation commune aux deux projets. Je n'ai pas su dépasser l'inhibition qu'une absence totale de hiérarchie concernant mon rôle a sublimée.

Avec le temps, j'ai compris que mon rôle se limitait à celui de Product Owner (et développeur bien sûr) car j'étais la personne qui connaissait le projet et ses user stories de A à Z, ainsi que ses priorités. Avec l'aide d'un collègue développeur BackEnd nous sommes parvenus à estimer le backlog de l'ensembe du projet, Front et Back. Nous avons alors réalisé qu'il était bien plus avancé qu'il n'y paraissait, et qu'il ne restait que 3 mois de travail pour publier une première version. C'est à ce moment-là que nous avons appris que, pour des raisons extérieures au développement de l'application, l'entreprise n'allait pas pouvoir continuer de porter ce projet.

## Partie Technique

### Choix Technologiques
J'ai discuté avec mes collègues de l'équipe technique pour choisir technologies les meilleures et les mieux adaptées pour la nouvelle application. Après avoir envisagé différentes possibilités, nous avons convenu d'utiliser ReactJS + Redux pour le Front. Pour le Back, le CTO a préféré utiliser Django et Python, contre le consensus vers une stack JavaScript complète avec nodeJS. Le CTO ne connaissant pas JavaScript, et n'étant pas certain des capacités de nodeJS pour un Back complexe, nous avons donc suivi ses recommandations.

### Construction de l'App FrontEnd
J'ai construit le FrontEnd de l'application "from scratch", en choisissant les meilleurs outils disponibles pour nos besoins. Au départ j'ai créé l'app avec la [Slingshot React Redux](https://github.com/coryhouse/react-slingshot) qui contenait beaucoup des outils que j'avais séléctionnés, à savoir React, Redux, React-Router, Sass...

Plus tard, mon protégé m'a suggéré de réduire l'énorme stack qu'on utilisait pour mettre en place un environnement plus simple. J'ai approuvé et il a migré avec succès l'application vers sa version actuelle, en utilisant le beaucoup plus populaire [Create React App](https://github.com/facebookincubator/create-react-app). L'application est désormais beaucoup  plus légère.

### Tous les nouveaux outils
La première étape a été de me former sur tous les nouveaux outils sélectionnés, tout en mettant de côté les "fausses bonnes idées".

Tout m'était nouveau, de React à Redux.

* J'avais commencé à étudier ES6 pour ma culture personnelle, ce fut donc la partie la plus facile.
* J'ai réalisé un routeur avec  [React Router](https://github.com/ReactTraining/react-router/tree/master/packages/react-router), chose que je n'avais jamais fait avant. Le routage était toujours déjà fait dans mes précédents postes et je n'avais jamais eu ne serait-ce qu'à toucher au routeur. Plus tart React Router a publié une nouvelle version (4.x) et j'ai du me re-former et ré-implémenter tout le routage. Autant dire que j'ai beaucoup appris sur React Router!
* Il m'est arrivé de modifier la configuration [Webpack](https://webpack.github.io/) de l'application mais je n'y ai pas assez travaillé pour devenir compétente en la matière.
* J'ai mis en place l'internationalisation avec [React Intl](https://github.com/yahoo/react-intl) ce qui a été assez délicat. Je n'avais jamais travaillé sur application internationalisée auparavant. Ca a été un aspect très intéressant de mon travail et je suis contente d'avoir acquis cette compétence. Vivant en France, il me parait indispensable pour tout outil web ouvert au public qu'il soit au moins accessible en anglais.
* En faisant de la veille, mon surprenant apprenti a découvert [Redux Form](https://redux-form.com/7.1.2/) et l'a mis en place pour prendre le contrôle sur les formulaires de l'application. J'ai donc commencé à m'y interresser également.
* Dans le but de gagner du temps en design et en développement, j'ai utilisé [Material UI](http://www.material-ui.com/#/)'s [React Components](https://github.com/callemall/material-ui) pour de nombreux elements dans l'application. Il s'est avéré nous faire perdre pas mal de temps à personaliser (à cause du style inline) et à maintenir, notamment à cause de problèmes de performance du package.

J'ai aussi tenté de structurer au mieux les composants (et les fichiers) pour faciliter la lisibilité et la maintenance, au grand plaisir des 2 autres développeurs qui ont travaillé sur le FrontEnd du projet par la suite et qui l'ont trouvé bien organisé et facile à appréhender. Je me suis inspiré en particulier de [cet excellent article](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1).

Pour une partie de mon autoformation, je me suis abonnée à [EggHead](https://egghead.io), une incroyable ressource de connaissance pour le développeur FrontEnd. Je dois cette trouvaille à mon padawan, excellente suggestion que je recommande également.

### TDD
Ma première intention était de mettre en place un environnement de test-driven development. Malheureusement, n'ayant jamais travailler en TDD et ayant tellement de nouveaux outils à prendre en main, j'ai rapidement dû abandonner l'idée. Je devrais travailler rapidement et je ne pouvais pas tout apprendre et mettre en place en même temps. J'espère avoir l'occasion bientôt de travailler dans un contexte test-driven.

## Conclusion
Après un an, cet ambitieux projet reste inachevé, en partie à cause de la main d'oeuvre réduite qui lui était accordée, en outre par des difficultés d'ordre managérial et financier dans l'entreprise elle-même.

Ceci étant dit, l'application tourne, et elle peut être essayée [ici](https://refonte.coovia.fr).
Pour des raisons de confidentialité, ce repo ne contient pas tout le code de l'application. Il lui a été notamment retiré tout code que je n'ai pas personnellement écrit. Par contre il contient tous les fichiers (certains ont été vidés de leur contenu) afin que l'architecture de l'application puisse être appréciée.

Mis à part cette fin difficile, ce projet fut une incroyable opportunité de montée en compétences pour moi, ainsi qu'une excellente expérience humaine. On m'a dit à plusieurs reprises que mon travail améliorait l'environnement de travail de mes collègues, de l'équipe technique et de l'équipe globale, et c'est très agréable!


Merci pour votre intérêt! :)
