class FloorplanCard extends HTMLElement {
  set hass(hass) {
    if (!this.base) {
      const card = document.createElement('ha-card');
      this.container = document.createElement('div');
      this.container.style = "margin: 20px";
      const base = document.createElement('div');
      base.style = `position: relative;
      padding-bottom: 35.4357246%;
      background-image: url(/local/floorplan/images/floor0.png?002);
      background-size: cover;
      background-repeat: no-repeat`;

      var _entities = [];
      var addLast = [];
      this.entities().forEach(function(entity) {   
          const element = document.createElement('div');
          element.className = `type_${entity.type}`;
          var elementStyle = `position: absolute; left: ${entity.frame.left}%; top: ${entity.frame.top}%`;
          if (entity.frame.width && entity.frame.height) {
              elementStyle += `; width: ${entity.frame.width}%; height: ${entity.frame.height}%`;
          }
          element.title = entity.id;
          var style = "width: 100%; height: 100%; position: absolute;";
          if (entity.type == "sensor") {
              style += " display:none;";
              if (!!entity.buttonorigin) {
                  var sensorImage = document.createElement("img");
                  sensorImage.src = "/local/floorplan/images/sensor.png";
                  sensorImage.style = `width: 50px; height: 49px; position: absolute; left: ${entity.buttonorigin.left}%; top: ${entity.buttonorigin.top}%`;
                  addLast.push(sensorImage);
              }
          }
          var innerHTML = `<img class="${entity.type}" src="/local/floorplan/images/${entity.imagefile}" style="${style}">`;
          if (entity.type == "light") {
              innerHTML += `<img class="button" style="width: 50px; height: 49px; margin-top:-25px; margin-left: -25px; position: absolute; left: ${entity.buttonorigin.left}%; top: ${entity.buttonorigin.top}%">`;
          } else if (entity.type == "thermostat") {
              elementStyle += "; width: 70px; height: 22px; padding-top:8px; font-weight: bold; font-size: 12px; border-radius: 15px; background-color: rgba(0, 0, 0, 0.7); color: #fff; text-align: center";
              innerHTML = "---";
          }
          element.style = elementStyle;
          element.innerHTML = innerHTML
          base.appendChild(element);
          _entities.push(element);
      });

      addLast.forEach(function(element) {
          base.appendChild(element);
      });

      this.appendChild(this.container);
      this.container.appendChild(base);
      this.appendChild(card);

      _entities.forEach(function(element) {
          const button = element.getElementsByClassName("button")[0];
          if (!!button) {
              button.onclick = function() {
                  hass.callService('homeassistant', 'toggle', { entity_id: element.title });
              };
          }
      });
      this._entities = _entities;
      this.base = base;
    }

    const entities = this._entities;
    const self = this;
    this._entities.forEach(function(element) {
      const entityId = element.title;
      const state = hass.states[entityId];
      var img = element.getElementsByClassName("light")[0];
      if (!!img) {
          const button = element.getElementsByClassName("button")[0];
          if (state.state == 'on') {
              button.src = "/local/floorplan/images/light_on.png";
              img.style.display = 'block';
          } else {
              button.src = "/local/floorplan/images/light_off.png";
              img.style.display = 'none';
          }
      }

      img = element.getElementsByClassName("sensor")[0];
      if (!!img) {
          if (state.state == 'on') {
              // self.fireSensorTimer(hass, img, entityId);
              img.style.display = 'block';
          } else {
              img.style.display = 'none';
          }
      }
      
      if (element.className == "type_thermostat") {
          const temperature = state.attributes.current_temperature.toFixed(1).toString().replace(".", ",");
          element.innerHTML = `${temperature} °C`;
      }
    });
  }

  fireSensorTimer(hass, img, entityId) {
      const self = this;
      setTimeout(function() {
          if (hass.states[entityId].state == 'on') {
              self.fireSensorTimer(hass, img, entityId);
              return
          }
          img.style.display = 'none';
      }, 30000);
  }

  entities() {
      return [
          {
              "id": "light.leeslamp_bank",
              "type": "light",
              "frame": {
                  "width": 16.41791045,
                  "left": 9.099662975,
                  "top": 53.80434783,
                  "height": 41.44021739
              },
              "imagefile": "light-living.png",
              "buttonorigin": {
                  "left": 50,
                  "top": 52
              }
          },
          {
              "id": "light.bureau_2",
              "type": "light",
              "frame": {
                  "width": 20.89552239,
                  "left": 37.45787193,
                  "top": 15.2173913,
                  "height": 19.56521739
              },
              "imagefile": "light-desk.png",
              "buttonorigin": {
                  "left": 40,
                  "top": 18
              }
          },
          {
              "id": "light.erker",
              "type": "light",
              "frame": {
                  "width": 11.1218103,
                  "left": 1.396244584,
                  "top": 3.940217391,
                  "height": 71.60326087
              },
              "imagefile": "light-baywindow.png",
              "buttonorigin": {
                  "left": 50,
                  "top": 42
              }
          },
          {
              "id": "light.speeltafel",
              "type": "light",
              "frame": {
                  "width": 19.06596052,
                  "left": 35.4357246,
                  "top": 28.66847826,
                  "height": 28.66847826
              },
              "imagefile": "light-play.png",
              "buttonorigin": {
                  "left": 50,
                  "top": 75
              }
          },
          {
              "id": "light.keuken",
              "type": "light",
              "frame": {
                  "width": 25.51757342,
                  "left": 54.97202696,
                  "top": 52.5923913,
                  "height": 43.61413043
              },
              "imagefile": "light-keuken.png",
              "buttonorigin": {
                  "left": 43,
                  "top": 57
              }
          },
          {
              "id": "binary_sensor.kitchen",
              "type": "sensor",
              "frame": {
                  "width": 35.62831006,
                  "left": 62.44583534,
                  "top": 16.98369565,
                  "height": 49.86413043
              },
              "imagefile": "sensor-kitchen.png",
              "buttonorigin": {
                  "left": 80,
                  "top": 50
              }
          },
          {
              "id": "light.keukenkast_2",
              "type": "light",
              "frame": {
                  "width": 23.44727973,
                  "left": 74.7231584,
                  "top": 31.00652174,
                  "height": 35.4619565
              },
              "imagefile": "light-keukenkast.png",
              "buttonorigin": {
                  "left": 56,
                  "top": 62
              }
          },
          {
              "id": "climate.toon_thermostat",
              "type": "thermostat",
              "frame": {
                  "left": 46.65382764,
                  "top": 42.25543478
              }
          },
          {
              "id": "binary_sensor.frontdoor",
              "type": "sensor",
              "imagefile": "door_front.png",
              "frame": {
                  "width": 18.77708233,
                  "left": 36.01348098,
                  "top": 71.73913043,
                  "height": 23.64130435
              }
          }
      ];
  }

  setConfig(config) {
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}

customElements.define('floorplan-card', FloorplanCard);
