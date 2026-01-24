import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Section from "../components/Section";
import { useTranslation } from "react-i18next";
import Window from "../components/Window";

interface ProjectProps {
    name: string;
    description: string;
    html_url: string;
    language: string | null;
}

type ProjectsProps = {
    id: string;
    open: boolean;
    onClose: () => void;
};

export default function Projects({ id, open, onClose }: ProjectsProps) {
    const [repos, setRepos] = useState<ProjectProps[]>([]);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const res = await fetch(`https://api.github.com/users/guezoloic/repos?per_page=100`);
                const data = await res.json();

                const sorted = data
                    .filter((repo: any) => !repo.fork)
                    .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
                    .slice(0, 6)
                    .map((repo: any) => ({
                        name: repo.name,
                        description: repo.description,
                        html_url: repo.html_url,
                        language: repo.language,
                    }));

                setRepos(sorted);
            } catch (err) {
                console.error("Error while loading repos", err);
            }
        };

        fetchRepos();
    }, []);

    const { t } = useTranslation();

    return (
        <Window open={open} onClose={onClose}>
            <Section id={id} title={t("projects.title")}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {repos.map((repo, i) => (
                        <motion.a
                            key={repo.name}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black/30 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col gap-3"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.6 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <h3 className="text-xl font-semibold text-white">{repo.name}</h3>
                            <p className="text-gray-200 text-sm">
                                {repo.description || "No description"}
                            </p>
                            {repo.language && (
                                <span className="text-sm font-medium text-emerald-400">
                                    {repo.language}
                                </span>
                            )}
                        </motion.a>
                    ))}
                </div>
            </Section>
        </Window>
    );
};