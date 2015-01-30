var express = require('express');

var router = express.Router();

 var dummy = [{name:'Maito',price:'1,75 €'},{name:'Koff',price:'0,30€'}];


router.get('/',function(req,res){
   
    console.log("SERVER: get");
    res.send(dummy);
});

router.post('/',function(req,res){
    console.log("SERVER: post");
    dummy.push(req.body);
    res.send("Added to server array"); 
});

router.put('/',function(req,res){
    
    console.log("SERVER: put");
    console.log(req.body);
    console.log(req.body[1].name);
    console.log(req.body[1].price);
    console.log(req.body[0]);

    console.log("<-important");
    
    dummy[req.body[0]].name = req.body[1].name;
    dummy[req.body[0]].price = req.body[1].price;
    
    console.log(dummy[0]);
    res.send("we are ok!");
    
});

router.delete('/',function(req,res){
    
    console.log("SERVER: delete");
    dummy.splice(req.query.id, 1);
    res.send("we are ok!");
    
});


module.exports = router;