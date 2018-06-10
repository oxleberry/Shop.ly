## Suggestions for Shop.ly:

### In `seed.js`:
- consider moving your hardcoded inventory to a separate `inventory.json` file to load and read by your `seed.js` file. This way you can load multiple files of inventory without making a large `seed.js` file.  This will also help in the future when you add more inventory items.
- in `seed.js` you do not interact with a request or response object, so no need to send `res.sendStatus(500)` in your error.

### In `server.js`:
- For your creation of `user` objects, you can create an object literal `newUser` and assign it `req.body`. Then call `db.User.create` and pass in the `newUser` object. This may save you some lines of code.  Your implementation is great though. No need to change.  

- In your shirt show method, consider using `db.Shirt.findById()` instead. This will lead to more semantic code.

- Great work on the shirt update!

- Eventually move all of these to your shirtsController.

### In `index.html`:
- The structure for your three shirt sections is repeatable; as a stretch goal consider moving the html to your javascript as a template. That way you can make as many of these sections as you would like.  Excellent work!

### In `app.js`:
- Fantastic work! Excellent use of variables to extract complex jquery selectors and making clean, readable ajax calls. Careful mixing `var` and `const` declarations as well as `function()` and `()=>{}` function styles.  Also consider changing the name of `selectedSize` in your `activateSize()` function. This could lead to confusion with your `selectedSize()` function.


### Comments:   
Great work!  I see a lot of work and consideration went into this project.  Great handle of JQuery and all of the built-in methods it offers.  This is an excellent candidate for ReactJs, consider refactoring this site after graduation to show off your varied skills.  The database is very approachable and makes sense; I'm looking forward to your team adding Auth and expanding the complexity of your clothing model to handle multiple clothes types.  Look into enumerables as a datatype for your size choices.  Also consider having a clothing/size embedded relationship.
