import React from 'react'
import { ScrollTrigger, SplitText } from 'gsap/all'
import gsap from 'gsap'

// ===========================================
import Navbar  from './components/Navbar.tsx'
import Hero from './components/Hero.tsx'

gsap.registerPlugin(ScrollTrigger, SplitText)

export const App: React.FC = () => {
	return (
		<main>
			<Navbar />
			<Hero />
			<div className='h-dvh bg-black' />
		</main>
	)
}

export default App