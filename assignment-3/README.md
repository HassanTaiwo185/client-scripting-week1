# Assignment 3 – Product Catalog SPA

## Setup
```bash
npm install
npm run dev
```

Open your browser probably at `http://localhost:5173`


What This App Does.
    
This is a single-page product catalog developed with React. You can made different modifications like edits, add, and delete product, add everything you save is still available even after you restart the page. Thanks to the local storage. 

Here’s what you can do:

-Browse Products- All product show up in a grid on the homepage and persons can search by name, sort alphabetically or even filter by category. 
-View a product- One can click the View button on any card, to access the full details on its own page 
-Add a product: One can also click the “Add Product” in the navbar to fill out the form. It validates everything before proceeding to save. 
-Edit a product- To edit, click the Edit on any card, and the form opens up, with the previous product’s information already filled in.
-Delete a product- Click Delete on any card to remove it with immediate effect.
-Refresh safely: Products are saved to locastorage, in other to prevent anything from getting lost on refresh. 

Known issues:
•No confirmation when deleting anything, it just deletes immediately after the button is clicked.
•Search only works on product names, not descriptions, which may prove difficultz
•Categories are restricted to Electronics, Gadget and Accessories.
•No image support for products, just word search function.


