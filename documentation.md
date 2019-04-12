
# SUBLEASES AT COLLEGE PARK

---

Name: Sahana Raju

Date: 3/22/2019

Project Topic: Sublease Availabilities in College Park

URL:

---

### 1. Data Format and Storage

Data point fields:
- `Field 1`:     sublease_id                              `Integer`
- `Field 2`:     room_name(Apartment + room number)       `String`
- `Field 3`:     address                                  `String`
- `Field 4`:     Amenities                                `[String]`
- `Field 5`:     Contact                                  `String`
- `Field 6`:     price                                    `Integer`
- `Field 7`:     Semester(Term + Year)                    `String`

Schema:
```javascript
{
    "sublease_id": Number,
    "room_name": String,
    "apartment": String,
    "address": String,
    "contact": String,
    "amenities":[String],
    "price": Number,
    "semester":String
}
```

### 2. Add New Data

HTML form route: `/add_room_page`

POST endpoint route: `/room/add`

Example Node.js POST request to endpoint:
```javascript
var request = require("request");

var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/add',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
      "room_name": "Commons 4 056",
      "apartment": "Commons 4",
      "address": "123 Route Av",
      "contact": "4451342342",
      "amenities":["Kitchen","Living Room","Window View","Bus System"],
      "price": 700,
      "semester":"Fall 2019"
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/data`

### 4. Search Data

Search Field: `room_name`

### 5. Navigation Pages

Navigation Filters
1. Kitchen ->  `/Kitchen`
2. Affordable Apartments ->  `/Affordable`
3. Fall 2019 Availabilities -> `/Fall2019`
4. Varsity Availabilities -> `/Varsity`
5. Near Computer Science Buildings -> `/CS`

### 6. Extra API (Get) Pages
1. Kitchen ->  `/api/Kitchen`
2. Affordable Apartments ->  `/api/Affordable`
3. Fall 2019 Availabilities -> `/api/Fall2019`
4. Varsity Availabilities -> `/api/Varsity`
5. Near Computer Science Buildings -> `/api/CS`
6. All subleases given ID numbers `/api/sublease/:sublease_id`
