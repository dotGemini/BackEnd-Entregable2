const fs = require("fs");
var path = 'database.json';

class ProductManager{

    constructor(path){
        this.products = this.loadDatabase(path);
        this.id = 1;
        this.path = path;
    }

    loadDatabase(path) {
        try {
            const file = fs.readFileSync(path, 'utf-8');
            return (JSON.parse(file));
        } 
        catch(error){
            const file = fs.writeFileSync(path, '[]');
            console.log(error);
            return (JSON.parse(file));
        } 
    }

    addProduct(title, description, price, url, code, stock){
        if ( title && description && price && url && code && stock){
            const verificationCode = this.products.some (product => product.code === code);
            if (verificationCode){
                return "codigo Repetido";
            }else{
                let id = this.id++;
                const newProduct = {id, title, description, price, url, code, stock};
                this.products.push(newProduct);
                this.updateDB(this.products);
            }
        }else {
            return "Complete todos los campos";
        }
    }

    updateProduct(id, newObject) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            return "producto no encontrado"
        }else{
            const updateProduct = {
                ...this.products[productIndex],
                ...newObject
            }
            
            this.products[productIndex] = updateProduct;    
            this.updateDB(this.products);
            return
        }    
    }

    deletProduct(id){
        const index = this.products.findIndex(product => product.id === id);
        
        if (index === -1){
            return "no se encuentra ID";
        }else {
            this.products.splice(index, 1);
            this.id = id;
            this.updateDB(this.products);
            return
        }
    }

    getProducts(){
        return this.products;
    }

    getProductByID(id){
        const productID = this.products.find(product => product.id === id);
        if (!productID){
            return "Not found"
        }else {
            return productID;
        }
    }

    updateDB(newProduct){
        fs.writeFileSync(this.path, JSON.stringify(newProduct), function() {return});
        return;
    }

    getID(){
        const index = this.products.findIndex(product => product.id === -1);
        return (index+2);
    }
}


//productManager.addProduct("producto prueba", "esto es un producto prueba", 200, "sin imagen", "abc123", 25);
//productManager.updateProduct(0, { title: "Papas", description: "Papas fritas", price: 70, url: "google.com/fideos", code: 135, stock: 24 });
//productManager.getProducts();
//productManager.getProductByID(1);
//productManager.deletProduct(1);