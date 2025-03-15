import { Clock, Music2, Sparkles, Headphones, Disc3 } from "lucide-react";

interface ComingSoonProps {
  visible: boolean;
}

export default function ComingSoon({ visible }: ComingSoonProps) {

  if (!visible) return null;
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 ">
      <div className="w-full p-6 text-white">
        <div className="relative overflow-hidden rounded-xl border border-emerald-500/20 bg-zinc-900 p-8">
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl"></div>

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Coming Soon
              </h2>
              <p className="text-zinc-400 mt-1">
                We're working on something amazing
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center">
                <Clock className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative">
              {/* Animated rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-32 w-32 rounded-full border-2 border-emerald-500/20 animate-ping opacity-20"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-40 w-40 rounded-full border-2 border-emerald-500/10 animate-pulse"></div>
              </div>

              {/* Center icon */}
              <div className="h-24 w-24 rounded-full bg-zinc-800 flex items-center justify-center z-10 relative">
                <Disc3 className="h-12 w-12 text-emerald-400 animate-spin-slow" />
              </div>
            </div>

            <div className="mt-10 text-center max-w-md">
              <h3 className="text-xl font-semibold text-emerald-400 mb-2">
                New Music Experience
              </h3>
              <p className="text-zinc-400">
                This feature will be available soon. We're crafting a new way
                for you to discover and enjoy your favorite tracks.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between pt-4 border-t border-zinc-800">

            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <p className="text-xs text-zinc-500">Stay tuned</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
