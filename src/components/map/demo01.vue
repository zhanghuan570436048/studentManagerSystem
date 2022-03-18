<template>
  <div class="home">
    <div id="map" class="map-home"></div>
    <div ref="popup" class="popup" v-show="shopPopup">
      <div class="info">
        <ul>
          <li>信息1：xxx</li>
          <li>信息2：xxx</li>
          <li>{{popupData&&popupData.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Map, View, Feature } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { XYZ, Vector as VectorSource } from "ol/source";
import * as olProj from "ol/proj";
import { Point } from "ol/geom";
import { Style, Icon, Text,Fill, Stroke, Circle as sCircle } from "ol/style";
import { Overlay } from "ol";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      openMap: null,
      shopPopup: false,
      popupData:null
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.openMap = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
            }),
          }),
        ],
        view: new View({
          // 将西安作为地图中心
          center: olProj.fromLonLat([108.945951, 34.465262]),
          zoom: 10,
        }),
        controls: [],
      });
      this.setMarker();
      this.singleclick();
      this.pointermove();
      this.addOverlay();
    },
    setMarker() {
      let _feature = new Feature({
        geometry: new Point(olProj.fromLonLat([108.945951, 34.465262])),
        name: "西安市",
        population: 2115,
      });
      let _style = new Style({
        // image: new sCircle({ // 自定义画圆
        //   radius: 10,
        //   stroke: new Stroke({
        //     color: "#fff",
        //   }),
        //   fill: new Fill({
        //     color: "#3399CC",
        //   }),
        // }),
        image: new Icon(
          /** @type {olx.style.IconOptions} */
          ({
            anchor: [0.5, 60],
            anchorOrigin: "top-right",
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            offsetOrigin: "top-right",
            // offset:[0,10],
            //图标缩放比例
            scale: 0.1,
            //透明度
            opacity: 0.75,
            //图标的url
            src: "../../../static/images/location.png",
          })
        ),
        text: new Text({
          //位置
          textAlign: "center",
          //基准线
          textBaseline: "top",
            offsetY:'50',
          //文字样式
          font: "normal 14px 微软雅黑",
          //文本内容
          text: _feature.get("name"),
          //文本填充样式（即文字颜色）
          fill: new Fill({ color: "#aa3300" }),
          stroke: new Stroke({ color: "#ffcc33", width: 2 }),
        }),
      });
      _feature.setStyle(_style);
      let _marker = new VectorLayer({
        source: new VectorSource({
          features: [_feature],
        }),
      });
      this.openMap.addLayer(_marker);
    },
    addOverlay() {
      // 创建Overlay
      let elPopup = this.$refs.popup;
      this.popup = new Overlay({
        element: elPopup,
        positioning: "bottom-center",
        stopEvent: false,
        offset: [0, -20],
      });
      this.openMap.addOverlay(this.popup);
    },
    singleclick() {
        var self = this
      this.openMap.on("singleclick", (e) => {
        // 判断是否点击在点上
        let feature = this.openMap.forEachFeatureAtPixel(
          e.pixel,
          (feature) => feature
        );
        if (feature) {
          this.shopPopup = true;
          // 设置弹窗位置
          let coordinates = feature.getGeometry().getCoordinates();
          this.popup.setPosition(coordinates);
            self.popupData = feature.values_
            console.log(this.popupData)

        } else {
          this.shopPopup = false;
        }
      });
    },
    pointermove() {
      this.openMap.on("pointermove", (e) => {
        if (this.openMap.hasFeatureAtPixel(e.pixel)) {
          this.openMap.getViewport().style.cursor = "pointer";
        } else {
          this.openMap.getViewport().style.cursor = "inherit";
        }
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
.popup {
  width: 200px;
  background-color: white;
  padding: 18px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgb(177, 177, 177);
}
.popup .info {
  font-size: 14px;
  text-align: left;
}
.popup .info ul {
  padding-left: 0;
}
</style>