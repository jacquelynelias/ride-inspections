#Ride Inspection Front End Web App
##Overview
This web app is built using vue.js. It displays rollercoaster and amusement park inspections. It has the capability to search for parks based on location or name and view the rides and inspections associated with those rides. 

> A Vue.js project
##Links
Scraper: https://bitbucket.org/ajcnewsapp/scrapers_jre/src/master/
API: https://bitbucket.org/ajcnewsapp/ride-inspections-api/src/master/

## Build
``` bash
# install dependencies
npm install
# serve with hot reload at localhost:8080
npm run dev
# build for production with minification
npm run build
```
For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

##Data Structures

###Rides
{  
   "rides":{  
      "permit_num":"AP17-0041",
      "ride_name":"GOLD TOWN RACERS",
      "manufacturer":"J & J",
      "serial_num":"179850",
      "manufacture_d8":"1998-11-30T00:00:00.000Z",
      "inspections":[  
         {  
            "insp_d8":"2017-03-10T00:00:00.000Z",
            "post_remarks":null,
            "status":"Pass",
            "violation":[  
               {  
                  "condition":"Fences.",
                  "violation_date":"2017-02-21T00:00:00.000Z",
                  "correction_date":null,
                  "resolve_date":"2017-03-10T00:00:00.000Z",
                  "comment":"SECURE CHAIN LINK FENCE ON ENTERANCE AND EXIT LINES.",
                  "condition_num":10
               },
            ]
         }
      ]}
}


###Components
####Park
This is a result. It takes the park_id of a certain park and shows all of its rides and inspections

####Search
This is the homepage that has the search to find parks as well as it displays the results and the top violations.

####Nearby
This is at the bottom of the park page and shows nearby parks based on zipcode or county.

####Nav
This is the AJC nav bar at the top of the app

####Inspection
This is within the park component and displays each of the inspections for the rides

###Items to fix
The following items are errors that I wished to fix if I had more time:
-Fix the advanced search styling
-Fix the styling of the inspectiosn list
-Add an about page
-Have the conditions dict in inspections be from calling the DB rather than hardcoded
-Add more saved links next to "Six Flags" on search

###Author
This was created by Jacquelyn Elias in November 2018
