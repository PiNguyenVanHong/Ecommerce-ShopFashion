import { create } from "zustand";
import { Color, Image, Product, Size } from "@prisma/client";

interface PreviewModalStore {
    isOpen: boolean;
    data?: Product & {
        size: Size,
        color: Color,
        images: Image[],
    };
    onOpen: (data: Product & {
        size: Size,
        color: Color,
        images: Image[],
    }) => void;
    onClose: () => void;
};

const usePreviewModal = create<PreviewModalStore>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen: (data: Product & {
        size: Size,
        color: Color,
        images: Image[],
    }) => set({ data, isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export default usePreviewModal;