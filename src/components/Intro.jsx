import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Intro = () => {
  const stageRef = useRef(null);

  useEffect(() => {
    // Sparkles Generation
    const sparklesContainer = document.getElementById('sparkles-container');
    const sparklePositions = [
      [15, 20], [25, 15], [8, 50], [18, 70], [30, 85], [85, 15], [92, 30], [80, 65], [90, 75], [70, 90],
      [45, 5], [55, 95], [5, 45], [95, 55], [35, 92], [65, 8], [12, 35], [88, 45], [42, 78], [58, 22],
      [22, 60], [78, 40], [50, 12], [50, 88], [38, 38], [62, 62]
    ];

    if (sparklesContainer.innerHTML === '') {
      sparklePositions.forEach((pos) => {
        const s = document.createElement('div');
        s.className = 'sparkle';
        s.style.left = pos[0] + '%';
        s.style.top = pos[1] + '%';
        const size = (2 + Math.random() * 4) + 'px';
        s.style.width = size;
        s.style.height = size;
        sparklesContainer.appendChild(s);
      });
    }

    // ---- GSAP Timeline ----
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    const branches = document.querySelectorAll('.branch-path');

    // SVG Paths Initial State
    branches.forEach(p => {
      const len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    });

    gsap.set('#center-ring', { opacity: 0, scale: 0, transformOrigin: '720px 450px' });
    gsap.set('#center-ring2', { opacity: 0, scale: 0, transformOrigin: '720px 450px' });
    gsap.set('#leaf-accents', { opacity: 0 });

    // Animation Sequence
    tl.to('#center-ring', { opacity: 0.5, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }, 0)
      .to('#center-ring2', { opacity: 0.35, scale: 1, duration: 1, ease: 'back.out(1.2)' }, 0.2)
      .to([branches[0], branches[4], branches[9], branches[15]], {
        strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut', stagger: 0.15
      }, 0.4)
      .to([branches[1], branches[2], branches[5], branches[6], branches[10], branches[11], branches[16], branches[17]], {
        strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', stagger: 0.08
      }, 1.0)
      .to([...branches].slice(18, 29), {
        strokeDashoffset: 0, duration: 0.8, ease: 'power2.out', stagger: 0.04
      }, 1.6)
      .to([branches[29], branches[30], branches[31], branches[32]], {
        strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut', stagger: 0.1
      }, 1.2)
      .to('#leaf-accents', { opacity: 1, duration: 0.5 }, 2.4)
      .to('#brand-header', { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.inOut' }, 2.0)
      .to('#epigraph', { clipPath: 'inset(0 0 0% 0)', duration: 1.0, ease: 'power3.out' }, 2.6)
      .to('#choose-word', { clipPath: 'inset(0 0% 0 0%)', duration: 0.9, ease: 'back.out(1.2)' }, 3.2)
      .to('.portal-name, .portal-subtitle', { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power3.out', stagger: 0.1 }, 4.4)
      .to('.sparkle', {
        opacity: () => 0.3 + Math.random() * 0.6,
        y: () => -10 + Math.random() * -20,
        duration: () => 1 + Math.random() * 2,
        stagger: { amount: 2, from: 'random' }
      }, 3.8)
      .to('#footer-text', { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power3.out' }, 5.0);

    // Continuous breathing
    gsap.to('#choose-word', {
      textShadow: '0 0 80px rgba(201,168,76,0.6)',
      duration: 2, ease: 'sine.inOut', repeat: -1, yoyo: true
    });

  }, []);

  return (
    <div className="intro-body">
      <div id="stage" ref={stageRef}>
        {/* SVG Branch Lines */}
        <svg id="branch-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <path className="branch-path" d="M720,450 Q718,380 715,310 Q712,260 700,200" strokeWidth="1.5" opacity="0.6" filter="url(#glow)" />
          <path className="branch-path" d="M715,310 Q680,280 640,240 Q610,210 570,180" strokeWidth="1" opacity="0.5" />
          <path className="branch-path" d="M715,310 Q750,280 780,250 Q810,220 840,190" strokeWidth="1" opacity="0.5" />
          <path className="branch-path" d="M700,200 Q660,170 620,150" strokeWidth="0.8" opacity="0.4" />
          <path className="branch-path" d="M700,200 Q730,165 760,145" strokeWidth="0.8" opacity="0.4" />
          <path className="branch-path" d="M640,240 Q600,220 560,215" strokeWidth="0.6" opacity="0.35" />
          <path className="branch-path" d="M640,240 Q620,200 605,175" strokeWidth="0.6" opacity="0.35" />
          <path className="branch-path" d="M780,250 Q820,230 860,225" strokeWidth="0.6" opacity="0.35" />
          <path className="branch-path" d="M780,250 Q800,215 815,185" strokeWidth="0.6" opacity="0.35" />
          <path className="branch-path" d="M720,450 Q640,445 560,440 Q480,435 400,440" strokeWidth="1.5" opacity="0.6" filter="url(#glow)" />
          <path className="branch-path" d="M560,440 Q530,400 500,360 Q480,330 460,290" strokeWidth="1" opacity="0.5" />
          <path className="branch-path" d="M560,440 Q540,480 520,510 Q500,540 475,560" strokeWidth="1" opacity="0.5" />
          <path className="branch-path" d="M500,360 Q460,340 420,330" strokeWidth="0.7" opacity="0.4" />
          <path className="branch-path" d="M500,360 Q490,320 480,295" strokeWidth="0.7" opacity="0.4" />
          <path className="branch-path" d="M460,290 Q430,270 400,265" strokeWidth="0.55" opacity="0.35" />
          <path className="branch-path" d="M460,290 Q450,255 445,225" strokeWidth="0.55" opacity="0.35" />
          <path className="branch-path" d="M520,510 Q490,530 460,545" strokeWidth="0.55" opacity="0.35" />
          <path className="branch-path" d="M520,510 Q510,545 500,570" strokeWidth="0.55" opacity="0.35" />
          <path className="branch-path" d="M720,450 Q800,445 880,440 Q960,435 1040,440" strokeWidth="1.5" opacity="0.6" filter="url(#glow)" />
          <path className="branch-path" d="M880,440 Q910,400 940,360 Q960,330 980,290" strokeWidth="1" opacity="0.5" />
          <path className="branch-path" d="M880,440 Q900,480 920,510 Q940,540 965,560" strokeWidth="1" opacity="0.5" />
          <path className="branch-path" d="M940,360 Q980,340 1020,330" strokeWidth="0.7" opacity="0.4" />
          <path className="branch-path" d="M940,360 Q950,320 960,295" strokeWidth="0.7" opacity="0.4" />
          <path className="branch-path" d="M980,290 Q1010,270 1040,265" strokeWidth="0.55" opacity="0.35" />
          <path className="branch-path" d="M980,290 Q990,255 995,225" strokeWidth="0.55" opacity="0.35" />
          <path className="branch-path" d="M920,510 Q950,530 980,545" strokeWidth="0.55" opacity="0.35" />
          <path className="branch-path" d="M920,510 Q930,545 940,570" strokeWidth="0.55" opacity="0.35" />
          <path className="branch-path" d="M720,450 Q722,530 724,610 Q726,680 728,750" strokeWidth="1.5" opacity="0.6" filter="url(#glow)" />
          <path className="branch-path" d="M724,610 Q680,640 640,670 Q600,695 560,720" strokeWidth="1" opacity="0.5" />
          <path className="branch-path" d="M724,610 Q760,640 800,665 Q840,690 875,715" strokeWidth="1" opacity="0.5" />
          <path className="branch-path" d="M640,670 Q610,690 580,700" strokeWidth="0.55" opacity="0.35" />
          <path className="branch-path" d="M800,665 Q830,685 860,695" strokeWidth="0.55" opacity="0.35" />
          <path className="branch-path" d="M728,750 Q700,770 670,785" strokeWidth="0.6" opacity="0.4" />
          <path className="branch-path" d="M728,750 Q750,765 775,780" strokeWidth="0.6" opacity="0.4" />
          <path className="branch-path" d="M720,450 Q660,390 600,330 Q550,280 500,230" strokeWidth="1.2" opacity="0.45" />
          <path className="branch-path" d="M600,330 Q560,310 520,305" strokeWidth="0.65" opacity="0.35" />
          <path className="branch-path" d="M720,450 Q780,390 840,330 Q890,280 940,230" strokeWidth="1.2" opacity="0.45" />
          <path className="branch-path" d="M840,330 Q880,310 920,305" strokeWidth="0.65" opacity="0.35" />

          <circle cx="720" cy="450" r="40" fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity="0" id="center-ring" />
          <circle cx="720" cy="450" r="55" fill="none" stroke="var(--gold)" strokeWidth="0.4" strokeDasharray="4,8" opacity="0" id="center-ring2" />

          <g id="leaf-accents" opacity="0">
            <circle cx="570" cy="180" r="3" fill="var(--gold)" opacity="0.6" />
            <circle cx="840" cy="190" r="3" fill="var(--gold)" opacity="0.6" />
            <circle cx="460" cy="290" r="2.5" fill="var(--gold)" opacity="0.5" />
            <circle cx="980" cy="290" r="2.5" fill="var(--gold)" opacity="0.5" />
            <circle cx="560" cy="720" r="3" fill="var(--gold)" opacity="0.6" />
            <circle cx="875" cy="715" r="3" fill="var(--gold)" opacity="0.6" />
            <circle cx="400" cy="440" r="2" fill="var(--gold)" opacity="0.4" />
            <circle cx="1040" cy="440" r="2" fill="var(--gold)" opacity="0.4" />
          </g>
        </svg>

        {/* Brand Header */}
        <div id="brand-header">
          <div className="label">Est. MMXXIV &nbsp;·&nbsp; A World Beyond Limits</div>
          <h1>SINE FINE</h1>
        </div>

        {/* Epigraph */}
        <div id="epigraph">
          <p>Every choice is a door.<br />Every door, a labyrinth.<br />Every labyrinth, a universe waiting to be born.</p>
          <div className="attr">— The Sine Fine Codex</div>
        </div>

        {/* Central CHOOSE */}
        <div id="choose-word">CHOOSE</div>
        {/* Portals */}
        <div className="portal-container" id="portal-somnium">
          <div className="portal-name">SOMNIUM</div>
          <div className="portal-subtitle">The Dream Realm</div>
        </div>

        <div className="portal-container" id="portal-fabula">
          <div className="portal-name">FABULA</div>
          <div className="portal-subtitle">The Story Realm</div>
        </div>

        <div className="portal-container" id="portal-limen">
          <div className="portal-name">LIMEN</div>
          <div className="portal-subtitle">The Threshold</div>
        </div>

        <div id="sparkles-container"></div>

        <div id="footer-text">
          <p>sine fine &nbsp;·&nbsp; without end &nbsp;·&nbsp; beyond limits</p>
        </div>
      </div>
    </div>
  );
};

export default Intro;