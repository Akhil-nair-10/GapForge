import React, { useRef, useState } from 'react'
import { useGenerateResponse } from '../hooks/useGenerateResponse'

const Dashboard = () => {

    const inputRef = useRef();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [selectedFile, setSelectedFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [selfDescription, setSelfDescription] = useState('');

    const { loading, handleGenerateResponse } = useGenerateResponse();

    function handleMouseMove(e) {
        setMousePos({
            x: e.clientX,
            y: e.clientY
        });
    }

    function fileUpload() {
        inputRef.current.click();
    }

    function handleFileChange(e) {
        setSelectedFile(e.target.files[0]);
    }

    function fileSize() {
        return (selectedFile.size / 1024 / 1024).toFixed(2);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if(!jobDescription.trim()) {
            window.alert('Please enter the job description');
            return;
        }

        if(!selectedFile && !selfDescription.trim()) {
            window.alert('Please provide a Resume or Self Description');
            return;
        }

        await handleGenerateResponse({
            jobDescription,
            resume: selectedFile,
            selfDescription
        });

        
    }

    return (
        <div
            className='min-h-screen flex flex-col justify-center items-center px-5 py-10 text-white'
            onMouseMove={handleMouseMove}
            style={{
                background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, #3b1464, #08020d 80%)`
            }}
        >

            <div className='w-full max-w-4xl mb-8'>
                <p className='text-teal-400 text-sm font-medium mb-2'>
                    GAPFORGE
                </p>

                <h1 className='text-3xl lg:text-4xl font-bold tracking-tight'>
                    Generate Your Response
                </h1>

                <p className='text-gray-400 mt-2'>
                    Tailor your application to the role you're applying for.
                </p>
            </div>

            <div className='w-full max-w-4xl flex lg:flex-row flex-col gap-5'>

                <div className='lg:h-96 h-72 flex-1 min-w-0 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition'>

                    <label className='text-sm font-semibold'>
                        Job Description
                    </label>

                    <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className='resize-none h-[calc(100%-28px)] w-full bg-transparent outline-none placeholder:text-gray-500 [&::-webkit-scrollbar]:hidden'
                        placeholder='Paste the entire job description here...'
                    />

                </div>

                <div className='lg:h-96 h-96 flex-1 min-w-0 flex flex-col gap-5'>

                    <div
                        className='h-1/3 min-w-0 flex flex-col justify-center items-center rounded-2xl border border-dashed border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition cursor-pointer overflow-hidden'
                        onClick={fileUpload}
                    >

                        <input
                            type='file'
                            ref={inputRef}
                            className='hidden'
                            accept='.pdf'
                            onChange={handleFileChange}
                        />

                        {selectedFile ? (
                            <>
                                <p className='text-2xl mb-1 text-teal-400'>
                                    ✓
                                </p>

                                <p className='font-semibold w-full min-w-0 px-5 truncate text-center'>
                                    {selectedFile.name}
                                </p>

                                <p className='text-xs text-gray-500 mt-1'>
                                    {fileSize()} MB • Click to replace
                                </p>
                            </>
                        ) : (
                            <>
                                <p className='text-2xl mb-1'>
                                    ↑
                                </p>

                                <p className='font-semibold'>
                                    Upload your resume
                                </p>

                                <p className='text-xs text-gray-500 mt-1'>
                                    Click to browse • (PDF ONLY)
                                </p>
                            </>
                        )}

                    </div>

                    <div className='h-2/3 min-w-0 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition'>

                        <label className='text-sm font-semibold'>
                            Self Description
                        </label>

                        <textarea
                            value={selfDescription}
                            onChange={(e) => setSelfDescription(e.target.value)}
                            maxLength={1000}
                            className='resize-none w-full h-[calc(100%-52px)] bg-transparent outline-none placeholder:text-gray-500 [&::-webkit-scrollbar]:hidden'
                            placeholder='Anything your resume does not capture...'
                        />

                        <p className='text-right text-xs text-gray-600'>
                            {selfDescription.length} / 1000
                        </p>

                    </div>

                </div>
            </div>

            <div className='w-full max-w-4xl mt-6'>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className='w-full h-14 rounded-xl bg-teal-400 text-black font-semibold hover:bg-teal-300 hover:shadow-[0_0_25px_rgba(45,212,191,0.15)] active:scale-[0.99] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
                >
                    {loading ? 'Generating...' : 'Generate Response'}
                </button>

                <p className='text-center text-xs text-gray-600 mt-3'>
                    Your information is processed securely.
                </p>

            </div>

        </div>
    )
}

export default Dashboard