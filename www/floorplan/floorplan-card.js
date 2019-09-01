class FloorplanCard extends HTMLElement {
    set hass(hass) {
      if (!this.base) {
        const card = document.createElement('ha-card');
        this.container = document.createElement('div');
        this.container.style = "margin: 20px";
        this.base = document.createElement('div');
        this.base.style = `position: relative;
        padding-bottom: 35.4357246%;
        background-image: url(/local/floorplan/images/floor0.png?002);
        background-size: cover;
        background-repeat: no-repeat`;

        const imgStyle = `style="width: 100%; height: 100%; position: absolute;"`;

        // Living light
        this.lightLiving = document.createElement('div');
        this.lightLiving.title = 'light.woonkamer';
        this.lightLiving.style = "position: absolute; width: 16.41791045%; left: 9.099662975%; top: 53.80434783%; height: 41.44021739%;";
        this.lightLiving.innerHTML = `<img class="light" src="/local/floorplan/images/light-living.png" ${imgStyle}><img class="button" style="width: 50px; height: 49px; margin-top:-25px; margin-left: -25px; position: absolute; left: 50%; top: 50%">`;
        this.base.appendChild(this.lightLiving);

        // Desk light
        this.deskLight = document.createElement('div');
        this.deskLight.title = 'light.bureau_2';
        this.deskLight.style = "position: absolute; width: 20.89552239%; left: 37.45787193%; top: 15.2173913%; height: 19.56521739%";
        this.deskLight.innerHTML = `<img class="light" src="/local/floorplan/images/light-desk.png" ${imgStyle}><img class="button" style="width: 50px; height: 49px; margin-top:-25px; margin-left: -25px; position: absolute; left: 40%; top: 38%">`;
        this.base.appendChild(this.deskLight);

        // Play light
        this.playTableLight = document.createElement('div');
        this.playTableLight.style = "position: absolute; width: 19.06596052%; left: 35.4357246%; top: 28.66847826%; height: 28.66847826%";
        this.playTableLight.title = 'light.speeltafel';
        this.playTableLight.innerHTML = `<img class="light" src="/local/floorplan/images/light-play.png" ${imgStyle}><img class="button" style="width: 50px; height: 49px; margin-top:-25px; margin-left: -25px; position: absolute; left: 35%; top: 60%">`;
        this.base.appendChild(this.playTableLight);

        // Kitchen light
        this.kitchenLight = document.createElement('div');
        this.kitchenLight.style = "position: absolute; width: 25.51757342%; left: 54.97202696%; top: 52.5923913%; height: 43.61413043%";
        this.kitchenLight.title = 'light.keuken';
        this.kitchenLight.innerHTML = `<img class="light" src="/local/floorplan/images/light-keuken.png" ${imgStyle}><img class="button" style="width: 50px; height: 49px; margin-top:-25px; margin-left: -25px; position: absolute; left: 43%; top: 57%">`;
        this.base.appendChild(this.kitchenLight);

        // Kitchen sensor
        this.kitchenSensor = document.createElement('div');
        this.kitchenSensor.title = 'binary_sensor.motion_sensor';
        this.kitchenSensor.style = "position: absolute; width: 35.62831006%; left: 62.44583534%; top: 16.98369565%; height: 49.86413043%";
        this.kitchenSensor.innerHTML = `<img class="sensor" src="/local/floorplan/images/sensor-kitchen.png" style="display:none;  width: 100%; height: 100%; position: absolute;">`;
        this.base.appendChild(this.kitchenSensor);

        // Kitchen closet light
        this.kitchClosetLight = document.createElement('div');
        this.kitchClosetLight.title = 'light.keukenkast';
        this.kitchClosetLight.style = "position: absolute; width: 23.44727973%; left: 74.7231584%; top: 31.00652174%; height: 35.46195652%";
        this.kitchClosetLight.innerHTML = `<img class="light" src="/local/floorplan/images/light-keukenkast.png" ${imgStyle}><img class="button" style="width: 50px; height: 49px; margin-top:-25px; margin-left: -25px; position: absolute; left: 56%; top: 62%">`;
        this.base.appendChild(this.kitchClosetLight);

        var sensorImage = document.createElement("img");
        sensorImage.src = "/local/floorplan/images/sensor.png?003";
        sensorImage.style = "width: 6%; height: 16%; position: absolute; left: 80%; top: 50%"
        this.base.appendChild(sensorImage);

        this.appendChild(this.container);
        this.container.appendChild(this.base);
        this.appendChild(card);

        this._entities = [
            this.lightLiving,
            this.deskLight,
            this.playTableLight,
            this.kitchenLight,
            this.kitchClosetLight,
            this.kitchenSensor
        ];

        this._entities.forEach(function(element) {
            const button = element.getElementsByClassName("button")[0];
            if (!!button) {
                button.onclick = function() {
                    hass.callService('homeassistant', 'toggle', { entity_id: element.title });
                };
            }
        });
      }

      const entities = this._entities;
      const self = this;
      this._entities.forEach(function(entityId) {
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
        } else {
            img = element.getElementsByClassName("sensor")[0];
            if (!!img && state.state == 'on' && img.style.display == "none") {
                self.fireSensorTimer(hass, img, entityId);
                img.style.display = 'block';
            }
        }
      });
    }

    fireSensorTimer(hass, img, entityId) {
        console.log("fire!");
        const self = this;
        setTimeout(function() {
            console.log("fired!");
            if (hass.states[entityId].state == 'on') {
                self.fireSensorTimer(hass, img, entityId);
                return
            }
            img.style.display = 'none';
        }, 30000);
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
