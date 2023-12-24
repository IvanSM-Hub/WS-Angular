interface Product {
    description: string;
    price: number;
}

const phone: Product = {
    description: "NOKIA A1",
    price: 150.0
}

const tablet: Product = {
    description: "iPad Air",
    price: 250.0
}

interface TaxCalcularorOptions {
    tax:number;
    products: Product[];
}

// function taxCalculator( options: TaxCalcularorOptions ): [number , number] {
// function taxCalculator( { tax , products }: TaxCalcularorOptions ): [number , number] {
function taxCalculator( options: TaxCalcularorOptions ): [number , number] {

    const { tax , products } = options;

    let total = 0;

    products.forEach( ({ price }) => {
        total += price;
    });

    return [total , total*tax];

}

const shoppingCard = [phone , tablet];
const tax =0.15;

const [total , taxTotal] = taxCalculator({
    products: shoppingCard,
    tax: tax
});

console.log('Total: ', total)
console.log('Tax: ', taxTotal)


export {};