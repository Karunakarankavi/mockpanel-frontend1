import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './App.css';
// Animate body left and right
export function moveBody(
  object3D: any,
  amplitude: number = 0.15,
  period: number = 4.0
): () => void {
  let animationFrameId: number | null = null;
  const startTime = performance.now();
  // Find the spine bone (try common names)
    let spineBones: any[] = [];
  if (object3D && object3D.traverse) {
    object3D.traverse((child: any) => {
      console.log(child.name);
      
      if (
        child.isBone &&
        (child.name.toLowerCase().includes('spine') || child.name === 'Spine' || child.name === 'spine')
      ) {
          spineBones.push(child);
      }
    });
  }
  console.log(spineBones);
  
  function animate(now: number) {
    const elapsed = (now - startTime) / 1000;
    // Animate each spine bone with a phase offset for cascading effect
    spineBones.forEach((bone: any, i: number) => {
      const phase = i * 0.3; // phase offset per bone
      const angle = Math.sin((2 * Math.PI * elapsed) / period + phase) * amplitude * (1 - i * 0.12); // decreasing amplitude for lower bones
      bone.rotation.y = angle;
    });
    animationFrameId = requestAnimationFrame(animate);
  }
  animationFrameId = requestAnimationFrame(animate);
  return () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    spineBones.forEach((bone: any) => {
      bone.rotation.y = 0;
    });
  };
}

const phenomeMap = {
  "p":   { "jawOpen": 0.2, "mouthFunnel": 0.8, "mouthPucker": 0.6, "tongue_out": 0.0, "tongue_up": 0.0 },
  "b":   { "jawOpen": 0.2, "mouthFunnel": 0.8, "mouthPucker": 0.6, "tongue_out": 0.0, "tongue_up": 0.0 },
  "m":   { "jawOpen": 0.2, "mouthFunnel": 0.7, "mouthPucker": 0.7, "tongue_out": 0.0, "tongue_up": 0.0 },

  "t":   { "jawOpen": 0.3, "mouthFunnel": 0.2, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.8 },
  "d":   { "jawOpen": 0.3, "mouthFunnel": 0.2, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.8 },
  "n":   { "jawOpen": 0.3, "mouthFunnel": 0.2, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.7 },

  "k":   { "jawOpen": 0.4, "mouthFunnel": 0.0, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.9 },
  "g":   { "jawOpen": 0.4, "mouthFunnel": 0.0, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.9 },
  "ŋ":   { "jawOpen": 0.4, "mouthFunnel": 0.0, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.9 },

  "f":   { "jawOpen": 0.2, "mouthFunnel": 0.5, "mouthPucker": 0.2, "tongue_out": 0.0, "tongue_up": 0.0 },
  "v":   { "jawOpen": 0.2, "mouthFunnel": 0.5, "mouthPucker": 0.2, "tongue_out": 0.0, "tongue_up": 0.0 },

  "θ":   { "jawOpen": 0.3, "mouthFunnel": 0.3, "mouthPucker": 0.0, "tongue_out": 0.6, "tongue_up": 0.0 },
  "ð":   { "jawOpen": 0.3, "mouthFunnel": 0.3, "mouthPucker": 0.0, "tongue_out": 0.6, "tongue_up": 0.0 },

  "s":   { "jawOpen": 0.3, "mouthFunnel": 0.2, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.7 },
  "z":   { "jawOpen": 0.3, "mouthFunnel": 0.2, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.7 },

  "ʃ":   { "jawOpen": 0.3, "mouthFunnel": 0.5, "mouthPucker": 0.5, "tongue_out": 0.0, "tongue_up": 0.5 },
  "ʒ":   { "jawOpen": 0.3, "mouthFunnel": 0.5, "mouthPucker": 0.5, "tongue_out": 0.0, "tongue_up": 0.5 },

  "h":   { "jawOpen": 0.4, "mouthFunnel": 0.0, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.0 },

  "tʃ":  { "jawOpen": 0.3, "mouthFunnel": 0.5, "mouthPucker": 0.3, "tongue_out": 0.0, "tongue_up": 0.6 },
  "dʒ":  { "jawOpen": 0.3, "mouthFunnel": 0.5, "mouthPucker": 0.3, "tongue_out": 0.0, "tongue_up": 0.6 },

  "l":   { "jawOpen": 0.3, "mouthFunnel": 0.1, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.9 },
  "r":   { "jawOpen": 0.3, "mouthFunnel": 0.4, "mouthPucker": 0.5, "tongue_out": 0.0, "tongue_up": 0.4 },
  "j":   { "jawOpen": 0.2, "mouthFunnel": 0.2, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.6 },
  "w":   { "jawOpen": 0.2, "mouthFunnel": 0.6, "mouthPucker": 0.8, "tongue_out": 0.0, "tongue_up": 0.0 },

  "iː":  { "jawOpen": 0.2, "mouthFunnel": 0.1, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.8 },
  "ɪ":   { "jawOpen": 0.2, "mouthFunnel": 0.1, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.7 },
  "e":   { "jawOpen": 0.3, "mouthFunnel": 0.2, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.6 },
  "æ":   { "jawOpen": 0.5, "mouthFunnel": 0.2, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.4 },
  "ʌ":   { "jawOpen": 0.4, "mouthFunnel": 0.2, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.5 },
  "ɒ":   { "jawOpen": 0.6, "mouthFunnel": 0.3, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.3 },
  "ɔː":  { "jawOpen": 0.6, "mouthFunnel": 0.5, "mouthPucker": 0.3, "tongue_out": 0.0, "tongue_up": 0.4 },
  "ɑː":  { "jawOpen": 0.7, "mouthFunnel": 0.3, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.3 },
  "uː":  { "jawOpen": 0.2, "mouthFunnel": 0.7, "mouthPucker": 0.8, "tongue_out": 0.0, "tongue_up": 0.2 },
  "ʊ":   { "jawOpen": 0.3, "mouthFunnel": 0.6, "mouthPucker": 0.7, "tongue_out": 0.0, "tongue_up": 0.2 },
  "ɜː":  { "jawOpen": 0.4, "mouthFunnel": 0.3, "mouthPucker": 0.2, "tongue_out": 0.0, "tongue_up": 0.5 },
  "ə":   { "jawOpen": 0.3, "mouthFunnel": 0.2, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.4 },

  "eɪ":  { "jawOpen": 0.4, "mouthFunnel": 0.2, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.7 },
  "aɪ":  { "jawOpen": 0.5, "mouthFunnel": 0.2, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.7 },
  "ɔɪ":  { "jawOpen": 0.5, "mouthFunnel": 0.4, "mouthPucker": 0.4, "tongue_out": 0.0, "tongue_up": 0.6 },
  "aʊ":  { "jawOpen": 0.6, "mouthFunnel": 0.5, "mouthPucker": 0.6, "tongue_out": 0.0, "tongue_up": 0.4 },
  "əʊ":  { "jawOpen": 0.5, "mouthFunnel": 0.5, "mouthPucker": 0.5, "tongue_out": 0.0, "tongue_up": 0.5 },
  "ɪə":  { "jawOpen": 0.4, "mouthFunnel": 0.2, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.7 },
  "eə":  { "jawOpen": 0.5, "mouthFunnel": 0.2, "mouthPucker": 0.0, "tongue_out": 0.0, "tongue_up": 0.6 },
  "ʊə":  { "jawOpen": 0.5, "mouthFunnel": 0.5, "mouthPucker": 0.4, "tongue_out": 0.0, "tongue_up": 0.5 }
}


// Blink both eyes together
export function makeBlinkBoth(
  eyelidMesh: any,
  blinkMorphIndexL: number,
  blinkMorphIndexR: number,
  duration: number = 1.0,
  interval: number = 10.0
): () => void {
  console.log("makeBlinkBoth called with interval:", interval, "duration:", duration, "indices:", blinkMorphIndexL, blinkMorphIndexR);
  let animationFrameId: number | null = null;
  let lastBlinkTime: number = performance.now();
  let blinking = false;

  function animate(now: number) {
    const elapsed = (now - lastBlinkTime) / 1000;
    if (!blinking && elapsed >= interval) {
      blinking = true;
      lastBlinkTime = now;
      console.log("Blink started at", now, "interval met:", interval);
    }
    if (blinking) {
      const blinkElapsed = (now - lastBlinkTime) / 1000;
      let t = blinkElapsed / duration;
      t = Math.max(0, Math.min(1, t));
      // Smooth in and out (ease in/out)
      let smoothValue = t < 0.5
        ? 2 * t // ease in
        : 2 * (1 - t); // ease out
      if (eyelidMesh && typeof blinkMorphIndexL === 'number' && typeof blinkMorphIndexR === 'number') {
        eyelidMesh.morphTargetInfluences[blinkMorphIndexL] = smoothValue;
        eyelidMesh.morphTargetInfluences[blinkMorphIndexR] = smoothValue;
        // console.log("Blink morphs set to", smoothValue, "at", now);
      }
      if (blinkElapsed >= duration) {
        blinking = false;
        if (eyelidMesh && typeof blinkMorphIndexL === 'number' && typeof blinkMorphIndexR === 'number') {
          eyelidMesh.morphTargetInfluences[blinkMorphIndexL] = 0;
          eyelidMesh.morphTargetInfluences[blinkMorphIndexR] = 0;
          console.log("Blink morphs reset to 0 at", now);
        }
        lastBlinkTime = now;
      }
    }
    animationFrameId = requestAnimationFrame(animate);
  }
  animationFrameId = requestAnimationFrame(animate);
  return () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    if (eyelidMesh && typeof blinkMorphIndexL === 'number' && typeof blinkMorphIndexR === 'number') {
      eyelidMesh.morphTargetInfluences[blinkMorphIndexL] = 0;
      eyelidMesh.morphTargetInfluences[blinkMorphIndexR] = 0;
      console.log("Cleanup: Blink morphs reset to 0");
    }
  };
}

// Type-safe morph target keys
export type MorphTargetKey = 'jawOpen' | 'mouthFunnel' | 'mouthPucker' | 'tongue_out' | 'tongue_up';

export type BlendDatum = {
  time: number;
  phoneme: string;
  jawOpen?: number;
  mouthFunnel?: number;
  mouthPucker?: number;
  tongue_out?: number;
  tongue_up?: number;
};

export type MeshRefs = {
  mouthMesh?: any;
  lowerBeardMesh?: any;
  lowerTeethMesh?: any;
  tongueMesh?: any;
  jawOpen?: number;
  mouthFunnel?: number;
  mouthPucker?: number;
  jawOpenBeard?: number;
  lowerTeethJawOpen?: number;
  tongueOut?: number;
  tongueUp?: number;
};

export function makeSpeech(
  blendData: BlendDatum[],
  meshRefs: MeshRefs,
  duration: number 
): () => void {
  console.log("makeSpeech called with duration:", duration, "and blendData:", blendData);
  
  let animationFrameId: number | null = null;
  let startTime: number | null = null;
  const morphKeys: MorphTargetKey[] = [
    'jawOpen', 'mouthFunnel', 'mouthPucker', 'tongue_out', 'tongue_up'
  ];

  function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  function getBlendForTime(time: number): Record<MorphTargetKey, number> {
    let prev = blendData[0];
    let next = blendData[blendData.length - 1];
    for (let i = 0; i < blendData.length - 1; i++) {
      if (blendData[i].time <= time && blendData[i + 1].time > time) {
        prev = blendData[i];
        next = blendData[i + 1];
        break;
      }
    }
    const t = (next.time === prev.time) ? 0 : (time - prev.time) / (next.time - prev.time);
    const targets: Record<MorphTargetKey, number> = {
      jawOpen: 0,
      mouthFunnel: 0,
      mouthPucker: 0,
      tongue_out: 0,
      tongue_up: 0
    };
    for (const key of morphKeys) {
      const prevVal = Number(prev[key as keyof BlendDatum]);
      const nextVal = Number(next[key as keyof BlendDatum]);
      if (!isNaN(prevVal) && !isNaN(nextVal)) {
        targets[key] = lerp(prevVal, nextVal, t);
      } else if (!isNaN(prevVal)) {
        targets[key] = prevVal;
      } else if (!isNaN(nextVal)) {
        targets[key] = nextVal;
      }
    }
    return targets;
  }

  function animate(now: number) {
    if (!startTime) startTime = now;
    const elapsed = (now - startTime) / 1000;
    if (elapsed > duration) {
      return;
    }
    const blend = getBlendForTime(elapsed);
    const {
      mouthMesh,
      lowerBeardMesh,
      lowerTeethMesh,
      tongueMesh,
      jawOpen,
      mouthFunnel,
      mouthPucker,
      jawOpenBeard,
      lowerTeethJawOpen,
      tongueOut,
      tongueUp
    } = meshRefs;
    if (mouthMesh && typeof jawOpen === 'number') mouthMesh.morphTargetInfluences[jawOpen] = blend.jawOpen;
    if (lowerBeardMesh && typeof jawOpenBeard === 'number') lowerBeardMesh.morphTargetInfluences[jawOpenBeard] = blend.jawOpen;
    if (lowerTeethMesh && typeof lowerTeethJawOpen === 'number') lowerTeethMesh.morphTargetInfluences[lowerTeethJawOpen] = blend.jawOpen;
    if (mouthMesh && typeof mouthFunnel === 'number') mouthMesh.morphTargetInfluences[mouthFunnel] = blend.mouthFunnel;
    if (mouthMesh && typeof mouthPucker === 'number') mouthMesh.morphTargetInfluences[mouthPucker] = blend.mouthPucker;
    if (tongueMesh && typeof tongueOut === 'number') tongueMesh.morphTargetInfluences[tongueOut] = blend.tongue_out;
    if (tongueMesh && typeof tongueUp === 'number') tongueMesh.morphTargetInfluences[tongueUp] = blend.tongue_up;
    animationFrameId = requestAnimationFrame(animate);
  }
  animationFrameId = requestAnimationFrame(animate);
  return () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  };
}

export function makeBlink(
  eyelidMesh: any,
  blinkMorphIndex: number,
  duration: number = 1.0,
  interval: number = 8.0
): () => void {
  console.log("makeBlink called with interval:", interval, "duration:", duration, "blinkMorphIndex:", blinkMorphIndex);

  let animationFrameId: number | null = null;
  let lastBlinkTime: number = performance.now();
  let blinking = false;

  function animate(now: number) {
    const elapsed = (now - lastBlinkTime) / 1000;
    if (!blinking && elapsed >= interval) {
      blinking = true;
      lastBlinkTime = now;
      console.log("Blink started at", now, "interval met:", interval);
    }
    if (blinking) {
      const blinkElapsed = (now - lastBlinkTime) / 1000;
      if (eyelidMesh && typeof blinkMorphIndex === 'number') {
        eyelidMesh.morphTargetInfluences[blinkMorphIndex] = 1;
        console.log("Blink morph set to 1 at", now);
      }
      if (blinkElapsed >= duration) {
        blinking = false;
        if (eyelidMesh && typeof blinkMorphIndex === 'number') {
          eyelidMesh.morphTargetInfluences[blinkMorphIndex] = 0;
          console.log("Blink morph reset to 0 at", now);
        }
        lastBlinkTime = now;
      }
    }
    animationFrameId = requestAnimationFrame(animate);
  }
  animationFrameId = requestAnimationFrame(animate);
  return () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    if (eyelidMesh && typeof blinkMorphIndex === 'number') {
      eyelidMesh.morphTargetInfluences[blinkMorphIndex] = 0;
      console.log("Cleanup: Blink morph reset to 0");
    }
  };
}

const blendData: BlendDatum[] = [
  { time: 0.0, phoneme: 'h', jawOpen: 0.1 },
  { time: 0.1, phoneme: 'ɛ', jawOpen: 0.5 },
  { time: 0.2, phoneme: 'l', jawOpen: 0.2 },
  { time: 0.3, phoneme: 'oʊ', mouthPucker: 0.8 },
  { time: 0.5, phoneme: 'ð', tongue_out: 0.7 },
  { time: 0.6, phoneme: 'ɛ', jawOpen: 0.5 },
  { time: 0.7, phoneme: 'r', mouthPucker: 0.3 },
  { time: 0.9, phoneme: 'aɪ', jawOpen: 0.7, mouthPucker: 0.4 },
  { time: 1.1, phoneme: 'æ', jawOpen: 0.8 },
  { time: 1.2, phoneme: 'm', jawOpen: 0.2 },
  { time: 1.4, phoneme: 'j', mouthFunnel: 0.4 },
  { time: 1.5, phoneme: 'ɔr', mouthPucker: 0.6 },
  { time: 1.7, phoneme: 'eɪ', jawOpen: 0.5, mouthPucker: 0.5 },
  { time: 1.9, phoneme: 'aɪ', jawOpen: 0.6, mouthPucker: 0.3 },
  { time: 2.1, phoneme: 'ə', jawOpen: 0.3 },
  { time: 2.2, phoneme: 's', jawOpen: 0.2 },
  { time: 2.3, phoneme: 'ɪ', jawOpen: 0.4 },
  { time: 2.4, phoneme: 's', jawOpen: 0.2 },
  { time: 2.5, phoneme: 't', tongue_up: 0.6 },
  { time: 2.6, phoneme: 'ə', jawOpen: 0.3 },
  { time: 2.7, phoneme: 'n', jawOpen: 0.2 },
  { time: 2.8, phoneme: 't', tongue_up: 0.6 }
];


export function Interviewer({ canAnimate, animationDuration }: { canAnimate: boolean; animationDuration: number }) {
  const gltf = useGLTF('/model4.glb');
  const [started, setStarted] = React.useState(false);

  // 🔥 Store mesh & morph refs at component level
  const mouthMesh = React.useRef<any>(null);
  const lowerBeardMesh = React.useRef<any>(null);
  const lowerTeethMesh = React.useRef<any>(null);
  const tongueMesh = React.useRef<any>(null);
  const eyelidMesh = React.useRef<any>(null); // 👈 added eyelid mesh ref

  const jawOpen = React.useRef<number | undefined>(undefined);
  const mouthFunnel = React.useRef<number | undefined>(undefined);
  const mouthPucker = React.useRef<number | undefined>(undefined);
  const jawOpenBeard = React.useRef<number | undefined>(undefined);
  const lowerTeethJawOpen = React.useRef<number | undefined>(undefined);
  const tongueOut = React.useRef<number | undefined>(undefined);
  const tongueUp = React.useRef<number | undefined>(undefined);


  const handleBegin = async () => {
    setStarted(true);
    // Play input.mp3
    const audio = new Audio('input.mp3');
    // Animate mouth with blendData
    const lastBlend = blendData.at(-1) || { time: 3 };
    const cleanup = makeSpeech(blendData, {
      mouthMesh: mouthMesh.current,
      lowerBeardMesh: lowerBeardMesh.current,
      lowerTeethMesh: lowerTeethMesh.current,
      tongueMesh: tongueMesh.current,
      jawOpen: jawOpen.current,
      mouthFunnel: mouthFunnel.current,
      mouthPucker: mouthPucker.current,
      jawOpenBeard: jawOpenBeard.current,
      lowerTeethJawOpen: lowerTeethJawOpen.current,
      tongueOut: tongueOut.current,
      tongueUp: tongueUp.current
    }, lastBlend.time);

    audio.play()
      .then(() => {
        // Stop animation after audio duration
        setTimeout(() => cleanup && cleanup(), (lastBlend.time + 0.5) * 1000);
      })
      .catch(err => {
        console.error('Audio play failed', err);
        cleanup && cleanup();
      });
  }


  
  const handleStart = async () => {
  setStarted(true);
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audioContext = new AudioContext({ sampleRate: 16000 });
  const source = audioContext.createMediaStreamSource(stream);
  const processor = audioContext.createScriptProcessor(4096, 1, 1);
  source.connect(processor);
  processor.connect(audioContext.destination);

  const serverSocket = new WebSocket('ws://localhost:8000');

  serverSocket.onopen = () => {
    console.log('Connected to server WebSocket');
  };

  processor.onaudioprocess = (e) => {
    const input = e.inputBuffer.getChannelData(0); // mono

    // 🔹 Step 1: Calculate RMS energy of this frame
    let sumSquares = 0;
    for (let i = 0; i < input.length; i++) {
      sumSquares += input[i] * input[i];
    }
    const rms = Math.sqrt(sumSquares / input.length);

    // 🔹 Step 2: Only send if volume > threshold
    const SILENCE_THRESHOLD = 0.02; // tweak this value (0.01–0.05 range)
    if (rms < SILENCE_THRESHOLD) {
      // console.log("Silence skipped");
      return; // skip sending silence
    }

    // Convert Float32Array [-1,1] to Int16Array
    const pcm = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++) {
      let s = Math.max(-1, Math.min(1, input[i]));
      pcm[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }

    // Send as ArrayBuffer if socket is open
    if (serverSocket.readyState === WebSocket.OPEN) {
      console.log("Sending audio frame, RMS:", rms);
      
      serverSocket.send(pcm.buffer);
    }
  };
};


  useEffect(() => {
    let blinkCleanup: (() => void) | undefined;

    if (gltf.scene) {
      gltf.scene.traverse((child: any) => {
        if (child.name === 'face2_hp' && child.type === 'SkinnedMesh') {
          mouthMesh.current = child;
          eyelidMesh.current = child; // 👈 assign eyelid mesh
        }
        if (child.name === 'beard' && child.type === 'SkinnedMesh') {
          lowerBeardMesh.current = child;
        }
        if (child.name === 'lower_teeth' && child.type === 'SkinnedMesh') {
          lowerTeethMesh.current = child;
        }
        if (child.name === 'tongue' && child.type === 'SkinnedMesh') {
          tongueMesh.current = child;
        }
      });

      if (mouthMesh.current?.morphTargetDictionary) {
        jawOpen.current = mouthMesh.current.morphTargetDictionary['jawOpen'];
        mouthFunnel.current = mouthMesh.current.morphTargetDictionary['mouthFunnel'];
        mouthPucker.current = mouthMesh.current.morphTargetDictionary['mouthPucker'];
      }
      if (lowerBeardMesh.current?.morphTargetDictionary) {
        jawOpenBeard.current = lowerBeardMesh.current.morphTargetDictionary['jawOpen'];
      }
      if (lowerTeethMesh.current?.morphTargetDictionary) {
        lowerTeethJawOpen.current = lowerTeethMesh.current.morphTargetDictionary['jawOpen'];
      }
      if (tongueMesh.current?.morphTargetDictionary) {
        tongueOut.current = tongueMesh.current.morphTargetDictionary['tongue_out'];
        tongueUp.current = tongueMesh.current.morphTargetDictionary['tongue_up'];
      }

      // 👁 Setup blinking
      if (eyelidMesh.current?.morphTargetDictionary) {
        const blinkMorphIndexL = eyelidMesh.current.morphTargetDictionary['eyeBlink_L'];
        const blinkMorphIndexR = eyelidMesh.current.morphTargetDictionary['eyeBlink_R'];
        if (typeof blinkMorphIndexL === 'number' && typeof blinkMorphIndexR === 'number') {
          blinkCleanup = makeBlinkBoth(eyelidMesh.current, blinkMorphIndexL, blinkMorphIndexR, 0.1, 5.0);
        }
      }
    }

    return () => {
      if (blinkCleanup) blinkCleanup();
    };
  }, [gltf.scene]);

  async function sendMsgTollm(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
  event.preventDefault();
  const startTime = performance.now(); // ⏱️ start timer

  try {
    const userId = sessionStorage.getItem("userid");

// Prepare the request body
const bodyData = { userId };

// Send POST request with JSON payload
const res = await fetch("http://localhost:5001/send-msg", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(bodyData),
});

const data = await res.json();
console.log("Response from /send-msg:", data);

    const fetchTime = performance.now();
    console.log(`⏱️ Fetch + JSON parsing took ${(fetchTime - startTime).toFixed(2)} ms`);

    if (data.audioSource) {
      const audioSrc = `data:audio/mp3;base64,${data.audioSource}`;
      const audio = new Audio(audioSrc);
      audio.play()
        .then(() => console.log("🔊 Playing audio"))
        .catch(err => console.error("❌ Audio play failed", err));
    }

    if (data.blendData) {
      const cleanup = makeSpeech(data.blendData, {
        mouthMesh: mouthMesh.current,
        lowerBeardMesh: lowerBeardMesh.current,
        lowerTeethMesh: lowerTeethMesh.current,
        tongueMesh: tongueMesh.current,
        jawOpen: jawOpen.current,
        mouthFunnel: mouthFunnel.current,
        mouthPucker: mouthPucker.current,
        jawOpenBeard: jawOpenBeard.current,
        lowerTeethJawOpen: lowerTeethJawOpen.current,
        tongueOut: tongueOut.current,
        tongueUp: tongueUp.current
      }, data.blendData[data.blendData.length - 1].time);

      const durationMs = ((data.duration ?? data.blendData.at(-1)?.time ?? 3) + 1.0) * 1000;
      console.log("⏱️ Total speech duration (ms):", durationMs);

      setTimeout(() => {
        cleanup && cleanup();
        console.log("reconnecting...");
        
        fetch("http://localhost:5001/reconnect", { method: "POST" })
          .then(() => console.log("🔄 Reconnect called"))
          .catch(err => console.error("❌ Reconnect failed", err));
      }, durationMs);
    }

    const endTime = performance.now();
    console.log(`⏱️ Total sendMsgTollm execution: ${(endTime - startTime).toFixed(2)} ms`);
  } catch (err) {
    console.error("Error calling /send-msg:", err);
  }
}

 return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {!started && <button onClick={handleStart}>Start</button>}
      <button onClick={sendMsgTollm}>Send</button>
      <Canvas camera={{ position: [0, 1.2, 2.0], fov: 25 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <primitive object={gltf.scene} scale={1.5} position={[0, -1.2, 0]} />
        <OrbitControls target={[0, 1, 0]} minDistance={1.5} maxDistance={3.0} enablePan={false} />
      </Canvas>
    </div>
  );
}


