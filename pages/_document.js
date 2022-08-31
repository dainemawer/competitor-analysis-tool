import { Html, Head, Main, NextScript } from 'next/document'

/**
 * Document
 * 
 * Custom NextJS Document override
 * 
 * @param {*} props
 * @returns void
 */
export default function Document() {
    return (
        <Html lang="en-US">
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}