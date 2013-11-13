# DoctorU's Shop

## Intro

This is a first pass at a commerce system srunning on node.

## Dependencies

For the existing configuration, there are external dependencies on:
1. My MongoHQ instance (development sandbox)
1. My Amazon S3 Free account (might not do this!)

## Installation

1. Install Node and associated npm
1. Install MongoDB
1. from this directory, run `npm install`

## Test Data

1. Catalog: From this directory, run `node test/data/catalogData.js`
2. CMS (nav): From this directory, run `node test/data/cmsData.js`
 

## Startup
If you have enough CPU cycles, you can start up and run the shop from one line:

    cd ../..
    node nodejs/shop/control db:start shop
    
Will start a mongoDB instance and fork it.

## Errata
This is a work in progress. Please let me know (via github) if you have problems.
   
