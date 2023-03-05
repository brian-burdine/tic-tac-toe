# Four In a Row
## Rules
- The version popularized by Milton Bradley features a 7 X 6 board where pieces are slotted in from the top and fall to the bottom. The goal of the game is to make a line of four pieces horizontally, vertically, and/or diagonally uninterrupted by your opponent's pieces. 
- Place a piece in one of seven columns, starting with the first row and going up to the sixth one row at a time. 

## Sequence Math
We have a a 2-dimensional grid board of **m** length and **n** height. Given a position (*x*, *y*) within the board, we want to find the number of sequences of length **l** that can be made from that point, where **l** is less than **m** and **n** (technically **l** only has to be shorter than either **m** or **n** to make a sequence possible, but that really constrains the ways they could be made and likely makes for a less interesting game).
Horizontally we could make a sequence of (*x-l*, *y*) to (*x*, *y*) and (*x*, *y*) to (*x+l*, *y*), but **m** potentially limits the possibilities.