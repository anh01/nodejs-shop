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
