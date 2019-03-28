<template>
  <div>
      <vheader></vheader>
      <router-view />
  </div>
</template>
<script>
import vheader from "./components/header";
export default {
  components: { vheader }

};
</script>

