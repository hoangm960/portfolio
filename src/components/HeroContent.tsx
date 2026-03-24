"use client";

import { personalInfo } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export function HeroContent({ fullScreen = false }: { fullScreen?: boolean }) {
    return (
        <div className={`flex flex-col items-center justify-center text-center px-4 ${fullScreen ? "w-screen h-screen" : ""}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                Hi, I&apos;m{" "}
                <span className="text-sky-400">{personalInfo.name}</span>
            </h1>

            <h2 className="text-xl sm:text-2xl font-semibold text-slate-300 mb-6">
                {personalInfo.role}
            </h2>

            <p className="max-w-2xl text-base sm:text-lg text-slate-400 mb-10 leading-relaxed">
                {personalInfo.tagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <a
                    href="#projects"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/25 hover:-translate-y-0.5"
                >
                    View Projects
                    <ArrowRight size={18} />
                </a>
                <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-slate-500 text-slate-200 font-semibold hover:border-sky-400 hover:text-sky-400 transition-all duration-300 hover:-translate-y-0.5"
                >
                    Contact Me
                </a>
            </div>

            {personalInfo.availableForWork && (
                <div className="mt-8 flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </span>
                    <span className="text-sm text-emerald-400 font-medium">
                        Available for new opportunities
                    </span>
                </div>
            )}
        </div>
    );
}

