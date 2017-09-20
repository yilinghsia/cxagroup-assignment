Hi!

So you downloaded the Spotify assignment I made for the cxagroup recruitment!
In order to get this project running you will need to start up a server, as described below:

Dependencies
------------

You will need `node` and `npm` to run this project.

Usage
--------------------------------
1. First install static node server

    npm install -g node-static


 2. Set up server

    static -p 8000

3. In your browser you can now go to http://localhost:8000


About this assignment
--------------------------------

App should load only the search bar 
Search for artists from https://api.spotify.com/v1/search?type=artist&limit=50&q=${query} 
Only display those who have square images. Display in any fixed sizes as you like.
No horizontal scrolling and responsive, images should fill up a row as much as possible before breaking off to next line.
Just need to work on latest Chrome/Firefox/Edge. 
