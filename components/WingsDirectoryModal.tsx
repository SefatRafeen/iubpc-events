'use client';

import React, { useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import {
  IUBPC_WINGS,
  IUBPC_EVENTS,
  IubpcEvent,
  WingId,
} from '@/lib/iubpc-data';

interface WingsDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEventIndex: (index: number, openDetailImmediately?: boolean) => void;
}

export default function WingsDirectoryModal({
  isOpen,
  onClose,
  onSelectEventIndex,
}: WingsDirectoryModalProps) {
  const [selectedWing, setSelectedWing] = useState<WingId | 'all'>('all');

  if (!isOpen) return null;

  const filteredEvents: { event: IubpcEvent; index: number }[] =
    IUBPC_EVENTS.map((event, index) => ({ event, index })).filter(
      ({ event }) => {
        if (selectedWing === 'all') return true;
        return event.wingId === selectedWing;
      }
    );

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#060911]/90 backdrop-blur-md p-2.5 sm:p-6 lg:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="IUBPC Five Specialized Wings & Complete Event Directory"
    >
      <div className="relative w-full max-w-6xl border border-white/15 bg-[#0f172a] text-[#ededef] shadow-2xl overflow-hidden my-auto max-h-[92svh] sm:max-h-[88vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-6 py-3.5 sm:py-4 bg-[#0a0f1a] shrink-0 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded bg-white/95 p-1 shrink-0 flex items-center justify-center">
              <img
                src="/assets/aistudio/IUBPC_Logos_Dark_Text_955f6021.png"
                alt="IUBPC Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="lbl text-[#3ecf8e] truncate">
                IUBPC.ORG/WINGS · FIVE SPECIALIZED DIVISIONS
              </div>
              <h2
                className="mt-1 text-base sm:text-xl lg:text-2xl font-normal tracking-tight text-white truncate"
                style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
              >
                Five wings. One community. Complete 39-Event Archive.
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="lbl box gap-1.5 shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            <span>CLOSE</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 sm:space-y-8 select-text">
          {/* 5 Wings Overview Cards matching iubpc.org/wings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {IUBPC_WINGS.map((wing) => {
              const count = IUBPC_EVENTS.filter(
                (e) => e.wingId === wing.id
              ).length;
              const isSelected = selectedWing === wing.id;
              return (
                <button
                  key={wing.id}
                  type="button"
                  onClick={() =>
                    setSelectedWing(isSelected ? 'all' : wing.id)
                  }
                  className={`text-left p-3.5 sm:p-4 border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#3ecf8e] bg-[#131c31]'
                      : 'border-white/10 bg-[#0a0f1a] hover:border-white/30'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className="lbl px-2 py-0.5 border"
                        style={{
                          borderColor: `${wing.accent}66`,
                          color: wing.accent,
                          backgroundColor: `${wing.accent}15`,
                        }}
                      >
                        {wing.code} · {wing.index}
                      </span>
                      <span className="lbl text-[#94a3b8]">
                        {count} EVENTS
                      </span>
                    </div>
                    <h3 className="mt-2.5 sm:mt-3 text-sm sm:text-base font-semibold text-white">
                      {wing.name}
                    </h3>
                    <p className="mt-1 sm:mt-1.5 text-xs text-[#94a3b8] leading-relaxed">
                      {wing.description}
                    </p>
                  </div>
                  <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/10 flex flex-wrap gap-1.5 text-[10px] font-mono text-[#64748b]">
                    {wing.stack.join(' · ')}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-white/10 pb-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedWing('all')}
                className={`lbl box ${
                  selectedWing === 'all'
                    ? '!border-[#3ecf8e] !bg-[#3ecf8e] !text-[#06101e]'
                    : ''
                }`}
              >
                ALL EVENTS ({IUBPC_EVENTS.length})
              </button>
              {IUBPC_WINGS.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setSelectedWing(w.id)}
                  className={`lbl box ${
                    selectedWing === w.id
                      ? '!border-[#3ecf8e] !bg-[#3ecf8e] !text-[#06101e]'
                      : ''
                  }`}
                >
                  {w.index} · {w.name}
                </button>
              ))}
            </div>

            <a
              href="https://iubpc.org/wings"
              target="_blank"
              rel="noopener noreferrer"
              className="lbl text-[#3ecf8e] flex items-center gap-1 hover:underline"
            >
              OFFICIAL IUBPC.ORG/WINGS
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {filteredEvents.map(({ event, index }) => (
              <div
                key={event.slug}
                className="group border border-white/10 bg-[#0a0f1a] hover:border-[#3ecf8e]/60 transition-colors flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="relative h-36 w-full overflow-hidden bg-[#131c31]">
                    <img
                      src={event.img}
                      alt={event.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent" />
                    <div className="absolute top-2.5 left-2.5 lbl px-2 py-1 bg-[#0a0f1a]/90 border border-white/15 text-[#3ecf8e]">
                      FOLIO #{String(index + 1).padStart(2, '0')} ·{' '}
                      {event.wingCode}
                    </div>
                  </div>
                  <div className="p-3.5 sm:p-4">
                    <div className="text-[11px] font-mono text-[#3ecf8e]">
                      {event.date} · {event.wingName}
                    </div>
                    <h4 className="mt-1 text-sm font-medium text-white line-clamp-2">
                      {event.title}
                    </h4>
                    <p className="mt-1 text-xs text-[#94a3b8] line-clamp-1">
                      {event.subtitle}
                    </p>
                  </div>
                </div>

                <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectEventIndex(index, false);
                      onClose();
                    }}
                    className="lbl box flex-1"
                  >
                    GLIDE ON SHELF
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectEventIndex(index, true);
                      onClose();
                    }}
                    className="lbl box !border-[#3ecf8e]/60 !text-[#3ecf8e] flex-1"
                  >
                    OPEN FOLIO
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
