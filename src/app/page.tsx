"use client";
import { Card, CardBody, CardHeader, Link, Button } from "@nextui-org/react";
import {
  FiActivity,
  FiCode,
  FiDatabase,
  FiGrid,
  FiSearch,
  FiFilm,
  FiList,
  FiCalendar,
  FiBox,
  FiZap,
  FiArrowRight,
  FiGithub,
} from "react-icons/fi";

const routes = [
  {
    path: "/api/home",
    method: "GET",
    description: "Get anime data for homepage",
    icon: FiGrid,
    color: "from-pink-500 to-rose-500",
  },
  {
    path: "/api/complete-anime",
    method: "GET",
    description: "Get complete anime list with pagination",
    icon: FiList,
    color: "from-violet-500 to-purple-500",
  },
  {
    path: "/api/ongoing-anime",
    method: "GET",
    description: "Get currently airing anime",
    icon: FiActivity,
    color: "from-cyan-500 to-blue-500",
  },
  {
    path: "/api/search/{keyword}",
    method: "GET",
    description: "Search anime by keyword",
    icon: FiSearch,
    color: "from-amber-500 to-orange-500",
  },
  {
    path: "/api/genre/{slug}",
    method: "GET",
    description: "Get anime list by genre",
    icon: FiBox,
    color: "from-emerald-500 to-green-500",
  },
  {
    path: "/api/genre",
    method: "GET",
    description: "Get all available genres",
    icon: FiDatabase,
    color: "from-teal-500 to-cyan-500",
  },
  {
    path: "/api/schedule",
    method: "GET",
    description: "Get anime release schedule",
    icon: FiCalendar,
    color: "from-red-500 to-pink-500",
  },
  {
    path: "/api/anime/{slug}",
    method: "GET",
    description: "Get detailed anime information",
    icon: FiFilm,
    color: "from-indigo-500 to-blue-500",
  },
  {
    path: "/api/anime/{slug}/episodes",
    method: "GET",
    description: "Get episode list for anime",
    icon: FiList,
    color: "from-blue-500 to-indigo-500",
  },
  {
    path: "/api/anime/{slug}/episodes/{episode}",
    method: "GET",
    description: "Get specific episode details",
    icon: FiZap,
    color: "from-yellow-500 to-amber-500",
  },
  {
    path: "/api/batch/{slug}",
    method: "GET",
    description: "Get batch/download links",
    icon: FiBox,
    color: "from-slate-500 to-zinc-500",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#030014]">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiMwMGE1ZDUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/80 to-[#030014]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
              <FiZap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Powered by Visualcodepo</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              OtakuBeHanz API
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              A powerful REST API for accessing anime data from Otakudesu. Built
              for developers who need fast and reliable anime information.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">12+</div>
                <div className="text-sm text-gray-500">Endpoints</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">Fast</div>
                <div className="text-sm text-gray-500">Response</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">Free</div>
                <div className="text-sm text-gray-500">To Use</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                as={Link}
                href="#routes"
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-8"
                endContent={<FiArrowRight />}
              >
                Get Started
              </Button>
              <Button
                as={Link}
                href="https://github.com/Dikrey"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="bordered"
                className="border-white/20 text-white px-8"
                startContent={<FiGithub />}
              >
                View Docs
              </Button>
            </div>
          </div>
        </section>

        {/* API Base URL Card */}
        <section className="px-4 pb-12">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
              <CardHeader className="flex-col items-start px-6 pt-6 pb-2">
                <p className="text-sm text-gray-400 uppercase tracking-wider">
                  Base URL
                </p>
              </CardHeader>
              <CardBody className="px-6 pb-6">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-black/30 border border-white/5">
                  <FiCode className="w-5 h-5 text-purple-400" />
                  <code className="text-cyan-400 font-mono text-lg">
                    https://otakubehanz.vercel.app/api
                  </code>
                </div>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Routes Section */}
        <section id="routes" className="px-4 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Available Routes
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Explore all available API endpoints to build your anime
                application
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {routes.map((route, index) => (
                <Card
                  key={index}
                  className="bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group"
                >
                  <CardBody className="p-5">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${route.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                      >
                        <route.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`px-2 py-0.5 text-xs font-mono rounded-md ${
                              route.method === "GET"
                                ? "bg-green-500/20 text-green-400"
                                : route.method === "POST"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {route.method}
                          </span>
                        </div>
                        <code className="text-sm text-cyan-300 font-mono block mb-1 truncate">
                          {route.path}
                        </code>
                        <p className="text-xs text-gray-500">
                          {route.description}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Features
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
                <CardBody className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <FiZap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Lightning Fast
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Optimized for speed with efficient caching and minimal
                    latency
                  </p>
                </CardBody>
              </Card>

              <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
                <CardBody className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <FiDatabase className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Rich Data
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Comprehensive anime information including episodes, genres,
                    and schedules
                  </p>
                </CardBody>
              </Card>

              <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
                <CardBody className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <FiCode className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Easy to Use
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Simple REST API with clear endpoints and JSON responses
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-8 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center text-gray-500">
            <p className="text-sm">
              Built with ❤️ by{" "}
              <Link
                href="httpshttps://github.com/Hanz-Creator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300"
              >
                Hanz
              </Link>
              . Powered by Next.js & Vercel.
            </p>
            <p className="text-xs mt-2">
              Not affiliated with Otakudesu. All data is scraped from
              publicly available sources.
            </p>
          </div>
        </footer>
      </div>

      {/* Custom Styles for Animations */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
