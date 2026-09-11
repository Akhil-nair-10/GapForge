const { PDFParse } = require('pdf-parse')
const { generateResumeAnalysis } = require('../gemini/gemini')
const { generateResumePdf } = require('../utils/resumePdf')

const AiController = {

    generateAnalysis: async (req, res) => {

        try {

            const {
                selfDescription,
                jobDescription
            } = req.body

            if (!req.file && !selfDescription) {
                return res.status(400).json({
                    message: 'Resume or self-description is required.'
                })
            }

            if (!jobDescription) {
                return res.status(400).json({
                    message: 'Job description is required.'
                })
            }

            let resumeText = null

            if (req.file) {

                const parser = new PDFParse({
                    data: req.file.buffer
                })

                const pdfData = await parser.getText()

                resumeText = pdfData.text

                await parser.destroy()
            }

            const result = await generateResumeAnalysis(
                resumeText,
                selfDescription,
                jobDescription
            )

            if (result.status === 'INVALID_INPUT') {
                return res.status(200).json(result)
            }

            const pdfBuffer = await generateResumePdf(
                result.updated_resume_html
            )

            const pdfBase64 = Buffer.from(pdfBuffer).toString('base64')

            res.status(200).json({
                ...result,
                updated_resume_pdf: pdfBase64
            })

        } catch (error) {

            console.error('AI analysis error:', error)

            res.status(500).json({
                message: 'Failed to generate AI analysis.'
            })
        }
    }
}

module.exports = {
    AiController
}