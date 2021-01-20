<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>
<style>
    /** 滚动条样式美化 */
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background: transparent;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: #C1C1C1;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #A8A8A8;
    }

    @media screen and (max-width: 750px) {
        ::-webkit-scrollbar {
            width: 5px;
            height: 5px;
        }
    }

    .mini-bar::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }
</style>