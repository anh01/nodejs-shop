/* Controllers defined here */
var cmsDef = require("../model/cms");
var NavNode = cmsDef.model.navNode;


exports.readByName = function (req, res, next) {
    var nid = 'primary nav';
    // NavNode.find({},function(err, nodes) {
    //   if(err) throw err;
    //   console.log("nodes:", nodes);
    //   if(0 < nodes.length) {
    //     res.locals.navNodes = nodes;
    //   } else {
        // res.locals.navNodes = [{}];
        // res.locals.navNodes[0].childNodes=[];
      // }
      res.locals.navNodes = [{value: 'Products', childNodes: [
        {name: 'Catalogues', link: {value: 'Catalogues', href: '/products/'}},
        {name: 'Catalogues', link: {value: 'Products', href: '/products/'}},
        {link: {value: 'Products', href: '/products/'}},
        {link: {value: 'Products', href: '/products/'}}
        ]
        
       }];
      next();
    // });
};
