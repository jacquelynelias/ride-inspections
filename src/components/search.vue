<template>
  <b-container class="full">
    <b-row>
        <b-col sm="12">        
            <h1>Georgia Amusement Ride Inspections</h1>
            <h5>By: Jacquelyn Elias</h5>
            <p>With fair season right around the corner, the Atlanta Journal-Constitution 
            Journal-Constitution has collected the inspection data from amusement park rides
            throughout the state. Search below to see just how safe your local parks are.</p>
        </b-col>
    </b-row>
    <b-row>
        <b-col>
        <vue-plotly class="graph" :data="dataLine" :layout="layout" :autoResive="true" :options="options"/>
        </b-col>
        <b-col>
        <vue-plotly class="graph" :data="dataBar" :layout="layout" :autoResive="true" :options="options"/>
        </b-col>
    </b-row>
    <b-row style="display:none">
        <canvas id="whiteboard" resize></canvas>
    </b-row>
    <b-row class="suggested" lg="12">
        <b-col>
        <ul>
            <li><a  class="fill" href="#" v-on:click="showTopViolators()">Top Violations</a></li>
            <li><router-link  class="fill" :to="{name:'park',params:{id:47}}">Six Flags in Austell</router-link></li>
        </ul>
        </b-col>
    </b-row>    
    <b-row>
        <b-col lg="12">
            <div class="search-box">
                    <b-form inline @submit="search" @reset="formReset">
                        <h3 class="sentence">I am looking for a(n)</h3>
                        <b-form-select v-model="input.type" :options="options_type" class="mb-3 sentence"/>
                        <h3 class="sentence"> park in </h3>
                        <b-form-input id="location_input" class="sentence" v-model="input.city" type="text" placeholder="City" aria-label="Search"></b-form-input>
                        <h3 class="sentence">. I believe its name is </h3>
                        <b-form-input id="name_input" class="sentence" v-model="input.name" type="text" placeholder="Name" aria-label="Search"></b-form-input>
                        <div v-if="showAdvanced" class="advanced">
                            <h3 class="sentence">I could also search by </h3>
                            <b-form-input id="county_input" class="sentence" v-model="input.county" type="text" placeholder="County" aria-label="Search"></b-form-input>
                            <h3 class="sentence"> or  </h3>
                            <b-form-input id="zipcode_input" class="sentence" v-model="input.zipcode" type="text" placeholder="Zipcode" aria-label="Search"></b-form-input>
                        </div>
                        <b-button id="basic-text2" type="submit" variant="primary"><img class="fa fa-search text-grey" width="15px" src="../assets/baseline-search-24px.svg" aria-hidden="true"/></b-button>
                        <b-button id="basic-text2" type="reset" variant="primary">Clear</b-button>
                        <p class="advanced-link" v-on:click="showAdvanced = !showAdvanced" >
                            Advanced Search
                        </p>

                    </b-form>

            </div>
        </b-col>
    </b-row>
    <b-row class="results">
        <b-col  lg="12" sm="12">
        <div v-if="click">
            <h3 class="query" v-if="location">You are searching for parks near "{{location}}"</h3>
            <h3 class="query" v-if="name">You are searching for "{{name}}"</h3>
        
        <b-table v-if="result[0]" responsive stacked="sm" bordered striped hover :current-page="currentPage" :per-page="perPage" :fields="headersResult" :items="result">
            <template slot="company_name" slot-scope="data">
            <router-link :to="{name:'park',params:{id:data.item.id}}">{{toProperCase(data.value)}}</router-link>
            </template>
        </b-table>
            <b-col md="6" lg="12" v-if="result[0]" class="my-1">
                    <b-pagination :total-rows="result.length" :per-page="perPage" v-model="currentPage" class="my-0" />
            </b-col>       
            <p v-else>No results were found</p>          
        </div>
        <div v-else>
            <h3 class="query">You are viewing the parks with the most violations</h3>
            <b-table responsive striped bordered stacked="sm" :current-page="currentPage" :per-page="perPage" hover :fields="headersTop" :items="records">
                <template slot="city" slot-scope="data">
                    {{toProperCase(data.item.city)}}
                </template>
                <template slot="company_name" slot-scope="data">
                <router-link :to="{name:'park',params:{id:data.item.id}}">{{toProperCase(data.value)}}</router-link>
                </template>
            </b-table>
            <b-col class="page">
                    <b-pagination size="md" :total-rows="records.length" :per-page="perPage" v-model="currentPage"/>
            </b-col>  
        </div>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
const axios = require('axios')
import VuePlotly from '@statnett/vue-plotly'
import paper from 'paper';

var sample = [
  {
    company_name: "CITY OF VILLA RICA- PINE MOUNTAIN SCENIC RAILROAD",
    street: "646 INDUSTRIAL BLVD",
    city: "VILLA RICA",
    state: "GA",
    zipcode: "30180",
    county: "CARROLL COUNTY",
    insp_d8: "1/23/18",
    permit_num: "AP-0001",
    insp_stat: "Pass",
    ride_name: "VILLA RICA TRAIN",
    manufacturer: "CHANCE MFG.",
    serial_num: "102-277-95-24",
    manufacture_d8: "1995-00-00",
    post_remarks: "NULL",
    cond: "Retaining Devices.",
    id: "1"
  }
];

var getBusiness;
export default {
  name: "Search",
  data: function() {
    return {
      result: [],
      dataBar: [{x:[],y:[], type:'bar'}],
      dataLine: [{x:[],y:[]}],
      year: '2017',
      showAdvanced:false,
      path:'',
      options: {
          "responsive":true,
          "displayModeBar":false
    },
      location: "",
      name: "",
      layout:{},
      input: {},
      options_type: [ 
          {value:null, text:"either"},
          {value:1, text:"Amusement"},
          {value:2, text:"Carnival"}
      ],
      options_counties: [

      ],
      records: sample,
      click: "",
      perPage:10,
      currentPage:1,
      headersTop: [
            {
            key: 'city',
            label: 'City',
            sortable:true
            },
            {
                key:'zipcode',
                label:'Zipcode'
            },
            {
                key:'company_name',
                label:'Name',
                sortable:true
            },
            {
                key:'count',
                label:'Violations',
                sortable:true
            }    
        ],
        headersResult: [
            {
            key: 'city',
            label: 'City',
            formatter: 'toProperCase',
            sortable:true
            },
            {
                key:'zipcode',
                label:'Zipcode'
            },
            {
                key:'company_name',
                label:'Name',
                sortable:true
            }    
        ]
    };
  },
  components: {
      VuePlotly
  },
  created() {
    paper.install(window);
  },
  mounted() {
    paper.setup('whiteboard');
    this.draw()
    window.addEventListener('resize', this.handleResize)
    let self = this
    axios.get('https://6es5edr4u6.execute-api.us-east-1.amazonaws.com/dev/api/top/')
      .then(function (response) {
        self.records = response.data.data
      })
      .catch((err) => console.log(err))
    axios.get('https://6es5edr4u6.execute-api.us-east-1.amazonaws.com/dev/api/violations/month/'+self.year)
      .then(function (response) {
        var temp = response.data.data
        console.log(temp)
        for (var m in temp) {
            self.dataLine[0].x.push(self.year+"-"+temp[m].month)
            self.dataLine[0].y.push(temp[m].num)      
        }
      })
      .catch((err) => console.log(err))
    axios.get('https://6es5edr4u6.execute-api.us-east-1.amazonaws.com/dev/api/violations/type/'+self.year)
      .then(function (response) {
        var temp = response.data.data
        for (var m in temp) {
            self.dataBar[0].x.push(temp[m].cond)
            self.dataBar[0].y.push(temp[m].num)      
        }
      })
      .catch((err) => console.log(err))                

  },
  methods: {
    
    search: function(evt) {
        evt.preventDefault();
        var url = 'https://6es5edr4u6.execute-api.us-east-1.amazonaws.com/dev/api/search' //base url for search endpoint
        var parameters = '';
        
        //Checks to see is user searched by Amusement or Carnival
        if(this.input['type']) {
            parameters = parameters + "type="+this.input['type']
        }

        //Checks to see if user searched by name
        if(this.input['name']) {
            if (parameters) {
                parameters = parameters + "&name="+this.input['name']
            } else {
                parameters = "name="+this.input['name']
            }
        }

        //CHecks to see if user searched by city
        if(this.input['city']) {
            if (parameters) {
                parameters = parameters + "&city="+this.input['city']
            } else {
                parameters = "city="+this.input['city']
            }            
        }

        //Checks to see if user searched by county
        if(this.input['county']) {
            if (parameters) {
                parameters = parameters + "&county="+this.input['county']
            } else {
                parameters = "county="+this.input['county']
            }
        }

        //Checks to see if user searched by zipcode
        if(this.input['zipcode']) {
            if (parameters) {
                parameters = parameters + "&zipcode="+this.input['zipcode']
            } else {
                parameters = "zipcode="+this.input['zipcode']
            }
        }

        //Adds inputs as query string parameters if they exist
        if (parameters) {
            url = url + '?' + parameters

        }


        //API call to search endpoint
        document.body.style.cursor='wait';
        //document.getElementById("location_input").text = "";
        let self = this
        axios.get(url)
        .then(function (response) {
            document.body.style.cursor='default'
            self.result = response.data.data
            self.click = true;
            self.currentPage=1;
        })
        .catch((err) => console.log(err))    

    },
    //Function to clear search inputs
    formReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.input = {}
    },
    //Function to draw canvas - still working on
    draw: function() {
        var linePropWidth = view.bounds.width; //2000 is actual width proportion
        var lineProHeight = linePropWidth / 6.5; //100 is actual height proportion
        this.path = new paper.Path();
        this.path.fitBounds(view.bounds);
        console.log("resize" + view.bounds)
		// Create a Paper.js Path to draw a line into it:
		
		// Give the stroke a color
		this.path.strokeColor = 'black';
		var start = new paper.Point(view.bounds.height/10, view.bounds.width/10);
		// Move to start and draw a line from there
		this.path.moveTo(start);
		// Note that the plus operator on Point objects does not work
		// in JavaScript. Instead, we need to call the add() function:
		this.path.lineTo(start.add([ view.bounds.height/5, view.bounds.width/10 ]));
		// Draw the view now:
		paper.view.draw();
    },
    //Original search function by location -- not in use
    searchLocation: function(location) {
      this.results = "";
      this.name = "";
      this.location = location;
      console.log(location)
      document.body.style.cursor='wait';
      document.getElementById("location_input").text = "";
      let self = this
      axios.get('https://6es5edr4u6.execute-api.us-east-1.amazonaws.com/dev/api/parks/location/'+location)
      .then(function (response) {
          document.body.style.cursor='default'
          self.result = response.data.data
          self.click = true;
          self.currentPage=1;
        })
        .catch((err) => console.log(err))
        console.log(this.results)
    },
    //Original search function by name -- not in use
    searchName: function(evt) {
      this.results = "";
      this.location = "";
      this.name = this.input;
      evt.preventDefault();
      console.log(this.input)
      /*document.body.style.cursor='wait';
      let self = this
      axios.get('https://6es5edr4u6.execute-api.us-east-1.amazonaws.com/dev/api/parks/name/'+name)
      .then(function (response) {
          document.body.style.cursor='default'
          self.result = response.data.data
          self.click = true;
          console.log(response.data.data)
          self.currentPage=1;
        })
        .catch((err) => console.log(err))
        */
        console.log(this.results)      
    },
    //Turns string to camel case
    toProperCase: function(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
    showTopViolators: function() {
      this.click = "";
    }
  }
};
</script>

<style lang="css" scoped>
.search-box {
  margin: 50px;
  display:inline-block;
  text-align:center;
}

.input-group.md-form.form-sm.form-1 input {
  border: 1px solid #bdbdbd;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
.input-group.md-form.form-sm.form-2 input.red-border {
  border: 1px solid #2199e8;
}

.input-group-text {
  background-color: #2199e8;
}

.graph {
    width:100%;
    max-height:300px;
}

.sentence {
    margin-right:10px;
    line-height:2;
}

.search-box button {
    margin-right: 10px;
}

.advanced-link {
    cursor: pointer;
    text-decoration: underline;
}

.full-container {
    width:100%;
}

.fill {
    background-color:#d3d3d3;
    padding:10px;
    border-radius:25px;
    color:#000;
    text-decoration:underline;
    text-align:center;
}

.full {
    margin-top: 150px;
    padding-right:50px;
    padding-left:50px;
}

.page {
    text-align:center;
    width:100%;
}
a :hover {
    cursor:pointer;
}

.results {
    text-align:center;
}



@media (max-width: 400px) {



}
</style>