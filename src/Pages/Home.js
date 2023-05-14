import React from "react";


export default function Home(p) {

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
            <h1 className="hero__title">Welcome To my Movie Page</h1>
            <p className="hero__subtitle"> I hope you find what you are looking for</p>

        </div>
    </section>

);
