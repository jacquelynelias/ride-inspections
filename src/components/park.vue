<template>
  <b-container>
    <b-row v-if="records[0]" class="nav-back">
        <router-link :to="{name:'search'}">Home</router-link> <div id="back">/ {{toProperCase(records[0].company_name)}}</div>
 
    </b-row>
    <b-row class="title">
        <b-col v-if="records[0]">
            <h1>{{toProperCase(records[0].company_name)}}</h1>
            <h3>{{toProperCase(records[0].street)}}, {{toProperCase(records[0].city)}}, {{records[0].state}} {{records[0].zipcode}}</h3>
            <p>Number of rides: {{getRideNum()}}</p>
        </b-col>
        <b-col v-else class="missing-title">
            <h1>Oh No!</h1>
            <p>We've seen to come across an issue.
                We can't seem to find the park you are 
                looking for 
            </p>
        </b-col>
    </b-row>
    <b-row v-if="records[0]">
        <b-col>
            <h3>Rides</h3>
              
            <b-table class="rides" v-if="rides[0]" :current-page="currentPage" :per-page="perPage" bordered responsive stacked="sm" :fields="headers" :items="rides">
                <template slot="ride_name" slot-scope="row" @click.stop="row.toggleDetails">
                    <div class="align-left clickable" @click.stop="row.toggleDetails">
                        <div>
                        <img v-if="row.detailsShowing" @click.stop="row.toggleDetails" src="../assets/baseline-expand_less-24px.svg"/>
                        <img v-else @click.stop="row.toggleDetails" src="../assets/baseline-expand_more-24px.svg"/>{{row.value}}
                        </div>
                    </div>
                </template>
                <template slot="manufacture_d8" slot-scope="data">
                    <div class="clickable" @click.stop="data.toggleDetails">
                        <div>
                        {{toDate(data.value).getFullYear()}}
                        </div>
                    </div>
                </template>
                <template slot="status" slot-scope="data">
                    <div class="clickable" @click.stop="data.toggleDetails">
                        <div>
                        {{getStatus(data.item.inspections)}}
                        </div>
                    </div>
                </template>
                <template slot="violations" slot-scope="data">
                    <div class="clickable" style="width:100%;height:100%" @click.stop="data.toggleDetails">
                        <div>
                        {{parseInt(getViolationCount(data.item.inspections))}}
                        </div>
                    </div>
                </template>
                <template slot="manufacturer" slot-scope="data">
                    <div class="clickable" @click.stop="data.toggleDetails">
                        <div>
                        {{data.value}}
                        </div>
                    </div>
                </template>
                <template slot="last_inspected" slot-scope="row">
                    <div class="clickable" @click.stop="row.toggleDetails">
                    <div class="known" v-if='getNewest(row.item.inspections).insp_d8'>{{toDate(getNewest(row.item.inspections).insp_d8).toLocaleDateString()}}</div>
                    <div class="unknown" v-else>N/A</div>
                    </div>
                    
                </template>
                <template class="no-hover" slot="row-details" slot-scope="row" >
                    <b-row class="no-hover">
                        <b-col>
                            Permit Num: <div class="known" v-if='getNewest(row.item.inspections).permit_num'>
                                {{getNewest(row.item.inspections).permit_num}}
                                <div class="known" v-if='getNewest(row.item.inspections).perm_exp_d8'>
                                    which expires on {{getNewest(row.item.inspections).perm_exp_d8}}
                                </div>
                            </div>
                            <div class="unknown" v-else>N/A</div>
                        </b-col>
                        <b-col>
                            Seating Capacity: <div class="known" v-if='getNewest(row.item.inspections).seating_cap'>{{getNewest(row.item.inspections).seating_cap}}</div>
                            <div class="unknown" v-else>N/A</div>
                        </b-col>
                        <b-col>
                            Child Seating Capacity: <div class="known" v-if='getNewest(row.item.inspections).child_seating_cap'>{{getNewest(row.item.inspections).child_seating_cap}}</div>
                            <div class="unknown" v-else>N/A</div>
                        </b-col>
                        <b-col>
                            Speed: <div class="known" v-if='getNewest(row.item.inspections).speed'>{{getNewest(row.item.inspections).speed}}</div>
                            <div class="unknown" v-else>N/A</div>
                        </b-col>
                    </b-row>
                    <hr>
                    <b-row class="no-hover">
                        <b-col>
                            <inspection v-bind:inspec="row.item"/>
                        </b-col>
                    </b-row>

                </template>
            </b-table> 
            <b-row v-if="records[0]">
                <b-col md="6" class="my-1">
                    <b-pagination :total-rows="rides.length" :per-page="perPage" v-model="currentPage" class="my-0" />
                </b-col>
            </b-row>  
        </b-col>
    </b-row>
    <b-row class="other" v-if="records[0].county">
        <b-col>
        <h3>Have you checked out these parks?</h3>
        <nearby v-bind:park_id="parkid" v-bind:county="(records[0].county.split(' ')[0] ? records[0].county.split(' ')[0] : records[0].county)"/>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
const axios = require('axios')

import Nearby from "./nearby.vue";
import Inspection from "./inspection.vue";
import bPagination from 'bootstrap-vue/es/components/pagination/pagination';

export default {
  name: "Park",
  data: function() {
    return {
      parkid: this.$route.params.id,
      violations: [],
      nearParks: [],
      records: [],
      rides: [],
      perPage:10,
      currentPage:1,
      headers: [
        {
          key: "ride_name",
          label: "Name",
          formatter: "toProperCase",
          sortable:true
        },
        {
          key: "manufacture_d8",
          label: "Manufactured",
          sortable:true
        },
        {
          key: "manufacturer",
          label: "Manufacturer",
          formatter: "toProperCase",
          sortable:true
        },
        {
          key: "violations",
          label: "Violations",
          sortable:true
        },
        {
            key:"last_inspected",
            label: "Last Inspected",
            sortable: true
        },
        {
          key: "status",
          label: "Status",
          sortable:true
        }
      ]
    };
  },
  props: ["id"],
  created() {
      this.records =[]
      let self = this
      axios.get('https://6es5edr4u6.execute-api.us-east-1.amazonaws.com/dev/api/park/'+self.parkid+'/rides/')
      .then(function (response) {
          self.records = response.data.data
          self.rides = self.getRides(self.records)

      })
      .catch((err) => console.log(err))

  },
  components: {
    nearby: Nearby,
    inspection: Inspection,
    'b-pagination': bPagination
  },
  methods: {
    sort:function(item) {

    },
    getRideNum: function() {
      var num = 0;
      var rideList = [];
      for (var k in this.records) {
        var m = this.records[k];
        if (rideList.includes(m.serial_num)) {
          num = num + 0;
        } else {
          num = num + 1;
          rideList.push(m.serial_num);
        }
      }
      return num;
    },
    getStatus: function(list) {
        var status = 'NA';
        if(list) {
            for (var k in list) {
                if(this.isNewest(list[k].insp_d8, list[k])) {
                    status = list[k].status
                }

            }
            return status

        } else {
            return status
        }
    },
    getViolationCount: function(list) {
        var count = 0;
        if(list) {
            for (var k in list) {
                for (var v in list[k].violation) {
                    if (list[k].violation[v].condition_num !== 15) {
                        count = count + 1
                    }
                }
            }
            return count

        } else {
            return count
        }
    },
    //gets a list of rides from the list of violations
    getRides: function(list) {
      var rides = [];
      for (var k in list) {  //For each violation in the list
        var violation = list[k];
        var contains = false;
        for (var s in rides) { //For each ride already in rides 
          if (violation.serial_num === rides[s].serial_num) { //Checks to see if the ride is already in the list
            var newest = true;
            var same = false;
            //Check to see if most recent inspection

            if ( //checks to see if violation occured on an already existing inspection 
                this.isSameDay(
                  violation.insp_d8,
                  rides[s].inspections
                )
              ) {

                newest = false;
                same = true;
                var viol_new = {};
                viol_new["condition"] = violation.cond;
                viol_new["condition_num"] = violation.cond_num;
                viol_new["violation_date"] = violation.viol_d8;
                viol_new["correction_date"] = violation.correct_d8;
                viol_new["resolve_date"] = violation.resolve_d8;
                viol_new["comment"] = violation.comment;
                for (var date in rides[s].inspections) {
                    if (this.isSameDay(violation.insp_d8,[rides[s].inspections[date]])) {
                        rides[s].inspections[date].violation.push(viol_new);
                    }
                }
              } else if (
                !this.isNewest(
                  violation.insp_d8,
                  rides[s].inspections
                )
              ) { //checks to see violation is on the most recent inspection
                newest = false;
                same = false;
              }
            
            //If newest, insert violation details
            if (newest) {
              var item = {
                post_remarks: violation.post_remarks,
                insp_d8: violation.insp_d8,
                status: violation.insp_stat,
                violation: [
                  {
                    permit_num: violation.permit_num,
                    violation_date: violation.viol_d8,
                    correction_date: violation.correct_d8,
                    resolve_date: violation.resolve_d8,
                    comment: violation.comment,
                    condition_num: violation.cond_num,
                    condition: violation.cond
                  }
                ]
              };
              rides[s].inspections.push(item);
            }
            //If not newest, update details
            else {
              if (!same) {
                var inspec_new = {};
                inspec_new["insp_d8"] = violation.insp_d8;
                inspec_new["remarks"] = violation.post_remarks;
                inspec_new["violation"] = [];
                inspec_new["status"] = violation.insp_stat;
                inspec_new["permit_num"] = violation["permit_num"]
                inspec_new["permit_exp_d8"] = violation["permit_exp_d8"]
                inspec_new["speed"]= violation["speed"]
                inspec_new["seating_cap"]= violation["seating_cap"]
                inspec_new["child_seating_cap"]= violation["child_seating_cap"]
                var viol_new = {};
                viol_new["condition"] = violation.cond;
                viol_new["condition_num"] = violation.cond_num;
                viol_new["violation_date"] = violation.viol_d8;
                viol_new["correction_date"] = violation.correct_d8;
                viol_new["resolve_date"] = violation.resolve_d8;
                viol_new["comment"] = violation.comment;
                inspec_new.violation.push(viol_new);
                rides[s].inspections.push(inspec_new);
              } 
            }

            item[""];
            contains = true;
          }
        }
        //What to do if the ride is not in the list
        if (!contains) {
          var item = {};
          item = {
            ride_name: violation["ride_name"],
            manufacturer: violation["manufacturer"],
            serial_num: violation["serial_num"],
            manufacture_d8: violation["manufacture_d8"],
            contentVisible: violation["contentVisible"],
            inspections: [
              {
                insp_d8: violation["insp_d8"],
                post_remarks: violation["post_remarks"],
                status: violation["insp_stat"],
                permit_num: violation["permit_num"],
                permit_exp_d8: violation["permit_exp_d8"],
                speed: violation["speed"],
                seating_cap: violation["seating_cap"],
                child_seating_cap: violation["child_seating_cap"],
                violation: [
                  {
                    condition: violation["cond"],
                    violation_date: violation["viol_d8"],
                    correction_date: violation["correct_d8"],
                    resolve_date: violation["resolve_d8"],
                    comment: violation["comment"],
                    condition_num: violation["cond_num"]
                  }
                ]
              }
            ]
          };
          rides.push(item);
        }
      }
      return rides;
    },
    toDate: function(str) {
      var updated;
      updated = new Date(
        str.substring(0, 4),
        str.substring(5, 7) - 1,
        str.substring(8, 10)
      );
      return updated;
    },
    getNewest:function(list) {
        for (var m in list) {
            if (this.isNewest(list[m].insp_d8, list)) {
                return list[m]
            }
        }

    },
    isNewest: function(date, inspections) {
      var newest = true;
      var dateTest = new Date(
        date.substring(0, 4),
        date.substring(5, 7) - 1,
        date.substring(8, 10)
      );
      if (inspections.length > 0) {
        for (var m in inspections) {
            var dateCheck = new Date(
            inspections[m].insp_d8.substring(0, 4),
            inspections[m].insp_d8.substring(5, 7) - 1,
            inspections[m].insp_d8.substring(8, 10)
            );
            if (dateCheck > dateTest) {
            newest = false;
            }
        }
      } else {
          var dateCheck = new Date(
            inspections.insp_d8.substring(0, 4),
            inspections.insp_d8.substring(5, 7) - 1,
            inspections.insp_d8.substring(8, 10));
        if (dateCheck > dateTest) {
            newest = false;
            }
      }
    
      return newest;
    },
    isSameDay: function(date, inspections) {

      var same = false;

      var dateTest = new Date(
        date.substring(0, 4),
        date.substring(5, 7) - 1,
        date.substring(8, 10)
      );
      for (var m in inspections) {
        var dateCheck = new Date(
          inspections[m].insp_d8.substring(0, 4),
          inspections[m].insp_d8.substring(5, 7) - 1,
          inspections[m].insp_d8.substring(8, 10)
        );
        if (
          dateCheck.getDate() === dateTest.getDate() &&
          dateCheck.getMonth() === dateTest.getMonth() &&
          dateCheck.getYear() === dateTest.getYear()
        ) {
          same = true;
        }
      }
      return same;
    },
    resetRows: function(list) {
      for (var m in list) {
        list[m]["contentVisible"]= false;
      }
      return list;
    },
    toProperCase: function(str) {
    if (str){
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
    },
    getViolations: function() {
      var list = [];
      for (var l in this.records) {
        var m = this.records[l];
        if (m.cond_num != "0") {
          list.push(m);
        }
      }
      return list;
    }
  }
};
</script>

<style lang="css" scoped>
#back {
    margin-left:5px;
}

.align-left {
    display: inline-block;
    float:left;
}

.unknown {
    color: #A9A9A9
}


.clickable :hover {
    cursor:pointer;
}

.b-table-details {
    background-color:#FFFFFF !important;
    color:red;

}

.title {
    margin-top:80px;
}


@media (max-width: 400px) {
    .title {
        margin-top:10px;
    }


}

</style>