
var db = require("./models");

var designList =[
    {
        custom_text: 'Zombies',
        design_title: 'Pancakes',
        designer_name: 'Mochi'
        // image: "https://s3-us-west-2.amazonaws.com/sandboxapi/to_kill_a_mockingbird.jpg"
    }
];

db.Design.remove({}, function(err, designs){
    if(err) {
        console.log('Error occurred in remove', err);
    } else {
        console.log('removed all books');


        db.Design.create(designList, function(err, designs){
            // code in here runs after all albums are created
            if (err) { return console.log('ERROR', err); }
            console.log("all designs:", designs);
            console.log("created", designs.length, "designs");
            process.exit();
        });
    });
