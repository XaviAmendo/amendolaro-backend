
const fs = require('fs')

const path = './src/mockDB/Productos.json'

class ProductManager{
    constructor(){
        this.path = path
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
            return products.find(product => product.id === id)                     
        } catch (error) {
            return  new Error(error)
        }
    }


addProduct = async ({title, description, code, price, stock, status = true, category, thumbnail = ""}) => {
    if (!title || !description || !code || !price || !stock || !status || !category) {

      if (!title) return "ERROR: debe completar el titulo"
      if (!description) return "ERROR: debe completar la descripción"
      if (!code) return "ERROR: debe completar el Código"
      if (!price) return "ERROR: debe completar el Precio"
      if (!stock) return "ERROR: debe completar el Stock"
      if (!status) return "ERROR: debe completar el Estado"
      if (!category) return "ERROR: debe completar la Categoria"

      return 'ERROR: debe completar todos los campos';
    }

    const exists = this.products.some((p) => p.code === code);
    if (exists) {
      return 'ERROR: codigo repetido';
    }

    const newProduct = {
      id: this.counterId,
      title: title,
      description: description,
      code: code,
      price: price,
      status: status,
      stock: stock,
      category: category,
      thumbnail: thumbnail,
    };

    this.counterId++;
    this.products.push(newProduct);
    const jsonProduct = JSON.stringify(this.products, null, 2);
    await fs.promises.writeFile(this.path, jsonProduct);
    return newProduct;
  };



     updateProduct = async(pid, updateToProduct) =>{
        let products = await this.readFile()

        const productIndex = products.findIndex(product => pid === product.id)
        if (productIndex !== -1) { 
            products[productIndex] = updateToProduct
        }
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8')
        return productIndex
    }

    async deleteProduct(id) {
        const i = this.products.findIndex((elm) => elm.id === id);
    
    
        if (i === -1) {
          return 'Producto no encontrado';
        } else {
          const removedProduct = this.products[i]
          const newProducts = this.products.filter((elm) => elm.id != id);
          this.products = newProducts;
          const jsonProduct = JSON.stringify(this.products, null, 2);
          await fs.promises.writeFile(this.path, jsonProduct);
          return removedProduct;
        }
      }


}

module.exports = ProductManager