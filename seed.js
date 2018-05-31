
// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

const db = require("./models");



// const designList = [{
//     custom_text: 'Zombies',
//     design_title: 'Pancakes',
//     designer_name: 'Mochi',
//     image: 'precision.jpg'
// }, {
//     custom_text: 'Bunnies',
//     design_title: 'Waffles',
//     designer_name: 'Seasames',
//     image: 'solve.jpg'
// }];


const shirtList = [{
    name: 'precision',
    price: 19.99,
    image: 'precision.jpg',
    size: [0, 1, 3, 4, 2, 4],
    description: 'T-shirt are 100% organic cotton. Ethically sourced.'
}, {
    name: 'web developer',
    price: 18.99,
    image: 'bad.jpg',
    size: [1, 4, 3, 2, 3, 0],
    description: 'T-shirt are 100% organic cotton. Ethically sourced.'
}, {
    name: 'solve problems',
    price: 19.99,
    image: 'solve.jpg',
    size: [3, 0, 1, 2, 3, 4],
    description: 'T-shirt are 100% organic cotton. Ethically sourced.'
}, {
    name: 'care tacos',
    price: 19.99,
    image: 'caretacos.jpg',
    size: [3, 0, 1, 2, 3, 4],
    description: 'T-shirt are 100% organic cotton. Ethically sourced.'
}, {
    name: 'president history',
    price: 19.99,
    image: 'faces.jpg',
    size: [3, 0, 1, 2, 3, 4],
    description: 'T-shirt are 100% organic cotton. Ethically sourced.'
}, {
    name: 'fiery whitehouse',
    price: 19.99,
    image: 'fire.jpg',
    size: [3, 0, 1, 2, 3, 4],
    description: 'T-shirt are 100% organic cotton. Ethically sourced.'
}, {
    name: 'hindsight 2020',
    price: 19.99,
    image: 'hindsight.jpg',
    size: [3, 0, 1, 2, 3, 4],
    description: 'T-shirt are 100% organic cotton. Ethically sourced.'
}, {
    name: 'tacos in hell',
    price: 19.99,
    image: 'tacoshell.jpg',
    size: [3, 0, 1, 2, 3, 4],
    description: 'T-shirt are 100% organic cotton. Ethically sourced.'
}, {
    name: 'tacos think',
    price: 19.99,
    image: 'tacothink.jpg',
    size: [3, 0, 1, 2, 3, 4],
    description: 'T-shirt are 100% organic cotton. Ethically sourced.'
}];


const userList = [{
    first_name: 'Paul',
    last_name: 'Smith',
    phone: 'xxx-xxx-xxxx',
    e_mail: 'smithy@smail.com',
    address: '123 BlueJay Way',
    // cart will hold any selected _id of add to bag
    cart: []
    // purchase_id: Number
}];


db.Shirt.remove({}, (err, shirts) => {
    if(err) {
        console.log('Error occurred in remove', err);
    } else {
        db.Shirt.create(shirtList, (err, shirts) => {
            if (err) {
                console.log("create seed error: " + err);
                res.sendStatus(500);
            }
            console.log("created", shirts.length, "shirts");
            console.log(shirts);
            process.exit();
        });
    }
});


db.User.remove({}, function(err, users){
    if(err) {
        console.log('Error occurred in remove', err);
    } else {
        db.User.create(userList, function(err, users){
            if (err) {
                console.log("create seed error: " + err);
                res.sendStatus(500);
            }
            console.log("created", users.length, "users");
            process.exit();
        });
    }
});
