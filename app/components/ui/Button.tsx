import { ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
    onClick?: () => void;
    label: string;
    variant?: "icon" | "text";
    className?: string;
};

export default function Button({ children, onClick, label, variant = "icon", className = "" }: ButtonProps) {
    const BASECLASS = "cursor-pointer flex items-center justify-center backdrop-blur-sm         \
                        bg-black/17 shadow-md text-white transition-all duration-200 ease-out   \
                        hover:bg-white/15 active:scale-95 shadow-lg shadow-black/50             \
                        pointer-events-auto hover:shadow-black/0";


    // dictionary to choose if it's a icon or text button
    const variants: Record<typeof variant, string> = {
        icon: "rounded-full w-12 h-12 md:w-14 md:h-14 hover:scale-110",
        text: "rounded-3xl px-4 h-12 md:h-14 md:px-6 max-w-max hover:scale-105",
    };

    return (
        <div className="relative group">
            <button onClick={onClick} aria-label={label} className={`${BASECLASS} ${variants[variant]}`}>
                {children}
            </button>
            {label && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 
                                rounded-md text-xs text-white bg-black/80 opacity-0 
                                group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {label}
                </span>
            )}
        </div>
    );
}