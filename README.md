# Welcome to my examn project for the Ionic/Anuglar course

As my examn project i created a smart home dashboard app that works with "Hubitat". 

Hubitat is a smart home automation hub that uses Zigbee and Z-Wave to communicate with devices. The hub has a build in app called "Maker API".

### To communicate with this api the app needs api credentials
* Ip address
* API key
* Maker API App ID

You can set the credentials by adding a setting on the "Setting" page in the app.

Once a setting is created you'll be able to create dashboards, add devices to them that are connected tot the api and switch these devices on and off.

Dashboards can only be created or updated when the device is connected to the internet. On creating or updating a dashboard it will be saved in a database and in the filesystem of the device.

When using the app without internet you'll still be able to see a list of dashboards and the devices added to these dashboard. But you won't be able to create, update or delete dashboards. Neither will you be able communicate with the devices.

