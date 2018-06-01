

// run: `node seed.js` in the terminal from the root of this project folder.

const db = require("./models");

const shirtList = [{
    name: 'Tacos Think',
    price: 19.99,
    image: 'tacothink.jpg',
    size: [3, 0, 1, 2, 3, 4],
    description: 'T-shirt are 100% organic cotton. Ethically sourced.'
}, {
    name: 'Care Tacos',
    price: 19.99,
    image: 'caretacos.jpg',
    size: [3, 0, 1, 2, 3, 4],
    description: 'T-shirt are 100% organic cotton. Ethically sourced.'
}, {
    name: 'Tacos In Hell',
    price: 19.99,
    image: 'tacoshell.jpg',
    size: [3, 0, 1, 2, 3, 4],
    description: 'T-shirt are 100% organic cotton. Ethically sourced.'
}, {
    name: 'Precision',
    price: 19.99,
    image: 'precision.jpg',
    size: [0, 1, 3, 4, 2, 4],
    description: 'T-shirt are 100% organic cotton. Ethically sourced.'
}, {
    name: 'Web Developer',
    price: 18.99,
    image: 'bad.jpg',
    size: [1, 4, 3, 2, 3, 0],
    description: 'T-shirt are 100% organic cotton. Ethically sourced.'
}, {
    name: 'Solve Problems',
    price: 19.99,
    image: 'solve.jpg',
    size: [3, 0, 1, 2, 3, 4],
    description: 'T-shirt are 100% organic cotton. Ethically sourced.'
}, {
    name: 'President History',
    price: 19.99,
    image: 'faces.jpg',
    size: [3, 0, 1, 2, 3, 4],
    description: 'T-shirt are 100% organic cotton. Ethically sourced.'
}, {
    name: 'Fiery Whitehouse',
    price: 19.99,
    image: 'fire.jpg',
    size: [3, 0, 1, 2, 3, 4],
    description: 'T-shirt are 100% organic cotton. Ethically sourced.'
}, {
    name: 'Hindsight 2020',
    price: 19.99,
    image: 'hindsight.jpg',
    size: [3, 0, 1, 2, 3, 4],
    description: 'T-shirt are 100% organic cotton. Ethically sourced.'
}
];

const userList = [{
    first_name: 'Paul',
    last_name: 'Smith',
    phone: 'xxx-xxx-xxxx',
    e_mail: 'smithy@smail.com',
    address: '123 BlueJay Way',
    cart: []
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
