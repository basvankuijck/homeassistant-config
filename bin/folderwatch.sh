#!/bin/sh

CHECK_FILE=""
FILE_SIZE="0"

while [ true ]
do
    DATE=`date +%Y%m%d`
    DIRECTORY="/media/Data/$DATE/images"
    if [ -d "$DIRECTORY" ]; then
        LAST_FILE="$(find $DIRECTORY -name 'A*.jpg' -type f -printf "%T@ %p\n" | sort -n | cut -d' ' -f 2- | tail -n 1)"
        if [ "$LAST_FILE" != "$CHECK_FILE" ]; then
            FILE_SIZE_CHECK="$(stat --printf='%s' $LAST_FILE)"
            if [ "$FILE_SIZE_CHECK" = "$FILE_SIZE" ]; then
                echo "$LAST_FILE"
                CHECK_FILE="$LAST_FILE"
                FILE_SIZE="0"
                cp -f "$CHECK_FILE" /home/homeassistant/.homeassistant/www/images/carport/image.jpg
                mosquitto_pub -h 127.0.0.1 -t home-assistant/sensor/carport -m "ON"
                sleep 30
                mosquitto_pub -h 127.0.0.1 -t home-assistant/sensor/carport -m "OFF"
            else
                FILE_SIZE="$FILE_SIZE_CHECK"
            fi
        fi
    fi
    sleep 1
done
