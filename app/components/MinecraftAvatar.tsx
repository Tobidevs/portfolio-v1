"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface MinecraftAvatarProps {
  skinUrl: string;
  bodyUrl: string;
  size?: number;
}

export default function MinecraftAvatar({
  skinUrl,
  bodyUrl,
  size = 300,
}: MinecraftAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const headRef = useRef<THREE.Mesh | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const targetRotationRef = useRef({ yaw: 0, pitch: 0 });
  const currentRotationRef = useRef({ yaw: 0, pitch: 0 });
  const [isCursorInUpperHalf, setIsCursorInUpperHalf] = useState(false);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const width = size;
    const height = size;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Ensure renderer uses sRGB color space for accurate color display
    if ('outputColorSpace' in renderer) {
      (renderer as any).outputColorSpace = THREE.SRGBColorSpace;
    }
    rendererRef.current = renderer;

    // Helper function to create face texture from skin image
    const createFaceTexture = (
      img: HTMLImageElement,
      x: number,
      y: number,
      width: number,
      height: number,
      flipHorizontal: boolean = false,
      flipVertical: boolean = false
    ): THREE.Texture => {
      const canvas = document.createElement("canvas");
      canvas.width = 8;
      canvas.height = 8;
      const ctx = canvas.getContext("2d", {
        willReadFrequently: true,
      });

      if (!ctx) {
        // Fallback: create a simple colored texture
        const fallbackCanvas = document.createElement("canvas");
        fallbackCanvas.width = 8;
        fallbackCanvas.height = 8;
        const fallbackCtx = fallbackCanvas.getContext("2d");
        if (fallbackCtx) {
          fallbackCtx.imageSmoothingEnabled = false;
          fallbackCtx.fillStyle = "#8B6914";
          fallbackCtx.fillRect(0, 0, 8, 8);
        }
        const texture = new THREE.CanvasTexture(fallbackCanvas);
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.generateMipmaps = false;
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
      }

      // Disable image smoothing to preserve exact pixel colors
      ctx.imageSmoothingEnabled = false;
      ctx.imageSmoothingQuality = "low";

      // Apply transformations if needed
      if (flipHorizontal || flipVertical) {
        ctx.save();
        if (flipHorizontal) {
          ctx.translate(8, 0);
          ctx.scale(-1, 1);
        }
        if (flipVertical) {
          ctx.translate(0, 8);
          ctx.scale(1, -1);
        }
      }

      // Draw the specific region from the skin
      ctx.drawImage(img, x, y, width, height, 0, 0, 8, 8);

      if (flipHorizontal || flipVertical) {
        ctx.restore();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      texture.generateMipmaps = false;
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    // Load Minecraft skin and extract face textures
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // Create materials for each face with correct UV mapping
      // Minecraft skin layout: 64x64px (standard format)
      // Three.js BoxGeometry face order: Right, Left, Top, Bottom, Front, Back
      // 
      // Official Minecraft head texture coordinates (8x8 each):
      // Left Side: (0, 8) to (8, 16) - character's left when facing front
      // Right Side: (16, 8) to (24, 16) - character's right when facing front
      // Front: (8, 8) to (16, 16)
      // Back: (24, 8) to (32, 16)
      // Top: (8, 0) to (16, 8)
      // Bottom: (16, 0) to (24, 8)

      const materials = [
        // Right face (x+) - Three.js right = character's right
        // In Minecraft skin, "Left Side" (0,8) is viewer's left = character's right
        new THREE.MeshBasicMaterial({
          map: createFaceTexture(img, 0, 8, 8, 8),
        }),
        // Left face (x-) - Three.js left = character's left
        // In Minecraft skin, "Right Side" (16,8) is viewer's right = character's left
        new THREE.MeshBasicMaterial({
          map: createFaceTexture(img, 16, 8, 8, 8),
        }),
        // Top face (y+) - Top texture
        new THREE.MeshBasicMaterial({
          map: createFaceTexture(img, 8, 0, 8, 8),
        }),
        // Bottom face (y-) - Bottom texture
        new THREE.MeshBasicMaterial({
          map: createFaceTexture(img, 16, 0, 8, 8),
        }),
        // Front face (z+) - Front texture
        new THREE.MeshBasicMaterial({
          map: createFaceTexture(img, 8, 8, 8, 8),
        }),
        // Back face (z-) - Back texture
        new THREE.MeshBasicMaterial({
          map: createFaceTexture(img, 24, 8, 8, 8),
        }),
      ];

      // Create head geometry
      const headGeometry = new THREE.BoxGeometry(1, 1, 1);
      const head = new THREE.Mesh(headGeometry, materials);
      head.position.set(0, 0.5, 0); // Position head above body
      head.scale.set(1, 1, 1);
      scene.add(head);
      headRef.current = head;
    };
    img.onerror = (error) => {
      console.error("Error loading skin texture:", error);
    };
    img.src = skinUrl;

    // Animation loop
    const animate = () => {
      if (!scene || !camera || !renderer) return;

      // Smooth interpolation for rotation
      const lerpFactor = 0.1;
      currentRotationRef.current.yaw +=
        (targetRotationRef.current.yaw - currentRotationRef.current.yaw) *
        lerpFactor;
      currentRotationRef.current.pitch +=
        (targetRotationRef.current.pitch - currentRotationRef.current.pitch) *
        lerpFactor;

      // Apply rotation to head
      if (headRef.current) {
        headRef.current.rotation.y = THREE.MathUtils.degToRad(
          currentRotationRef.current.yaw
        );
        headRef.current.rotation.x = THREE.MathUtils.degToRad(
          currentRotationRef.current.pitch
        );
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (renderer) {
        renderer.dispose();
      }
      if (scene) {
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach((mat) => {
                if (mat.map) mat.map.dispose();
                mat.dispose();
              });
            } else {
              if (object.material.map) object.material.map.dispose();
              object.material.dispose();
            }
          }
        });
      }
    };
  }, [skinUrl, size]);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const avatarCenterX = rect.left + rect.width / 2;
      const avatarCenterY = rect.top + rect.height / 2;

      const dx = event.clientX - avatarCenterX;
      const dy = event.clientY - avatarCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Calculate rotation angles
      // Yaw: horizontal rotation (around Y axis) - based on dx
      // Pitch: vertical rotation (around X axis) - based on dy
      // Use a reference distance to normalize the rotation
      const referenceDistance = Math.max(200, distance);
      const yaw = Math.atan2(dx, referenceDistance) * (180 / Math.PI);
      const pitch = Math.atan2(dy, referenceDistance) * (180 / Math.PI);

      // Limit pitch to prevent over-rotation
      const maxPitch = 30;
      const limitedPitch = Math.max(-maxPitch, Math.min(maxPitch, pitch));

      targetRotationRef.current = {
        yaw,
        pitch: limitedPitch,
      };

      // Check if cursor is in upper half of screen
      const viewportHeight = window.innerHeight;
      const isUpperHalf = event.clientY < viewportHeight / 2;
      setIsCursorInUpperHalf(isUpperHalf);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="minecraft-avatar-container relative"
      style={{ width: size, height: size }}
    >
      {/* 2D Body Image - Position changes based on cursor */}
      <div
        className="absolute"
        style={{
          width: size * 0.8,
          height: size * 0.4,
          bottom: size * 0.1,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: isCursorInUpperHalf ? 3 : 1,
          transition: "z-index 150ms cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "z-index",
        }}
      >
        <img
          src={bodyUrl}
          alt="Minecraft avatar body"
          className="w-full h-full object-contain"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      {/* 3D Head Canvas - Position changes based on cursor */}
      <div
        className="absolute"
        style={{
          width: size,
          height: size * 0.5,
          top: size * 0.01,
          left: "49%",
          transform: "translateX(-50%)",
          zIndex: isCursorInUpperHalf ? 2 : 3,
          transition: "z-index 150ms cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "z-index",
        }}
      >
        <canvas ref={canvasRef} className="block" />
      </div>
    </div>
  );
}
