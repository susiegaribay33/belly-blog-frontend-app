<template>
  <nav class="pagination">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    
      <span class="page-stats">{{pagination.from}} - {{pagination.to}} of {{pagination.total}}</span>
      <a v-if="pagination.prevPage" @click="$emit('prev')" class="button is-small pagination-previous">
          Prev
      </a>
      <a class="button is-small pagination-previous" v-else disabled>
          Prev
      </a>

      <a v-if="pagination.nextPage" @click="$emit('next')" class="button is-small pagination-next">
          Next
      </a>
      <a class="button is-small pagination-next" v-else disabled>
          Next
      </a>
  </nav>

</template>

<style>

</style>

<script>
    export default {
        props: ['pagination'],
    }
</script>