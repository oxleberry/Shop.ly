
// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

const db = require("./models");


// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/designs");


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


// db.Design.create( designList, (err, newDesign) => {
//     if (err) {
//       console.log("seed error: " + err);
//       res.sendStatus(500);
//     }
//    console.log("seed design: ", newDesign);
//  });


// .save will save to database
// for (var i = 0; i < designList.length; i++){
//     designList[i].save();
// });
//
// res.send("database seeded")
//
// db.Design.create( designList, (err, newDesign) => {
//     if (err) {
//       console.log("seed error: " + err);
//       res.sendStatus(500);
//     }
//    console.log("seed design: ", newDesign);
//  });

db.Design.remove({}, function(err, designs){
    if(err) {
        console.log('Error occurred in remove', err);
    } else {
        console.log('removed all designs');
        db.Design.create(designList, function(err, designs){
            // code in here runs after all designs are created
            if (err) {
                console.log("create seed error: " + err);
                res.sendStatus(500);
            }
            console.log("all designs:", designs);
            console.log("created", designs.length, "designs");
            process.exit();
        });
    }
});
