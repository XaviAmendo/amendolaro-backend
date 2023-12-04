
const fs = require('node:fs')


const path = './src/mockDB/Productos.json'

class ProductManager{
    constructor(){
        this.path = path
        this.nextid = 1;//nuevo
    }

    readFile = async () => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            console.log(data)
            return JSON.parse(data)            
        } catch (error) {
            return []
        }        
    }

// get products
    getProducts = async () => {
        try {
            return await this.readFile()

        } catch (error) {
            return 'No hay productos'
        }
    }

   
    getProduct = async (id) => {
        try {
            const products = await this.readFile()
            if(!products) return 'No hay productos'
            return products.find(product => product.id == id) //le saque el === y funciona                     
        } catch (error) {
            return  new Error(error)
        }
    }


addProduct = async (newItem) => {
  try {   
      let products = await this.readFile()
      const productDb = products.find(product => product.code == newItem.code)
      if (productDb) {
          return `El producto ya existe`
      }

      if (!newItem.title || !newItem.description || !newItem.code || !newItem.price || !newItem.status || !newItem.stock || !newItem.category) {
          return `Faltan campos obligatorios`
      }

      if (products.length === 0 ) {
          newItem.id = 1
          products.push(newItem) 
      } else { 
          products =  [...products, {...newItem, id: products.length + 1 } ]
      }

      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8')

      return 'Producto agregado'
  } catch (error) {
      return new Error(error)
  }
}



 //   async updateProduct(id, updatedFields) {
   //     let productEnArchivo = await fs.promises.readFile(this.path, 'utf-8');
     //   let productos = JSON.parse(productEnArchivo);
       // let index = productos.findIndex((p) => p.id == id);//===
        //if (index !== -1) {
         // productos[index] = { ...productos[index], ...updatedFields };
          //const productEnString = JSON.stringify(productos, null, 2);
          //await fs.promises.writeFile(this.path, productEnString, 'utf-8')//('products.json', productEnString);
          //return true;
        //}
        //return false;
      //}
//ejemplo
async updateProduct(id, updatedFields) {
  try {   
      let products = await this.readFile()
      const index = products.findIndex((p) => p.id == id)
      if (index !== -1) {
          products[index] = { ...products[index], ...updatedFields }
          const productsString = JSON.stringify(products, null, 2)
          await fs.promises.writeFile(this.path, productsString, 'utf-8')
          return true
      }
      return false
  } catch (error) {
      return new Error(error)
  }
}

///


async deleteProduct(id) {//ok
    let productEnArchivo = await fs.promises.readFile(this.path, 'utf-8');
    let productos = JSON.parse(productEnArchivo);
    let index = productos.findIndex((p) => p.id == id);
    if (index !== -1) {
      productos.splice(index, 1);
      const productEnString = JSON.stringify(productos, null, 2);
      await fs.promises.writeFile(this.path, productEnString)//('products.json', productEnString);
      return true;
    }
    return false;
  }


}

module.exports = ProductManager