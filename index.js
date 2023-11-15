const fs = require('fs');

class productManager {
  constructor(path) {
    this.path = path;
    this.product = []
    this.nextid = 1;
  }


  async createProduct(title, description, price, thumbnail, code, stock) {
    const id = this.nextid++;
    this.product.push({ id, title, description, price, thumbnail, code, stock });
    const productEnString = JSON.stringify(this.product, null, 2);
    await fs.promises.writeFile('products.json', productEnString);
    return id;
  }

  async getProducts() {
    let productEnArchivo = await fs.promises.readFile('products.json', 'utf-8');
    let productos = JSON.parse(productEnArchivo);
    return productos;
  }

  async getProductById(id) {
    let productEnArchivo = await fs.promises.readFile('products.json', 'utf-8');
    let productos = JSON.parse(productEnArchivo);
    let producto = productos.find((p) => p.id === id);
    if (producto === undefined) {
      throw new Error(`No se encontró ningún producto con el id ${id}`);
    }
    return producto;
  }

  async updateProduct(id, updatedFields) {
    let productEnArchivo = await fs.promises.readFile('products.json', 'utf-8');
    let productos = JSON.parse(productEnArchivo);
    let index = productos.findIndex((p) => p.id === id);
    if (index !== -1) {
      productos[index] = { ...productos[index], ...updatedFields };
      const productEnString = JSON.stringify(productos, null, 2);
      await fs.promises.writeFile('products.json', productEnString);
      return true;
    }
    return false;
  }

  async deleteProduct(id) {
    let productEnArchivo = await fs.promises.readFile('products.json', 'utf-8');
    let productos = JSON.parse(productEnArchivo);
    let index = productos.findIndex((p) => p.id === id);
    if (index !== -1) {
      productos.splice(index, 1);
      const productEnString = JSON.stringify(productos, null, 2);
      await fs.promises.writeFile('products.json', productEnString);
      return true;
    }
    return false;
  }
}
