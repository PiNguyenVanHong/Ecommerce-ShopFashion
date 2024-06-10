"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormSchema } from "@/schemas";
import { Input } from "../input";
import { Modal } from "@/components/ui/modal";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";


export const StoreModal = () => {
    const storeModal = useStoreModal();
    
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {
            setLoading(true);
            // throw new Error("x");
            const response = await axios.post('/api/stores', values);
            
            toast.success("Store created.");

            window.location.assign(`/${response.data.id}`);
            
        } catch (error) {
            toast.error("Something went wrong!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            title="Create store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}    
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <>
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    disabled={loading} 
                                                    placeholder="E-Commerce" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button 
                                    disabled={loading}
                                    variant={"outline"} 
                                    onClick={storeModal.onClose}
                                >Cancel</Button>
                                <Button disabled={loading} type="submit">Continute</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};