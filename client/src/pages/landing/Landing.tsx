import type React from "react";
import { Link } from "react-router-dom";
import { Play, MessageSquare, Users, Headphones } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <header className="relative px-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-black/95 z-10" />

        <div className="relative z-20 container mx-auto px-4 py-24">
          <nav className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-2">
              <img
                src="/DhwaniLogo.png"
                alt="Dhwani"
                className="w-10 h-10 rounded-md"
              />
              <span className="text-2xl font-bold">Dhwani</span>
            </div>
          </nav>

          {/* Hero Content with Image */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Heading & CTA */}
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Your Music. Your Friends.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">
                  Together.
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Experience music like never before with Dhwani. Stream your
                favorite tracks, see what your friends are listening to, and
                connect through the universal language of music.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/home">
                  <button className="px-8 py-3 bg-emerald-600 rounded-full font-medium hover:bg-emerald-700 transition flex items-center justify-center gap-2">
                    <Play className="w-5 h-5" />
                    Start Listening Free
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Side: Hero Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
              <img
                src="/apppreview.png"
                width={800}
                height={600}
                alt="Music App Preview"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 px-14 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Everything you need in a{" "}
            <span className="text-emerald-500">music app</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Headphones className="w-8 h-8 text-emerald-500" />}
              title="Curated Music Collection"
              description="Enjoy a handpicked selection of trending tracks tailored just for you."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-emerald-500" />}
              title="Social Listening"
              description="See what your friends are playing in real-time and discover new music together."
            />
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8 text-emerald-500" />}
              title="Chat & Share"
              description="Connect with friends, share songs, and discuss your favorite music in real-time."
            />
          </div>
        </div>
      </section>

      {/* Social Preview Section */}
      <section className="py-24 px-14 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold">
                See What Your Friends Are{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">
                  Vibing To
                </span>
              </h2>
              <p className="text-gray-300 text-lg">
                Music is better with friends. See their music taste, and discover new tracks through their listening activity.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
              <img
                src="/apppreview2.png"
                width={800}
                height={600}
                alt="App Preview"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-black to-emerald-900/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Experience Dhwani?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start your journey with Dhwani today. Your next favorite song is waiting to be discovered.
          </p>
          <Link to="/home">
            <button className="px-8 py-3 bg-emerald-600 rounded-full font-medium hover:bg-emerald-700 transition inline-flex items-center gap-2">
              <Play className="w-5 h-5" />
              Get Started Free
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
