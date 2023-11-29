const { Router } =  require ('express');
const ProductManager = require ('../managers/productsManager.js')
const router = Router ();

const productoManager = new ProductManager()

router.get('/', async (req, res) => {
    const products = await productoManager.getProducts
    res.send ({
    status:'sucess',
    payload: products
})
})

// enrutar desde aca 1.12.50 de video
router.get('/:pid', async (req,res) => {
    const {pid} = req.params
    const product = await productoManager.getProduct(pid)
    if (!product) {
        return res.status(400).send({
            status: 'error', 
            mensagge: 'No se encuentra el producto'
        })
    }
    res.send ({
        status: 'sucess',
        payload: product
    })
})


router.post('/', async (req,res) => {
    const newProduct = req.body;
  
    const resp = await products.addProduct(newProduct);
  
    if (typeof (resp) === "string") {
      res.status(400).json({
        status: "fail",
        data: resp
    })} else {
      res.status(200).json({
        status: "ok",
        data: resp
    })}
  });


router.put('/:id', async (req,res) => {
    const id = req.params.id * 1;
    const updateToProduct = req.body;
  
    const resp = await products.updateProduct(id, updateToProduct);
  
    if (typeof (resp) === "string") {
      res.status(400).json({
        status: "fail",
        data: resp
    })} else {
      res.status(200).json({
        status: "ok",
        data: resp
    })}
  
  });

router.delete('/:pid', (req,res)=>{
    const {pid} = req.params
    res.send ('delete products '+ pid )
});

router.delete('/:id', async (req,res) => {
    const id = req.params.id * 1
  
    const resp = await products.deleteProduct(id)
  
    if (typeof (resp) === "string") {
      res.status(400).json({
        status: "fail",
        data: resp
    })} else {  
      res.status(200).json({
        status: "ok",
        data: resp
    })}
  });

module.exports = router