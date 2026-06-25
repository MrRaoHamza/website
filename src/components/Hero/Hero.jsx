import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';

const Hero = () => {
  const { profileData } = useData();
  const canvasRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // 3D Card Tilt Handler
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    // Map mouse position to degree bounds (e.g. -10 to 10 deg)
    const rotateX = ((yc - y) / yc) * 10;
    const rotateY = -((xc - x) / xc) * 10;
    setTilt({ rotateX, rotateY });
  };

  const handleCardMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  // Neural Network Node Mesh Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    const particleCount = 45;

    // Track mouse coordinates over the card for canvas node connections
    let mouse = { x: null, y: null, radius: 130 };

    const handleCanvasMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleCanvasMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', handleCanvasMouseMove);
    parent.addEventListener('mouseleave', handleCanvasMouseLeave);

    const resize = () => {
      canvas.width = parent.clientWidth || 500;
      canvas.height = parent.clientHeight || 500;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2.5 + 1.5;
        this.originalVx = this.vx;
        this.originalVy = this.vy;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Dampen velocity back to original slowly
        this.vx += (this.originalVx - this.vx) * 0.05;
        this.vy += (this.originalVy - this.vy) * 0.05;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#3B82F6';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        // Draw mouse interactive line & add subtle repulsion force
        if (mouse.x !== null && mouse.y !== null) {
          const dxMouse = particles[i].x - mouse.x;
          const dyMouse = particles[i].y - mouse.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          
          if (distMouse < mouse.radius) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.35 * (1 - distMouse / mouse.radius)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Repel particles slightly
            const force = (mouse.radius - distMouse) / mouse.radius;
            particles[i].vx += (dxMouse / distMouse) * force * 0.3;
            particles[i].vy += (dyMouse / distMouse) * force * 0.3;
          }
        }

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.18 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      drawLines();
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      parent.removeEventListener('mousemove', handleCanvasMouseMove);
      parent.removeEventListener('mouseleave', handleCanvasMouseLeave);
    };
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = (e) => {
    e.preventDefault();
    if (profileData?.resumeUrl) {
      if (profileData.resumeUrl.startsWith('data:')) {
        const link = document.createElement('a');
        link.href = profileData.resumeUrl;
        link.download = `${(profileData.name || 'Rao_Hamza_Irshad').replace(/\s+/g, '_')}_Resume.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(profileData.resumeUrl, '_blank', 'noopener,noreferrer');
      }
    } else {
      alert("Downloading Rao's Resume PDF Template (Simulated)...");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Letter by letter animation helper
  const wordVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.07,
        duration: 0.65,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  const firstName = profileData.name.split(' ')[0];
  const greetText = `Hi, I'm ${firstName}`;

  return (
    <section className="min-h-screen relative flex items-center justify-center pt-24 overflow-hidden bg-slate-50/20 dark:bg-transparent">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/[0.03] dark:bg-blue-500/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text details */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Sparkle Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/15 dark:border-blue-500/30">
              <Sparkles size={13} className="text-blue-500 dark:text-blue-400 animate-pulse" />
              <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                {profileData.seekingStatus}
              </span>
            </motion.div>

            {/* Main Headline (Word Reveal) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-slate-900 dark:text-white leading-tight overflow-hidden flex flex-wrap justify-center lg:justify-start gap-x-3">
              {greetText.split(' ').map((word, idx) => (
                <motion.span
                  key={idx}
                  custom={idx}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className={word === firstName ? "text-gradient inline-block" : "inline-block"}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Sub-titles with slide-in staggers */}
            <motion.div variants={itemVariants} className="text-xl sm:text-2xl font-bold font-display text-slate-700 dark:text-text-secondary-dark flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-1">
              {profileData.subTitles.map((sub, sIdx) => (
                <React.Fragment key={sub}>
                  <span className={sIdx % 3 === 0 ? "text-blue-600 dark:text-blue-400" : sIdx % 3 === 1 ? "text-cyan-600 dark:text-cyan-400" : "text-purple-600 dark:text-purple-400"}>
                    {sub}
                  </span>
                  {sIdx < profileData.subTitles.length - 1 && <span className="text-slate-300 dark:text-dark-border">•</span>}
                </React.Fragment>
              ))}
            </motion.div>

            {/* Bio paragraph */}
            <motion.p variants={itemVariants} className="max-w-xl mx-auto lg:mx-0 text-sm sm:text-base text-slate-500 dark:text-text-secondary-dark leading-relaxed">
              {profileData.bioParagraphs[0] || ""}
            </motion.p>

            {/* Buttons row */}
            <motion.div variants={itemVariants} className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => handleScrollTo('projects')}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight size={15} />
              </button>

              <div className="flex w-full sm:w-auto gap-3">
                <button
                  onClick={handleDownloadResume}
                  className="w-1/2 sm:w-auto flex items-center justify-center space-x-1.5 px-5 py-3 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-slate-700 dark:text-white font-semibold text-xs hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-dark-surface hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Download size={14} />
                  <span>Resume</span>
                </button>

                <button
                  onClick={() => handleScrollTo('contact')}
                  className="w-1/2 sm:w-auto flex items-center justify-center space-x-1.5 px-5 py-3 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-slate-700 dark:text-white font-semibold text-xs hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-dark-surface hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Mail size={14} />
                  <span>Contact</span>
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Animation Canvas & Professional Photo Card (3D Tilt Card) */}
          <div className="lg:col-span-5 w-full flex justify-center items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotateX: tilt.rotateX, 
                rotateY: tilt.rotateY
              }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              transition={{ 
                type: 'spring', 
                stiffness: 250, 
                damping: 20
              }}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              className="w-full max-w-sm sm:max-w-md lg:max-w-none aspect-square lg:aspect-[4/5] rounded-3xl border border-slate-200/50 dark:border-dark-border/40 bg-white/40 dark:bg-dark-card/25 shadow-xl relative overflow-hidden group glow-card cursor-pointer"

            >
              {/* Background Canvas Node Grid (positioned as overlay/underlay) */}
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-20 pointer-events-none opacity-40 dark:opacity-60" />
              
              {/* Profile Image taking the full card size */}
              <motion.img 
                src={profileData.profileImage} 
                alt={profileData.name} 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-[106%] object-cover relative z-10 group-hover:scale-[1.03] transition-all duration-700 ease-out pointer-events-none"
                style={{ marginTop: '-3%', transformStyle: 'preserve-3d', translateZ: '30px' }}
              />
              
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

