import React from "react";


export default function Home() {
    return (
        <main>
            <Hero />

        </main>
    );
}

// hero content
const Hero = () => (
    <section className="hero">
        {/* content for the hero */}
        <div className="hero__content">
            <h1 className="hero__title">Minty Yard</h1>
            <p className="hero__subtitle">A fine dining experience</p>

        </div>
    </section>

);
