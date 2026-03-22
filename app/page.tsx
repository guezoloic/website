"use client";

import Title from "@app/components/sections/Title";
import Navbar from "@app/components/sections/Navbar";
import About from "@app/components/sections/About";
import Skills from "@app/components/sections/Skills";
import Projects from "@app/components/sections/Projects";

import dynamic from 'next/dynamic';

import { useState } from "react";

import '@app/lib/i18n';

export type MenuState = {
    about: boolean;
    skills: boolean;
    projects: boolean;
};

const Three = dynamic(() => import('@app/components/three/Three'), { 
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-black" />
});

export default function App() {
    const [state, setState] = useState<MenuState>({
        about: false,
        skills: false,
        projects: false,
    });

    const closeSection = (key: keyof MenuState) => {
        setState(prev => ({ ...prev, [key]: false }));
    };

    const isOpen = Object.values(state).some(value => value === true);

    return (
        <div className="relative w-full h-screen">
            <Three />
            <Title isOpen={isOpen}/>
            <Navbar state={state} setState={setState} isOpen={isOpen} />
            <About id="about" open={state.about} onClose={() => closeSection("about")} />
            <Skills id="skills" open={state.skills} onClose={() => closeSection("skills")} />
            <Projects id="projects" open={state.projects} onClose={() => closeSection("projects")} />
        </div>
    );
}