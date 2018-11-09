<template>
    <div class="inspections" id="accordian-body">
        <b-row v-for="inspection in inspec.inspections">
            <b-col lg="12">
            <div class="inspections-date"><h3>Inspection on {{inspection.insp_d8 ? toDate(inspection.insp_d8).toLocaleDateString() : 'NA'}}</h3></div>
            </b-col>
            <b-col>
                <div class="inspections-status"><p><b>Status:</b> {{inspection.status ? inspection.status : 'NA' }}</p></div>
            </b-col>
            <b-col cols='9'>
                <table class="inspections-table align-left" v-if="inspection.violation[0] && getViolationCount(inspection.violation) > 0" responsive stacked="sm" :fields="headers" :items="inspection.violation">
                    <thead class="inspections-table-head">
                        <tr>
                            <td v-for="entry in headers">
                                {{entry.label}}
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data,index) in inspection.violation" v-bind:class="[isEven(index), 'data' ]">
                            <td>
                                {{conditions[data.condition_num]}}
                            </td>
                            <td>
                                <div class="known" v-if='data.violation_date'>{{toDate(data.violation_date).toLocaleDateString()}}</div>
                                <div class="unknown" v-else>N/A</div>
                            </td>
                            <td>
                                <div class="known" v-if='data.correction_date'>{{toDate(data.correction_date).toLocaleDateString()}}</div>
                                <div class="unknown" v-else>N/A</div>
                            </td>
                            <td>
                                <div class="known" v-if='data.resolve_date'>{{toDate(data.resolve_date).toLocaleDateString()}}</div>
                                <div class="unknown" v-else>N/A</div>
                            </td>
                            <td>
                                 <div class="known" v-if='data.comment'>{{toSentenceCase(data.comment)}}</div>
                                <div class="unknown" v-else>N/A</div>
                            </td>
                        </tr>
                    </tbody>
                </table> 
            <div v-else class="align-left">
                No violations were found
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>

export default {
  name: "Inspection",
  props: ["inspec"],
  data: function() {
    return {
      conditions: {
        "1": "Access, Egress",
        "2":"Anti-Roll, Devices, Safety Stops",
        "3":"AR Appearance/Cleanliness",
        "4":"Axle, Shafting, Pivots, Gears, Bearings",
        "5":"Bracing - Ride supports",
        "6":"Carriers - Upholstery, seat conditions",
        "7":"Drive, Chains, Belts",
        "8":"Electrical",
        "9":"Fasteners - pins, bolts, safety clips, e",
        "10":"Fences",
        "11":"Fire Extinguisher",
        "12":"Guarding Moving Parts",
        "15":"None",
        "17":"Operations Test",
        "18":"Retaining Devices",
        "19":"Safety Restrainers",
        "20":"Signs - age, weight, hair, first aid",
        "21":"Sweeps, Structures-leveling, alignment",
        "22":"Welds",
        "23":"Wire Rope Drive",
        "24":"Gasoline Engine-fuel, Storage, Container",
        "25":"Condition of Park Grounds",
        "26":"Bumpers",
        "27":"Motor"
      },
      even:false,
      tableStyle: {
          "vertical-align":"top",
          "border":"none"
      },
    headers: [
        {
          key: "condition_num",
          label: "Violations",
        },
        {
          key: "violation_date",
          label: "Violation Date"
        },
        {
          key: "correction_date",
          label: "Correction Date"
        },
        {
          key: "resolve_date",
          label: "Resolve Date"
        },        
        {
          key: "comment",
          label: "Comment"
        }        
      ]
    }
  },
  mounted() {
      /*
      this.records =[]
      let self = this
      axios.get('https://6es5edr4u6.execute-api.us-east-1.amazonaws.com/dev/api/park/'+self.parkid+'/rides/')
      .then(function (response) {
          self.records = response.data.data
          self.rides = self.getRides(self.records)
      })
      .catch((err) => console.log(err))
      //console.log(self.recro)
    //console.log(self.records)
    //this.rides = this.getRides(self.records);
*/
  },
  methods: {
    isEven: function(num) {
        if (num%2==0) {
            return "even"
        } else {
            return "odd"
        }

    },
    toDate: function(str) {
        if (str) {
      var updated;
      updated = new Date(
        str.substring(0, 4),
        str.substring(5, 7) - 1,
        str.substring(8, 10)
      );
      return updated;
    }
    },
    toProperCase: function(str) {
    if (str){
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
    },
    toSentenceCase: function(str) {
        if (str){
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
        }
    },
    getViolationCount: function(list) {
        var count = 0;
        if(list) {
            for (var v in list) {
                if (list[v].condition_num !== 15) {
                    count = count + 1
                }
            }
            return count

        } else {
            return count
        }
    }        
  }
};
</script>

<style lang="css" scoped>
#accordion-body {
    text-align:left !important;
}

.unknown {
    color: #A9A9A9
}

.align-left {
    text-align:left;
} 

.inspections-date {
    margin-bottom:20px;
    background-color:#eaeaea;
    padding:3px;

}

.inspections-date h3 {
    font-size: 14px;
    color:#000;

}

.inspections-date h4 {
    font-size:12px;
    color:red;

}


.inspections-table td {
    vertical-align:top !important;
    border:3px #FFFFFF solid !important;
}

.inspections-table thead {
    vertical-align:top !important;

}

.inspections-table-head td {
    margin-top:0px;
    font-weight:bold;
    padding-top:0px;
    border: 1px solid #000000;
}

.inspections-table {
    margin-left:0px;
    padding-left:0px;

}

.data:hover {
    background-color:#D3D3D3;

}


.odd {
    background-color: #EBF4FA;
}


</style>