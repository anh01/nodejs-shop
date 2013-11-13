/* Controllers defined here */
var cmsDef = require("../model/cms");
var NavNode = cmsDef.model.navNode;


exports.readByName = function (req, res, next) {
    var nid = 'Root';
    // NavNode.find({displayName: nid},function(err, nodes, next) {
      // if(err) throw err;
      // console.log("nodes:", nodes);
    //   if(0 < nodes.length) {
        // res.locals.navNodes = nodes;
    //   } else {
        // res.locals.navNodes = [{}];
        // res.locals.navNodes[0].childNodes=[];
      // }
      res.locals.navNodes = [{value: 'Products', childNodes: [
        {name: 'Shop', link: {value: 'Shop', href: '/'}},
        {name: 'Catalogues', link: {value: 'Catalogues', href: '/catalogues/'}},
        {name: 'Products', link: {value: 'Products', href: '/products/'}}
        ]
      }];
      next();
    // });
};
