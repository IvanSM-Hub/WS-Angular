import { Product , taxCalculator } from './06-function-destructuring'

const shoppingCard: Product[] = [
    {
        description: 'Nokia',
        price: 100
    },
    {
        description: 'ipad',
        price: 150
    }
];

const [total,tax] = taxCalculator({
    products: shoppingCard,
    tax: 0.15
});

// console.log('Total: ', total)
// console.log('Tax: ', tax)