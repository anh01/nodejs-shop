var mongoose = require("mongoose");

/* A simple facet, for example, Size Large. */
var facetSchema = new Schema({
  name: String, /* Localisable name */
  value: String 
});

/* e.g., Colour, Size, Brand */
var facetGroupSchema = new Schema({
  name: String /* E.g., "Colour" - should be a localisable key */
  facets: [{type: Schema.Types.ObjectId, ref: 'Facet'}]
});

/* Finally, export them */

var model = {
  facet : mongoose.model('Facet', facettSchema),
  facetGroup : mongoose.model('FacetGroup', facetGroupSchema),
};

exports.model = model;
