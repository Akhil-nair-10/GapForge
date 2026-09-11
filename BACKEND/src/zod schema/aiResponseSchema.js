const resumeAnalysisJsonSchema = {
    type: 'object',

    properties: {
        status: {
            type: 'string',
            enum: ['VALID']
        },

        match_score: {
            type: 'integer',
            minimum: 0,
            maximum: 100
        },

        technical_questions: {
            type: 'array',
            minItems: 3,
            maxItems: 3,

            items: {
                type: 'object',

                properties: {
                    question: {
                        type: 'string'
                    },

                    intention: {
                        type: 'string'
                    },

                    how_to_answer: {
                        type: 'string'
                    }
                },

                required: [
                    'question',
                    'intention',
                    'how_to_answer'
                ]
            }
        },

        behavioral_questions: {
            type: 'array',
            minItems: 3,
            maxItems: 3,

            items: {
                type: 'object',

                properties: {
                    question: {
                        type: 'string'
                    },

                    intention: {
                        type: 'string'
                    },

                    how_to_answer: {
                        type: 'string'
                    }
                },

                required: [
                    'question',
                    'intention',
                    'how_to_answer'
                ]
            }
        },

        skill_gaps: {
            type: 'array',
            minItems: 1,
            maxItems: 9,

            items: {
                type: 'object',

                properties: {
                    skill: {
                        type: 'string'
                    },

                    reason: {
                        type: 'string'
                    }
                },

                required: [
                    'skill',
                    'reason'
                ]
            }
        },

        roadmap: {
            type: 'array',
            minItems: 1,

            items: {
                type: 'object',

                properties: {
                    start_day: {
                        type: 'integer',
                        minimum: 1,
                        maximum: 30
                    },

                    end_day: {
                        type: 'integer',
                        minimum: 1,
                        maximum: 30
                    },

                    focus: {
                        type: 'string'
                    },

                    tasks: {
                        type: 'array',
                        minItems: 1,

                        items: {
                            type: 'string'
                        }
                    }
                },

                required: [
                    'start_day',
                    'end_day',
                    'focus',
                    'tasks'
                ]
            }
        },

        updated_resume_html: {
            type: 'string'
        }
    },

    required: [
        'status',
        'match_score',
        'technical_questions',
        'behavioral_questions',
        'skill_gaps',
        'roadmap',
        'updated_resume_html'
    ]
}

module.exports = {
    resumeAnalysisJsonSchema
}