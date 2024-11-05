<template>
	<div v-if="!isLogin" v-cloak class="mainApp-wrap">
    <div class="mainApp-content">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
			<div id="childApp"></div>
    </div>
  </div>
  <div v-else>
    <router-view></router-view>
  </div>
</template>
<script>
import { registerMicroApps, start } from 'qiankun';
export default {
	name: 'MainApp',
  computed: {
    isLogin() {
      return this.$route.path == "/login" || this.$route.path == "/"
    },
  },
  created() {
  },
	mounted() {
    this.fnqiankun()
  },
  methods: {
    fnqiankun() {
      const getActiveRule = (hash) => (location) => location.hash.startsWith(hash);
      // 离线开发、数据探查
      let childOffline = `/dssweb/offline/`;
      if(process.env.NODE_ENV === 'development'){
        childOffline = '//localhost:2010/';
      }
      registerMicroApps([
        {
          name: 'childOffline',
          entry: childOffline,
          container: '#childApp',
          activeRule: getActiveRule('#/childOffline/'),
          props: {}
        },
      ]);
      // start && start()
      start && start({
        prefetch: 'all'
      });
    }
  }
}
</script>

<style lang="scss">

</style>
