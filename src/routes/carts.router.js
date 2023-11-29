const { Router } =  require ('express');
const CartManager = require ('../managers/cartsManager')
const router = Router ();

const carrito = new CartManager()

router.post('/', async (req, res) => {
    try {
      const result = await carrito.createCart();
      res.send({
        status: 'success',
        payload: result
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: 'error',
        message: 'Error interno del servidor'
      });
    }
  })



  router.get('/:cid', async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await carrito.getCartById(parseInt(cid));
      if (typeof cart === 'string') {
        res.status(404).send({
          status: 'error',
          message: cart
        });
      } else {
        res.send({
          status: 'success',
          payload: cart
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: 'error',
        message: 'Error interno del servidor'
      });
    }
  })

  
  router.post('/:cid/product/:pid', async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const result = await carrito.addProductToCart(parseInt(cid), parseInt(pid));
      if (typeof result === 'string') {
        res.status(404).send({
          status: 'error',
          message: result
        });
      } else {
        res.send({
          status: 'success',
          payload: result
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: 'error',
        message: 'Error interno del servidor'
      });
    }
  });


module.exports = router