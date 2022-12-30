<script setup lang="ts">
</script>

<template id="#app">
  <header>
    <h1>Element Plus + Vue3 Playground</h1>
  </header>
  <main>
    <div class="link-container">
      <RouterLink class="router-link" to="/button">Button</RouterLink>
      <RouterLink class="router-link" to="/dropdown">Dropdown</RouterLink>
      <RouterLink class="router-link" to="/input">Input</RouterLink>
      <RouterLink class="router-link" to="/inputSearch">Input Search</RouterLink>
      <RouterLink class="router-link" to="/pagination">Pagination</RouterLink>
      <RouterLink class="router-link" to="/select">Select</RouterLink>
      <!-- <RouterLink class="router-link" to="/input-phone">Input Phone</RouterLink> -->
      <RouterLink class="router-link" to="/checkbox">Checkbox</RouterLink>
      <RouterLink class="router-link" to="/toggle">Toggle</RouterLink>
      <RouterLink class="router-link" to="/table">Table</RouterLink>
    </div>
    <div v-if="$route.path.includes('table')" class="table-components">
      <RouterLink class="router-link" to="/table/cell">Cell</RouterLink>
    </div>
    <RouterView class="router-view"/>
  </main>
</template>

<style scoped lang="scss">
*{
  margin: 0;
  padding: 0;
}

#app{
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
}
header{
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
main{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .link-container{
    margin: 20px 0px;
  }
  .table-components{
    margin: 20px 0px;
  }
}
.router-link{
  padding: 5px 10px;
  margin: 10px;
  border-radius: 4px;
  color: black;
  background-color: white;
  transition: all 0.2s ease-in-out;
}
.router-link-active{
  padding: 6px 14px;
  color: white;
  background-color: #196DFD;
  transition: all 0.2s ease-in-out;
}
.router-view{
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>