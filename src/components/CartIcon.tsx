import { useStore } from '@nanostores/react';
import { cartItems } from '../store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartIcon() {
    const $cartItems = useStore(cartItems);
    const itemCount = $cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="relative">
            <a href="/cart" className="text-gray-600 hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            </a>
            <AnimatePresence>
                {itemCount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                    >
                        {itemCount}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    );
}
