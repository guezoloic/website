import Title from "./pages/Title";
import Three from "./pages/Three";
import Navbar from "./pages/Navbar";
import About from "./pages/About";
import Skills from "./pages/Skills";

import { useState } from "react";

import './utils/translation';
import Projects from "./pages/Projects";

export type MenuState = {
    about: boolean;
    skills: boolean;
    projects: boolean;
};

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