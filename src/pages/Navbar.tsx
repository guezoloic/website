import React, { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence, Variants } from "framer-motion";
import * as SOLID from "@heroicons/react/24/solid";

import Button from "../components/Button";
import content from "../json/content.json";
import { MenuState } from "../App";
import Lang from "../components/Lang"

type NavbarProps = {
    state: MenuState;
    setState: Dispatch<SetStateAction<MenuState>>;
    isOpen: boolean;
};

const navVariants: Variants = {
    initial: { scaleY: 0.8, scaleX: 0.1, opacity: 0.7 },
    animate: { scaleY: 1, scaleX: 1, opacity: 1, transition: { duration: 0.3, ease: [0.42, 0, 0.58, 1] } },
};

const exitVariants: Variants = {
    initial: { scaleY: 1, scaleX: 5, opacity: 0.7 },
    animate: { scaleY: 1, scaleX: 1, opacity: 1, transition: { duration: 0.3, ease: [0.42, 0.66, 0.58, 1] } },
};


export default function Navbar({ state, setState, isOpen }: NavbarProps) {
    const { t } = useTranslation();


    const handleClick = (key: keyof MenuState) => {
        setState(prev => ({ ...prev, [key]: true }));
    };

    const closeWindows = () => {
        setState(prev => {
            const newState: MenuState = {} as MenuState;
            for (const key in prev) newState[key as keyof MenuState] = false;
            return newState;
        });
    };

    const mainButton = content.navbar.buttons[0];

    return (
        <AnimatePresence>
            {isOpen ? (
                <motion.div
                    key="close"
                    className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center z-50"
                    variants={exitVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <Button
                        onClick={closeWindows}
                        label="exit"
                        variant="icon"
                    >
                        <SOLID.XMarkIcon className="w-8 h-8 text-white" />
                    </Button>
                </motion.div>
            ) : (
                <motion.div
                    key="menu"
                    className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-50"
                    variants={navVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <Button
                        onClick={() => handleClick(mainButton.action as keyof MenuState)}
                        label={t(mainButton.label)}
                        variant="text"
                    >
                        <div className="flex flex-col items-center justify-center whitespace-nowrap">
                            <span className="text-base md:text-lg font-bold text-white drop-shadow-lg">
                                {content.name}
                            </span>
                            <span className="text-xs md:text-sm text-gray-300 font-light">
                                {t(content.career)}
                            </span>
                        </div>
                    </Button>

                    {content.navbar.buttons.slice(1).map((btn, i) => {
                        const Icon = (SOLID as Record<string, React.ElementType>)[btn.icon];
                        return (
                            <div className="relative group" key={i}>
                                <Button
                                    onClick={() => handleClick(btn.action as keyof MenuState)}
                                    label={t(btn.label)}
                                    variant="icon"
                                >
                                    {Icon && <Icon className="w-6 h-6 text-white" />}
                                </Button>
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md text-xs text-white bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {t(btn.label)}
                                </span>
                            </div>

                        );
                    })}
                    <Lang />
                </motion.div>
            )}
        </AnimatePresence>
    );
}