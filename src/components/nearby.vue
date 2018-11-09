<template>

  <b-container v-if="list">
      <b-row>
          <b-col sm="12" md="4" lg="4" v-for="item in filteredItems">
                    <router-link :to="{name:'park',params:{id:item.id}}">
                        <b-card class="card-nearby">
                        <div class="card-body">
                            <h5 class="card-title">{{toProperCase(item.company_name)}}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">{{toProperCase(item.street)}}, {{toProperCase(item.city)}}, {{item.state}} {{item.zipcode}}</h6>
                        </div>
                        </b-card>
                    </router-link>
                </b-col>
            </b-row>
        </b-container>
</template>

<script>
const axios = require('axios')


export default {
  name: "Nearby",
  data: function() {
    return {
      list: []
    };
  },
  props: ["park_id", "county"],
  created() {


    let self = this      

        
        console.log(self.county);
        axios.get('https://6es5edr4u6.execute-api.us-east-1.amazonaws.com/dev/api/nearby/'+self.county+'/'+self.park_id)
            .then(function (response) {
                self.list = response.data.data
                window.list = self.list
                console.log(self.list)
                if(self.list.length == 0) {
                    axios.get('https://6es5edr4u6.execute-api.us-east-1.amazonaws.com/dev/api/search')
                        .then(function (response) {
                        self.list = response.data.data
                        window.list = self.list
                        console.log(self.list)
                        })
                        .catch((err) => console.log(err))

                }
            })
            .catch((err) => console.log(err))
    
    

      
  },
  computed: {
   filteredItems: function () {
       /*
       var temp = []
       var max = this.list.length
       for (var i = 0; i < 3; i++) {
            var num = this.getRandom(0,max)
            temp.push(this.list[i])
       }*/
     return this.list.slice(0,3)
     }
  },
  methods: {
    getRandom: function (min, max) {
        return Math.random() * (max - min) + min;
    },
    toProperCase: function(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
  }
};
</script>

<style lang="css" scoped>
.search-box {
  margin: 100px;
  padding: 100px;
  background-color: #d3d3d3;
}

.container {
  display: block;
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

.card-nearby {
    margin-bottom:20px;
    text-decoration:none !important;
    
}

a:hover {
    text-decoration:none;
}

@media (min-width: 576px) {
  .container {
    margin-top: 70px;
  }
}
</style>