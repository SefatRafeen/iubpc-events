'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  IUBPC_EVENTS,
  IUBPC_WINGS,
  IubpcEvent,
  WingId,
} from '@/lib/iubpc-data';
import WingsDirectoryModal from './WingsDirectoryModal';
import { Layers, ExternalLink } from 'lucide-react';

const N = IUBPC_EVENTS.length; // 39 real events from iubpc.org/events
const TOTAL = N * 3; // 3 copies = 117 virtual folio items for seamless endless shelf
const INITIAL_EVENT_INDEX = 6; // Opens on "Programming Week Summer 2026"
const INITIAL_SCROLL = N + INITIAL_EVENT_INDEX;
const LOGO_PATH = '/assets/aistudio/IUBPC_Logos_Dark_Text_955f6021.png';

const INK_BLOBS = [
  { cx: 150, cy: 330, delay: 0 },
  { cx: 340, cy: 600, delay: 120 },
  { cx: 250, cy: 120, delay: 220 },
  { cx: 90, cy: 760, delay: 300 },
  { cx: 400, cy: 250, delay: 360 },
  { cx: 260, cy: 860, delay: 420 },
  { cx: 230, cy: 470, delay: 180 },
];

function smoothstep(x: number): number {
  const c = Math.max(0, Math.min(1, x));
  return c * c * (3 - 2 * c);
}

function B(r: number): number {
  if (r <= -1) return -0.5;
  if (r >= 1) return 0.5;
  return (r + Math.sin(Math.PI * r) / Math.PI) / 2;
}

/**
 * Renders the attached IUBPC logo (/assets/aistudio/IUBPC_Logos_Dark_Text_955f6021.png)
 * with exact bounding-box alignment and high-contrast legibility on dark obsidian backgrounds
 * across Phone, Tablet, and PC.
 */
function IubpcBrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2 sm:gap-2.5 select-none">
      {/* Cropped </> emblem from the top half (x:608..1476, y:48..916) of IUBPC_Logos_Dark_Text_955f6021.png */}
      <div
        className={`relative overflow-hidden shrink-0 ${
          compact
            ? 'w-[26px] h-[26px] sm:w-[32px] sm:h-[32px]'
            : 'w-[28px] h-[28px] sm:w-[34px] sm:h-[34px] md:w-[38px] md:h-[38px]'
        }`}
      >
        <img
          src={LOGO_PATH}
          alt="IUBPC — IUB Programming Club"
          className="absolute max-w-none pointer-events-none"
          style={{
            width: '240%',
            height: '240%',
            left: '-70%',
            top: '-5.5%',
          }}
        />
      </div>

      {/* Stacked IUBPC / IUB Programming Club wordmark matching the attached logo */}
      <div className="flex flex-col items-start justify-center leading-none text-left">
        <span
          className={`font-mono font-bold tracking-[0.08em] text-[#ededef] group-hover:text-[#3ecf8e] transition-colors ${
            compact
              ? 'text-[14px] sm:text-[16px]'
              : 'text-[15px] sm:text-[18px] md:text-[20px]'
          }`}
        >
          IUBPC
        </span>
        <span className="font-mono text-[7.5px] sm:text-[8.5px] md:text-[9.5px] tracking-[0.06em] text-[#94a3b8] whitespace-nowrap mt-[2px]">
          IUB Programming Club
        </span>
      </div>
    </div>
  );
}

export default function FolioHero() {
  // Active event state for React UI (detail sheet, wing directory modal, wing tabs)
  const [activeIndex, setActiveIndex] = useState<number>(INITIAL_EVENT_INDEX);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [wingsModalOpen, setWingsModalOpen] = useState<boolean>(false);

  // DOM Refs for 60fps animation engine & Web Animations API
  const probeRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const shelfRef = useRef<HTMLElement>(null);
  const tapeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const coverRefs = useRef<(HTMLDivElement | null)[]>([]);
  const playRingRef = useRef<HTMLButtonElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Caption mask refs
  const capTitleMaskRef = useRef<HTMLDivElement>(null);
  const capSubMaskRef = useRef<HTMLDivElement>(null);
  const capYearMaskRef = useRef<HTMLDivElement>(null);

  // Wing tabs indicator refs
  const tabsNavRef = useRef<HTMLElement>(null);
  const tabIndicatorRef = useRef<HTMLDivElement>(null);
  const tabBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Detail dialog & ink mask refs
  const detailRef = useRef<HTMLDivElement>(null);
  const detailLineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const blobRefs = useRef<(SVGCircleElement | null)[]>([]);
  const detailAnimsRef = useRef<Animation[]>([]);
  const inkRafRef = useRef<number>(0);

  // Mutable physics state inside single rAF loop
  const engineRef = useRef({
    s: INITIAL_SCROLL,
    T: INITIAL_SCROLL,
    hover: -1,
    active: INITIAL_EVENT_INDEX,
    lifts: new Float32Array(TOTAL),
    mx: typeof window !== 'undefined' ? window.innerWidth / 2 : 720,
    my: typeof window !== 'undefined' ? window.innerHeight / 2 : 450,
    cx: typeof window !== 'undefined' ? window.innerWidth / 2 : 720,
    cy: typeof window !== 'undefined' ? window.innerHeight / 2 : 450,
    tiltX: 0,
    tiltY: 0,
    onCover: false,
    isOpen: false,
    isModalOpen: false,
    isDragging: false,
    dragMoved: false,
    dragStartX: 0,
    dragStartT: INITIAL_SCROLL,
    overBtn: false,
    H: 380,
    ws: 64,
    d: 200,
    gap: 11,
    W: typeof window !== 'undefined' ? window.innerWidth : 1440,
    VH: typeof window !== 'undefined' ? window.innerHeight : 900,
    reducedMotion: false,
  });

  const activeEvent: IubpcEvent = IUBPC_EVENTS[activeIndex] || IUBPC_EVENTS[0];
  const activeWing =
    IUBPC_WINGS.find((w) => w.id === activeEvent.wingId) || IUBPC_WINGS[0];

  // Sync modal state into engineRef
  useEffect(() => {
    engineRef.current.isModalOpen = wingsModalOpen;
  }, [wingsModalOpen]);

  // Preload event cover images and the attached logo on start
  useEffect(() => {
    const logoImg = new Image();
    logoImg.src = LOGO_PATH;

    IUBPC_EVENTS.forEach((ev) => {
      if (ev.img) {
        const img = new Image();
        img.referrerPolicy = 'no-referrer';
        img.src = ev.img;
      }
    });
  }, []);

  // Update Wing Tab Indicator position & width
  const updateTabIndicator = useCallback((wingId: WingId) => {
    const btn = tabBtnRefs.current[wingId];
    const ind = tabIndicatorRef.current;
    const wing = IUBPC_WINGS.find((w) => w.id === wingId);
    if (!btn || !ind) return;
    ind.style.width = `${btn.offsetWidth}px`;
    ind.style.transform = `translateX(${btn.offsetLeft}px)`;
    ind.style.backgroundColor = wing?.accent || '#3ecf8e';
  }, []);

  // Masked line slide swap using Web Animations API (exact Leon Vasari algorithm)
  const slideMaskLine = useCallback(
    (
      container: HTMLDivElement | null,
      text: string,
      dir: number,
      className: string
    ) => {
      if (!container) return;
      const reduced = engineRef.current.reducedMotion;

      if (reduced) {
        container.innerHTML = '';
        const span = document.createElement('span');
        span.className = className;
        span.textContent = text;
        container.appendChild(span);
        return;
      }

      const oldSpans = Array.from(
        container.querySelectorAll('span:not([data-leaving="1"])')
      ) as HTMLSpanElement[];

      const newSpan = document.createElement('span');
      newSpan.className = `${className} block w-full`;
      if (container.children.length > 0) {
        newSpan.style.position = 'absolute';
        newSpan.style.left = '0';
        newSpan.style.top = '0';
        newSpan.style.right = '0';
      }
      newSpan.textContent = text;
      container.appendChild(newSpan);

      const d = dir >= 0 ? 1 : -1;

      newSpan.animate(
        [
          { transform: `translateY(${d * 105}%)` },
          { transform: 'translateY(0%)' },
        ],
        {
          duration: 650,
          easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
          fill: 'both',
        }
      );

      oldSpans.forEach((old) => {
        old.dataset.leaving = '1';
        const anim = old.animate(
          [{ transform: `translateY(${-d * 105}%)` }],
          {
            duration: 650,
            easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            fill: 'both',
          }
        );
        anim.onfinish = () => {
          old.remove();
          if (container.children.length === 1) {
            const first = container.children[0] as HTMLElement;
            first.style.position = 'relative';
          }
        };
      });
    },
    []
  );

  // Set Active Film/Event & trigger caption masks + Wing tab indicator
  const setActiveEvent = useCallback(
    (idx: number, dir: number) => {
      const ev = IUBPC_EVENTS[idx];
      if (!ev) return;
      setActiveIndex(idx);
      updateTabIndicator(ev.wingId);

      slideMaskLine(
        capTitleMaskRef.current,
        ev.title,
        dir,
        'text-[18px] sm:text-[24px] lg:text-[30px] leading-[1.15] tracking-[-0.015em] text-[#ededef] truncate px-1'
      );
      slideMaskLine(
        capSubMaskRef.current,
        `${ev.wingCode} · ${ev.wingName.toUpperCase()} / ${ev.subtitle.toUpperCase()}`,
        dir,
        'lbl text-[#3ecf8e] truncate px-1'
      );
      slideMaskLine(
        capYearMaskRef.current,
        `${ev.date.toUpperCase()} · FOLIO #${String(idx + 1).padStart(2, '0')} OF ${N}`,
        dir,
        'lbl text-[#94a3b8] tracking-[0.08em] truncate px-1'
      );
    },
    [slideMaskLine, updateTabIndicator]
  );

  // Measure real --H via off-screen probe element
  const measureGeometry = useCallback(() => {
    const probe = probeRef.current;
    const stage = stageRef.current;
    if (!probe || !stage) return;

    const H = probe.getBoundingClientRect().height || 340;
    const ws = (H * 142) / 840;
    const d = (H * 474) / 900;
    const gap = H * 0.03;

    engineRef.current.H = H;
    engineRef.current.ws = ws;
    engineRef.current.d = d;
    engineRef.current.gap = gap;
    engineRef.current.W = window.innerWidth;
    engineRef.current.VH = window.innerHeight;

    stage.style.setProperty('--ws', `${ws}px`);
    stage.style.setProperty('--d', `${d}px`);

    const currentEv = IUBPC_EVENTS[engineRef.current.active];
    if (currentEv) {
      updateTabIndicator(currentEv.wingId);
    }
  }, [updateTabIndicator]);

  // Open Detail Sheet: tilted paper sheet grows from active 3D cover rect + 7-blob SVG ink reveal
  const openDetail = useCallback(() => {
    const st = engineRef.current;
    if (st.isOpen) return;

    st.T = Math.round(st.T);
    const activeVirtual = ((Math.round(st.s) % TOTAL) + TOTAL) % TOTAL;
    const activeFilmIdx = ((activeVirtual % N) + N) % N;
    setActiveIndex(activeFilmIdx);

    st.isOpen = true;
    st.onCover = false;
    setDetailOpen(true);

    const dialog = detailRef.current;
    if (!dialog) return;

    dialog.scrollTop = 0;

    // Reset all 7 ink blob radii to 0
    blobRefs.current.forEach((circle) => {
      if (circle) circle.setAttribute('r', '0');
    });

    // Read screen rect of active tape's cover face
    const coverEl = coverRefs.current[activeVirtual];
    const W = window.innerWidth;
    const VH = window.innerHeight;
    const rect = coverEl
      ? coverEl.getBoundingClientRect()
      : {
          left: W / 2 - st.d / 2,
          right: W / 2 + st.d / 2,
          top: VH / 2 - st.H / 2,
          bottom: VH / 2 + st.H / 2,
          width: st.d,
          height: st.H,
        };

    const topInset = Math.max(0, rect.top);
    const rightInset = Math.max(0, W - rect.right);
    const bottomInset = Math.max(0, VH - rect.bottom);
    const leftInset = Math.max(0, rect.left);
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    dialog.style.visibility = 'visible';
    dialog.style.transformOrigin = `${cx}px ${cy}px`;

    detailAnimsRef.current.forEach((a) => a.cancel());
    detailAnimsRef.current = [];

    const dur = st.reducedMotion ? 1 : 1050;
    const sheetAnim = dialog.animate(
      [
        {
          clipPath: `inset(${topInset}px ${rightInset}px ${bottomInset}px ${leftInset}px round 3px)`,
          transform: 'rotate(-4.5deg)',
        },
        {
          clipPath: 'inset(0px 0px 0px 0px round 0px)',
          transform: 'rotate(0deg)',
        },
      ],
      {
        duration: dur,
        easing: 'cubic-bezier(0.76, 0, 0.18, 1)',
        fill: 'both',
      }
    );
    detailAnimsRef.current.push(sheetAnim);

    // Masked text lines rise one after another
    detailLineRefs.current.forEach((lineEl, index) => {
      if (!lineEl) return;
      const lineAnim = lineEl.animate(
        [
          { transform: 'translateY(110%)' },
          { transform: 'translateY(0%)' },
        ],
        {
          duration: st.reducedMotion ? 1 : 900,
          delay: st.reducedMotion ? 0 : 620 + index * 75,
          easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
          fill: 'both',
        }
      );
      detailAnimsRef.current.push(lineAnim);
    });

    // Ink bleed poster loop (starts 520ms after open, grows each circle 0 -> 720 over 1250ms)
    cancelAnimationFrame(inkRafRef.current);
    const startTime = st.reducedMotion
      ? performance.now() - 5000
      : performance.now();

    const tickInk = (now: number) => {
      const elapsed = now - startTime - 520;
      INK_BLOBS.forEach((blob, idx) => {
        const circle = blobRefs.current[idx];
        if (!circle) return;
        const t = elapsed - blob.delay;
        if (t <= 0) {
          circle.setAttribute('r', '0');
        } else {
          const p = Math.min(1, t / 1250);
          const eased = 1 - Math.pow(1 - p, 3);
          circle.setAttribute('r', (eased * 720).toFixed(1));
        }
      });

      if (now - startTime < 2400) {
        inkRafRef.current = requestAnimationFrame(tickInk);
      }
    };
    inkRafRef.current = requestAnimationFrame(tickInk);
  }, []);

  // Close Detail Sheet: shrinks back to active cover rect with -4.5deg tilt over 850ms
  const closeDetail = useCallback(() => {
    const st = engineRef.current;
    if (!st.isOpen) return;
    st.isOpen = false;

    const dialog = detailRef.current;
    if (!dialog) {
      setDetailOpen(false);
      return;
    }

    const activeVirtual = ((Math.round(st.s) % TOTAL) + TOTAL) % TOTAL;
    const coverEl = coverRefs.current[activeVirtual];
    const W = window.innerWidth;
    const VH = window.innerHeight;
    const rect = coverEl
      ? coverEl.getBoundingClientRect()
      : {
          left: W / 2 - st.d / 2,
          right: W / 2 + st.d / 2,
          top: VH / 2 - st.H / 2,
          bottom: VH / 2 + st.H / 2,
          width: st.d,
          height: st.H,
        };

    const topInset = Math.max(0, rect.top);
    const rightInset = Math.max(0, W - rect.right);
    const bottomInset = Math.max(0, VH - rect.bottom);
    const leftInset = Math.max(0, rect.left);
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    dialog.style.transformOrigin = `${cx}px ${cy}px`;

    const closeAnim = dialog.animate(
      [
        {
          clipPath: 'inset(0px 0px 0px 0px round 0px)',
          transform: 'rotate(0deg)',
        },
        {
          clipPath: `inset(${topInset}px ${rightInset}px ${bottomInset}px ${leftInset}px round 3px)`,
          transform: 'rotate(-4.5deg)',
        },
      ],
      {
        duration: st.reducedMotion ? 1 : 850,
        easing: 'cubic-bezier(0.76, 0, 0.18, 1)',
        fill: 'both',
      }
    );

    closeAnim.onfinish = () => {
      dialog.style.visibility = 'hidden';
      detailAnimsRef.current.forEach((a) => a.cancel());
      detailAnimsRef.current = [];
      cancelAnimationFrame(inkRafRef.current);
      setDetailOpen(false);
    };
  }, []);

  // Jump to specific event index by shortest loop path
  const jumpToEventIndex = useCallback(
    (targetIdx: number, openImmediately = false) => {
      const st = engineRef.current;
      const curMod = ((Math.round(st.T) % N) + N) % N;
      let diff = targetIdx - curMod;
      if (diff > N / 2) diff -= N;
      if (diff < -N / 2) diff += N;
      st.T = Math.round(st.T) + diff;
      if (openImmediately) {
        st.s = st.T;
        setActiveEvent(targetIdx, diff >= 0 ? 1 : -1);
        setTimeout(() => openDetail(), 30);
      }
    },
    [openDetail, setActiveEvent]
  );

  // Jump to first event of a Wing
  const jumpToWing = useCallback(
    (wingId: WingId | 'all') => {
      if (wingId === 'all') {
        jumpToEventIndex(0);
        return;
      }
      const idx = IUBPC_EVENTS.findIndex((e) => e.wingId === wingId);
      if (idx !== -1) {
        jumpToEventIndex(idx);
      }
    },
    [jumpToEventIndex]
  );

  // Main 60fps requestAnimationFrame loop + input listeners
  useEffect(() => {
    document.documentElement.classList.add('custom-cursor-active');
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    engineRef.current.reducedMotion = mq.matches;
    const onMqChange = (e: MediaQueryListEvent) => {
      engineRef.current.reducedMotion = e.matches;
    };
    mq.addEventListener('change', onMqChange);

    measureGeometry();
    window.addEventListener('resize', measureGeometry);

    // Initialize caption text & Wing indicator DOM directly
    const initEv = IUBPC_EVENTS[INITIAL_EVENT_INDEX];
    if (initEv) {
      updateTabIndicator(initEv.wingId);
      slideMaskLine(
        capTitleMaskRef.current,
        initEv.title,
        1,
        'text-[18px] sm:text-[24px] lg:text-[30px] leading-[1.15] tracking-[-0.015em] text-[#ededef] truncate px-1'
      );
      slideMaskLine(
        capSubMaskRef.current,
        `${initEv.wingCode} · ${initEv.wingName.toUpperCase()} / ${initEv.subtitle.toUpperCase()}`,
        1,
        'lbl text-[#3ecf8e] truncate px-1'
      );
      slideMaskLine(
        capYearMaskRef.current,
        `${initEv.date.toUpperCase()} · FOLIO #${String(INITIAL_EVENT_INDEX + 1).padStart(2, '0')} OF ${N}`,
        1,
        'lbl text-[#94a3b8] tracking-[0.08em] truncate px-1'
      );
    }

    let wheelTimeout: ReturnType<typeof setTimeout> | null = null;

    const onWheel = (e: WheelEvent) => {
      const st = engineRef.current;
      if (st.isOpen || st.isModalOpen) return;
      e.preventDefault();
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      st.T += (delta / (st.ws + st.gap)) * 0.5;
      if (wheelTimeout) clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        st.T = Math.round(st.T);
      }, 160);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const st = engineRef.current;
      if (st.isModalOpen) {
        if (e.key === 'Escape') {
          setWingsModalOpen(false);
        }
        return;
      }
      if (e.key === 'Escape' && st.isOpen) {
        closeDetail();
        return;
      }
      if (st.isOpen) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        st.T = Math.round(st.T) + 1;
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        st.T = Math.round(st.T) - 1;
      } else if (
        e.key === 'Enter' &&
        (document.activeElement === document.body ||
          document.activeElement === null)
      ) {
        e.preventDefault();
        openDetail();
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const st = engineRef.current;
      st.mx = e.clientX;
      st.my = e.clientY;

      const targetEl = e.target as HTMLElement | null;
      st.overBtn = Boolean(
        targetEl?.closest('button, a, input, textarea, select') &&
          !targetEl?.closest('.shelf')
      );

      if (st.isDragging) {
        const dx = e.clientX - st.dragStartX;
        if (Math.abs(dx) > 5) {
          st.dragMoved = true;
        }
        if (st.dragMoved) {
          st.T = st.dragStartT - dx / (st.ws + st.gap);
        }
      }
    };

    const onPointerUp = () => {
      const st = engineRef.current;
      if (st.isDragging) {
        st.isDragging = false;
        st.T = Math.round(st.T);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    let lastTime = performance.now();
    let rafId = 0;

    const frame = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      const st = engineRef.current;

      // 1. Scroll spring
      if (st.reducedMotion) {
        st.s = st.T;
      } else {
        const k = st.isDragging ? 18 : 5.2;
        st.s += (st.T - st.s) * (1 - Math.exp(-k * dt));
        if (Math.abs(st.T - st.s) < 1e-4) {
          st.s = st.T;
        }
      }

      // 2. Normalise loop if drifted beyond ±4 full loops
      if (st.s > TOTAL * 4 || st.s < -TOTAL * 4) {
        const loops = Math.trunc(st.s / TOTAL);
        st.s -= loops * TOTAL;
        st.T -= loops * TOTAL;
      }

      // 3. Check if active film/event changed
      const nextActive = ((Math.round(st.s) % N) + N) % N;
      if (nextActive !== st.active) {
        const dir = st.T - st.s >= 0 ? 1 : -1;
        st.active = nextActive;
        setActiveEvent(nextActive, dir);
      }

      // 4. Cursor on-cover check & tilt smoothing
      const shelfCenterY = st.VH / 2;
      const inCoverX = Math.abs(st.mx - st.W / 2) < 0.55 * st.d;
      const inCoverY = Math.abs(st.my - shelfCenterY) < 0.55 * st.H;
      st.onCover =
        inCoverX &&
        inCoverY &&
        !st.isOpen &&
        !st.isModalOpen &&
        Math.abs(st.T - st.s) < 0.3;

      let targetTiltY = 0;
      let targetTiltX = 0;
      if (st.onCover) {
        targetTiltY = ((st.mx - st.W / 2) / (0.55 * st.d)) * 9;
        targetTiltX = -((st.my - shelfCenterY) / (st.H / 2)) * 6;
      } else {
        targetTiltY = ((st.mx - st.W / 2) / st.W) * 5;
        targetTiltX = 0;
      }

      const tiltEase = st.reducedMotion ? 1 : 1 - Math.exp(-7 * dt);
      st.tiltY += (targetTiltY - st.tiltY) * tiltEase;
      st.tiltX += (targetTiltX - st.tiltX) * tiltEase;

      // 5. Position all 117 virtual folio tapes on the 3D shelf
      const halfTotal = TOTAL / 2;
      const cullLimit = st.W / 2 + 1.5 * st.d;
      const liftEase = st.reducedMotion ? 1 : 1 - Math.exp(-12 * dt);

      for (let v = 0; v < TOTAL; v++) {
        const tapeEl = tapeRefs.current[v];
        if (!tapeEl) continue;

        let r = (v - st.s) % TOTAL;
        if (r > halfTotal) r -= TOTAL;
        if (r < -halfTotal) r += TOTAL;

        const x =
          r * (st.ws + st.gap) +
          (st.d - st.ws + 1.6 * st.gap) * B(r);

        if (Math.abs(x) > cullLimit) {
          if (tapeEl.style.visibility !== 'hidden') {
            tapeEl.style.visibility = 'hidden';
          }
          continue;
        }

        if (tapeEl.style.visibility !== 'visible') {
          tapeEl.style.visibility = 'visible';
        }

        const absR = Math.abs(r);
        const o = smoothstep(Math.max(0, 1 - absR));

        const liftTarget =
          st.hover === v && absR > 0.5 && !st.isOpen && !st.isModalOpen ? 1 : 0;
        st.lifts[v] += (liftTarget - st.lifts[v]) * liftEase;
        const lift = st.lifts[v];

        const rotY = -90 * o + st.tiltY * o;
        const rotX = st.tiltX * o;
        const rotZ = -4.5 * o;
        const tz = o * 0.2 * st.H;
        const ty = -o * 0.025 * st.H - lift * 0.045 * st.H;
        const zIdx = Math.round(100 - absR * 4);

        tapeEl.style.zIndex = String(zIdx);
        tapeEl.style.transform = `translate3d(${x.toFixed(2)}px, ${ty.toFixed(2)}px, ${tz.toFixed(2)}px) rotateZ(${rotZ.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;

        const spEl = spineRefs.current[v];
        const cvEl = coverRefs.current[v];
        if (spEl) {
          spEl.style.setProperty('--shade', (o * 0.55).toFixed(3));
        }
        if (cvEl) {
          cvEl.style.setProperty('--shade', ((1 - o) * 0.5).toFixed(3));
        }
      }

      // 6. Play / Open Ring positioning & scale
      const playEl = playRingRef.current;
      if (playEl) {
        const ringScale =
          st.isOpen || st.isModalOpen
            ? 0
            : smoothstep(Math.max(0, 1 - Math.abs(st.T - st.s) * 3));
        const ringLeft = st.W / 2 - 0.5 * st.d - 6;
        const ringTop = shelfCenterY + 0.36 * st.H;
        playEl.style.left = `${ringLeft}px`;
        playEl.style.top = `${ringTop}px`;
        playEl.style.transform = `translate(-50%, -50%) scale(${ringScale.toFixed(3)})`;
      }

      // 7. Custom cursor smoothing & state classes
      const curEl = cursorRef.current;
      if (curEl) {
        const curEase = st.reducedMotion ? 1 : 1 - Math.exp(-16 * dt);
        st.cx += (st.mx - st.cx) * curEase;
        st.cy += (st.my - st.cy) * curEase;
        curEl.style.transform = `translate3d(${st.cx.toFixed(1)}px, ${st.cy.toFixed(1)}px, 0)`;

        let mode = '';
        if (!st.isOpen && !st.isModalOpen) {
          if (st.onCover) {
            mode = 'open';
          } else if (st.hover !== -1) {
            mode = 'spine';
          } else if (st.overBtn) {
            mode = 'btn';
          }
        } else if (st.overBtn) {
          mode = 'btn';
        }
        curEl.className = `custom-cursor ${mode}`;
      }

      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', measureGeometry);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      mq.removeEventListener('change', onMqChange);
    };
  }, [
    closeDetail,
    measureGeometry,
    openDetail,
    setActiveEvent,
    slideMaskLine,
    updateTabIndicator,
  ]);

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none">
      {/* Off-screen height probe for --H */}
      <div
        ref={probeRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 0,
          height: 'var(--H)',
          visibility: 'hidden',
          pointerEvents: 'none',
        }}
      />

      {/* Paper & Archival Grain Overlay (z-index 40, pointer-events none) */}
      <div
        className="fixed inset-0 z-40 pointer-events-none opacity-45"
        style={{
          mixBlendMode: 'screen',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.24 0 0 0 0 0.81 0 0 0 0 0.56 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 1. TOP BAR (Responsive 3-column grid across Phone, Tablet, and PC) */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[58px] sm:h-[70px] lg:h-[82px] px-3 sm:px-6 lg:px-8 grid grid-cols-[1fr_auto_1fr] items-center">
        {/* Left: Wings Directory Button */}
        <div className="flex items-center gap-2 justify-self-start">
          <button
            type="button"
            onClick={() => setWingsModalOpen(true)}
            className="lbl box gap-1.5"
          >
            <Layers className="w-3 h-3 text-[#3ecf8e]" />
            <span className="hidden sm:inline">WINGS / 05 DIVISIONS</span>
            <span className="sm:hidden">05 WINGS</span>
          </button>
        </div>

        {/* Centre: Official IUBPC Attached Logo Lockup */}
        <a
          href="https://iubpc.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center no-underline group"
        >
          <IubpcBrandLogo />
        </a>

        {/* Right: Career / Archive Metadata */}
        <div className="flex items-center gap-2 justify-self-end">
          <span className="lbl hidden md:inline-block text-[#94a3b8]">
            ARCHIVE 2025〜2026 · 39 EVENTS
          </span>
          <a
            href="https://iubpc.org/events"
            target="_blank"
            rel="noopener noreferrer"
            className="lbl box md:hidden"
          >
            IUBPC.ORG ↗
          </a>
        </div>
      </header>

      {/* 2. FIVE WINGS TABS (Positioned responsively above the 3D shelf for Phone, Tablet, and PC) */}
      <nav
        ref={tabsNavRef}
        aria-label="IUBPC Five Specialized Wings"
        className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center max-w-[96vw]"
        style={{
          top: 'calc(50% - var(--H) / 2 - var(--tabs-offset))',
        }}
      >
        <div className="relative flex items-center bg-[#0a0f1a]/90 backdrop-blur-sm">
          {/* Sliding Emerald/Purple Indicator */}
          <div
            ref={tabIndicatorRef}
            className="absolute top-0 left-0 h-[22px] sm:h-[25px] pointer-events-none"
            style={{
              backgroundColor: '#3ecf8e',
              transition:
                'transform 0.6s var(--ease), width 0.6s var(--ease), background-color 0.45s var(--ease)',
            }}
          />

          <button
            type="button"
            onClick={() => jumpToWing('all')}
            className="lbl relative z-10 h-[22px] sm:h-[25px] px-2 sm:px-3 border border-[var(--rule)] text-[#94a3b8] hover:text-white whitespace-nowrap transition-colors duration-300"
          >
            All / 39
          </button>

          {IUBPC_WINGS.map((wing) => {
            const isActive = activeEvent.wingId === wing.id;
            return (
              <button
                key={wing.id}
                ref={(el) => {
                  tabBtnRefs.current[wing.id] = el;
                }}
                type="button"
                onClick={() => jumpToWing(wing.id)}
                className={`lbl relative z-10 h-[22px] sm:h-[25px] px-2 sm:px-2.5 lg:px-3.5 border border-[var(--rule)] -ml-[1px] whitespace-nowrap transition-colors duration-450 ${
                  isActive
                    ? 'text-[#06101e] font-bold'
                    : 'text-[#ededef] hover:text-[#3ecf8e]'
                }`}
              >
                <span className="hidden lg:inline">{wing.shortLabel}</span>
                <span className="hidden sm:inline lg:hidden">
                  {wing.index} · {wing.code}
                </span>
                <span className="sm:hidden">
                  {wing.index}·{wing.code}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* 3. THE 3D SHELF STAGE */}
      <section
        ref={shelfRef}
        aria-label="IUBPC Event Folio Shelf"
        className="shelf"
        onPointerDown={(e) => {
          const st = engineRef.current;
          if (st.isOpen || st.isModalOpen) return;
          st.isDragging = true;
          st.dragMoved = false;
          st.dragStartX = e.clientX;
          st.dragStartT = st.T;
        }}
      >
        <div ref={stageRef} className="stage">
          {Array.from({ length: TOTAL }).map((_, v) => {
            const filmIdx = v % N;
            const ev = IUBPC_EVENTS[filmIdx];
            const wing =
              IUBPC_WINGS.find((w) => w.id === ev.wingId) || IUBPC_WINGS[0];

            return (
              <div
                key={v}
                ref={(el) => {
                  tapeRefs.current[v] = el;
                }}
                className="tape"
                onPointerEnter={() => {
                  engineRef.current.hover = v;
                }}
                onPointerLeave={() => {
                  if (engineRef.current.hover === v) {
                    engineRef.current.hover = -1;
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  const st = engineRef.current;
                  if (st.dragMoved || st.isOpen || st.isModalOpen) return;

                  const halfTotal = TOTAL / 2;
                  let r = (v - st.s) % TOTAL;
                  if (r > halfTotal) r -= TOTAL;
                  if (r < -halfTotal) r += TOTAL;

                  if (Math.abs(r) < 0.5) {
                    openDetail();
                  } else {
                    st.T = Math.round(st.T + r);
                  }
                }}
              >
                {/* SPINE FACE (.sp) */}
                <div
                  ref={(el) => {
                    spineRefs.current[v] = el;
                  }}
                  className="face sp flex flex-col justify-between p-[4px] sm:p-[5px] select-none"
                >
                  {/* Top Wing Color Bar + Mini Event Crop */}
                  <div className="w-full space-y-1 shrink-0">
                    <div
                      className="w-full h-[2.5px] sm:h-[3px]"
                      style={{ backgroundColor: wing.accent }}
                    />
                    <div className="flex items-center justify-between text-[6.5px] sm:text-[7.5px] font-mono text-[#94a3b8] px-0.5">
                      <span>#{String(filmIdx + 1).padStart(2, '0')}</span>
                      <span style={{ color: wing.accent }}>{wing.index}</span>
                    </div>
                    <div className="w-full aspect-square overflow-hidden border border-white/10 bg-[#070b14]">
                      <img
                        src={ev.img}
                        alt=""
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover opacity-85"
                      />
                    </div>
                  </div>

                  {/* Vertical Event Title */}
                  <div className="flex-1 flex items-center justify-center overflow-hidden py-1.5 sm:py-2">
                    <div
                      className="text-[9px] sm:text-[10.5px] lg:text-[11.5px] font-medium tracking-[0.04em] text-[#ededef] whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        fontFamily: 'var(--font-serif), Georgia, serif',
                        maxHeight: '100%',
                      }}
                    >
                      {ev.title}
                    </div>
                  </div>

                  {/* Bottom IUBPC & Wing Box Badge */}
                  <div className="w-full flex flex-col items-center gap-0.5 sm:gap-1 pt-1 border-t border-white/10 shrink-0">
                    <span className="text-[6px] sm:text-[7px] font-mono tracking-[0.16em] text-[#94a3b8]">
                      IUBPC
                    </span>
                    <span
                      className="w-full text-center py-[1.5px] sm:py-[2px] text-[6.5px] sm:text-[7.5px] font-mono font-bold border"
                      style={{
                        borderColor: `${wing.accent}66`,
                        color: wing.accent,
                        backgroundColor: `${wing.accent}12`,
                      }}
                    >
                      {wing.code}
                    </span>
                  </div>
                </div>

                {/* COVER FACE (.cv) */}
                <div
                  ref={(el) => {
                    coverRefs.current[v] = el;
                  }}
                  className="face cv flex flex-col justify-between p-2 sm:p-3 lg:p-4 select-none"
                >
                  {/* Top Header */}
                  <div className="space-y-1 sm:space-y-1.5 shrink-0">
                    <div className="flex items-center justify-between border-b border-white/15 pb-1 sm:pb-1.5">
                      <span className="text-[6.5px] sm:text-[7.5px] lg:text-[8.5px] font-mono tracking-[0.12em] text-[#94a3b8] uppercase truncate pr-1">
                        IUBPC ARCHIVE
                      </span>
                      <span
                        className="text-[6.5px] sm:text-[7.5px] lg:text-[8.5px] font-mono font-bold px-1 sm:px-1.5 py-0.5 border shrink-0"
                        style={{
                          borderColor: wing.accent,
                          color: wing.accent,
                        }}
                      >
                        {ev.wingCode}
                      </span>
                    </div>

                    <div className="pt-0.5">
                      <div
                        className="text-[11px] sm:text-[13px] lg:text-[16px] leading-[1.12] font-normal text-white line-clamp-2"
                        style={{
                          fontFamily: 'var(--font-serif), Georgia, serif',
                        }}
                      >
                        {ev.title}
                      </div>
                      <div className="mt-0.5 sm:mt-1 text-[7.5px] sm:text-[8.5px] lg:text-[9.5px] font-mono text-[#3ecf8e] truncate">
                        {ev.date}
                      </div>
                    </div>
                  </div>

                  {/* Center Event Artwork */}
                  <div className="relative my-1.5 sm:my-2 flex-1 w-full overflow-hidden border border-white/15 bg-[#070b14]">
                    <img
                      src={ev.img}
                      alt={ev.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a]/90 via-transparent to-[#0a0f1a]/25 pointer-events-none" />
                    <div className="absolute bottom-1.5 left-1.5 right-1.5 hidden sm:flex flex-wrap gap-1">
                      {ev.tags.slice(0, 2).map((tag, ti) => (
                        <span
                          key={ti}
                          className="px-1.5 py-0.5 bg-[#0a0f1a]/85 border border-white/15 text-[6.5px] lg:text-[7px] font-mono text-[#ededef] truncate max-w-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Footer Stamp */}
                  <div className="flex items-center justify-between pt-1 border-t border-white/15 shrink-0 gap-1">
                    <span className="text-[6.5px] sm:text-[7.5px] font-mono text-[#94a3b8] truncate">
                      {ev.subtitle}
                    </span>
                    <span className="px-1 sm:px-1.5 py-0.5 border border-white/25 text-[6.5px] sm:text-[7.5px] font-mono font-bold text-white tracking-wider shrink-0">
                      #{String(filmIdx + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. PLAY / OPEN RING (Lower-left corner of active cover) */}
      <button
        ref={playRingRef}
        type="button"
        aria-label="Open event folio"
        onClick={openDetail}
        className="fixed z-30 w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] rounded-full border border-[#3ecf8e] bg-[#0a0f1a]/85 text-[#3ecf8e] flex items-center justify-center hover:bg-[#3ecf8e] hover:text-[#06101e] transition-colors"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) scale(0)',
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="currentColor"
          className="ml-[2px]"
        >
          <polygon points="2,1 11,6 2,11" />
        </svg>
      </button>

      {/* 5. CAPTION (Centred stack below the shelf with masked sliding spans, sized so arrows never collide) */}
      <div
        aria-live="polite"
        className="fixed left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-[5px] sm:gap-[8px] pointer-events-none text-center"
        style={{
          top: 'calc(50% + var(--H) / 2 + var(--caption-offset))',
          width: 'min(calc(100vw - 96px), 740px)',
        }}
      >
        <div
          ref={capTitleMaskRef}
          className="relative overflow-hidden w-full min-h-[24px] sm:min-h-[32px] lg:min-h-[36px] flex items-center justify-center"
          style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
        />
        <div
          ref={capSubMaskRef}
          className="relative overflow-hidden w-full min-h-[14px] sm:min-h-[16px] flex items-center justify-center"
        />
        <div
          ref={capYearMaskRef}
          className="relative overflow-hidden w-full min-h-[14px] sm:min-h-[16px] flex items-center justify-center"
        />
      </div>

      {/* 6. LEFT & RIGHT ARROWS */}
      <button
        type="button"
        aria-label="Previous event"
        onClick={() => {
          engineRef.current.T = Math.round(engineRef.current.T) - 1;
        }}
        className="fixed left-[4px] sm:left-[16px] lg:left-[28px] z-40 w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] flex items-center justify-center text-[#ededef] hover:text-[#3ecf8e] transition-colors"
        style={{ top: 'calc(50% + var(--H) / 2 + var(--arrow-offset))' }}
      >
        <svg
          width="18"
          height="10"
          viewBox="0 0 18 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
        >
          <path d="M5 1 L1 5 L5 9" />
          <path d="M1 5 L17 5" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Next event"
        onClick={() => {
          engineRef.current.T = Math.round(engineRef.current.T) + 1;
        }}
        className="fixed right-[4px] sm:right-[16px] lg:right-[28px] z-40 w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] flex items-center justify-center text-[#ededef] hover:text-[#3ecf8e] transition-colors"
        style={{ top: 'calc(50% + var(--H) / 2 + var(--arrow-offset))' }}
      >
        <svg
          width="18"
          height="10"
          viewBox="0 0 18 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
        >
          <path d="M13 1 L17 5 L13 9" />
          <path d="M17 5 L1 5" />
        </svg>
      </button>

      {/* 7. FOOTER */}
      <footer className="fixed left-3 right-3 sm:left-6 sm:right-6 lg:left-8 lg:right-8 bottom-3 sm:bottom-[18px] lg:bottom-[24px] z-40 flex items-center justify-between gap-2">
        <div className="lbl text-[#94a3b8] truncate">
          <span className="hidden sm:inline">
            © 2026 IUB PROGRAMMING CLUB · INDEPENDENT UNIVERSITY, BANGLADESH
          </span>
          <span className="sm:hidden">© 2026 IUBPC · DHAKA</span>
        </div>
        <div className="lbl flex items-center gap-1.5 sm:gap-2 text-[#94a3b8] shrink-0">
          <a
            href="https://iubpc.org/events"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ededef] hover:text-[#3ecf8e] no-underline"
          >
            EVENTS
          </a>
          <span>/</span>
          <a
            href="https://iubpc.org/wings"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ededef] hover:text-[#3ecf8e] no-underline"
          >
            WINGS
          </a>
          <span>/</span>
          <a
            href="https://www.facebook.com/iub.pc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ededef] hover:text-[#3ecf8e] no-underline"
          >
            FB
          </a>
          <span>/</span>
          <a
            href="https://discord.gg/exetJQ8FrB"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ededef] hover:text-[#3ecf8e] no-underline"
          >
            DISCORD
          </a>
        </div>
      </footer>

      {/* 8. DETAIL SHEET DIALOG (Paper sheet expand + SVG Ink-Bleed Poster, optimized for Phone, Tablet, and PC) */}
      <div
        ref={detailRef}
        role="dialog"
        aria-modal="true"
        aria-label={activeEvent.title}
        className="fixed inset-0 z-[60] bg-[#0f172a] text-[#ededef] overflow-y-auto lg:overflow-hidden"
        style={{ visibility: 'hidden' }}
      >
        {/* Subtle grid inside detail sheet */}
        <div className="pointer-events-none fixed inset-0 iubpc-grid-bg opacity-70" />

        {/* Detail Top Bar */}
        <div className="sticky top-0 lg:relative z-20 h-[58px] sm:h-[70px] lg:h-[82px] px-3 sm:px-6 lg:px-8 grid grid-cols-[1fr_auto_1fr] items-center border-b border-white/10 bg-[#0a0f1a]/90 backdrop-blur-md">
          <div className="justify-self-start">
            <button
              type="button"
              onClick={closeDetail}
              className="lbl box !border-[#3ecf8e] !text-[#3ecf8e]"
            >
              CLOSE / FOLIO
            </button>
          </div>

          <div className="flex items-center justify-center">
            <IubpcBrandLogo compact />
          </div>

          <div className="justify-self-end flex items-center gap-2">
            <button
              type="button"
              onClick={() => setWingsModalOpen(true)}
              className="lbl box gap-1.5"
            >
              <Layers className="w-3 h-3 text-[#3ecf8e]" />
              <span className="hidden sm:inline">ALL 05 WINGS</span>
              <span className="sm:hidden">WINGS</span>
            </button>
          </div>
        </div>

        {/* Responsive Detail Content Grid:
            - Phone (< 640px): single column scroll, poster on top (42svh), text stack below
            - Tablet (640px – 1023px): 12-column grid (7 cols text, 5 cols poster) with smooth vertical scroll
            - PC (≥ 1024px): locked full-height 12-column split (7 cols text, 5 cols poster)
        */}
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-6 lg:h-[calc(100vh-82px)] items-center select-text">
          {/* Text Column */}
          <div className="order-2 md:order-1 md:col-span-7 flex flex-col justify-center gap-4 sm:gap-5 lg:max-h-[calc(100vh-130px)] lg:overflow-y-auto pr-0 lg:pr-4 pb-8 md:pb-0">
            {/* Line 1: Wing Subtitle */}
            <div className="overflow-hidden">
              <div
                ref={(el) => {
                  detailLineRefs.current[0] = el;
                }}
                className="lbl text-[#3ecf8e] flex flex-wrap items-center gap-2"
              >
                <span>
                  {activeWing.index} · {activeWing.name}
                </span>
                <span>/</span>
                <span className="text-[#7c6aef]">
                  FOLIO #{String(activeIndex + 1).padStart(2, '0')} OF {N}
                </span>
              </div>
            </div>

            {/* Line 2: Event Title */}
            <div className="overflow-hidden">
              <div
                ref={(el) => {
                  detailLineRefs.current[1] = el;
                }}
              >
                <h1
                  className="text-[26px] sm:text-[36px] lg:text-[48px] leading-[1.06] tracking-[-0.025em] font-normal text-white"
                  style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    textWrap: 'balance',
                  }}
                >
                  {activeEvent.title}
                </h1>
              </div>
            </div>

            {/* Line 3: Meta Line (Date / Organizer / Wing Stack) */}
            <div className="overflow-hidden">
              <div
                ref={(el) => {
                  detailLineRefs.current[2] = el;
                }}
                className="lbl text-[#94a3b8] leading-relaxed"
              >
                {activeEvent.date} · {activeEvent.subtitle}
              </div>
            </div>

            {/* Line 4: Full Event Details & Highlights from iubpc.org */}
            <div className="overflow-hidden">
              <div
                ref={(el) => {
                  detailLineRefs.current[3] = el;
                }}
                className="space-y-3.5"
              >
                <p
                  className="text-[15px] sm:text-[16.5px] lg:text-[17px] leading-[1.6] text-[#ededef]/90 max-w-[54ch]"
                  style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
                >
                  {activeEvent.synopsis}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono text-[#3ecf8e]">
                  {activeEvent.tags.map((t, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <span className="text-[#64748b]">·</span>}
                      <span>{t}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Line 5: Wing Context & Pillars */}
            <div className="overflow-hidden">
              <div
                ref={(el) => {
                  detailLineRefs.current[4] = el;
                }}
                className="space-y-3 pt-1"
              >
                <p
                  className="text-[14px] sm:text-[15px] italic text-[#94a3b8]"
                  style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
                >
                  Organized under the IUBPC {activeWing.name} Wing —{' '}
                  {activeWing.kicker}.
                </p>
                <div className="border border-white/10 bg-[#0a0f1a]/80 p-3.5 sm:p-4 space-y-2">
                  <div className="lbl text-[#3ecf8e]">
                    WING FOCUS · {activeWing.name.toUpperCase()}
                  </div>
                  <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                    {activeWing.description}
                  </p>
                  <div className="pt-1 flex flex-wrap gap-2 text-[11px] font-mono text-[#94a3b8]">
                    {activeWing.pillars.map((pillar, pi) => (
                      <React.Fragment key={pi}>
                        {pi > 0 && <span className="text-[#64748b]">·</span>}
                        <span>{pillar}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Line 6: Primary Action Buttons */}
            <div className="overflow-hidden">
              <div
                ref={(el) => {
                  detailLineRefs.current[5] = el;
                }}
                className="flex flex-wrap items-center gap-3 pt-1"
              >
                <a
                  href={activeEvent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lbl h-[42px] px-5 border border-[#3ecf8e] text-[#3ecf8e] hover:bg-[#3ecf8e] hover:text-[#06101e] transition-colors inline-flex items-center gap-2 no-underline"
                >
                  <span>VIEW EVENT ON IUBPC.ORG</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={activeWing.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lbl h-[42px] px-4 border border-white/20 text-[#ededef] hover:border-[#7c6aef] hover:text-[#7c6aef] transition-colors inline-flex items-center gap-2 no-underline"
                >
                  <span>EXPLORE {activeWing.code} WING</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Poster Column: The Ink-Bleed SVG Poster */}
          <div className="order-1 md:order-2 md:col-span-5 flex items-center justify-center h-[42svh] sm:h-[52svh] md:h-[62vh] lg:h-[min(100%,76vh)]">
            <svg
              viewBox="0 0 474 900"
              aria-hidden="true"
              className="h-full w-auto max-w-full drop-shadow-[0_28px_60px_rgba(0,0,0,0.85)]"
            >
              <defs>
                <filter
                  id="ink-filter"
                  x="-30%"
                  y="-30%"
                  width="160%"
                  height="160%"
                >
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.011"
                    numOctaves="3"
                    seed="7"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="120"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>

                <mask
                  id="ink-mask"
                  maskUnits="userSpaceOnUse"
                  x="-200"
                  y="-200"
                  width="874"
                  height="1300"
                >
                  <rect
                    x="-200"
                    y="-200"
                    width="874"
                    height="1300"
                    fill="black"
                  />
                  <g filter="url(#ink-filter)" fill="white">
                    {INK_BLOBS.map((b, idx) => (
                      <circle
                        key={idx}
                        ref={(el) => {
                          blobRefs.current[idx] = el;
                        }}
                        cx={b.cx}
                        cy={b.cy}
                        r="0"
                      />
                    ))}
                  </g>
                </mask>

                <clipPath id="poster-clip">
                  <rect x="0" y="0" width="474" height="900" rx="6" />
                </clipPath>
              </defs>

              <g clipPath="url(#poster-clip)" mask="url(#ink-mask)">
                {/* Poster Base */}
                <rect x="0" y="0" width="474" height="900" fill="#0a0f1a" />

                {/* Poster Outer Border */}
                <rect
                  x="16"
                  y="16"
                  width="442"
                  height="868"
                  fill="none"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="1.5"
                />

                {/* Top Kicker */}
                <text
                  x="36"
                  y="52"
                  fill="#3ecf8e"
                  fontSize="12"
                  fontFamily="monospace"
                  fontWeight="700"
                  letterSpacing="3"
                >
                  IUB PROGRAMMING CLUB · FOLIO #
                  {String(activeIndex + 1).padStart(2, '0')}
                </text>

                <line
                  x1="36"
                  y1="68"
                  x2="438"
                  y2="68"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                />

                {/* Event Photograph */}
                <image
                  href={activeEvent.img}
                  x="36"
                  y="88"
                  width="402"
                  height="480"
                  preserveAspectRatio="xMidYMid slice"
                />

                {/* Subtle Frame around image */}
                <rect
                  x="36"
                  y="88"
                  width="402"
                  height="480"
                  fill="none"
                  stroke="rgba(62,207,142,0.45)"
                  strokeWidth="1.5"
                />

                {/* Wing Classification Banner */}
                <rect
                  x="36"
                  y="590"
                  width="402"
                  height="32"
                  fill="rgba(62,207,142,0.12)"
                  stroke="rgba(62,207,142,0.4)"
                />
                <text
                  x="50"
                  y="611"
                  fill="#3ecf8e"
                  fontSize="12"
                  fontFamily="monospace"
                  fontWeight="700"
                  letterSpacing="2"
                >
                  {activeWing.index} · {activeWing.name.toUpperCase()} WING
                </text>

                {/* Poster Title Block */}
                <foreignObject x="36" y="638" width="402" height="175">
                  <div
                    style={{
                      color: '#ededef',
                      fontFamily: 'var(--font-serif), Georgia, serif',
                      fontSize: '25px',
                      lineHeight: 1.15,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <div>{activeEvent.title}</div>
                    <div
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '12px',
                        color: '#94a3b8',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {activeEvent.date} · {activeEvent.subtitle}
                    </div>
                  </div>
                </foreignObject>

                {/* Bottom Archival Footer inside SVG Poster */}
                <line
                  x1="36"
                  y1="824"
                  x2="438"
                  y2="824"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                />
                <text
                  x="36"
                  y="852"
                  fill="#94a3b8"
                  fontSize="11"
                  fontFamily="monospace"
                  letterSpacing="2"
                >
                  INDEPENDENT UNIVERSITY, BANGLADESH
                </text>
                <rect
                  x="368"
                  y="835"
                  width="70"
                  height="24"
                  fill="none"
                  stroke="#3ecf8e"
                  strokeWidth="1.2"
                />
                <text
                  x="403"
                  y="851"
                  textAnchor="middle"
                  fill="#3ecf8e"
                  fontSize="11"
                  fontFamily="monospace"
                  fontWeight="700"
                  letterSpacing="2"
                >
                  IUBPC
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* 9. CUSTOM CURSOR */}
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
        <div className="cursor-ring" />
        <div className="cursor-dot" />
        <div className="cursor-label">
          <span>OPEN</span>
          <span>FOLIO</span>
        </div>
      </div>

      {/* 10. MODAL: 5 WINGS & 39 EVENTS DIRECTORY */}
      <WingsDirectoryModal
        isOpen={wingsModalOpen}
        onClose={() => setWingsModalOpen(false)}
        onSelectEventIndex={(idx, openImm) =>
          jumpToEventIndex(idx, openImm)
        }
      />
    </div>
  );
}
