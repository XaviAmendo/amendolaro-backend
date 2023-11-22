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

//test

//agregar productos
//const ProductManager = new productManager('products.json');

//(async () => {
  //await ProductManager.createProduct('Ryzen 9 9700', 'Microprocesador AMD Ryzen 9 9700', 750000, 'thumbnail1.jpg', 'P001', 100);
  //await ProductManager.createProduct('Core i9 13300', 'Microprocesador Intel i9 13300', 850000, 'thumbnail2.jpg', 'P002', 50);
  //await ProductManager.createProduct('RTX 3080', 'GPU Zotac Geforce rtx 3080', 800000, 'thumbnail3.jpg', 'P003', 200);
  //await ProductManager.createProduct('RTX 3060 TI', 'GPU MSI Gforce rtx 3060 TI', 700000, 'thumbnail4.jpg', 'P004', 10);
  //await ProductManager.createProduct('Mother Asus Gaming AM4 WiFi', 'Mother Asus B550 TUF wifi', 350000, 'thumbnail5.jpg', 'P005', 11);
  //await ProductManager.createProduct('Mother Asus Gaming AM4', 'Mother Asus B550 TUF', 300000, 'thumbnail6.jpg', 'P006', 22);
  //await ProductManager.createProduct('Gabinete Gamer Xigmatek', 'Gabinete Xigmatek Gaming', 75000, 'thumbnail7.jpg', 'P007', 100);
  //await ProductManager.createProduct('Gabinete Gamer Corsair', 'Gabinete Corsair Master', 150000, 'thumbnail8.jpg', 'P008', 50);
  //await ProductManager.createProduct('Mouse Redragon 24000 DPI', 'Mouse Redragon 24k DPI led', 350000, 'thumbnail9.jpg', 'P009', 50);
  //await ProductManager.createProduct('Fuente de PC 850w', 'Fuente 850w reales Zentey 80 Gold', 85000, 'thumbnail10.jpg', 'P010', 20);

  //const products = await ProductManager.getProducts();
  //console.log(products);
//})();

exports.PManager = productManager