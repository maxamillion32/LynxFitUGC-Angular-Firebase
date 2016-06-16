# LynxFit-Plus
A personal learning exercise with Firebase & Angular. Purpose is to re-create LynxFit app for web and adding user generated content (custom workouts) features

## To install:

- npm install grunt -g
- npm install less -g
- npm install bower -g
- bower install
- grunt serve => dev mode
- grunt test => test app
- grunt build => to build app

##Custom LynxFit Content*
*Stories*

* As a user I want to be able to see my own custom workout under my profile so that there is a single space to see all my custom workouts
* As a user I want to see a list of custom workout templates so I can create a custom workout
* As a user I want to edit a list of existing workouts so I can create a customer workout
* As a user I want reorder, add, delete and edit and save my custom workout so I can access it on my profile
* As a user I want to allow users to follow my profile so that they can use my workouts
* As a user I want to share my custom workouts so that I can get more users to follow my profile 

*Dependencies*
* Saving custom content: User must be authenticated to LynxFit
* Centralized content: User must initiate custom content from content page
* Profile: User must be able to see a list of clearly labeled custom content under profile/content page.

*Flow 1:*
* Content List Page: User clicks on plus sign on page
* Custom Content Modal: User enters title and description of custom content
* Custom Content Page: CRUD custom content
* Custom Content Page: Save, queue up or share custom content.

*Flow 2:*
* Content List Page: User clicks on 'Customize this Workout' link on existing workout.
* Custom Content Modal: User enters title and description of custom content
* Custom Content Page: CRUD custom content
* Custom Content Page: Save, queue up or share custom content.


##JSON:
* category (program)
* name
* description
* programId
* workoutId
* totalDays
* currentDay
* ProgramType
* roundRestDuration
* roundRestType
 * rounds (program rounds)
 * roundId
 * roundRepeats
  * restType
    * steps (program workouts)
      * id
      * name
      * type
      * time
      * repetitionsNbr
      * image
      * video

See example values here
