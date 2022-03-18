<template>
  <div class="home">
    <div id="map" class="map-home"></div>
  </div>
</template>

<script>
import mapType from "@/utils/openlayers/maptype";
import { Map, View, Feature } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import * as olProj from "ol/proj";
export default {
  components: {},
  data() {
    return {
      openMap: null,
      tileLayer: null, // 地图层
      mapList: null, // 地图列表
      locaMap: "1",
    };
  },
  mounted() {
    this.mapList = mapType;
    this.tileLayer = new TileLayer({
      source: mapType.find((e) => e.id === this.locaMap).value,
    });
    this.initMap();
  },
  methods: {
    initMap() {
      this.openMap = new Map({
        target: "map",
        layers: [this.tileLayer],
        view: new View({
          center: olProj.fromLonLat([108.945951, 34.465262]),
          zoom: 10,
        }),
        controls: [],
      });
    },
  },
};
</script>
<style scoped>
.map-home {
  width: 100vw;
  height: 100vh;
}
</style>