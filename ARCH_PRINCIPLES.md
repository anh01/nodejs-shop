# Architectural Principles

## Summary

* System should be easy to deploy a small part 
   * Should be unneccessary to deploy the whole system
   * Complex client-service system
   * Services for:
   * Product
      * Inventory
      * Price
      * Category
   * Order
   * Address
   * Payment
   * Customer
      * Auth
      * Made up of small services
         * Changes should be made by deploying new revisions of APIs, then migrating clients over
*  System should provide administration web interfaces
*  System should provide RESTful APIs
   * Fully tokenized
   * APIs have default error capability
* All web interfaces should use asynchronous access to build pages
   * inter-item messaging?
   * 
   
### Usability

* initial focus on service layer
* Front end shop
* Product import and management ease of use is key.
   * Import from CSV/spreadsheet?
   * Drag-drop?
   * Normalisation with old catalog?
   * Dragging a new catalog definition will change the source for
   * Keep inventory separate from product/sku information.

### Data storage

* Data is stored in a noSQL js object format.
* Product catalog single monolithic noSQL datastore?
* Personal data (orders, my account details, etc)
   * Could co-exist in a single DB
   * OR Each user could have their own individual store (shard?)
