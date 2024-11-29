import { motion } from 'framer-motion';
import { addToCart } from '../store/cartStore';

interface AddToCartButtonProps {
    product: {
        id: number;
        name: string;
        price: number;
        image: string;
        category: string;
    };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const handleClick = () => {
        addToCart(product);
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
            onClick={handleClick}
        >
            Add to Cart
        </motion.button>
    );
}
