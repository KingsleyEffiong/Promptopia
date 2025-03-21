import '@styles/global.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { Suspense } from 'react'

export const metadata = {
    title: 'Promptopia',
    description: 'Discover & Share AI Prompts',
}

function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient"></div>
                    </div>
                    <main className='app'>
                        <Nav />
                        <Suspense fallback={<div>Loading...</div>}>
                            {children}
                        </Suspense>
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout
