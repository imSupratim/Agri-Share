import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { gsap } from "gsap";

const slides = [
  {
    title: "Rent the Right Farm Machinery",
    description:
      "Get access to tractors, harvesters, tillers, and other agricultural machines without the cost of buying them.",
    button: "Find Machinery",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Put Your Machinery to Work",
    description:
      "Own agricultural machinery? List it on AgriShare and earn extra income by renting it to farmers when you're not using it.",
    button: "List Your Machine",
    image: "https://eos.com/wp-content/uploads/2023/05/wheat-crop-field.jpg",
  },
  {
    title: "Making Farming More Accessible",
    description:
      "AgriShare connects farmers and machine owners, making modern agricultural equipment easier and more affordable to access.",
    button: "Explore AgriShare",
    image:
      "https://www.agriculture.com/thmb/6M0tu8SoZXiy-QTigJyytuMs5Qs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/JohnDeereApplyingAnhydrousAmoniaSunrise1-WideShot-2000-f3ba6caf8ec94230b12300d22a3e9cb1.jpg",
  },
];

const Home = () => {
  const [current, setCurrent] = useState(0);

  const heroRef = useRef(null);

  useEffect(() => {
    gsap.from(heroRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="bg-slate-300 text-white">
      <main>
        <section ref={heroRef} className="relative overflow-hidden">
          {/* Slides */}
          <div className="relative h-[650px] w-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === current
                    ? "translate-x-0 opacity-100"
                    : index < current
                      ? "-translate-x-full opacity-0"
                      : "translate-x-full opacity-0"
                }`}
              >
                {/* Background Image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/10" />

                {/* Gradient */}
                <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/60 to-transparent" />

                {/* Content */}
                <div className="relative mx-auto flex h-full max-w-7xl items-center px-6">
                  <div className="max-w-2xl">
                    <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                      {slide.title}
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-xl backdrop-blur-md transition hover:bg-black/60"
            >
              <ArrowLeft />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-xl backdrop-blur-md transition hover:bg-black/60"
            >
              <ArrowRight />
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    current === index
                      ? "w-8 bg-indigo-500"
                      : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="flex gap-5 justify-center py-6 bg-white">
          <button className="rounded-lg bg-indigo-600 px-6 py-3 font-medium transition hover:bg-indigo-500">
            List your machine
          </button>

          <button className="rounded-lg border border-black text-black bg-white/5 px-6 py-3 font-medium backdrop-blur-sm transition hover:bg-black/20">
            Find equipment
          </button>
        </section>

        {/* ================= FEATURE CARDS ================= */}
        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
              Why choose us
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Everything you need to get started
            </h2>

            <p className="mt-4 text-slate-400">
              A simple and powerful platform designed to help you build, launch
              and grow.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "⚡",
                title: "Fast & Powerful",
                description:
                  "Optimized tools that help you move quickly without sacrificing quality.",
              },
              {
                icon: "🎨",
                title: "Modern Design",
                description:
                  "Beautiful and responsive interfaces that work across every device.",
              },
              {
                icon: "🔒",
                title: "Secure",
                description:
                  "Built with security and reliability at the core of the platform.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-white/[0.05]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold">{feature.title}</h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 px-6 py-16 text-center">
            <h2 className="text-4xl font-bold">
              Ready to build something great?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-slate-300">
              Start your journey today and turn your ideas into something
              meaningful.
            </p>

            <button className="mt-8 rounded-lg bg-white px-7 py-3 font-semibold text-slate-900 transition hover:bg-slate-200">
              Get Started
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
