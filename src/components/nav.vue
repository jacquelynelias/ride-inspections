<template>
  <b-container>
    <b-navbar fixed="top" type="dark" toggleable="sm">
      <b-navbar-brand href="#"><img src="../assets/ajc_white.svg"></b-navbar-brand>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item><router-link :to="{name:'search'}">Home</router-link></b-nav-item>
            <b-nav-item href="#">About</b-nav-item>
          </b-navbar-nav>  
      </b-collapse>
    </b-navbar>
  </b-container>
</template>

<script>
export default {
  name: "Navigation"
};
</script>

<style lang="css" scoped>
img {
  width: 200px;
  text-align: left !important;
  display: block;
  padding-left: 50px;
}

nav {
  background-color: #003366 !important;
}

.navbar {
  justify-content: left;
}

.navbar-brand {
  height:30
}
</style>