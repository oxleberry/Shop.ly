
const db = require("./models");

const designSeed =[
    {
        custom_text: 'Zombies',
        design_title: 'Pancakes',
        designer_name: 'Mochi',
        image: 'images/precision.jpg'
    }
];

db.Design.create( designSeed, (err, newDesign) => {
    if (err) {
      console.log("seed error: " + err);
      res.sendStatus(500);
    }
   console.log("seed design: ", newDesign);
 });

// db.Design.remove({}, function(err, designs){
//     if(err) {
//         console.log('Error occurred in remove', err);
//     } else {
//         console.log('removed all designs');
//         db.Design.create(designList, function(err, designs){
//             // code in here runs after all designs are created
//             if (err) {
//                 console.log("create seed error: " + err);
//                 res.sendStatus(500);
//             }
//             console.log("all designs:", designs);
//             console.log("created", designs.length, "designs");
//             process.exit();
//         });
//     }
// });
