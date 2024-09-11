"use client";

import React from 'react';
import { gsap } from 'gsap';
// import { useEffect } from 'react';
import { useLayoutEffect } from 'react';
import Header from './Header';

const AboutUs = () => {

    useLayoutEffect(() => {
        if (document.querySelector('.hero')) {
            gsap.from('.hero', { opacity: 0, y: -50, duration: 1, ease: 'power1.out' });
        }
        if (document.querySelectorAll('.feature-item').length > 0) {
            gsap.from('.feature-item', { opacity: 0, scale: 0.9, stagger: 0.3, duration: 0.8, ease: 'power1.out' });
        }
    }, []);


    return (
        <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden">
            <Header />
            <main className="px-4 flex flex-col md:px-40 py-5">
                <div className="hero flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4"
                    style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/stability/729b48cb-f062-4227-9b38-56f8e24ae31c.png")' }}>
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-white text-4xl font-black leading-tight">EcoAuto</h1>
                        <h2 className="text-white text-sm font-normal">The future of cars is here. We're creating a new era of sustainable, fully electric vehicles.</h2>
                    </div>
                    <div className="flex flex-col min-w-40 h-14 w-full max-w-[480px] md:h-16">
                        <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                            <div className="text-[#49779c] flex border border-[#cedde8] bg-slate-50 items-center justify-center pl-[15px] rounded-l-xl border-r-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                                </svg>
                            </div>
                            <input
                                placeholder="Enter your email"
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d151c] focus:outline-0 focus:ring-0 border border-[#cedde8] bg-slate-50 focus:border-[#cedde8] h-full placeholder:text-[#49779c] px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal"
                            />
                            <div className="flex items-center justify-center rounded-r-xl border-l-0 border border-[#cedde8] bg-slate-50 pr-[7px]">
                                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 md:h-12 md:px-5 bg-[#2094f3] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]">
                                    <span className="truncate">Join the waitlist</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="flex flex-col gap-10 px-4 py-10">
                    <h1 className="text-[#0d151c] tracking-light text-[32px] font-bold leading-tight max-w-[720px]">Why Choose EcoAuto?</h1>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                        <div className="feature-item flex flex-col gap-3">
                            <div
                                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                                style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/2a880df2-1845-4197-bd29-e30b2b1462be.png")' }}
                            />
                        </div>
                        <div className="feature-item flex flex-col gap-3">
                            <div
                                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                                style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/363c705c-a605-46b3-890c-b45dfa2eafd4.png")' }}
                            />
                        </div>
                        <div className="feature-item flex flex-col gap-3">
                            <div
                                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                                style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/77a31f07-c2f4-407f-b3ea-9389d615b3b6.png")' }}
                            />
                        </div>
                    </div>
                </section>
                <section className="flex flex-col gap-10 px-4 py-10">
                    <h1 className="text-[#0d151c] tracking-light text-[32px] font-bold leading-tight max-w-[720px]">What People Are Saying</h1>
                    <div className="flex flex-col justify-end gap-6 px-4 py-10 md:gap-8 md:px-10 md:py-20">
                        <div className="flex flex-col gap-2 text-center">
                            <h1 className="text-[#0d151c] tracking-light text-[32px] font-bold leading-tight max-w-[720px]">Join the waitlist and be the first to experience EcoAuto.</h1>
                        </div>
                        <div className="flex flex-1 justify-center">
                            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 md:h-12 md:px-5 bg-[#2094f3] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]">
                                <span className="truncate">Join the waitlist</span>
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AboutUs;
