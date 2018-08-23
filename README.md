# App for Version Correspondance

A very simple app.

It displays version data from a remote server.

It also demonstrates the React Context API.


## Running it 

### Production

   $ npm run build-css
   $ npm run build


### Development

   $ npm run watch-css  # Run this in a seperate shell
   $ npm start


## Design Considerations

### Notification Bar instead of a Modal

In building this I was tasked to present a dialog to display when the
data is successfully refreshed.


As a demonstration I used the Context API to provide access to the
dialog system from all over the application.


Now as this is accessible all over it useful to conclude that
multiple dialogs might be created at once.


For that a traditional dialog design would not work well.


After some experimenting I decided on a notification bar that sits on
the side of the page.


This has several advantages over a dialog box: it is unobtrusive, it
allows multiple notifications from all over the app.

It has some disadvantages over a modal style dialog box: It does not prevent actions from being taken while a notification is being displayed.

In this application I found it was worth it.

In other instances a combined modal notifications dialog can be used.
I have styled something like that. Just add the class "modal" to the App div.


### Versions Display

The versions data was quite simple.

I looked at the data and saw it would be used for someone setting up a
system for a client and choosing which App version went with which
server.

I just threw the data into a table, but ordered it from newest to oldest.


## Notes on the code

* All time is in milliseconds

* The DialogContext should be split into a DialogControlContext and a
  DialogListContext for performance reasons.


## Further Improvements

* The notification bar should have transitions on entering and exiting items.
* Add in PropTypes, better file structuring, modularised CSS, testing. 


## Copyright, Licensing and Warranty

Copyright © 2018 Jared Ross <jared.b.ross@gmail.com>
All Rights Reserved

Additionally this code is provided under the Mozilla Public License 2.0
For more information see LICENSE.txt

Use this code at your own risk.
