const puppeteer = require('puppeteer')

async function generateResumePdf(html) {

    const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/opt/render/.cache/puppeteer/chrome/linux-152.0.7977.75/chrome-linux64/chrome',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    })

    try {

        const page = await browser.newPage()

        await page.setContent(html, {
            waitUntil: 'networkidle0'
        })

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '12mm',
                right: '12mm',
                bottom: '12mm',
                left: '12mm'
            }
        })

        return pdfBuffer

    } finally {

        await browser.close()

    }
}

module.exports = {
    generateResumePdf
}