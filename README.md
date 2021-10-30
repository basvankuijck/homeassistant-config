# basvankuijck Home Assistant configuration

[![Travis-ci](https://travis-ci.com/basvankuijck/homeassistant-config.svg?token=HTRuSYHM4aU8kAkzt8C7&branch=master)](https://travis-ci.com/basvankuijck/homeassistant-config) ![Uptime Robot](https://img.shields.io/uptimerobot/status/m783570788-3efebdedeaa4c04d5c60fe00)

I finally managed to cleanup my `/config` directory and refactor a sh*tload in order to be more futureproof and be able to share it on GitHub.   
> Disclaimer:   
> I got a lot of inspiration from [adonno](https://github.com/adonno/Home-AssistantConfig) his configuration, so a big shoutout to him.

## History

My first experience with smart homes was when I bought a set of KlikAanKlikUit (kaku) outlets to turn some of the (unreachable) lights on and off.   
After a while I bought a Raspberry PI with a 433Mhz transmitter that would be able to control some of my lights through Homekit with [Homebridge](https://github.com/nfarina/homebridge).    
But after a while the limitations of Homekit came to light and after some searching I stumbled upon Home Assistant and have never looked back since.

## Protocols

In my current setup the main communication between smart 'devices' is done throught the following protocols:

| Zigbee | 433Mhz | MQTT | Sonoff |
|:------:|:------:|:----:|:----:|
|<img src="docs/assets/logos/zigbee.png" height="40px" />|<img src="docs/assets/logos/433mhz.png" height="40px" />|<img src="docs/assets/logos/mqtt.png" height="40px" />|<img src="docs/assets/logos/sonoff.png" height="40px" />|

## Hardware

### Host 

A Raspberry PI 3B with a 32GB SD card in a case with extra heatsinks fans and a 5.1V/2.5A power adapter.

### Backbone

| Device | Amount | More Info | Image | Cost |
| -------- |:-----------:|:---:|:---:|:---:|
| **Raspberry Pi 3B** | **1x** | [Raspberry Pi 3B](https://www.sossolutions.nl/officiele-raspberry-pi-3b-starterkit) | <img src="docs/assets/raspberrypi3b.jpg" height="70px" /> |€ 59|
| **Sandisk Micro SDXC 64GB** | **1x** | [SANDISK MicroSD Extreme Plus 64GB 170MB](https://www.mediamarkt.nl/nl/product/_sandisk-microsd-extreme-plus-64gb-170mb-1587891.html) | <img src="https://assets.mmsrg.com/isr/166325/c1/-/pixelboxx-mss-79540524/fee_325_225_png/SANDISK-MicroSD-Extreme-Plus-64GB-170MB" height="50px" /> |€ 26|

### 433Mhz 'Stuff'

| Device | Amount | More Info | Image | Cost |
| -------- |:-----------:|:---:|---:|:---:|
| **ACD-200** |  **1x** | [KlikAanKlikUit ACD-200](https://www.klikaanklikuit.nl/nl/producten/ontvangers/stopcontact/acd-200-stopcontact-dimmer-200w-multi-nederlandse-stekker.html) | <img src="docs/assets/kaku-acd200.jpg" height="100px" /> |€ 24|
| **AWMR-300** | **1x** | [KlikAanKlikUit AWMR-300](https://www.klikaanklikuit.nl/nl/producten/ontvangers/inbouw/awmr-300-mini-inbouw-schakelaar.html) | <img src="docs/assets/kaku-awmr300.jpg" height="100px" /> |€ 25|
| **AGDR-300** | **1x** | [KlikAanKlikUit AGDR-300](https://www.klikaanklikuit.nl/nl/producten/ontvangers/stopcontact/agdr-300-stopcontactdimmer-buiten-300w.html) | <img src="docs/assets/kaku-agdr300.jpg" height="100px" /> |€ 25|

### Modules

| Device | Amount | More Info | Image | Cost |
| -------- |:-----------:|:---:|---:|:---:|
| **NodeMCU v2** | **2x** | [ESP8266 NodeMCU V2](https://www.tinytronics.nl/shop/nl/communicatie/esp8266-nodemcu-v2) | <img src="docs/assets/nodemcu2.jpg" height="100px" /> |€ 16|
| **RF Transmitter** | **2x** | [433Mhz RF Transmitter](https://www.amazon.com/SMAKN®-433Mhz-Transmitter-Receiver-Arduino/dp/B00M2CUALS) | <img src="docs/assets/433transmitter.jpg" height="100px" /> |€ 2|

### Sonoff

| Device | Amount | More Info | Image | Cost |
| -------- |:-----------:|:---:|---:|:---:|
| **Sonoff Basic R3** | **2x** | [Sonoff Basic R3](https://www.itead.cc/smart-home/sonoff-basicr3-wifi-diy-smart-switch.html) | <img src="docs/assets/sonoffbasicr3.jpg" height="50px" /> |€ 12|

### Cameras

| Device | Amount | More Info | Image | Cost |
| -------- |:-----------:|:---:|---:|:---:|
| **Besder IP Camera** | **2x** | [BESDER Bullet IP Camera Wi-fi Outdoor 1080P](https://aliexpress.com/item/32852462138.html?spm=a2g0s.9042311.0.0.27424c4dok4dP9) | <img src="docs/assets/camera.jpg" height="100px" /> |€ 72|
| **Yi Home 1080p** | **1x** | [Yi Home 1080p](https://www.yitechnology.com/yi-1080p-home-camera) | <img src="https://oss.yitechnology.com/images/home1080p/1080p-top.png" height="100px" /> |€ 23|

### Zigbee

| Device | Amount | More Info | Image | Cost |
| -------- |:-----------:|:---:|---:|:---:|
| **Conbee II** | **1x** | [Phoscon Conbee II](https://www.phoscon.de/en/conbee2) | <img src="docs/assets/conbee2.jpg" height="50px" /> |€ 40|
| **Xiaomi Motion Sensor** | **1x** | [Xiaomi Aqara motion sensor](https://aliexpress.com/item/32999497769.html?spm=a2g0s.9042311.0.0.48284c4dyCxoo5) | <img src="docs/assets/xiaomi-motion.jp2" height="100px" /> |€ 12|
| **Xiaomi Door Sensor** | **1x** | [Xiaomi Aqara Door sensor](https://aliexpress.com/item/33003371330.html?spm=a2g0s.9042311.0.0.48284c4dyCxoo5) | <img src="docs/assets/xiaomi-door.jpg" height="100px" /> |€ 11|
| **TRÅDFRI Smart Plug** | **2x** | [IKEA TRÅDFRI Smart Plug](https://www.ikea.com/nl/nl/p/tradfri-draadloos-plug-in-stopcontact-90356166/) | <img src="docs/assets/tradfi-plug.jp2" height="100px" /> |€ 10|
| **TRÅDFRI Light Bulb** | **1x** | [IKEA TRÅDFRI Bulb E27 opal 1000lm](https://www.ikea.com/nl/nl/p/tradfri-led-e27-1000-lumen-draadloos-dimbaar-wit-spectrum-opaalwit-60408483/) | <img src="docs/assets/ikea-bulb.JPG" height="100px" /> |€ 18|
| **TRÅDFRI LED Spot** | **5x** | [IKEA TRÅDFRI GU10 400lm](https://www.ikea.com/nl/nl/p/tradfri-led-lamp-gu10-400-lumen-draadloos-dimbaar-warm-wit-60420041/) | <img src="docs/assets/ikea-gu10.jpg" height="100px" /> |€ 30|
| **TRÅDFRI Switch Rocker** | **1x** | [IKEA TRÅDFRI Wireless Rocker](https://www.ikea.com/nl/nl/p/tradfri-draadloze-dimmer-wit-70408595/) | <img src="docs/assets/ikea-tradfri-rocker.jpg" height="100px" /> |€ 7|
| **TRÅDFRI LED Spectrum Spot** | **1x** | [IKEA TRÅDFRI GU10 White Spectrum 400lm](https://www.ikea.com/nl/nl/p/tradfri-led-lamp-gu10-400-lumen-draadloos-dimbaar-wit-spectrum-90408603/) | <img src="docs/assets/ikea-white-light-spectrum.jpg" height="100px" /> |€ 12|
| **iCasa Filament bulb** | **5x** | [iCasa Zigbee Filament LED lamp | 125mm](https://www.bol.com/nl/p/zigbee-filament-led-lamp-125mm-instelbaar-2700k-tot-6500k-vervangt-60w-gloeilamp-grote-fitting-e27-compatible-met-philips-hue-ikea-home-smart/9200000117123523/?bltgh=htufFpaP--RUc61zlhJIfQ.1_5.11.ProductTitle) | <img src="docs/assets/icasa-0751889266291-20275146_200.jpg" height="100px" /> |€ 85 |

### Thermostat

| Device | Amount | More Info | Image | Cost |
| -------- |:-----------:|:---:|---:|:---:|
| **TOON** | **1x** | [Eneco TOON](https://www.eneco.nl/toon-thermostaat/) | <img src="docs/assets/toon.jpg" height="100px" /> | € 0|

### Misc

| Device | Amount | More Info | Image | Cost |
| -------- |:-----------:|:---:|---:|:---:|
| **iPad Air**<br>*(Wall mounted dashboard)* | **1x** | [Apple iPad Air](https://www.apple.com/nl/ipad-air/) | <img src="docs/assets/ipad-air.jpg" height="100px" /> |€ 300|
| **Mac Mini**<br>*(Used as a DSR)* | **1x** | [Apple Mac Mini](https://www.apple.com/mac-mini/) | <img src="docs/assets/mac-mini.jpg" height="50px" /> |€ 700|
| **Ring Doorbell** | **1x** | [Ring Doorbell Pro](https:///ring.com/products/video-doorbell-pro-with-plug-in-adapter) | <img src="https://cdn.shopify.com/s/files/1/0309/4288/8072/products/2.RingVideoDoorbellPro_1024x1024_2x_927264d5-2b77-4d83-95e5-ece57f853771_2000x2000.png?v=1602761414" height="100px" /> |€ 179|

### AV

| Device | Amount | More Info | Image | Cost |
| :-------- |:-----------:|:---:|---:|:---:|
| **Chromecast** | **2x** | [Google Chromecast V1](https://store.google.com/product/chromecast) | <img src="docs/assets/chromecast.jpg" height="100px" /> |€ 20|
| **Apple TV** | **1x** | [AppleTV V1](https://www.apple.com/tv/) | <img src="docs/assets/appletv.jpg" height="100px" /> |€ 60|
| **Google Home** | **1x** | [Google Home Mini](https://store.google.com/product/google_home_mini) | <img src="docs/assets/google-home-mini.jpg" height="100px" /> |€ 20|

## Total cost
(So far) € 1.849,- (includes removed / replaced stuff)

## Wishlist / To do

Everything I intend to upgrade in my hassio setup I create a github issue.   
[See all open issues](https://github.com/basvankuijck/homeassistant-config/issues).

Probably a lot of them won't ever see the daylight, but if I come across some intereseting stuff my initial action would be to create an issue.