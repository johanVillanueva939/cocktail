import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import React, { useRef } from 'react'
import { useMediaQuery } from 'react-responsive'

gsap.registerPlugin(ScrollTrigger, SplitText)

const VIDEO_FPS = 30 // ajusta esto al fps real de tu video

const Hero: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null)

	const isMobile = useMediaQuery({ maxWidth: 767 })

	useGSAP(() => {
		const heroSplit = new SplitText('.title', { type: 'chars, words' })
		const paragraphSplit = new SplitText('.subtitle', { type: 'lines' })

		heroSplit.chars.forEach((char) => char.classList.add('text-gradient'))

		gsap.from(heroSplit.chars, {
			yPercent: 100,
			duration: 1.8,
			ease: 'expo.out',
			stagger: 0.06
		})

		gsap.from(paragraphSplit.lines, {
			opacity: 0,
			yPercent: 100,
			duration: 1.8,
			ease: 'expo.out',
			stagger: 0.06,
			delay: 1
		})

		gsap.timeline({
			scrollTrigger: {
				trigger: '#hero',
				start: 'top top',
				end: 'bottom top',
				scrub: true,
			}
		})
			.to('.right-leaf', { y: 200 }, 0)
			.to('.left-leaf', { y: -200 }, 0)

		const startValue = isMobile ? 'top 50%' : 'top 60%'
		const endValue = isMobile ? '120% top' : 'bottom top'

		const videoEl = videoRef.current
		if (!videoEl) return

		// Quantizamos currentTime al frame más cercano usando el fps real del video,
		// así el avance se ve "frame por frame" en vez de un blur continuo
		const frameDuration = 1 / VIDEO_FPS

		const setupVideoScroll = () => {
			const duration = videoEl.duration

			gsap.to(videoEl, {
				currentTime: duration,
				ease: 'none',
				scrollTrigger: {
					trigger: 'video',
					start: startValue,
					end: endValue,
					// scrub numérico (en vez de true) añade una pequeña inercia/suavizado
					// al movimiento, evitando saltos brúscos al hacer scroll rápido
					scrub: 0.5,
				},
				onUpdate: function () {
					// snapea el tiempo al frame exacto más cercano
					const snapped = Math.round(videoEl.currentTime / frameDuration) * frameDuration
					if (Math.abs(videoEl.currentTime - snapped) > 0.0001) {
						videoEl.currentTime = snapped
					}
				},
			})
		}

		if (videoEl.readyState >= 1) {
			setupVideoScroll()
		} else {
			videoEl.addEventListener('loadedmetadata', setupVideoScroll)
		}

		return () => {
			videoEl.removeEventListener('loadedmetadata', setupVideoScroll)
		}
	}, [isMobile])

	return (
		<div>
			<section id="hero" className='noisy'>
				<h1 className='title'>MOJITO</h1>
				<img src="/images/hero-left-leaf.png" alt="left-leaf" className='left-leaf' />
				<img src="/images/hero-right-leaf.png" alt="right-leaf" className='right-leaf' />

				<div className='body'>
					<div className='content'>
						<div className='space-y-5 hidden md:block'>
							<p>Cool. Crisp. Classic.</p>
							<p className='subtitle'>Sip the Spirit <br /> of Summer</p>
						</div>
						<div className='view-cocktails'>
							<p className="subtitle">
								Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses.
							</p>
							<a href="#cocktails">View Cocktails</a>
						</div>
					</div>
				</div>
			</section>
			<div className='video absolute inset-0'>
				<video
					ref={videoRef}
					src="/videos/input.mp4"
					muted
					playsInline
					preload='auto'
				/>
			</div>
		</div>
	)
}

export default Hero