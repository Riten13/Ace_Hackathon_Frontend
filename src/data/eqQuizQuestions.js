export const quizQuestions = {
    "scoring": {
        "1": "Strongly Disagree",
        "2": "Disagree",
        "3": "Neutral",
        "4": "Agree",
        "5": "Strongly Agree",
        "domain_max": 20,
        "total_max": 100
    },
    "total_eq_interpretation": [
        {
            "min_score": 81,
            "max_score": 100,
            "interpretation": "Very High EQ (Excellent self-awareness, empathy, and social skills)"
        },
        {
            "min_score": 61,
            "max_score": 80,
            "interpretation": "High EQ (Good control of emotions, but can still improve in some areas)"
        },
        {
            "min_score": 41,
            "max_score": 60,
            "interpretation": "Moderate EQ (Some awareness, but difficulty managing or applying EQ consistently)"
        },
        {
            "min_score": 21,
            "max_score": 40,
            "interpretation": "Low EQ (Struggles with self-regulation, empathy, or relationship management)"
        },
        {
            "min_score": 0,
            "max_score": 20,
            "interpretation": "Very Low EQ (Significant challenges in understanding/handling emotions)"
        }
    ],
    "domains": [
        {
            "name": "Self-Awareness",
            "questions": [
                "I can easily identify what I’m feeling in different situations.",
                "I reflect on my emotions to understand why I felt a certain way.",
                "I notice patterns in my moods over time.",
                "I become aware of my emotions before they affect my behavior."
            ],
            "low_score_threshold": 6,
            "recommendation": "Work on journaling & reflection."
        },
        {
            "name": "Self-Regulation",
            "questions": [
                "When I’m upset, I can calm myself down without much difficulty.",
                "I rarely act impulsively when I’m emotional.",
                "I can stay calm when others around me are stressed or angry.",
                "I avoid saying things I’ll regret when I’m upset."
            ],
            "low_score_threshold": 6,
            "recommendation": "Practice breathing, mindfulness, anger management."
        },
        {
            "name": "Motivation",
            "questions": [
                "I stay positive even when things don’t go my way.",
                "I can push myself to achieve goals even when I feel discouraged.",
                "I keep working toward goals even after setbacks.",
                "I focus better when I connect tasks to my long-term purpose."
            ],
            "low_score_threshold": 6,
            "recommendation": "Goal-setting & affirmations."
        },
        {
            "name": "Empathy",
            "questions": [
                "I can sense when others are feeling upset, even if they don’t say it.",
                "I try to put myself in other people’s shoes to understand their perspective.",
                "I notice subtle changes in people’s tone or body language.",
                "I offer support when I see someone struggling emotionally."
            ],
            "low_score_threshold": 6,
            "recommendation": "Active listening & perspective-taking exercises."
        },
        {
            "name": "Social Skills",
            "questions": [
                "I can resolve conflicts between people without escalating tension.",
                "I can build rapport and connect with new people quickly.",
                "I communicate my feelings clearly without hurting others.",
                "I work well in groups by encouraging cooperation."
            ],
            "low_score_threshold": 6,
            "recommendation": "Practice communication & conflict resolution."
        }
    ]
}