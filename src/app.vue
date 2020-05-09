<template>
    <div id="app" class="pure-g container">
        <header class="pure-u-5-5">

        </header>
        <div class="pure-g main">
            <router-view></router-view>
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
            if (this.$route.path !== '/login'
                && (!store.state.token
                    || !store.state.token.isValid())) {
                    this.$router.push('/login')
            }
        }
    }
</script>

<style>
    .container {
        margin: 0;
        padding: 0;
    }

    .main {
        height: calc(100vh - 6rem);
        padding: 2rem;
    }

    header, footer {
        background-color: #599ae7;
        height: 3rem;
    }

    app {

    }
</style>
