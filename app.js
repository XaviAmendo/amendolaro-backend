
const express = require('express');
const { PManager } = require('./index');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const limit = 5;//

const products = new PManager("./products.json");

app.get('/products', (req, res) => {
  console.log(products);
  const fasync = async () => {
    let { limit } = req.query;

    const prodADevolver = await products.getProducts();

    if (!limit || limit > prodADevolver.length) {
      res.status(200).json({
        status: 'ok',
        data: prodADevolver
      });
    } else {
      res.status(200).json({
        status: 'ok',
        data: prodADevolver.slice(0, limit)
      });
    }
  };
  fasync();
});

app.get('/products/:id', (req, res) => {
    const id = req.params.id*1;
  
  
    const fasync = async () => {
      const prodADevolver = await products.getProductById(id);
  
      if (typeof(prodADevolver) === 'string') {
        res.status(404).json({
          status: 'fail',
          data: prodADevolver
        })
      } else {
        res.status(200).json({
          status: 'ok',
          data: prodADevolver
        });
      }
    };
    fasync();
  });

//
app.listen(port, () => {
  console.log(`Puerto de escucha ${port}`);
  });