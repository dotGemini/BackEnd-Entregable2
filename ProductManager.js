const fs = require("fs");

class ProductManager{
    
    constructor(path){
        this.products = [];
        this.id = 1;
        this.path = path;
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
            }
        }else {
            console.error("Por favor completar todos los campos");
        }
    }

    updateProduct(id, newObject) {
        const productIndex = this.products.findIndex(product => product.id === id)
        if (productIndex === -1) {
            return console.log("Producto no encontrado")
        }
        const updateProduct = {
            ...this.products[productIndex],
            ...newObject
        }
        
        this.products[productIndex] = updateProduct;
        console.log("Producto Actualizado");
        
    }

    deletProduct(id){
        const index = this.products.findIndex(product => product.id === id);
        const deletID = this.products.splice(index, 1);
        if (index === -1){
            return console.log("No se encuentra ID");
        }else {
            return deleteID;
        }
    }

    getProducts(){
        return this.products;
    }

    getProductByID(id){
        const productID = this.products.find(product => product.id === id);
        if (!productID){
            return console.error("Not Found")
        }else {
            return console.log("El producto solicitado es: ", productoID);
        }
    }

    updateDB(path){
        
        const db = this.products;

        fs.writeFileSync(path, `${JSON.stringify(db, null, '')}`, (error) => {
            if(error) return console.log(error);
            fs.readFile(path, 'utf-8', (error, resultado)=>{
                if(error) return console.log(error);
                console.log(resultado)
            } )
        })
    }
}

const productManager = new ProductManager()

productManager.addProduct("Fideos", "con tuco", 20, "url", 123, 25);
productManager.addProduct("Arroz", "con atun", 20, "url", 124, 25);
productManager.addProduct("Milanesas", "con pure", 20, "url", 125, 25);
productManager.addProduct("Hamburguesa", "con queso", 20, "url", 126, 25);
productManager.updateProduct(4, { title: "Papas", description: "Papas fritas", price: 70, url: "google.com/fideos", code: 135, stock: 24 })

productManager.updateDB('./database.json')
productManager.getProducts();
console.log(productManager);