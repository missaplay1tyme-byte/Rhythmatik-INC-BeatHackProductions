import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { VolumeX, Volume2, Waves } from 'lucide-react';

export function AmbientSoundscape() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      if (!audioCtxRef.current) {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioCtxRef.current = ctx;

        // Master Gain
        const masterGain = ctx.createGain();
        masterGain.gain.value = 0; // Start at 0 for fade in
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // 1. Low Drone (Sub-bass)
        const droneOsc = ctx.createOscillator();
        droneOsc.type = 'sine';
        droneOsc.frequency.value = 45; // Deep sub frequency
        
        const droneGain = ctx.createGain();
        droneGain.gain.value = 0.3; // Low volume for drone
        
        droneOsc.connect(droneGain);
        droneGain.connect(masterGain);
        droneOsc.start();

        // 2. Subtle Noise / Glitch layer
        const bufferSize = ctx.sampleRate * 2; // 2 seconds of noise
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const noiseSrc = ctx.createBufferSource();
        noiseSrc.buffer = noiseBuffer;
        noiseSrc.loop = true;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = 2000;
        noiseFilter.Q.value = 10;

        const noiseGain = ctx.createGain();
        noiseGain.gain.value = 0.015; // Very quiet default

        noiseSrc.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(masterGain);
        noiseSrc.start();

        // Random Glitch Effect Logic
        intervalRef.current = window.setInterval(() => {
          if (ctx.state !== 'running') return;
          
          // 30% chance of a glitch every 2 seconds
          if (Math.random() > 0.7) {
            const now = ctx.currentTime;
            
            // Randomize filter frequency for a glitchy sweeping sound
            noiseFilter.frequency.setTargetAtTime(
              Math.random() * 6000 + 500,
              now,
              0.01
            );
            
            // Spike the noise volume briefly
            noiseGain.gain.setTargetAtTime(0.08, now, 0.01);
            noiseGain.gain.setTargetAtTime(0.015, now + 0.15, 0.05);

            // Slightly detune the drone temporarily
            droneOsc.frequency.setTargetAtTime(45 + (Math.random() * 10 - 5), now, 0.01);
            droneOsc.frequency.setTargetAtTime(45, now + 0.2, 0.1);
          }
        }, 2000);
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      // Smooth fade in
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
        gainNodeRef.current.gain.setTargetAtTime(1, audioCtxRef.current.currentTime, 1);
      }
    } else {
      // Smooth fade out and suspend
      if (audioCtxRef.current && gainNodeRef.current) {
        const ctx = audioCtxRef.current;
        gainNodeRef.current.gain.cancelScheduledValues(ctx.currentTime);
        gainNodeRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.5);
        
        setTimeout(() => {
          if (audioCtxRef.current && !isPlaying) {
             audioCtxRef.current.suspend();
          }
        }, 1500);
      }
    }
  }, [isPlaying]);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsPlaying(!isPlaying)}
      className={`fixed bottom-6 left-6 z-40 p-4 rounded-full shadow-lg transition-all flex items-center gap-3 ${
        isPlaying 
          ? 'bg-[#111] border border-[#39FF14] text-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.2)]' 
          : 'bg-[#111] border border-white/10 text-white/50 hover:bg-white/5 hover:text-white'
      }`}
      title={isPlaying ? "Mute Ambient Environment" : "Play Ambient Environment"}
    >
      <div className="relative flex items-center justify-center">
        {isPlaying ? (
          <>
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-[#39FF14] rounded-full filter blur-md"
            />
            <Waves size={24} className="relative z-10" />
          </>
        ) : (
          <VolumeX size={24} className="relative z-10" />
        )}
      </div>
      
      <span className={`font-mono text-[10px] uppercase tracking-widest font-bold hidden md:block pr-2 ${isPlaying ? 'text-[#39FF14]' : 'text-white/50'}`}>
        Ambience
      </span>
    </motion.button>
  );
}
