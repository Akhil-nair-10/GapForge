import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const GeneratedResponse = () => {

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [activeSection, setActiveSection] = useState('technicalQuestions')
    const [openQuestion, setOpenQuestion] = useState(null)

    const location = useLocation()
    const navigate = useNavigate()

    const data = location.state

    console.log('AI RESPONSE:', data)

    function handleMouseMove(e) {
        setMousePos({
            x: e.clientX,
            y: e.clientY
        })
    }

    function handleDownload() {

        const base64 = data.updated_resume_pdf

        if (!base64) {
            console.error('PDF data is missing')
            return
        }

        const byteCharacters = atob(base64)

        const byteNumbers = new Array(byteCharacters.length)

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers)

        const blob = new Blob(
            [byteArray],
            { type: 'application/pdf' }
        )

        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')

        link.href = url
        link.download = 'updated-resume.pdf'

        document.body.appendChild(link)

        link.click()

        link.remove()

        URL.revokeObjectURL(url)
    }

    function toggleQuestion(index) {
        setOpenQuestion(openQuestion === index ? null : index)
    }

    function selectSection(section) {
        setActiveSection(section)
        setOpenQuestion(null)
    }

    function renderQuestions(questions) {
        return (
            <div className='flex flex-col gap-3'>
                {questions.map((item, index) => (
                    <div
                        key={index}
                        className='border border-cyan-400/70 rounded-xl overflow-hidden'
                    >
                        <button
                            onClick={() => toggleQuestion(index)}
                            className='w-full flex justify-between items-center gap-4 px-5 py-4 text-left hover:bg-white/5 transition cursor-pointer'
                        >
                            <span className='text-sm font-medium'>
                                {item.question}
                            </span>

                            <span className='text-cyan-400 shrink-0'>
                                {openQuestion === index ? '⌃' : '⌄'}
                            </span>
                        </button>

                        {openQuestion === index && (
                            <div className='border-t border-white/10 px-5 py-4 space-y-4'>

                                <div>
                                    <p className='text-xs text-cyan-400 font-semibold uppercase mb-1'>
                                        Intention
                                    </p>

                                    <p className='text-sm text-gray-400'>
                                        {item.intention}
                                    </p>
                                </div>

                                <div>
                                    <p className='text-xs text-teal-400 font-semibold uppercase mb-1'>
                                        How to Answer
                                    </p>

                                    <p className='text-sm text-gray-300'>
                                        {item.how_to_answer}
                                    </p>
                                </div>

                            </div>
                        )}
                    </div>
                ))}
            </div>
        )
    }

    function renderContent() {

        if (activeSection === 'technicalQuestions') {
            return (
                <>
                    <h2 className='text-xl font-semibold mb-5'>
                        Technical Questions
                    </h2>

                    {renderQuestions(data.technical_questions)}
                </>
            )
        }

        if (activeSection === 'behavioralQuestions') {
            return (
                <>
                    <h2 className='text-xl font-semibold mb-5'>
                        Behavioral Questions
                    </h2>

                    {renderQuestions(data.behavioral_questions)}
                </>
            )
        }

        if (activeSection === 'skillGaps') {
            return (
                <>
                    <h2 className='text-xl font-semibold mb-5'>
                        Skill Gaps
                    </h2>

                    <div className='flex flex-col gap-3'>
                        {data.skill_gaps.map((gap, index) => (
                            <div
                                key={index}
                                className='border border-cyan-400/70 rounded-xl px-5 py-4 hover:bg-white/5 transition'
                            >
                                <p className='text-cyan-400 font-semibold'>
                                    {gap.skill}
                                </p>

                                <p className='text-sm text-gray-400 mt-1'>
                                    {gap.reason}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            )
        }

        return (
            <>
                <h2 className='text-xl font-semibold mb-5'>
                    Roadmap
                </h2>

                <div className='flex flex-col gap-3'>
                    {data.roadmap.map((item, index) => {

                        const dayLabel =
                            item.start_day === item.end_day
                                ? `DAY ${item.start_day}`
                                : `DAY ${item.start_day}–${item.end_day}`

                        return (
                            <div
                                key={index}
                                className='border border-cyan-400/70 rounded-xl px-5 py-4'
                            >
                                <div className='flex items-center gap-3 mb-2'>

                                    <span className='text-xs text-cyan-400 border border-cyan-400/50 rounded-full px-3 py-1'>
                                        {dayLabel}
                                    </span>

                                    <h3 className='font-semibold'>
                                        {item.focus}
                                    </h3>

                                </div>

                                <ul className='list-disc list-inside text-sm text-gray-400 space-y-1'>
                                    {item.tasks.map((task, index) => (
                                        <li key={index}>
                                            {task}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }

    if (!data) {
        return (
            <div className='min-h-screen flex justify-center items-center bg-[#08020d] text-white'>
                <div className='text-center'>
                    <p className='text-gray-400 mb-4'>
                        No generated response found.
                    </p>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className='text-cyan-400 hover:text-cyan-300 transition cursor-pointer'
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
        )
    }

    if (data.status === 'INVALID_INPUT') {
        return (
            <div className='min-h-screen flex justify-center items-center px-5 bg-[#08020d] text-white'>
                <div className='text-center max-w-lg'>
                    <h2 className='text-xl font-semibold mb-3'>
                        Unable to Generate Analysis
                    </h2>

                    <p className='text-gray-400 mb-5'>
                        {data.message}
                    </p>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className='text-cyan-400 hover:text-cyan-300 transition cursor-pointer'
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div
            className='min-h-screen flex justify-center items-center px-5 py-6 text-white'
            onMouseMove={handleMouseMove}
            style={{
                background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, #3b1464, #08020d 80%)`
            }}
        >
            <div className='w-full max-w-6xl h-[calc(100vh-48px)] min-h-[600px] flex lg:flex-row flex-col gap-5'>

                {/* SIDEBAR */}

                <div className='lg:w-64 shrink-0 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col'>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className='mb-5 text-sm text-gray-400 hover:text-white transition cursor-pointer'
                    >
                        ← Back to Dashboard
                    </button>

                    <div className='flex lg:flex-col items-center lg:items-stretch gap-5'>

                        <div className='flex justify-center shrink-0'>
                            <div
                                className='w-28 h-28 rounded-full p-[10px] flex items-center justify-center'
                                style={{
                                    background: `conic-gradient(#4ade80 ${data.match_score}%, rgba(255,255,255,0.08) ${data.match_score}%)`
                                }}
                            >
                                <div className='w-full h-full rounded-full bg-[#2a1b3c] flex items-center justify-center'>
                                    <span className='text-xl font-semibold'>
                                        {data.match_score}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-3 flex-1'>

                            {[
                                ['technicalQuestions', 'Technical Questions'],
                                ['behavioralQuestions', 'Behavioral Questions'],
                                ['skillGaps', 'Skill Gaps'],
                                ['roadmap', 'Roadmap']
                            ].map(([section, label]) => (
                                <button
                                    key={section}
                                    onClick={() => selectSection(section)}
                                    className={`text-left text-sm transition cursor-pointer ${activeSection === section
                                        ? 'text-cyan-400 font-semibold'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    • {label}
                                </button>
                            ))}

                        </div>
                    </div>

                    <button className='w-full mt-auto pt-5' onClick={handleDownload}>
                        <span className='block border-2 border-green-400 text-green-400 rounded-lg py-2.5 text-sm font-medium hover:bg-green-400/10 transition cursor-pointer active:scale-98'>
                            Download Updated Resume
                        </span>
                    </button>

                </div>

                {/* CONTENT */}

                <div className='flex-1 min-w-0 min-h-0 p-5 lg:p-7 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-y-auto [&::-webkit-scrollbar]:hidden'>
                    {renderContent()}
                </div>

            </div>
        </div>
    )
}

export default GeneratedResponse