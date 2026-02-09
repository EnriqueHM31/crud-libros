import { useMotionValue, useTransform } from "framer-motion";

export function useLibroCard() {

    // motion values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [12, -12]);
    const rotateY = useTransform(x, [-100, 100], [-12, 12]);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const centerX = width / 2;
        const centerY = height / 2;

        x.set(mouseX - centerX);
        y.set(mouseY - centerY);
    }

    function reset() {
        x.set(0);
        y.set(0);
    }
    return {
        x,
        y,
        rotateX,
        rotateY,
        handleMouseMove,
        reset,
    };
}