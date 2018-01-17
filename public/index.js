//'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury':0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury':0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury':0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];


//Exercise 1 - Euro-Volume
function updateDeliveryPrice(){
 
  deliveries.forEach(function(d){
    //find the trucker of the delivery
    var truckerId=d.truckerId;
    console.log(truckerId);
    //find this trucker in the truckers table
    var correspondingTrucker=truckers.find(function(trucker){
      return trucker.id==truckerId;
    });

    //updating the price of the delivery
    d.price=correspondingTrucker.pricePerKm*d.distance+correspondingTrucker.pricePerVolume*d.volume; 

  });

  
}
updateDeliveryPrice();


//Exercise 2 - Send more, less pay
function adaptShippingPrice(){
  deliveries.forEach(function(delivery){
    var truckerId=delivery.truckerId;
    var tmpTrucker=truckers.find(function(trucker){
      return trucker.id==truckerId;
    });
    var correspondingTrucker=tmpTrucker;


    var pvt=correspondingTrucker.pricePerVolume;

    if(delivery.volume>25){
      correspondingTrucker.pricePerVolume=pvt-pvt*0.5;
      truckers[truckers.findIndex(tmpTrucker)]=correspondingTrucker;
    }
    else if(delivery.volume>10 && delivery.volume<25){
      correspondingTrucker.pricePerVolume=pvt-pvt*0.3;
      truckers[truckers.findIndex(tmpTrucker)]=correspondingTrucker;

    }
    else if(delivery.volume>5 && delivery.volume<10){
      correspondingTrucker.pricePerVolume=pvt-pvt*0.1;
      truckers[truckers.findIndex(tmpTrucker)]=correspondingTrucker;
    }

  });
  
  


updateDeliveryPrice();
}



//Exercise 3 - Give me all your money
function updateDeliveryCommission(){
  deliveries.forEach(function(d){
   var commission=d.price-d.price*0.3;
   
  d.commission.insurance=commission*0.5;
  d.commission.treasury=1+Math.floor(d.distance/500);
  d.commission.convargo=commission-(d.commission.insurance+d.commission.treasury);

  }
)
}



//Exercise 4 - The famous deductible

function updatePriceIfDeductibleOption(){
  updateDeliveryCommission();
  deliveries.forEach(function(delivery){
    var truckerId=delivery.truckerId;
    if(delivery.deductibleReduction==true){
      var volumeTaxe=delivery.volume;
      var correspondingTrucker=truckers.find(function(trucker){
        return trucker.id==truckerId;
        
      });
      delivery.price=correspondingTrucker.pricePerKm*d.distance+correspondingTrucker.pricePerVolume*d.volume+200;
      delivery.commission.convargo=d.commission.convargo+volumeTaxe; 
      adaptShippingPrice();
      
    }
    else{
      var correspondingTrucker=truckers.find(function(trucker){
        return trucker.id==truckerId;
        
      });
      delivery.price=correspondingTrucker.pricePerKm*delivery.distance+correspondingTrucker.pricePerVolume*delivery.volume+1000;
      adaptShippingPrice();
      
    }
  }
)
     
}



//Exercise 5 - Pay the actor
function amountActor(){
  actors.forEach(function(actor){
    var deliveryId=actor.deliveryId;
    var correspondingDelivery=deliveries.find(function(delivery){
      return delivery.id=deliveryId;
    });

    actor.payment.forEach(function(payment_item){

      switch(payment_item.who) {
        case 'shipper':
	        payment_item.amount=correspondingDelivery.price;
          break;
        case 'owner'://trucker 
	        var commission=correspondingDelivery.price*0.3;
  	      payment_item.amount=correspondingDelivery.price - commission;          
          break;
        case 'insurance':
          payment_item.amount=correspondingDelivery.commission.insurance;
          break;
        case 'treasury':
          payment_item.amount=correspondingDelivery.commission.treasury;
          break;
        case 'convargo':
          payment_item.amount=correspondingDelivery.commission.convargo+ correspondingDelivery.volume;
          break;

      	default:
          break;
      }





      
    });

  }
);
  
}


updateDeliveryPrice();
adaptShippingPrice();
/*updateDeliveryCommission();
updatePriceIfDeductibleOption();  
amountActor();*/







//console.log(truckers);
//console.log(deliveries);
//console.log(actors);
