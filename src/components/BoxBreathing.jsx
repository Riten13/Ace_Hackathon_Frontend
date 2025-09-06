import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState("inhale");
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);
  const intervalRef = useRef(null);

  const phaseConfig = {
    inhale: {
      duration: 4,
      next: "hold1",
      instruction: "Breathe In",
      color: "from-emerald-400 to-emerald-600",
    },
    hold1: {
      duration: 4,
      next: "exhale",
      instruction: "Hold",
      color: "from-amber-400 to-amber-600",
    },
    exhale: {
      duration: 4,
      next: "hold2",
      instruction: "Breathe Out",
      color: "from-blue-400 to-blue-600",
    },
    hold2: {
      duration: 4,
      next: "inhale",
      instruction: "Hold",
      color: "from-purple-400 to-purple-600",
    },
  };

  const resetExercise = () => {
    setIsActive(false);
    setPhase("inhale");
    setTimeLeft(phaseConfig.inhale.duration);
    setCycleCount(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const toggleExercise = () => {
    if (isActive) {
      setIsActive(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      setIsActive(true);
    }
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to next phase when timer reaches 0
            setPhase((currentPhase) => {
              const nextPhase = phaseConfig[currentPhase].next;

              if (nextPhase === "inhale") {
                setCycleCount((count) => count + 1);
              }

              return nextPhase;
            });

            // Return the duration of the next phase (will be set after phase update)
            return phaseConfig[phaseConfig[phase].next].duration;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, phase]); // Added phase dependency

  const currentConfig = phaseConfig[phase];
  const progress =
    ((phaseConfig[phase].duration - timeLeft) / phaseConfig[phase].duration) *
    100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-950 dark:to-emerald-950 flex flex-col">
      <header className="p-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="text-center">
            <h1 className="text-2xl font-light text-foreground">
              Box Breathing
            </h1>
            <p className="text-sm text-muted-foreground opacity-70">
              4-4-4-4 rhythm
            </p>
          </div>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-sm w-full space-y-12">
          <div className="relative flex items-center justify-center">
            <div
              className={`absolute w-80 h-80 rounded-full bg-gradient-to-r ${currentConfig.color} opacity-10 blur-xl transition-all duration-[4000ms] ease-in-out`}
            />

            <div
              className={`w-64 h-64 rounded-full bg-gradient-to-r ${currentConfig.color} shadow-2xl transition-all duration-[4000ms] ease-in-out relative overflow-hidden`}
              style={{
                boxShadow: `0 0 60px rgba(16, 185, 129, ${
                  isActive ? 0.4 : 0.1
                })`,
              }}
            >
              <div
                className="absolute inset-0 rounded-full bg-white/20 dark:bg-black/20 transition-all duration-1000"
                style={{
                  transform: `scale(${progress / 100})`,
                  opacity: isActive ? 1 : 0.3,
                }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                <div className="text-5xl font-extralight mb-3 tabular-nums transition-all duration-300">
                  {timeLeft}
                </div>
                <div className="text-xl font-light mb-2 transition-all duration-500">
                  {currentConfig.instruction}
                </div>
                <div className="text-sm opacity-70 transition-all duration-300">
                  Cycle {cycleCount}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={toggleExercise}
              size="lg"
              className={`bg-gradient-to-r ${currentConfig.color} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-white border-0 px-8`}
            >
              {isActive ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start
                </>
              )}
            </Button>

            <Button
              onClick={resetExercise}
              variant="outline"
              size="lg"
              className="hover:scale-105 transition-all duration-300 bg-white/50 dark:bg-black/20 backdrop-blur-sm border-white/20 hover:bg-white/70 dark:hover:bg-black/30"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>

          {!isActive && cycleCount === 0 && (
            <div className="text-center animate-fade-in">
              <p className="text-sm text-muted-foreground leading-relaxed opacity-70">
                Press start and follow the breathing circle.
                <br />
                Watch the colors change with each breathing phase.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
