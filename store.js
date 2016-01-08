#! /usr/bin/env node
/**
 * @author Seena Rowhani
 * Submission for Spotify Jobs
 */
(function(req){
  req('http://shopicruit.myshopify.com/products.json', function(err, res, body){
    var json = JSON.parse(body);
    var products = json.products.filter(function(el){
      return ['Keyboard', 'Computer'].some(function(e){
        return el.product_type.indexOf(e) > -1;
      });
    });
    var p = [];
    products.forEach(function(el){
      Array.prototype.push.apply(p, el.variants);
    });
    products = p;
    products.sort(function(a,b){
      return a.grams - b.grams;
    });
    var num = products.length;
    var sum = products.reduce(function(p,c){
      return p + Number(c.price);
    }, 0);
    console.log("You can carry " + num + " items, and it would cost $" + sum);
  });
})(require('request'));
