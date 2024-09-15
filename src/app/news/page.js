"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Header from "../../components/Header";
import Footer from '@/components/Footer';

const News = () => {
    const reff = useRef([]);

    useEffect(() => {
        gsap.fromTo(
          reff.current,
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
        );
    }, []);

    const articles = [
        {
            title: "Why Carbon Fiber is the Key to Overcoming Automotive Environmental Challenges",
            image: "/article1.jpg",
            description:
                "Carbon fiber, a lightweight and strong material, can be used in car manufacturing to improve fuel efficiency and reduce environmental impact.",
            link: "https://www.addcomposites.com/post/why-carbon-fiber-is-the-key-to-overcoming-automotive-environmental-challenges#:~:text=Studies%20have%20shown%20that%20substituting,enhancing%20fuel%20economy%20and%20reducing",
        },
        {
            title: "Stronger, Lighter, Greener: Boron-Enhanced Steel for a Better Future",
            image: "/article2.jpg",
            description:
                "Boron-enhanced steel offers a stronger, lighter, and more sustainable solution for the automotive industry.",
            link: "https://www.researchgate.net/publication/291011668_Development_of_Advanced_High_Strength_Steel_for_Improved_Vehicle_Safety_Fuel_Efficiency_and_CO2_Emission",
        },
        {
            title: "JFE Steel's High-Strength Steel Makes Cars Lighter and Safer",
            image: "/article3.jpg",
            description:
                "JFE Steel's groundbreaking 1.5GPa steel technology is helping Toyota build lighter, safer vehicles, setting a new standard in automotive innovation.",
            link: "https://www.jfe-steel.co.jp/en/release/2021/211022.html#:~:text=TOYOTA%20Lexus%20Adopts%201.5GPa,Press%20Forming%20TechnologyJFE%20Steel%20Corporation",
        },
        {
            title: "Green Gears: The Rise of Sustainable Materials in Automotive Manufacturing",
            image: "/article4.jpg",
            description:
                "As the automotive industry seeks to reduce its environmental impact, innovative sustainable materials are paving the way for a greener future.",
            link: "https://www.ubqmaterials.com/blog-post/car-manufacturers-push-start-on-using-sustainable-materials/ ",
        },
    ];

    return (
        <div className="relative flex min-h-screen flex-col bg-slate-50 overflow-x-hidden">
            <Header />
            <main ref={reff} className="px-4 md:px-40 py-8">
                <div className="hero flex flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl md:pl-14 px-6 justify-center p-4 mb-10 h-[400px]"
                    style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%), url("/ecoImage.jpg")' }}>
                    <h1 className="text-white text-3xl md:text-5xl font-black leading-tight">Industry News</h1>
                    <p className="text-white text-lg md:text-xl font-light">Stay updated with the latest trends and revolutions in manufacturing due to new materials.</p>
                </div>

                <section className="flex flex-col gap-6">
                    <h2 className="text-[#0d151c] text-2xl md:text-3xl font-bold leading-tight">Recent Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {articles.map((article, index) => (
                            <div
                                key={index}
                                className="article-item flex flex-col bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                            >
                                <div
                                    className="w-full h-48 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${article.image})` }}
                                />
                                <div className="p-6 flex flex-col gap-4">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-600">{article.description}</p>
                                    <a
                                        href={article.link}
                                        className="text-[#2094f3] font-bold hover:underline self-start"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Read more
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default News;
