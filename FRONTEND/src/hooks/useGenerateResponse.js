import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateResponse } from '../services/generate.api'

export function useGenerateResponse() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [response, setResponse] = useState(null)

    const navigate = useNavigate()

    async function handleGenerateResponse({ jobDescription, resume, selfDescription }) {

        setLoading(true)
        setError(null)

        try {
            const data = await generateResponse({
                jobDescription,
                resume,
                selfDescription
            })

            setResponse(data)

            navigate('/response', {
                state: data
            })

            return data
        }
        catch(err) {
            setError(err.response?.data?.message || "Something went wrong")
        }
        finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        response,
        handleGenerateResponse
    }
}