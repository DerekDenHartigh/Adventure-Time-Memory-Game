Group Members:
    (tasks)

    Derek DenHartigh
        ()
    Dave Gillespie
        (styling the cards and centering them)
    Mike Brameijer
        ()

To Do:

● A game board that displays all of the current cards face down in a random order.
    will write a script to loop through the flip cards by ID# assigning a random # order value to them (1-99?)
    right now the cards are displaying front up, need to switch that
● A start button that will initiate the game.
    centrally located, pretty emeraldy? (START!), disappears when clicked on (addClass(.hide)), runs card randomizer script, initiates timer
● Cards must “flip” or “turn” when the user clicks on them.
    onClick animation, onClick scripts also store unique identifier from face of card (either url or alt for comparison operators)
● If a pair of matching cards has been selected, remove the cards from the
    comparison operator: if the two cards have the same ID (hide cards - I think display: none will jack formatting, probably better to overlay with large div of background color (previously display:hide, then display changed - will need to write these into the HTML)) (optional: add point to user/multiplayer oprion), if cards are not equal, flip them back over playing board after a short time.
● If a pair of cards does not match, they should flip back to being face down
after a short time.
    see above
● Must include a reset button which will reset the game board.
    basically the same scripts as the start button, clear the hider divs, reset clock, rearrange cards, (flip them back over if that isnt taken care of in the event of a match)
● Display a timer that will notify the user how long it took them to complete
the game.
    think Mike has this done, just need to make a banner with it
● Do not use a jQuery plugin to assist in the card turning/flipping
    Fiiiiiiine