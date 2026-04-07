require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/TimeSlider",
  "esri/widgets/Search",
  "esri/widgets/Legend",
  "esri/widgets/BasemapToggle"
], function (Map, MapView, FeatureLayer, TimeSlider, Search, Legend, BasemapToggle) {

  const renderer = {
    type: "simple",
    symbol: {
      type: "simple-marker",
      color: "gray",
      size: 6,
      outline: {
        color: "#ffffff",
        width: 0.5
      }
    },
    visualVariables: [
      {
        type: "color",
        field: "depth",
        stops: [
          { value: 0, color: "#ffff64ff", label: "Shallow Earthquakes" },
          { value: 50, color: "#ffb71bff" },
          { value: 100, color: "#ff5c6aff" },
          { value: 200, color: "#bc2e9aff" },
          { value: 300, color: "#520d8eff", label: "Deep Earthquakes" }
        ]
      },
      {
        type: "size",
        field: "mag",
        stops: [
          { value: 2.5, size: 3 },
          { value: 5, size: 12 },
          { value: 7, size: 30 }
        ]
      }
    ]
  };

  const earthquakesLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/earthquake_incidents_global/FeatureServer/0",
    renderer: renderer,
    title: "Major Earthquakes in 2025",
    popupTemplate: {
      title: "{place}",
      content: "Magnitude: {mag}, Depth: {depth}"
    },
    timeInfo: {
      timeExtent: {
        start: new Date("2025-01-01T00:00:00.000Z"),
        end: new Date("2025-04-01T23:59:59.000Z")
      }
    }
  });

  const map = new Map({
    basemap: "gray-vector",
    layers: [earthquakesLayer]
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [0, 20],
    zoom: 1
  });

  const searchWidget = new Search({
    view: view
  });
  view.ui.add(searchWidget, "top-right");

  const legend = new Legend({
    view: view
  });
  view.ui.add(legend, "bottom-right");

  const basemapToggle = new BasemapToggle({
    view: view,
    nextBasemap: "hybrid"
  });
  view.ui.add(basemapToggle, "top-left");

  const timeSlider = new TimeSlider({
    container: timeSliderDiv,
    view: view,
    fullTimeExtent: {
      start: new Date("2025-01-01T00:00:00.000Z"),
      end: new Date("2025-04-01T23:59:59.000Z")
    },
    stops: {
      interval: {
        value: 7,
        unit: "days"
      }
    }
  });
  view.ui.add(timeSlider, "manual");
});

