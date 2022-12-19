<template>
    <h1>{{type}}</h1>
  </template>
  
  <script lang="ts">
  export default {
    props: {
        type: {
            type: String,
            required: true,
        },
    }
  }
  </script>