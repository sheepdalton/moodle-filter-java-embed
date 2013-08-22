# Java Code Window Filter Plugin - Version 1.0
# Authors: Daniel Montague, Dr Nick Dalton

To install the filter plugin and begin to use the .zip archive should be extracted and added to the filters folder of your Moodle installation. Following the standard Moodle 2.0 instructions for installing a filter which can be found at:
http://docs.moodle.org/dev/Filters#Trying_out_your_filter (these are the developer notes on filters as but the trying out your filter section explains where you need to go to get the filter turned on)
Currently the Javascript and CSS files are not being included automatically (something which may be rectified in future versions) so once the filter has been placed in the Filters directory you must navigate to the additional HTML section of the site admin and include in the head section the paths to the following files:

helper.js
processing.js
learnJavaNow.css

once that is done your filter will be set up ready for use.

To create Java lessons using the code window create a Page using the html editor (the standard way you create a page in moodle) that has the following structure:


startcode (place here the Java code you wish to be included when the page loads) endcode

The line above must be edited in HTML mode so no HTML <p> tags are included within it

You can then include the lesson text inside <p> tags below the above line.

When you load the created page you will see a fully functioning Java code window!

