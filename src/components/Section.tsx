import React, { JSX } from "react";

type SectionProps = { 
    children: JSX.Element; 
    title: string; 
    id: string 
};

export default function Section({ children, title, id }: SectionProps) {
    return (
        <section
            id={id}
            className="my-3 relative max-w-5xl mx-auto mt-5 rounded-2xl flex flex-col gap-8 text-gray-100"
        >
            <h2
                className="text-3xl sm:text-5xl font-extrabold bg-clip-text text-transparent 
                            bg-gradient-to-r from-green-200 via-emerald-600 to-green-800"
            >
                {title}
            </h2>
            {children}
        </section>
    );
};