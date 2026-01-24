import React from "react";
import { motion } from "framer-motion";
import * as SiIcons from "react-icons/si";
import Section from "../components/Section";
import { useTranslation } from "react-i18next";

import content from "../json/content.json"
import Window from "../components/Window";

type SkillsProps = {
    id: string;
    open: boolean;
    onClose: () => void;
};

export default function Skills({ id, open, onClose }: SkillsProps) {
    const { t } = useTranslation();

    const skillsData = content.skills;
    return (
        <Window open={open} onClose={onClose}>
            <Section id={id} title={t("skills.title")}>
                {skillsData.map((section, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2 max-w-3xl w-full bg-black/20 rounded-2xl p-8 space-y-4 shadow-lg">
                            <h2 className="text-xl font-semibold font-extrabold bg-clip-text text-transparent 
                            bg-gradient-to-r from-green-200 via-emerald-600 to-green-800">{t(section.title)}:</h2>
                            <div className="flex flex-wrap gap-2">
                                {section.tags.map((tag, j) => {
                                    const Icon = (SiIcons as Record<string, React.ElementType>)[tag.icon];
                                    return (
                                        <motion.div
                                            key={j}
                                            className="flex items-center gap-2 p-2"
                                            initial={{ opacity: 0, y: 15 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: false, amount: 0 }}
                                            transition={{ duration: 0.5, delay: j * 0.08 }}
                                        >
                                            <div className="flex items-center gap-2 p-1.5">
                                                {Icon && <Icon className="w-5 h-5 text-emerald-400 mt-1" />}
                                                <span className="text-sm md:text-base">{tag.name}</span>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </Section>
        </Window>
    );
};