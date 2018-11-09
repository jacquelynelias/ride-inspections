# ride-inspection-db

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

##License 


##File structure

##API 
This repository for this project's API can be found here. It uses serverless and AWS Lambda Functions

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
               {  
                  "condition":"Fasteners - pins, bolts, safety clips, e",
                  "condition_num":9,
                  "violation_date":"2017-02-21T00:00:00.000Z",
                  "correction_date":null,
                  "resolve_date":"2017-03-10T00:00:00.000Z",
                  "comment":"DOG LATCH BROKEN AT ENTERANCE GATE."
               },
               {  
                  "condition":"Bracing - Ride supports.",
                  "condition_num":5,
                  "violation_date":"2017-02-21T00:00:00.000Z",
                  "correction_date":null,
                  "resolve_date":"2017-03-10T00:00:00.000Z",
                  "comment":"REPLACE 4 FLAGGED TIRES ON INSIDE OF TURN JUST OUT OF STATION."
               },
               {  
                  "condition":"Retaining Devices.",
                  "condition_num":18,
                  "violation_date":"2017-02-21T00:00:00.000Z",
                  "correction_date":null,
                  "resolve_date":"2017-03-10T00:00:00.000Z",
                  "comment":"PROVIDE MISSING ZIP TIES ON LIGHT BARS IN STATION."
               },
               {  
                  "condition":"Bracing - Ride supports.",
                  "condition_num":5,
                  "violation_date":"2017-02-21T00:00:00.000Z",
                  "correction_date":null,
                  "resolve_date":"2017-03-10T00:00:00.000Z",
                  "comment":"REPLACE JOIST ON ENTERANCE EDGE OF STATION ROOF."
               },
               {  
                  "condition":"Bracing - Ride supports.",
                  "condition_num":5,
                  "violation_date":"2018-02-23T00:00:00.000Z",
                  "correction_date":"2018-03-06T00:00:00.000Z",
                  "resolve_date":"2018-03-06T00:00:00.000Z",
                  "comment":"REPAIR/REPLACE TRUSS 1ST LEFT, 2ND LEFT, 11TH RIGHT FROM EXIT SIDE."
               },
               {  
                  "condition":"Electrical.",
                  "condition_num":8,
                  "violation_date":"2018-02-23T00:00:00.000Z",
                  "correction_date":null,
                  "resolve_date":"2018-03-08T00:00:00.000Z",
                  "comment":"TOO MUCH STATIC IN COMMUNICATION P.A. SYSTEM."
               },
               {  
                  "condition":"Electrical.",
                  "condition_num":8,
                  "violation_date":"2018-02-23T00:00:00.000Z",
                  "correction_date":null,
                  "resolve_date":"2018-03-08T00:00:00.000Z",
                  "comment":"REPLACE/REMOVE BROKEN ELECTRICAL BOXES AT DISPATCH STATION."
               },
               {  
                  "condition":"Retaining Devices.",
                  "condition_num":18,
                  "violation_date":"2018-02-23T00:00:00.000Z",
                  "correction_date":null,
                  "resolve_date":"2018-03-08T00:00:00.000Z",
                  "comment":"SAFETY CABLE ON SIGN IN Q-LINE."
               },
               {  
                  "condition":"Electrical.",
                  "condition_num":8,
                  "violation_date":"2018-02-23T00:00:00.000Z",
                  "correction_date":null,
                  "resolve_date":"2018-03-08T00:00:00.000Z",
                  "comment":"REPAIR EMERGENCY LIGHT IN Q-LINE."
               },
               {  
                  "condition":"Fences.",
                  "condition_num":10,
                  "violation_date":"2018-02-23T00:00:00.000Z",
                  "correction_date":null,
                  "resolve_date":"2018-03-08T00:00:00.000Z",
                  "comment":"REPLACE FLAGGED CHAIN LINK FENCE POST."
               },
               {  
                  "condition":"Welds",
                  "condition_num":22,
                  "violation_date":"2018-02-23T00:00:00.000Z",
                  "correction_date":null,
                  "resolve_date":"2018-03-09T00:00:00.000Z",
                  "comment":"BROKEN WELD ON BARRIER SUPPORT AT LAST TURN AND TRACK BEHIND DISPATCH. (FLAGGED)"
               },
               {  
                  "condition":"Welds",
                  "condition_num":22,
                  "violation_date":"2018-02-23T00:00:00.000Z",
                  "correction_date":null,
                  "resolve_date":"2018-03-09T00:00:00.000Z",
                  "comment":"CRACKED WELDS ON CAR #21/33."
               },
               {  
                  "condition":"Bumpers",
                  "condition_num":26,
                  "violation_date":"2018-02-23T00:00:00.000Z",
                  "correction_date":null,
                  "resolve_date":"2018-03-09T00:00:00.000Z",
                  "comment":"REPLACE BUMPER BAR ON CAR #13."
               }
            ]
         }
      ]}
}


###Methods
