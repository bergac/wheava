<template>
    <div id="app" class="container">
        <md-toolbar class="md-primary">
            <h1 class="md-title">Wheava</h1>
        </md-toolbar>

        <md-content class="md-layout main">
            <router-view></router-view>
        </md-content>
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
        max-height: calc(100vh - 6rem);
        padding: 2rem;
        display: flex;
        justify-content: center;
    }
</style>
