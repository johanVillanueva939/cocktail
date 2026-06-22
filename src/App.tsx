import React from 'react'
import { ScrollTrigger, SplitText } from 'gsap/all'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger, SplitText)

export const App: React.FC = () => {
	return (
		<section className='flex-center h-[100vh]'>
			<h1 className=''>app</h1>
		</section>
	)
}

export default App