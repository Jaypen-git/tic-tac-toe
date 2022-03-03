# tic-tac-toe

03/02 CHANGES:
- Because the select space method belongs to the player object now, we can initialize the gameboard before gamecontroller object module is made
- Because the gameboard is already initialized, we can store winning moves in gamecontroller object
- Can check for winning rows including the space picked (needs to check all possible winning rows though, only picks first one)