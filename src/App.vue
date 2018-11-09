


<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>

  </div>
</template>

<script>
import Navigation from './components/nav.vue';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
      'navigation': Navigation
  }
}
</script>

<style lang="scss">
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding:0px;
  width:100%;
  margin-top:70px;
}

h1 {
  font-size:40px;

}

h2 {
  font-size: 30px;

}

h3 {

}


li {
  display: inline-block;
  margin: 0 10px;
}


a {
  color: #42b983;
}

ul {
  list-style-type: none;
  padding: 0;
}

.pagination li {
  margin:0px;

}

@media (max-width: 576px) {
  /*
  .container {
    width:100%;
    margin-top:70px;
  }
}

.container {
  padding:0px;
  margin:0px;
}
*/

#app {
  margin-top: 70px;
}
h1 {
  font-size: 20px;
}
h1, h2 {
  font-weight: normal;
}



/*
.container {
    margin-top:50px;
    margin-left:10%;
    margin-right:10%;
}
*/
}
</style>
