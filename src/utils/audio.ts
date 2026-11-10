// Web Audio API Synthesizer for instant, zero-latency tactile audio feedback

class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Taktil click sound when selecting an option card
  playClick() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }

  // Duolingo-style crisp positive chime for correct answers
  playCorrect() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.3);
    });
  }

  // Soft low buzz for incorrect answer (not jarring, clear feedback)
  playIncorrect() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(130, now + 0.22);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Fanfare when completing a full topic or reward milestone
  playFanfare() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const chords = [
      { f: [523.25, 659.25], t: 0, d: 0.15 },
      { f: [587.33, 739.99], t: 0.15, d: 0.15 },
      { f: [659.25, 830.61], t: 0.3, d: 0.2 },
      { f: [783.99, 1046.5], t: 0.5, d: 0.5 },
    ];

    const now = ctx.currentTime;
    chords.forEach(({ f, t, d }) => {
      f.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + t);

        gain.gain.setValueAtTime(0.12, now + t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + t);
        osc.stop(now + t + d);
      });
    });
  }

  // Gentle calming bowl tone for the 5-minute break zone
  playRelaxChime() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const frequencies = [432, 864, 1296]; // Solfeggio / warm harmonic overtone

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const vol = 0.15 / (idx + 1);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(vol, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.6);
    });
  }
}

export const sound = new SoundEffectsManager();
