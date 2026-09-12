import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

export async function generateResponse({ jobDescription, resume, selfDescription }) {

    try {
        const formData = new FormData()

        formData.append('jobDescription', jobDescription)

        if(resume) {
            formData.append('resume', resume)
        }

        if(selfDescription) {
            formData.append('selfDescription', selfDescription)
        }

        const response = await api.post('/api/ai/generate', formData)

        return response.data
    }
    catch(err) {
        throw err
    }

}