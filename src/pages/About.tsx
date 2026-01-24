import React, { JSX } from "react";
import { motion } from "framer-motion";
import * as SOLID from "@heroicons/react/24/solid";
import { useTranslation } from 'react-i18next';
import Section from "../components/Section";

import content from "../json/content.json"
import Window from "../components/Window";

type AboutProps = {
    id: string;
    open: boolean;
    onClose: () => void;
};

export default function About({ id, open, onClose }: AboutProps) {
    const { t } = useTranslation();

    const paragraphs = content.about;

    return (
        <Window open={open} onClose={onClose}>
            <div className="flex justify-center items-center h-full w-full md:px-6">
                <div className="max-w-3xl w-full bg-black/21 rounded-2xl p-8 space-y-4 shadow-lg">
                    <Section id={id} title={t('about.title')}>
                        <div className="flex flex-col gap-1">
                            {paragraphs.map((paragraph, i) => {
                                const Icon = (SOLID as Record<string, React.ElementType>)[paragraph.icon];
                                return (
                                    <motion.div
                                        key={i}
                                        className="flex items-start gap-3 p-4 rounded-xl hover:bg-black/30 transition-colors"
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false, amount: 0 }}
                                        transition={{ duration: 0.6, delay: i * 0.08 }}
                                    >
                                        <span className="mt-1 text-emerald-400">
                                            <Icon className="w-6 h-6" />
                                        </span>
                                        <p className="text-sm md:text-base leading-relaxed text-white">
                                            {t(paragraph.text)}
                                        </p>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </Section>
                </div>
            </div>
        </Window>
    );
};