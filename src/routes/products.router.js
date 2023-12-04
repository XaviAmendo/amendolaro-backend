const { Router } =  require ('express');
const ProductManager = require ('../managers/productsManager.js')
const router = Router ();

const productoManager = new ProductManager ('./src/mockDB/Productos.json')

router.get('/', async (req, res) => {//ok
    const products = await productoManager.getProducts()
    res.send ({ 
    status:'sucess',
    payload: products
})
})


router.get('/:pid', async (req,res) => {//ok
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

//
router.post('/', async (req,res) => {//ok
    const newProduct = req.body;
  
    const resp = await productoManager.addProduct(newProduct)
  
    if (typeof (resp) == "string") {
      res.status(400).json({
        status: "fail",
        data: resp
    })} else {
      res.status(200).json({
        status: "ok",
        data: resp
    })}
  });


router.put('/:pid', async (req,res) => {//ok
    const {pid} = req.params//.id * 1;
    const updateToProduct = req.body;
  
    const resp = await productoManager.updateProduct(pid,updateToProduct)//(id, updateToProduct);
  
    if (typeof (resp) == "string") {
      res.status(400).json({
        status: "fail",
        data: resp
    })} else {
      res.status(200).json({
        status: "ok",
        data: resp
    })}
  
  });

router.delete('/:pid', async(req,res)=>{//ok
    const {pid} = req.params
    //res.send ('delete products '+ pid )
//});

//router.delete('/:id', async (req,res) => {
    //const id = req.params.id * 1
  
    const resp = await productoManager.deleteProduct(pid)
  
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