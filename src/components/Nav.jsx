"use client";

import { useState } from "react";
import { Brain, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [exercisesOpen, setExercisesOpen] = useState(false);

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold text-foreground">EQMaster</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/assessment"
              className="text-foreground hover:text-accent transition-colors duration-200 font-medium"
            >
              EQ Assessment
            </a>
            <a
              href="/coaching"
              className="text-foreground hover:text-accent transition-colors duration-200 font-medium"
            >
              AI Coach
            </a>

            {/* Exercises Dropdown */}
            <div className="relative">
              <button
                onClick={() => setExercisesOpen(!exercisesOpen)}
                className="flex items-center space-x-1 text-foreground hover:text-accent transition-colors duration-200 font-medium"
              >
                <span>Exercises</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    exercisesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {exercisesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg py-2 z-10">
                  <a
                    href="/exercises/self-reflection"
                    className="block px-4 py-2 text-card-foreground hover:bg-muted transition-colors duration-200"
                  >
                    Self-Reflection
                  </a>
                  <a
                    href="/exercises/empathy-building"
                    className="block px-4 py-2 text-card-foreground hover:bg-muted transition-colors duration-200"
                  >
                    Empathy Building
                  </a>
                  <a
                    href="/exercises/communication"
                    className="block px-4 py-2 text-card-foreground hover:bg-muted transition-colors duration-200"
                  >
                    Communication Skills
                  </a>
                  <a
                    href="/exercises/stress-management"
                    className="block px-4 py-2 text-card-foreground hover:bg-muted transition-colors duration-200"
                  >
                    Stress Management
                  </a>
                </div>
              )}
            </div>

            <a
              href="/progress"
              className="text-foreground hover:text-accent transition-colors duration-200 font-medium"
            >
              Progress
            </a>
            <a
              href="/resources"
              className="text-foreground hover:text-accent transition-colors duration-200 font-medium"
            >
              Resources
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-accent transition-colors duration-200"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="/assessment"
                className="block px-3 py-2 text-foreground hover:text-accent hover:bg-muted rounded-md transition-colors duration-200 font-medium"
              >
                EQ Assessment
              </a>
              <a
                href="/coaching"
                className="block px-3 py-2 text-foreground hover:text-accent hover:bg-muted rounded-md transition-colors duration-200 font-medium"
              >
                AI Coach
              </a>

              {/* Mobile Exercises Section */}
              <div className="px-3 py-2">
                <button
                  onClick={() => setExercisesOpen(!exercisesOpen)}
                  className="flex items-center justify-between w-full text-foreground hover:text-accent transition-colors duration-200 font-medium"
                >
                  <span>Exercises</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      exercisesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {exercisesOpen && (
                  <div className="mt-2 ml-4 space-y-1">
                    <a
                      href="/exercises/self-reflection"
                      className="block px-3 py-2 text-muted-foreground hover:text-accent hover:bg-muted rounded-md transition-colors duration-200"
                    >
                      Self-Reflection
                    </a>
                    <a
                      href="/exercises/empathy-building"
                      className="block px-3 py-2 text-muted-foreground hover:text-accent hover:bg-muted rounded-md transition-colors duration-200"
                    >
                      Empathy Building
                    </a>
                    <a
                      href="/exercises/communication"
                      className="block px-3 py-2 text-muted-foreground hover:text-accent hover:bg-muted rounded-md transition-colors duration-200"
                    >
                      Communication Skills
                    </a>
                    <a
                      href="/exercises/stress-management"
                      className="block px-3 py-2 text-muted-foreground hover:text-accent hover:bg-muted rounded-md transition-colors duration-200"
                    >
                      Stress Management
                    </a>
                  </div>
                )}
              </div>

              <a
                href="/progress"
                className="block px-3 py-2 text-foreground hover:text-accent hover:bg-muted rounded-md transition-colors duration-200 font-medium"
              >
                Progress
              </a>
              <a
                href="/resources"
                className="block px-3 py-2 text-foreground hover:text-accent hover:bg-muted rounded-md transition-colors duration-200 font-medium"
              >
                Resources
              </a>

              {/* Mobile CTA Buttons */}
              <div className="pt-4 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full text-foreground hover:text-accent"
                >
                  Sign In
                </Button>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
