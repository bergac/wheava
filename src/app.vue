<template>
    <div id="app" class="pure-g container">
        <header class="pure-u-5-5">

        </header>
        <div class="pure-g main">
            <!-- TODO implement router -->
        </div>

      <footer class="pure-u-5-5">

      </footer>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import store from './store';

    @Component
    export default class App extends Vue {
        mounted() {
            store.dispatch('login')
        }
    }
</script>

<style>
    .container {
        margin: 0;
        padding: 0;
    }

    .main {
        height: calc(100vh - 6rem)
    }

    header, footer {
        background-color: #599ae7;
        height: 3rem;
    }
</style>
