const express = require('express');
const app = express();
const port = 8080;
const productsRouter = require ('./routes/products.router.js')
const cartRouter = require ('./routes/carts.router.js') 

//INICIALIZAR CON NPM RUN DEV


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//products
app.use ('/api/products', productsRouter);


//carts
app.use ('/api/carts', cartRouter);




app.listen(port, () => {
    console.log(`Puerto de escucha ${port}`);
  });
