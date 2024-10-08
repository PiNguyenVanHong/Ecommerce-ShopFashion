"use client";

import useCart from "@/hooks/use-cart";

import CartItem from "@/root-routes/cart/_components/cart-item";
import Container from "@/components/user/ui/container";
import Summary from "@/root-routes/cart/_components/summary";
import { useEffect, useState } from "react";

const CartPage = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const cart = useCart();

    if(!isMounted) {
        return null;
    }

    return ( 
        <div className="px-4 py-16 sm:px-6 lg:px-8">
            <Container>
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-primary">Shopping Cart</h1>
                    <div
                        className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12"
                    >
                        <div className="lg:col-span-7">
                            {cart.items.length === 0 && 
                                <p className="text-neutral-500">No items added to cart.</p>}
                            <ul>
                                {cart.items.map((item) => (
                                    <CartItem 
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </ul>
                        </div>
                        <Summary />
                    </div>
                </div>
            </Container>
        </div>
     );
}
 
export default CartPage;