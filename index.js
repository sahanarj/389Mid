var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var subleaseDataUtil = require("./sublease-data-utils");
var app = express();
var _ = require("underscore");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.engine('handlebars', exphbs({
  defaultLayout: 'main' ,
helpers: {
  toJSON : function(object) {
    return JSON.stringify(object);
  },
     toJSONroom : function(object) {
       console.log(object);
       return JSON.stringify(object.room_name);
      }
   }
  }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */
 var _DATA = subleaseDataUtil.loadData().sublease;

app.get('/',function(req,res){
  res.render('home', { body: _DATA, img_src:"front2.png"});
})

//All of my API points to get data
app.get('/api/data',function(req,res){
  res.send(_DATA);
})
app.get("/api/sublease/:sublease_id",function(req,res){
  r = parseInt(req.params["sublease_id"])
  data=  _.findWhere(_DATA, {sublease_id: r})
  res.send(data);
})
app.get('/api/Kitchen',function(req,res){
  kitchenRooms = []
   for(r in _DATA){
     curr = _DATA[r];
     if(curr["amenities"].includes("Kitchen")){
       kitchenRooms.push(curr)
     }
   }
   res.send(kitchenRooms);
})
app.get('/api/CS',function(req,res){
  cs = []
   for(r in _DATA){
     curr = _DATA[r];
     if(curr["apartment"].includes("View 1") || curr["apartment"].includes("View 2")||
      curr["apartment"].includes("Varsity")){
       cs.push(curr)
     }
   }
   res.send(cs);
})
app.get('/api/Varsity',function(req,res){
  varsityRooms = []
   for(r in _DATA){
     curr = _DATA[r];
     if(curr["room_name"].indexOf("Varsity") != -1){
       varsityRooms.push(curr)
     }
   }
   res.send(varsityRooms);
})
app.get('/api/Affordable',function(req,res){
  affordableRooms = []
   for(r in _DATA){
     curr = _DATA[r];
     if(curr["price"] < 1000){
       affordableRooms.push(curr)
     }
   }
   res.send(affordableRooms);
})

app.get('/api/Fall2019',function(req,res){
  fallRooms = []
   for(r in _DATA){
     curr = _DATA[r];
     if(curr["semester"]=="Fall 2019"){
       fallRooms.push(curr)
     }
   }
   res.send(fallRooms);
})

app.get('/Kitchen',function(req,res){
  kitchenRooms = []
   for(r in _DATA){
     curr = _DATA[r];
     if(curr["amenities"].includes("Kitchen")){
       console.log("In if block!")
       kitchenRooms.push(curr.room_name)
     }
   }
   console.log(kitchenRooms)
   res.render('kitchen', {body: kitchenRooms});
})

app.get('/CS',function(req,res){
  cs = []
   for(r in _DATA){
     curr = _DATA[r];
     if(curr["apartment"].includes("View 1") || curr["apartment"].includes("View 2")||
   curr["apartment"].includes("Varsity")){
       cs.push(curr.room_name)
     }
   }
   res.render('cs', {body: cs});
})


app.get('/Varsity',function(req,res){
  varsityRooms = []
   for(r in _DATA){
     curr = _DATA[r];
     if(curr["room_name"].indexOf("Varsity") != -1){
       varsityRooms.push(curr.room_name)
     }
   }
   res.render('varsity', {body: varsityRooms});
})

app.get('/Affordable',function(req,res){
  affordableRooms = []
   for(r in _DATA){
     curr = _DATA[r];
     if(curr["price"] < 1000){
       affordableRooms.push(curr.room_name)
     }
   }
   res.render('affordable', {body: affordableRooms});
})

app.get('/Fall2019',function(req,res){
  fallRooms = []
   for(r in _DATA){
     curr = _DATA[r];
     if(curr["semester"]=="Fall 2019"){
       fallRooms.push(curr.room_name)
     }
   }
   res.render('semester', {body: fallRooms});
})

app.get('/api/search/:query',function(req,res){
  curr = req.params["query"]
  currUpper = curr.toUpperCase()
  console.log("This is curr " + currUpper)
  if(curr == "ALL") {
    res.send(_DATA);
    return;
  }
  filterArr=[]
  for(x in _DATA){
    console.log(_DATA[x]["room_name"]);
    if((_DATA[x]["room_name"].toUpperCase()).indexOf(currUpper)!=-1) {
      console.log("In here!")
      filterArr.push(_DATA[x])
    }
  }
  res.send(filterArr);
})

app.get("/sublease/:sublease_id",function(req,res){
  r = parseInt(req.params["sublease_id"])
  data=  _.findWhere(_DATA, {sublease_id: r})
  res.render('room_view' , { body: data});
})

app.get("/api/sublease/:sublease_id",function(req,res){
  r = parseInt(req.params["sublease_id"])
  data=  _.findWhere(_DATA, {sublease_id: r})
  res.send(data);
})

app.get("/add_room_page", function(req, res) {
   res.render('add_room')
});

app.get("/room/add", function(req, res) {
  room_name = req.query.room_name
  apartment = req.query.apartment
  address = req.query.address
  contact = req.query.contact
  amenities = (req.query.amenities)
  price = req.query.price
  semester = req.query.semester

 room_obj = {}
 room_obj["sublease_id"] = (_DATA.length) + 1
 room_obj["room_name"]= room_name
 room_obj["apartment"]= apartment
 room_obj["address"] = address
 room_obj["contact"]= contact

 if((amenities == null) == false){
   room_obj["amenities"] = amenities.split()
 }

 room_obj["price"] = price
 room_obj["semester"] = semester

 data=  _.findWhere(_DATA, {room_name: room_name})
 if(data == null){
    _DATA.push(room_obj)
}
 subleaseDataUtil.saveData(_DATA);
 res.send(JSON.stringify(room_obj));
});

app.post("/api/room/add", function(req, res) {
     console.log(req.body)
     room_obj = req.body
     room_obj["sublease_id"] = (_DATA.length) + 1
     data=  _.findWhere(_DATA, {room_name: room_obj.room_name})
     if(data == null){
        _DATA.push(room_obj)
    }
     subleaseDataUtil.saveData(_DATA);
     res.send(JSON.stringify(room_obj));
});

app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port 3000!');
});
