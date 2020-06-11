var express = require('express');
var exphbs  = require('express-handlebars');
// SDK de Mercado Pago
const mercadopago = require ('mercadopago');
require('dotenv').config({path:'variables.env'});
 
var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Puerto de la app
const PORT = process.env.PORT || 4000;

app.get('/', function (req, res) {
    res.render('home',{page:"home"});
});


app.get('/detail', function (req, res) {

    var initPoint;


    // Agrega credenciales
    mercadopago.configure({
    access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398',
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
    });

    // Crea un objeto de preferencia
    let preference = {
    items: [
        {
        id:1234,
        description: "Dispositivo móvil de Tienda e-commerce",
        title: req.query.title,
        picture_url: process.env.BASE_URLSERVER+req.query.img.substr(1),
        unit_price: parseFloat(req.query.price),
        quantity: parseFloat(req.query.unit),
        
        }
    ],
    "payer": {
        "name": "Lalo",
        "surname": "Landa",
        "email": "test_user_63274575@testuser.com",
        "phone": {
            "area_code": "11",
            "number": 22223333
        },
        "identification": {
            "type": "DNI",
            "number": "12345678"
        },
        "address": {
            "street_name": "False",
            "street_number": 123,
            "zip_code": "1111"
        }
    },
    "external_reference": "co.carlosivan@gmail.com",
    "back_urls": {
        "success": process.env.BASE_URLSERVER+"/aprobado",
        "failure": process.env.BASE_URLSERVER+"/rechazado",
        "pending": process.env.BASE_URLSERVER+"/pendiente"
    },
    "auto_return": "approved",
    "payment_methods": {
        "excluded_payment_methods": [
            {
                "id": "amex"
            }
        ],
        "excluded_payment_types": [
            {
                "id": "atm"
            }
        ],
        "installments": 6
    },
    "notification_url":process.env.BASE_URLSERVER+"/ipn"
    };

    mercadopago.preferences.create(preference)
    .then(function(response){
    // Este valor reemplazará el string "$$init_point$$" en tu HTML
    console.log(response);
    initPoint = response.body.init_point;
    res.render('detail', {initPoint:initPoint,page:"item",title:req.query.title,price:req.query.price,unit:req.query.unit,img:req.query.img});
    }).catch(function(error){
    console.log(error);
    res.render('error');
    });
    
});

app.get('/aprobado', function (req, res) {

    res.render('aprobado',{page:"home",respuesta:req.query});
});

app.get('/pendiente', function (req, res) {

    res.render('pendiente',{page:"home",respuesta:req.query});
});

app.get('/rechazado', function (req, res) {

    res.render('rechazado',{page:"home",respuesta:req.query});
});

app.post('/ipn', function (req, res) {

    console.log('ipn ejecutada');
    console.log(req.query);

    mercadopago.configure({
        access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398',
        integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
        });

    switch(req.query.type) {
        case "payment":
            payment.get = requestManager.describe({
                path: `/v1/payments/:${req.query.id}?access_token=APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398`,
                method: "GET"
              });
              
              // Calling the get
              mercadopago.payment.get(1, {}, function() {});
            break;
        case "plan":
            plan.get = requestManager.describe({
                path: `/v1/plans/:${req.query.id}?access_token=APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398`,
                method: "GET"
              });
              
              // Calling the get
              mercadopago.payment.get(1, {}, function() {});
            break;
        case "subscription":
            subscription.get = requestManager.describe({
                path: `/v1/subscriptions/:${req.query.id}?access_token=APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398`,
                method: "GET"
              });
              
              // Calling the get
              mercadopago.payment.get(1, {}, function() {});
            break;
        case "invoice":
            invoice.get = requestManager.describe({
                path: `/v1/invoices/:${req.query.id}?access_token=APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398`,
                method: "GET"
              });
              
              // Calling the get
              mercadopago.payment.get(1, {}, function() {});
            break;
            default:
              console.log('nada que mostrar');
            ;
    }

    res.sendStatus(200);
});

app.use(express.static('assets'));
console.log(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));
 
//arrancar el servidor
app.listen(PORT,'0.0.0.0',() => {
    console.log(`puerto:${PORT}`);
}
);

// {
//     collection_id: '7054861764',
//     collection_status: 'approved',
//     external_reference: 'co.carlosivan@gmail.com',
//     payment_type: 'credit_card',
//     merchant_order_id: '1524560954',
//     preference_id: '469485398-62f6aba1-44c3-406a-bfd7-08bece5cd07d',
//     site_id: 'MLA',
//     processing_mode: 'aggregator',
//     merchant_account_id: 'null'
//   }