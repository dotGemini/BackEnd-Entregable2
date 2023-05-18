const fs = require("fs");
var path = 'database.json';

class ProductManager{

    constructor(path){
        this.products = this.loadDatabase(path);
        this.id = (this.products[this.products.length-1] && this.products[this.products.length-1].id)?(this.products.length+1) : 1;
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
                console.error("Codigo Repetido");
            }else{
                let id = this.id++;
                const newProduct = {id, title, description, price, url, code, stock};
                this.products.push(newProduct);
                this.updateDB(this.products);
            }
        }else {
            console.error("Por favor completar todos los campos");
        }
    }

    updateProduct(id, newObject) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            console.log("Producto no encontrado");
        }else{
            const updateProduct = {
                ...this.products[productIndex],
                ...newObject
            }
            
            this.products[productIndex] = updateProduct;
            console.log("Producto Actualizado");
    
            this.updateDB(this.products);
        }    
    }

    deletProduct(id){
        const index = this.products.findIndex(product => product.id === id);
        
        if (index === -1){
            console.log("No se encuentra ID");
        }else {
            this.products.splice(index, 1);
            this.updateDB(this.products);
        }
    }

    getProducts(){
        console.log(this.products);
        return this.products;
    }

    getProductByID(id){
        const productID = this.products.find(product => product.id === id);
        if (!productID){
            console.error("Not Found")
        }else {
            console.log("El producto solicitado es: ", productID);
        }
    }

    updateDB(newProduct){
        fs.writeFile(this.path, JSON.stringify(newProduct), function() {console.log("updateo")});
    }
}


const productManager = new ProductManager(path)


//productManager.addProduct("producto prueba", "esto es un producto prueba", 200, "sin imagen", "abc123", 25);

//productManager.updateProduct(1, { title: "Papas", description: "Papas fritas", price: 70, url: "google.com/fideos", code: 135, stock: 24 });

//productManager.getProducts();

//productManager.getProductByID(1);

//productManager.deletProduct(1);