
// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

const db = require("./models");



const designList = [{
    custom_text: 'Zombies',
    design_title: 'Pancakes',
    designer_name: 'Mochi',
    image: 'precision.jpg'
}, {
    custom_text: 'Bunnies',
    design_title: 'Waffles',
    designer_name: 'Seasames',
    image: 'solve.jpg'
}];


const shirtList = [{
    name: 'precision',
    price: 19.99,
    image: 'precision.jpg',
    size: [0, 1, 3, 4, 2, 4],
    // size: { xs:0, s:1, m:3, L:4, XL:2, XXL:4 },
    description: 'T-shirt are 100% organic cotton. Ethically sourced.'
}, {
    name: 'bad',
    price: 18.99,
    image: 'bad.jpg',
    size: [1, 4, 3, 2, 3, 0],
    // size: { xs:1, s:4, m:3, L:2, XL:3, XXL:0 },
    description: 'T-shirt are 100% organic cotton. Ethically sourced.'
}, {
    name: 'solve problems',
    price: 19.99,
    image: 'solve.jpg',
    size: [3, 0, 1, 2, 3, 4],
    // size: { xs:3, s:0, m:1, L:2, XL:3, XXL:4 },
    description: 'T-shirt are 100% organic cotton. Ethically sourced.'
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


db.Design.remove({}, function(err, designs){
    if(err) {
        console.log('Error occurred in remove', err);
    } else {
        db.Design.create(designList, function(err, designs){
            if (err) {
                console.log("create seed error: " + err);
                res.sendStatus(500);
            }
            console.log("created", designs.length, "designs");
            process.exit();
        });
    }
});
