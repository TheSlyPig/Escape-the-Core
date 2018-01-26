# Event Horizon

A fast-paced psuedo-rhythm game where the player must find the gaps in the enclosing shapes to escape the event horizon.

Play now! - http://kegan-cunningham.me/Event_Horizon

![EventHorizon](assets/images/EventHorizon.gif)

## Features
✓ The player controls a small circle and can orbit the center circle by pressing the left and right keys.

✓ Shapes close in on the player, but always leave one open space the player can slip through.

✓ The player dies and must restart upon collision with any of the shapes.

✓ Music plays in the background, and the center circle pulses with the beat.

✓ The music loops when the song ends, and when starting or restarting the level it starts at one of several possible starting points to 
avoid too much repetition.

✓ Sound effects, including an encouraging voice-over every 10 seconds.

✓ The colors of the lines are constantly changing.

✓ The entire canvas rotates semi-randomly.

✓ The player wins if they survive for 60 seconds, but may keep playing until they die, though the game gets noticeably harder after 60 seconds.

✓ Takes advantage of local storage to remember the player's progress and best scores.

✓ Multiple levels of increasing difficulty, that are unlocked by beating the previous level.

✓ Google Firebase integration for global high score tracking. The player can input their name to be saved alongside the high score.

![EventHorizonMenu](assets/images/EventHorizonMenu.gif)

## Technologies, Libraries, APIs

This project uses vanilla JS, HTML5, and CSS, along with the Canvas library and Google Firebase.


Inspired by Terry Cavanagh's Hexagon - https://terrycavanaghgames.com/hexagon/
