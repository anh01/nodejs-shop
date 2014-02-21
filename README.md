# Node.js Shop

## Intro

This is a first pass at a commerce system running on node.

## Dependencies

For the existing configuration, there are external dependencies on:

1. My MongoHQ instance (development sandbox)
1. My Amazon S3 Free account (might not do this!)

## Installation

1. Install Node and associated npm (from e.g., [http://nodejs.org/download/](http://nodejs.org/download/))
1. Install MongoDB (Optional - current version uses hosted instance).
1. from this directory, run `npm install`

## Startup

1. Set the port in your environment (This is already set if you are running from e.g., c9.io) - in windows:

		set PORT = 3000
2. Start the app with

    	node app
3. visit [http://localhost:3000/](http://localhost:3000/)

### Old Way
Untested since the fork, deprecated.

<del>If you have enough CPU cycles, you can start up and run the shop from one line:</del>

<del>    cd ../..</del>
<del>    node nodejs/shop/control db:start shop</del>
    
<del>Will start a mongoDB instance and fork it.</del>

## Extras

### Configure your MongoDB

The default installation accesses a cloud-hosted database in a dev sandbox. This means that if too many people try to access it, there will be conflicts; modifications may cause deadlocks.

The file `config/db.js` contains the database configuration. You can provide your own values for the default mongodb URL. alternatively you can override the DB URL completely in this file by changing the undefined url parameter (note that url is undefined by  default).

PLEASE create your own local database instance, configure it, and then add the test data.

### Test Data

1. Catalog: From this directory, run `node test/data/catalogData.js`
2. CMS (nav): From this directory, run `node test/data/cmsData.js`
 
## Errata
This is a work in progress. Please let me know (via github) if you have problems.
   
 