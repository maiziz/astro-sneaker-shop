import { atom } from 'nanostores';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

// Load initial cart items from localStorage
const savedItems = typeof window !== 'undefined' ? localStorage.getItem('cartItems') : null;
export const cartItems = atom<CartItem[]>(savedItems ? JSON.parse(savedItems) : []);

// Subscribe to changes and save to localStorage
if (typeof window !== 'undefined') {
    cartItems.subscribe((items) => {
        localStorage.setItem('cartItems', JSON.stringify(items));
    });
}

export const isCartOpen = atom<boolean>(false);

export function addToCart(product: any) {
    const currentItems = cartItems.get();
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
        // If item exists, increase quantity
        updateQuantity(product.id, existingItem.quantity + 1);
    } else {
        // If item doesn't exist, add it with quantity 1
        cartItems.set([
            ...currentItems,
            { ...product, quantity: 1 }
        ]);
    }
}

export function removeFromCart(productId: number) {
    cartItems.set(cartItems.get().filter(item => item.id !== productId));
}

export function updateQuantity(productId: number, quantity: number) {
    cartItems.set(
        cartItems.get().map(item =>
            item.id === productId
                ? { ...item, quantity: Math.max(0, quantity) }
                : item
        )
    );
}

export function getCartTotal() {
    return Number(cartItems.get().reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2));
}
