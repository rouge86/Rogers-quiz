# Roger Password Generator Challenge 04
Build a timed coding quiz with multiple-choice questions. This app will run in the browser and will feature dynamically updated HTML and CSS powered by JavaScript code that you write. It will have a clean, polished, and responsive user interface.

## Table of Contents
- [Description](#description)
- [Acceptance](#acceptance)
- [Credits](#credits)
- [License](#license)

## Screenshot
![alt text](https://github.com/rouge86/Rogers-quiz-tutorial/blob/5669da4819d57ed2d51389be85af61af71500eab/rogersquiz.png?raw=true)

## Link to live page
(https://rouge86.github.io/Rogers-quiz-tutorial/)


## Description

- The motivation is to familiarise yourself with a typical web dev coding assessment. Interviews often require you to build multiple choice quizes because it combines all necessary skills of web dev
- I was very fortunate to discover a tutorial on this very subject. The end code draws inspiration from this tutorial https://www.youtube.com/watch?v=u98ROZjBWy8&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx

- This tutorial has been debugged and refactored to meet the acceptance criteria
- The original code was a little buggy at first, as it would require a refresh to properly fetch
the custom JSON questions - I resolved this by forcing a reload when an error occured, which yields
preditable results
- I used var(--) to add global colours to affect the overall colour scheme of the site
- I reverse engineered the timer code from week 4 activities, to build a timer after the play again started and also to decrement time, any time there was a wrong answer
- I used google fonts to affect the overall text design of this site

## Acceptance
*Acceptance Criteria*
```
GIVEN I am taking a code quiz
WHEN I click the start button 
THEN a timer starts and I am presented with a question  ✔️
WHEN I answer a question
THEN I am presented with another question  ✔️
WHEN I answer a question incorrectly
THEN time is subtracted from the clock  ✔️
WHEN all questions are answered or the timer reaches 0
THEN the game is over  ✔️
WHEN the game is over
THEN I can save my initials and my score  ✔️
```

## Credits

### Refactored 'Build a Quiz App'
https://www.youtube.com/watch?v=u98ROZjBWy8&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx

### Trivia Database Source for fetch()
https://opentdb.com/

## License

none


# Rogers-quiz
