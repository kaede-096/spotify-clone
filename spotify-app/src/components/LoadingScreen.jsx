import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useTheme } from '../context/ThemeContext'
import SpotifyLogo from './SpotifyLogo'

const THEME_COLORS = {
  dark: {
    bg: '#000000',
    logo: '#1DB954',
    text: '#1DB954',
    sub: 'rgba(255,255,255,0.45)',
    glow: 'rgba(29,185,84,0.35)',
  },
  light: {
    bg: '#ffffff',
    logo: '#1DB954',
    text: '#168f43',
    sub: 'rgba(0,0,0,0.45)',
    glow: 'rgba(29,185,84,0.25)',
  },
}

export default function LoadingScreen({ onComplete }) {
  const { theme } = useTheme()
  const colors = THEME_COLORS[theme] || THEME_COLORS.dark

  const containerRef = useRef(null)
  const logoWrapRef = useRef(null)
  const svgRef = useRef(null)
  const textRef = useRef(null)
  const taglineRef = useRef(null)
  const glowRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      gsap.set(containerRef.current, { opacity: 1, backgroundColor: colors.bg })
      gsap.set(logoWrapRef.current, { opacity: 0, y: 60, scale: 0.8 })
      gsap.set(svgRef.current, { opacity: 0, scale: 0.5 })
      gsap.set(textRef.current, { opacity: 0, y: 24, letterSpacing: '0.45em', color: colors.text })
      gsap.set(taglineRef.current, { opacity: 0, y: 10, color: colors.sub })
      gsap.set(glowRef.current, { opacity: 0, scale: 0.5, backgroundColor: colors.glow })

      tl.to(logoWrapRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'expo.out' })
        .to(svgRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2.5)' }, '-=0.6')
        .to(glowRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .to(glowRef.current, {
          scale: 1.3, opacity: 0.55, duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: 2,
        }, '-=0.1')
        .to(textRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' }, '-=2')
        .to(textRef.current, { letterSpacing: '-0.02em', duration: 0.5, ease: 'expo.out' }, '-=0.35')
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
        .to({}, { duration: 0.8 })
        .to(logoWrapRef.current, { y: -32, opacity: 0, duration: 0.65, ease: 'power3.inOut' })
        .to(overlayRef.current, {
          scaleY: 1, duration: 0.42, ease: 'power4.inOut', transformOrigin: 'bottom center',
        }, '-=0.2')
        .to(overlayRef.current, {
          scaleY: 0, duration: 0.42, ease: 'power4.inOut', transformOrigin: 'top center',
        })
        .to(containerRef.current, {
          opacity: 0, duration: 0.35, ease: 'power2.inOut',
          onComplete: () => onComplete?.(),
        }, '-=0.15')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div ref={overlayRef} style={{ position: 'absolute', inset: 0, background: '#1DB954', transform: 'scaleY(0)', zIndex: 10, pointerEvents: 'none' }} />
      <div ref={glowRef} style={{ position: 'absolute', width: 240, height: 240, borderRadius: '50%', pointerEvents: 'none' }} />

      <div ref={logoWrapRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
        <div ref={svgRef} style={{ position: 'relative' }}>
          <SpotifyLogo size={100} color={colors.logo} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span ref={textRef} style={{ fontSize: 44, fontWeight: 900, letterSpacing: '0.4em', fontFamily: "'Inter', sans-serif", lineHeight: 1, userSelect: 'none' }}>
            SPOTIFY
          </span>
          <span ref={taglineRef} style={{ fontSize: 13, letterSpacing: '0.25em', fontWeight: 400, textTransform: 'uppercase' }}>
            Music for everyone
          </span>
        </div>
      </div>
    </div>
  )
}