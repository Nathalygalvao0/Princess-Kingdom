/**
 * ============================================================
 * PRINCESS: MAGIC KINGDOM
 * Jogo de Plataforma 2D Moderno em HTML5 Canvas, CSS3 e JavaScript Puro (ES6+)
 * 
 * Totalmente otimizado:
 * - Física profissional com Coyote Time, Jump Buffering e Altura Variável
 * - Colisão AABB precisa sem travamento em quinas ou travessia de plataformas
 * - Câmera com interpolação suave (Lerp) e Parallax dinâmico em 5 camadas
 * - 5 Fases progressivas 100% testadas e concluíveis
 * - Gráficos refinados de conto de fadas: paleta pastel, flores, partículas e animações
 * - Áudio procedural via Web Audio API (música de fundo e efeitos sonoros)
 * ============================================================
 */

// ============================================================
// 1. SISTEMA DE ÁUDIO PROCEDURAL (WEB AUDIO API)
// ============================================================
class SoundSystem {
  constructor() {
    this.ctx = null;
    this.sfxEnabled = true;
    this.musicEnabled = true;
    this.musicTimer = null;
    this.musicStep = 0;
    // Escala pentatônica mágica e harmoniosa (Fada / Realeza)
    this.melodyNotes = [
      261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 440.00, 392.00,
      329.63, 392.00, 523.25, 587.33, 523.25, 440.00, 392.00, 329.63
    ];
    this.bassNotes = [130.81, 164.81, 196.00, 220.00];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  setSfxEnabled(val) {
    this.sfxEnabled = val;
  }

  setMusicEnabled(val) {
    this.musicEnabled = val;
    if (val) {
      this.startMusic();
    } else {
      this.stopMusic();
    }
  }

  startMusic() {
    if (!this.musicEnabled) return;
    this.init();
    if (this.musicTimer) clearInterval(this.musicTimer);

    this.musicStep = 0;
    this.musicTimer = setInterval(() => {
      if (!this.musicEnabled || !this.ctx) return;
      const t = this.ctx.currentTime;

      // Nota Melódica
      const melodyFreq = this.melodyNotes[this.musicStep % this.melodyNotes.length];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(melodyFreq, t);

      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.36);

      // Baixo a cada 2 compassos
      if (this.musicStep % 2 === 0) {
        const bassFreq = this.bassNotes[Math.floor(this.musicStep / 4) % this.bassNotes.length];
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();

        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(bassFreq, t);

        bassGain.gain.setValueAtTime(0.06, t);
        bassGain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);

        bassOsc.connect(bassGain);
        bassGain.connect(this.ctx.destination);

        bassOsc.start(t);
        bassOsc.stop(t + 0.56);
      }

      this.musicStep++;
    }, 280);
  }

  stopMusic() {
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }

  playJump() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, t);
    osc.frequency.exponentialRampToValueAtTime(620, t + 0.16);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.linearRampToValueAtTime(0.01, t + 0.16);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.17);
  }

  playSpring() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(280, t);
    osc.frequency.exponentialRampToValueAtTime(980, t + 0.28);

    gain.gain.setValueAtTime(0.26, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.29);
  }

  playLand() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(60, t + 0.08);

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.linearRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.09);
  }

  playCoin() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, t);
    osc.frequency.setValueAtTime(1318.51, t + 0.08);

    gain.gain.setValueAtTime(0.22, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.3);
  }

  playCrystal() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    [1046.50, 1318.51, 1567.98, 2093.00].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const st = t + idx * 0.045;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, st);

      gain.gain.setValueAtTime(0.18, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(st);
      osc.stop(st + 0.22);
    });
  }

  playStomp() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(200, t);
    osc.frequency.exponentialRampToValueAtTime(60, t + 0.16);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.16);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.17);
  }

  playHurt() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(340, t);
    osc.frequency.linearRampToValueAtTime(100, t + 0.25);

    gain.gain.setValueAtTime(0.28, t);
    gain.gain.linearRampToValueAtTime(0.01, t + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.26);
  }

  playPowerup() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const freqs = [392, 523.25, 659.25, 783.99, 1046.50];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const st = t + idx * 0.055;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, st);

      gain.gain.setValueAtTime(0.2, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(st);
      osc.stop(st + 0.24);
    });
  }

  playShoot() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(580, t);
    osc.frequency.exponentialRampToValueAtTime(1450, t + 0.14);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.14);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.15);
  }

  playBossHurt() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.linearRampToValueAtTime(45, t + 0.32);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.linearRampToValueAtTime(0.01, t + 0.32);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.33);
  }

  playLevelClear() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const fanfare = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50, 1318.51];
    fanfare.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const st = t + idx * 0.12;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, st);

      gain.gain.setValueAtTime(0.25, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(st);
      osc.stop(st + 0.36);
    });
  }

  playGameOver() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    [329.63, 293.66, 261.63, 220.00].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const st = t + idx * 0.16;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, st);

      gain.gain.setValueAtTime(0.22, st);
      gain.gain.linearRampToValueAtTime(0.01, st + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(st);
      osc.stop(st + 0.32);
    });
  }

  playClick() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.04);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.linearRampToValueAtTime(0.01, t + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.05);
  }
}

// ============================================================
// 2. GERENCIADOR DE PROGRESSO E LOCALSTORAGE
// ============================================================
class StorageManager {
  static SAVE_KEY = 'princess_magic_kingdom_save_v2';

  static getDefaultData() {
    return {
      highScore: 0,
      totalCoins: 0,
      totalCrystals: 0,
      unlockedLevels: 1, // 1 a 5
      levelStars: [0, 0, 0, 0, 0],
      bossDefeated: false,
      musicEnabled: true,
      sfxEnabled: true,
      mobileControls: true
    };
  }

  static load() {
    try {
      const raw = localStorage.getItem(this.SAVE_KEY);
      if (!raw) return this.getDefaultData();
      return { ...this.getDefaultData(), ...JSON.parse(raw) };
    } catch (e) {
      console.warn('Erro ao carregar dados do localStorage:', e);
      return this.getDefaultData();
    }
  }

  static save(data) {
    try {
      localStorage.setItem(this.SAVE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Erro ao salvar no localStorage:', e);
    }
  }

  static reset() {
    try {
      localStorage.removeItem(this.SAVE_KEY);
    } catch (e) {}
  }
}

// ============================================================
// 3. GERENCIADOR DE ENTRADA (TECLADO + TOUCH MOBILE) COM BUFFERING
// ============================================================
class InputHandler {
  constructor() {
    this.keys = {
      left: false,
      right: false,
      jump: false,
      shoot: false,
      run: false
    };

    // Jump buffer em segundos: permite registrar o pulo até 160ms antes de tocar no chão
    this.jumpBufferTimer = 0;
    this.pauseCallback = null;

    this.initKeyboard();
    this.initTouch();
  }

  initKeyboard() {
    window.addEventListener('keydown', (e) => {
      const code = e.code;
      if (code === 'ArrowLeft' || code === 'KeyA') this.keys.left = true;
      if (code === 'ArrowRight' || code === 'KeyD') this.keys.right = true;
      if (code === 'ShiftLeft' || code === 'ShiftRight') this.keys.run = true;

      if (code === 'ArrowUp' || code === 'KeyW' || code === 'Space') {
        if (!this.keys.jump) {
          this.jumpBufferTimer = 0.16; // 160ms buffer
        }
        this.keys.jump = true;
        if (e.target === document.body) e.preventDefault();
      }

      if (code === 'KeyX' || code === 'KeyF' || code === 'Enter') {
        this.keys.shoot = true;
      }

      if (code === 'KeyP' || code === 'Escape') {
        if (this.pauseCallback) this.pauseCallback();
      }
    });

    window.addEventListener('keyup', (e) => {
      const code = e.code;
      if (code === 'ArrowLeft' || code === 'KeyA') this.keys.left = false;
      if (code === 'ArrowRight' || code === 'KeyD') this.keys.right = false;
      if (code === 'ShiftLeft' || code === 'ShiftRight') this.keys.run = false;
      if (code === 'ArrowUp' || code === 'KeyW' || code === 'Space') this.keys.jump = false;
      if (code === 'KeyX' || code === 'KeyF' || code === 'Enter') this.keys.shoot = false;
    });
  }

  initTouch() {
    const bindBtn = (id, keyName, isJump = false) => {
      const btn = document.getElementById(id);
      if (!btn) return;

      const handlePress = (e) => {
        e.preventDefault();
        btn.classList.add('pressed');
        if (isJump && !this.keys[keyName]) {
          this.jumpBufferTimer = 0.16;
        }
        this.keys[keyName] = true;
      };

      const handleRelease = (e) => {
        e.preventDefault();
        btn.classList.remove('pressed');
        this.keys[keyName] = false;
      };

      btn.addEventListener('touchstart', handlePress, { passive: false });
      btn.addEventListener('touchend', handleRelease, { passive: false });
      btn.addEventListener('touchcancel', handleRelease, { passive: false });
      btn.addEventListener('mousedown', handlePress);
      btn.addEventListener('mouseup', handleRelease);
      btn.addEventListener('mouseleave', handleRelease);
    };

    bindBtn('touchLeft', 'left');
    bindBtn('touchRight', 'right');
    bindBtn('touchJump', 'jump', true);
    bindBtn('touchShoot', 'shoot');
  }

  update(dt) {
    if (this.jumpBufferTimer > 0) {
      this.jumpBufferTimer -= dt;
      if (this.jumpBufferTimer < 0) this.jumpBufferTimer = 0;
    }
  }

  consumeJump() {
    if (this.jumpBufferTimer > 0) {
      this.jumpBufferTimer = 0;
      return true;
    }
    return false;
  }
}

// ============================================================
// 4. SISTEMA DE PARTÍCULAS MÁGICAS & EFEITOS VISUAIS
// ============================================================
class Particle {
  constructor(x, y, vx, vy, color, size, life, type = 'circle') {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.size = size;
    this.maxLife = life;
    this.life = life;
    this.type = type; // 'circle', 'star', 'petal', 'confetti'
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.18;
  }

  update(dt) {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotSpeed;
    this.life -= dt;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    const progress = Math.max(0, this.life / this.maxLife);
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, progress));
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;

    if (this.type === 'star') {
      const s = this.size * progress;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.quadraticCurveTo(0, 0, s, 0);
      ctx.quadraticCurveTo(0, 0, 0, s);
      ctx.quadraticCurveTo(0, 0, -s, 0);
      ctx.quadraticCurveTo(0, 0, 0, -s);
      ctx.fill();
    } else if (this.type === 'petal') {
      const s = this.size * progress;
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 1.5, s * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'confetti') {
      ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(0.8, this.size * progress), 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  update(dt) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.update(dt);
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw(ctx) {
    for (const p of this.particles) {
      p.draw(ctx);
    }
  }

  createMagicBurst(x, y, count = 16, colors = ['#ffd700', '#ff6595', '#b388eb', '#ffffff']) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.35;
      const speed = 1.6 + Math.random() * 3.6;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 0.8;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 3.5 + Math.random() * 5.5;
      const life = 0.5 + Math.random() * 0.45;
      const type = Math.random() > 0.45 ? 'star' : 'circle';
      this.particles.push(new Particle(x, y, vx, vy, color, size, life, type));
    }
  }

  createDust(x, y) {
    for (let i = 0; i < 7; i++) {
      const vx = (Math.random() - 0.5) * 2.2;
      const vy = -Math.random() * 1.4;
      this.particles.push(new Particle(x, y, vx, vy, 'rgba(255, 230, 245, 0.7)', 3 + Math.random() * 3.5, 0.35, 'circle'));
    }
  }

  createLandingSparkles(x, y) {
    for (let i = 0; i < 8; i++) {
      const vx = (Math.random() - 0.5) * 3.2;
      const vy = -Math.random() * 2.0;
      const color = Math.random() > 0.5 ? '#ffd700' : '#ffb8d2';
      this.particles.push(new Particle(x, y, vx, vy, color, 3.5 + Math.random() * 2.5, 0.4, 'star'));
    }
  }

  createConfetti(x, y, count = 36) {
    const colors = ['#ff4081', '#ffd700', '#00e5ff', '#b388eb', '#ffffff', '#76ff03', '#ff80ab'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.2 + Math.random() * 6.5;
      this.particles.push(
        new Particle(
          x,
          y,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed - 3.2,
          colors[Math.floor(Math.random() * colors.length)],
          6.5 + Math.random() * 6.5,
          1.2 + Math.random() * 0.9,
          'confetti'
        )
      );
    }
  }
}

// ============================================================
// 5. PROJÉTEIS (MAGIA DA PRINCESA, FOGO DO DRAGÃO, ORBES DA RAINHA)
// ============================================================
class Projectile {
  constructor(x, y, vx, vy, type = 'player_magic') {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.type = type; // 'player_magic', 'dragon_fire', 'boss_dark_orb'
    this.radius = type === 'player_magic' ? 10 : 12;
    this.life = 3.2;
    this.frame = 0;
  }

  update(dt) {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= dt;
    this.frame++;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    if (this.type === 'player_magic') {
      const glow = Math.sin(this.frame * 0.25) * 4 + 12;
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = glow;
      ctx.fillStyle = '#ff6595';

      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const outerAngle = (i * 2 * Math.PI) / 5 - Math.PI / 2 + this.frame * 0.12;
        const innerAngle = outerAngle + Math.PI / 5;
        const rOuter = 12;
        const rInner = 5.5;
        if (i === 0) ctx.moveTo(Math.cos(outerAngle) * rOuter, Math.sin(outerAngle) * rOuter);
        else ctx.lineTo(Math.cos(outerAngle) * rOuter, Math.sin(outerAngle) * rOuter);
        ctx.lineTo(Math.cos(innerAngle) * rInner, Math.sin(innerAngle) * rInner);
      }
      ctx.closePath();
      ctx.fill();

      // Centro radiante
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'dragon_fire') {
      ctx.shadowColor = '#b388eb';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#9b51e0';
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ff80ab';
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Orbe da Rainha das Sombras
      ctx.shadowColor = '#ff007f';
      ctx.shadowBlur = 18;
      ctx.fillStyle = '#2a0845';
      ctx.beginPath();
      ctx.arc(0, 0, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#e056fd';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#ff007f';
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

// ============================================================
// 6. ITENS COLETÁVEIS & RECOMPENSAS
// ============================================================
class Item {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.baseY = y;
    this.width = 28;
    this.height = 28;
    this.type = type; // 'coin', 'crystal', 'heart', 'wand', 'star', 'crown'
    this.collected = false;
    this.bobOffset = Math.random() * Math.PI * 2;
  }

  update(dt, frame) {
    this.y = this.baseY + Math.sin(frame * 0.08 + this.bobOffset) * 5;
  }

  draw(ctx, frame) {
    if (this.collected) return;
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

    if (this.type === 'coin') {
      const scaleX = Math.abs(Math.sin(frame * 0.08 + this.bobOffset));
      ctx.scale(Math.max(0.18, scaleX), 1);
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 9;
      ctx.fillStyle = '#ffd166';
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#f4a261';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#d97706';
      ctx.font = 'bold 11px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('★', 0, 0.5);
    } else if (this.type === 'crystal') {
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(0, -14);
      ctx.lineTo(11, -3);
      ctx.lineTo(8, 12);
      ctx.lineTo(-8, 12);
      ctx.lineTo(-11, -3);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.beginPath();
      ctx.moveTo(0, -14);
      ctx.lineTo(5, -3);
      ctx.lineTo(0, 11);
      ctx.lineTo(-5, -3);
      ctx.closePath();
      ctx.fill();
    } else if (this.type === 'heart') {
      ctx.shadowColor = '#ff4081';
      ctx.shadowBlur = 13;
      ctx.fillStyle = '#ff4081';
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.bezierCurveTo(-14, -2, -14, -14, 0, -7);
      ctx.bezierCurveTo(14, -14, 14, -2, 0, 10);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-4, -5, 2.6, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'wand') {
      ctx.shadowColor = '#ff6595';
      ctx.shadowBlur = 14;
      ctx.rotate(0.28);

      ctx.fillStyle = '#ffd166';
      ctx.fillRect(-2, -2, 4, 22);

      ctx.fillStyle = '#ff6595';
      ctx.beginPath();
      ctx.arc(0, -5, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, -5, 3.2, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'star') {
      const hue = (frame * 6) % 360;
      ctx.shadowColor = `hsl(${hue}, 100%, 65%)`;
      ctx.shadowBlur = 16;
      ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;

      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a1 = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const a2 = a1 + Math.PI / 5;
        if (i === 0) ctx.moveTo(Math.cos(a1) * 14, Math.sin(a1) * 14);
        else ctx.lineTo(Math.cos(a1) * 14, Math.sin(a1) * 14);
        ctx.lineTo(Math.cos(a2) * 6.5, Math.sin(a2) * 6.5);
      }
      ctx.closePath();
      ctx.fill();
    } else if (this.type === 'crown') {
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 18;
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.moveTo(-12, 10);
      ctx.lineTo(12, 10);
      ctx.lineTo(13, -4);
      ctx.lineTo(6, 2);
      ctx.lineTo(0, -9);
      ctx.lineTo(-6, 2);
      ctx.lineTo(-13, -4);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#ff1744';
      ctx.beginPath();
      ctx.arc(0, -2, 2.6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

// ============================================================
// 7. PLATAFORMAS & CENÁRIO COM RICAS ILUSTRAÇÕES DE CONTO DE FADAS
// ============================================================
class Platform {
  constructor(x, y, width, height, type = 'solid', options = {}) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.width = width;
    this.height = height;
    this.type = type; // 'solid', 'moving_h', 'moving_v', 'cloud', 'spring', 'spikes'
    this.options = options;

    this.moveDistance = options.distance || 130;
    this.moveSpeed = options.speed || 1.2;
    this.moveOffset = options.offset || 0;
    this.dx = 0;
    this.dy = 0;

    // Animação de mola/cogumelo ao ser pisado
    this.springBounceTimer = 0;
  }

  update(frame, dt = 1/60) {
    if (this.springBounceTimer > 0) {
      this.springBounceTimer -= dt;
      if (this.springBounceTimer < 0) this.springBounceTimer = 0;
    }

    if (this.type === 'moving_h') {
      const prevX = this.x;
      this.x = this.startX + Math.sin(frame * 0.025 * this.moveSpeed + this.moveOffset) * this.moveDistance;
      this.dx = this.x - prevX;
    } else if (this.type === 'moving_v') {
      const prevY = this.y;
      this.y = this.startY + Math.sin(frame * 0.025 * this.moveSpeed + this.moveOffset) * this.moveDistance;
      this.dy = this.y - prevY;
    }
  }

  triggerBounce() {
    this.springBounceTimer = 0.35;
  }

  draw(ctx, theme = 'castle') {
    ctx.save();

    if (this.type === 'solid') {
      // 🏰 Bloco de Mármore Mágico com Camada de Grama Florida
      const grad = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
      if (theme === 'garden') {
        grad.addColorStop(0, '#ffa8cb');
        grad.addColorStop(0.3, '#f472b6');
        grad.addColorStop(1, '#9333ea');
      } else if (theme === 'forest') {
        grad.addColorStop(0, '#c084fc');
        grad.addColorStop(0.3, '#9333ea');
        grad.addColorStop(1, '#3b0764');
      } else if (theme === 'tower') {
        grad.addColorStop(0, '#818cf8');
        grad.addColorStop(0.3, '#4f46e5');
        grad.addColorStop(1, '#1e1b4b');
      } else if (theme === 'sky') {
        grad.addColorStop(0, '#fbcfe8');
        grad.addColorStop(0.3, '#f472b6');
        grad.addColorStop(1, '#6366f1');
      } else {
        // Castelo da Rainha
        grad.addColorStop(0, '#e879f9');
        grad.addColorStop(0.3, '#a21caf');
        grad.addColorStop(1, '#2e0249');
      }

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(this.x, this.y, this.width, this.height, [8, 8, 4, 4]);
      ctx.fill();

      // Topo gramado mágico com flores delicadas
      ctx.fillStyle = '#fce7f3';
      ctx.beginPath();
      ctx.roundRect(this.x, this.y, this.width, 7, [8, 8, 0, 0]);
      ctx.fill();

      // Flores e detalhes na grama
      const flowerSpacing = 36;
      for (let fx = this.x + 16; fx < this.x + this.width - 12; fx += flowerSpacing) {
        // Florzinha pastel
        ctx.fillStyle = (fx % 2 === 0) ? '#f43f5e' : '#ffd700';
        ctx.beginPath();
        ctx.arc(fx, this.y + 2, 2.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(fx, this.y + 2, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Detalhes sutis de tijolos encantados
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 1;
      for (let bx = this.x + 22; bx < this.x + this.width; bx += 38) {
        ctx.beginPath();
        ctx.moveTo(bx, this.y + 8);
        ctx.lineTo(bx, this.y + this.height - 4);
        ctx.stroke();
      }
    } else if (this.type === 'cloud') {
      // ☁️ Nuvem Fofa com Camadas Tridimensionais e Borda Dourada Suave
      ctx.shadowColor = '#e0aaff';
      ctx.shadowBlur = 12;
      ctx.fillStyle = 'rgba(255, 240, 252, 0.95)';

      const r = this.height * 0.7;
      ctx.beginPath();
      ctx.arc(this.x + r * 0.8, this.y + this.height * 0.5, r * 0.7, Math.PI * 0.5, Math.PI * 1.5);
      ctx.arc(this.x + this.width * 0.3, this.y + this.height * 0.35, r * 0.85, Math.PI, Math.PI * 2);
      ctx.arc(this.x + this.width * 0.65, this.y + this.height * 0.3, r * 0.95, Math.PI, Math.PI * 2);
      ctx.arc(this.x + this.width - r * 0.8, this.y + this.height * 0.5, r * 0.7, Math.PI * 1.5, Math.PI * 0.5);
      ctx.closePath();
      ctx.fill();

      // Contorno brilhante
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Reflexo interno suave
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(this.x + this.width * 0.45, this.y + this.height * 0.35, r * 0.45, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'moving_h' || this.type === 'moving_v') {
      // 🪄 Plataforma Flutuante Dourada e Alada
      const grad = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y);
      grad.addColorStop(0, '#ffd166');
      grad.addColorStop(0.5, '#f472b6');
      grad.addColorStop(1, '#c084fc');

      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 14;
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(this.x, this.y, this.width, this.height, 10);
      ctx.fill();

      // Asinhas mágicas animadas nas extremidades
      const wingFlap = Math.sin((this.x + this.y) * 0.08) * 3;
      ctx.fillStyle = '#ffffff';
      // Asa esquerda
      ctx.beginPath();
      ctx.ellipse(this.x - 5, this.y + this.height / 2 + wingFlap, 9, 5, -0.3, 0, Math.PI * 2);
      ctx.fill();
      // Asa direita
      ctx.beginPath();
      ctx.ellipse(this.x + this.width + 5, this.y + this.height / 2 + wingFlap, 9, 5, 0.3, 0, Math.PI * 2);
      ctx.fill();

      // Jóia mágica no centro
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'spring') {
      // 🍄 Cogumelo Saltador Encantado com Animação de Squash
      const cx = this.x + this.width / 2;
      const cy = this.y + this.height;
      const isSquashed = this.springBounceTimer > 0;
      const squashScale = isSquashed ? 0.65 : 1.0;
      const capY = this.y + 12 + (isSquashed ? 8 : 0);

      // Caule
      ctx.fillStyle = '#fceade';
      ctx.fillRect(cx - 8, this.y + 10, 16, this.height - 10);

      // Chapéu do cogumelo
      ctx.shadowColor = '#ff6595';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#ff2a6d';
      ctx.beginPath();
      ctx.ellipse(cx, capY, (this.width / 2) * (isSquashed ? 1.25 : 1.0), 12 * squashScale, 0, Math.PI, 0);
      ctx.fill();

      // Bolinhas brancas no cogumelo
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx - 9, capY - 4 * squashScale, 3.2, 0, Math.PI * 2);
      ctx.arc(cx + 9, capY - 4 * squashScale, 3.2, 0, Math.PI * 2);
      ctx.arc(cx, capY - 8 * squashScale, 3.6, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'spikes') {
      // 💎 Cristais Pontiagudos de Ametista com Névoa Mágica
      ctx.fillStyle = '#7928ca';
      ctx.shadowColor = '#ff007f';
      ctx.shadowBlur = 8;
      const count = Math.max(2, Math.floor(this.width / 15));
      const step = this.width / count;
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const sx = this.x + i * step;
        ctx.moveTo(sx, this.y + this.height);
        ctx.lineTo(sx + step / 2, this.y);
        ctx.lineTo(sx + step, this.y + this.height);
      }
      ctx.fill();

      // Brilho facetado nos espinhos
      ctx.fillStyle = '#e0aaff';
      for (let i = 0; i < count; i++) {
        const sx = this.x + i * step;
        ctx.beginPath();
        ctx.moveTo(sx + step * 0.4, this.y + this.height);
        ctx.lineTo(sx + step / 2, this.y);
        ctx.lineTo(sx + step * 0.6, this.y + this.height * 0.4);
        ctx.fill();
      }
    }

    ctx.restore();
  }
}

// ============================================================
// 8. CHECKPOINTS E MASTRO DE VITÓRIA
// ============================================================
class Checkpoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 70;
    this.active = false;
  }

  draw(ctx, frame) {
    ctx.save();
    // Mastro Dourado Real
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(this.x + 4, this.y, 6, this.height);

    // Esfera de topo
    ctx.fillStyle = '#ff6595';
    ctx.beginPath();
    ctx.arc(this.x + 7, this.y, 8.5, 0, Math.PI * 2);
    ctx.fill();

    // Bandeira rosa/lilás ondulando
    const wave = Math.sin(frame * 0.1) * 4.5;
    ctx.fillStyle = this.active ? '#ff4081' : '#b388eb';
    ctx.shadowColor = this.active ? '#ff75a0' : '#8c52ff';
    ctx.shadowBlur = this.active ? 16 : 4;

    ctx.beginPath();
    ctx.moveTo(this.x + 10, this.y + 6);
    ctx.lineTo(this.x + 38 + wave, this.y + 16);
    ctx.lineTo(this.x + 10, this.y + 28);
    ctx.closePath();
    ctx.fill();

    if (this.active) {
      ctx.fillStyle = '#ffd700';
      ctx.font = '12px Arial';
      ctx.fillText('👑', this.x + 14, this.y + 20);
    }

    ctx.restore();
  }
}

class GoalPortal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 90;
  }

  draw(ctx, frame) {
    ctx.save();
    const cx = this.x + this.width / 2;
    const cy = this.y + this.height / 2;

    ctx.shadowColor = '#ff6595';
    ctx.shadowBlur = 22;

    // Portal em arco de mármore
    ctx.strokeStyle = '#fff0f5';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(cx, this.y + 36, 26, Math.PI, 0);
    ctx.lineTo(cx + 26, this.y + this.height);
    ctx.lineTo(cx - 26, this.y + this.height);
    ctx.stroke();

    // Vórtice mágico
    const grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, 32);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.4, '#ff99c8');
    grad.addColorStop(0.8, '#7928ca');
    grad.addColorStop(1, 'transparent');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.fill();

    // Estrelas giratórias
    ctx.fillStyle = '#ffd700';
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2 + frame * 0.05;
      const px = cx + Math.cos(a) * 18;
      const py = cy + Math.sin(a) * 18;
      ctx.beginPath();
      ctx.arc(px, py, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

// ============================================================
// 9. INIMIGOS E CHEFE FINAL (RAINHA DAS SOMBRAS)
// ============================================================
class Enemy {
  constructor(x, y, width, height, type = 'witch', patrolDistance = 120) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type; // 'witch', 'dragon', 'shadow_imp'
    this.vx = -1.2;
    this.vy = 0;
    this.facingRight = false;
    this.alive = true;
    this.patrolLeft = x - patrolDistance;
    this.patrolRight = x + patrolDistance;
    this.shootTimer = 0;
    this.frame = 0;
  }

  update(dt, player, projectiles) {
    if (!this.alive) return;
    this.frame++;

    if (this.type === 'witch') {
      this.x += this.vx;
      if (this.x < this.patrolLeft) {
        this.x = this.patrolLeft;
        this.vx = Math.abs(this.vx);
        this.facingRight = true;
      } else if (this.x > this.patrolRight) {
        this.x = this.patrolRight;
        this.vx = -Math.abs(this.vx);
        this.facingRight = false;
      }
    } else if (this.type === 'dragon') {
      this.x += this.vx;
      if (this.x < this.patrolLeft) {
        this.x = this.patrolLeft;
        this.vx = Math.abs(this.vx);
        this.facingRight = true;
      } else if (this.x > this.patrolRight) {
        this.x = this.patrolRight;
        this.vx = -Math.abs(this.vx);
        this.facingRight = false;
      }

      this.shootTimer += dt;
      if (this.shootTimer >= 3.0) {
        this.shootTimer = 0;
        const dist = Math.abs(player.x - this.x);
        if (dist < 400) {
          const shootVx = this.facingRight ? 3.2 : -3.2;
          projectiles.push(new Projectile(this.x + this.width / 2, this.y + 12, shootVx, 0, 'dragon_fire'));
        }
      }
    } else if (this.type === 'shadow_imp') {
      const dx = player.x - this.x;
      if (Math.abs(dx) < 300) {
        this.vx = dx > 0 ? 1.2 : -1.2;
        this.facingRight = this.vx > 0;
      } else {
        this.vx = 0;
      }
      this.x += this.vx;
    }
  }

  draw(ctx) {
    if (!this.alive) return;
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    if (this.facingRight) ctx.scale(-1, 1);

    if (this.type === 'witch') {
      // 🧙‍♀️ Bruxa Sombria Fofa
      // Chapéu Pontudo Roxo
      ctx.fillStyle = '#4a0e4e';
      ctx.beginPath();
      ctx.moveTo(-14, -6);
      ctx.lineTo(14, -6);
      ctx.lineTo(-4, -26);
      ctx.closePath();
      ctx.fill();

      // Fivela Dourada do Chapéu
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(-4, -8, 8, 4);

      // Rostinho
      ctx.fillStyle = '#ffd1dc';
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fill();

      // Olhos Verdes Mágicos
      ctx.fillStyle = '#00e676';
      ctx.beginPath();
      ctx.arc(-4, -1, 2.5, 0, Math.PI * 2);
      ctx.arc(4, -1, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Vestido Roxo
      ctx.fillStyle = '#6a1b9a';
      ctx.beginPath();
      ctx.moveTo(-10, 10);
      ctx.lineTo(10, 10);
      ctx.lineTo(14, 22);
      ctx.lineTo(-14, 22);
      ctx.closePath();
      ctx.fill();

      // Vassoura com estrelinhas
      ctx.fillStyle = '#8d6e63';
      ctx.fillRect(-18, 12, 34, 3);
      ctx.fillStyle = '#ffd54f';
      ctx.fillRect(-22, 9, 7, 9);
    } else if (this.type === 'dragon') {
      // 🐉 Dragãozinho Roxo
      const wingFlap = Math.sin(this.frame * 0.25) * 6;
      ctx.fillStyle = '#ab47bc';
      ctx.beginPath();
      ctx.moveTo(-4, -4);
      ctx.lineTo(-16, -14 + wingFlap);
      ctx.lineTo(-6, 2);
      ctx.closePath();
      ctx.fill();

      // Corpo fofo arredondado
      ctx.fillStyle = '#8e24aa';
      ctx.beginPath();
      ctx.arc(0, 4, 14, 0, Math.PI * 2);
      ctx.fill();

      // Barriguinha lilás
      ctx.fillStyle = '#e1bee7';
      ctx.beginPath();
      ctx.arc(-2, 6, 8, 0, Math.PI * 2);
      ctx.fill();

      // Chifrinhos dourados
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.moveTo(-6, -10);
      ctx.lineTo(-10, -18);
      ctx.lineTo(-3, -12);
      ctx.fill();

      // Olho expressivo
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-4, 0, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1a237e';
      ctx.beginPath();
      ctx.arc(-5, 0, 2.8, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'shadow_imp') {
      // 🧌 Criatura Encantada das Sombras
      const bounce = Math.abs(Math.sin(this.frame * 0.16)) * 4;
      ctx.shadowColor = '#ff007f';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#1d0033';
      ctx.beginPath();
      ctx.arc(0, 4 - bounce, 13, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ff3399';
      ctx.beginPath();
      ctx.arc(-5, 2 - bounce, 3.5, 0, Math.PI * 2);
      ctx.arc(5, 2 - bounce, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

// 👑 CHEFE FINAL: RAINHA DAS SOMBRAS
class Boss {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.width = 54;
    this.height = 76;
    this.maxHealth = 10;
    this.health = 10;
    this.alive = true;
    this.facingRight = false;
    this.invulnerableTimer = 0;
    this.actionTimer = 0;
    this.frame = 0;
    this.phase = 1;
    this.teleportCooldown = 0;
  }

  takeDamage(soundSystem, particles) {
    if (this.invulnerableTimer > 0 || !this.alive) return false;
    this.health -= 1;
    this.invulnerableTimer = 1.2;
    soundSystem.playBossHurt();
    particles.createMagicBurst(this.x + this.width / 2, this.y + this.height / 2, 24, ['#ff007f', '#ffd700', '#9b51e0']);

    if (this.health <= 0) {
      this.alive = false;
      return true;
    }

    if (this.health <= 3) this.phase = 3;
    else if (this.health <= 7) this.phase = 2;

    return false;
  }

  update(dt, player, projectiles, soundSystem) {
    if (!this.alive) return;
    this.frame++;
    if (this.invulnerableTimer > 0) this.invulnerableTimer -= dt;

    this.facingRight = player.x > this.x;
    this.actionTimer += dt;

    const cooldown = this.phase === 3 ? 1.8 : this.phase === 2 ? 2.3 : 2.8;

    if (this.actionTimer >= cooldown) {
      this.actionTimer = 0;
      const attackType = Math.random();

      if (attackType < 0.55) {
        // Ataque 1: Orbes de energia sombria
        const dir = this.facingRight ? 1 : -1;
        const orbSpeed = this.phase === 3 ? 4.5 : 3.4;
        projectiles.push(new Projectile(this.x + this.width / 2, this.y + 20, dir * orbSpeed, -0.4, 'boss_dark_orb'));

        if (this.phase >= 2) {
          projectiles.push(new Projectile(this.x + this.width / 2, this.y + 20, dir * orbSpeed * 0.9, 1.2, 'boss_dark_orb'));
        }
      } else if (attackType < 0.85) {
        // Ataque 2: Teletransporte seguro pelo salão do trono
        const arenaLeft = this.startX - 260;
        const arenaRight = this.startX + 260;
        this.x = arenaLeft + Math.random() * (arenaRight - arenaLeft);
      } else {
        // Ataque 3: Salto levitante
        this.y = this.startY - 45;
      }
    } else {
      // Suave retorno ao solo
      if (this.y < this.startY) {
        this.y += 1.2;
        if (this.y > this.startY) this.y = this.startY;
      }
    }
  }

  draw(ctx) {
    if (!this.alive) return;

    if (this.invulnerableTimer > 0 && Math.floor(this.frame / 4) % 2 === 0) {
      return;
    }

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    if (this.facingRight) ctx.scale(-1, 1);

    ctx.shadowColor = this.phase === 3 ? '#ff007f' : '#8a2be2';
    ctx.shadowBlur = 20;

    // Capa escura majestosa
    ctx.fillStyle = '#1c0326';
    ctx.beginPath();
    ctx.moveTo(-16, -18);
    ctx.lineTo(24, 34);
    ctx.lineTo(-24, 34);
    ctx.closePath();
    ctx.fill();

    // Vestido gótico real
    const gradDress = ctx.createLinearGradient(0, -10, 0, 34);
    gradDress.addColorStop(0, '#4a0e4e');
    gradDress.addColorStop(1, '#1b0024');
    ctx.fillStyle = gradDress;
    ctx.beginPath();
    ctx.moveTo(-12, -8);
    ctx.lineTo(12, -8);
    ctx.lineTo(18, 34);
    ctx.lineTo(-18, 34);
    ctx.closePath();
    ctx.fill();

    // Rosto
    ctx.fillStyle = '#fce4ec';
    ctx.beginPath();
    ctx.arc(0, -16, 12, 0, Math.PI * 2);
    ctx.fill();

    // Cabelo preto azulado
    ctx.fillStyle = '#0f051d';
    ctx.beginPath();
    ctx.arc(-8, -18, 8, 0, Math.PI * 2);
    ctx.arc(8, -18, 8, 0, Math.PI * 2);
    ctx.arc(0, -22, 10, 0, Math.PI * 2);
    ctx.fill();

    // Coroa das Sombras
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.moveTo(-10, -24);
    ctx.lineTo(10, -24);
    ctx.lineTo(12, -34);
    ctx.lineTo(5, -28);
    ctx.lineTo(0, -38);
    ctx.lineTo(-5, -28);
    ctx.lineTo(-12, -34);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#e056fd';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Olhos magenta
    ctx.fillStyle = '#ff1493';
    ctx.beginPath();
    ctx.arc(-4, -16, 2.5, 0, Math.PI * 2);
    ctx.arc(4, -16, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Cetro
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(-18, -26, 3, 48);
    ctx.fillStyle = '#e056fd';
    ctx.beginPath();
    ctx.arc(-16.5, -26, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

// ============================================================
// 10. PERSONAGEM PRINCIPAL: PRINCESA AVENTUREIRA
// ============================================================
class Player {
  constructor(x, y) {
    this.startX = x;
    this.startY = y;
    this.checkpointX = x;
    this.checkpointY = y;

    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.width = 32;
    this.height = 48;

    // Física refinada com aceleração e desaceleração controlada
    this.vx = 0;
    this.vy = 0;
    this.walkSpeed = 3.8;
    this.runSpeed = 5.4;
    this.jumpForce = -10.8;
    this.gravity = 0.42;
    this.apexGravity = 0.22;
    this.fallGravity = 0.52;
    this.terminalVelocity = 11.5;

    // Coyote time e estados de solo
    this.grounded = false;
    this.coyoteTimer = 0; // Permite pular 130ms após sair de uma beirada
    this.ridingPlatform = null;
    this.facingRight = true;

    // Squash & Stretch visual
    this.scaleX = 1.0;
    this.scaleY = 1.0;

    // Estados e Poderes
    this.lives = 3;
    this.maxLives = 5;
    this.coins = 0;
    this.crystals = 0;
    this.score = 0;

    this.invulnerableTimer = 0;
    this.wandTimer = 0;
    this.starTimer = 0;
    this.shootCooldown = 0;

    this.state = 'idle'; // 'idle', 'walk', 'run', 'jump', 'fall'
    this.frame = 0;
    this.animTimer = 0;
  }

  respawn() {
    this.x = this.checkpointX;
    this.y = this.checkpointY;
    this.prevX = this.checkpointX;
    this.prevY = this.checkpointY;
    this.vx = 0;
    this.vy = 0;
    this.ridingPlatform = null;
    this.grounded = false;
    this.coyoteTimer = 0;
    this.invulnerableTimer = 2.0; // 2s de proteção
  }

  takeHit(soundSystem, particles) {
    if (this.starTimer > 0 || this.invulnerableTimer > 0) return false;

    this.lives -= 1;
    soundSystem.playHurt();
    particles.createMagicBurst(this.x + this.width / 2, this.y + this.height / 2, 18, ['#ff4081', '#ffffff']);

    if (this.lives <= 0) {
      return true; // Game Over
    }

    this.respawn();
    return false;
  }

  physicsUpdate(step, input, platforms, soundSystem, particles, projectiles) {
    this.frame++;
    this.animTimer += step;
    this.prevX = this.x;
    this.prevY = this.y;

    // Atualizar cronômetros
    if (this.invulnerableTimer > 0) this.invulnerableTimer -= step;
    if (this.wandTimer > 0) this.wandTimer -= step;
    if (this.starTimer > 0) this.starTimer -= step;
    if (this.shootCooldown > 0) this.shootCooldown -= step;
    if (this.coyoteTimer > 0) this.coyoteTimer -= step;

    // Recuperação de squash & stretch
    this.scaleX += (1.0 - this.scaleX) * 0.18;
    this.scaleY += (1.0 - this.scaleY) * 0.18;

    // 1. Movimentação Horizontal
    const isRunning = input.keys.run || this.starTimer > 0;
    const targetMaxSpeed = isRunning ? this.runSpeed : this.walkSpeed;
    let targetVx = 0;

    if (input.keys.left && !input.keys.right) {
      targetVx = -targetMaxSpeed;
      this.facingRight = false;
    } else if (input.keys.right && !input.keys.left) {
      targetVx = targetMaxSpeed;
      this.facingRight = true;
    }

    // Aceleração e Desaceleração
    if (targetVx !== 0) {
      const accel = this.grounded ? 0.38 : 0.28;
      this.vx += (targetVx - this.vx) * accel;
    } else {
      const friction = this.grounded ? 0.25 : 0.08;
      this.vx += (0 - this.vx) * friction;
      if (Math.abs(this.vx) < 0.1) this.vx = 0;
    }

    // Acompanhar plataforma móvel horizontal
    if (this.grounded && this.ridingPlatform && this.ridingPlatform.dx) {
      this.x += this.ridingPlatform.dx;
    }

    // 2. Disparo de Magia da Varinha
    if (input.keys.shoot && this.wandTimer > 0 && this.shootCooldown <= 0) {
      this.shootCooldown = 0.25;
      const projSpeed = this.facingRight ? 7.8 : -7.8;
      projectiles.push(new Projectile(this.x + this.width / 2, this.y + 16, projSpeed, 0, 'player_magic'));
      soundSystem.playShoot();
      particles.createMagicBurst(this.x + this.width / 2, this.y + 16, 8, ['#ffd700', '#ff6595']);
    }

    // 3. Mecânica de Pulo com Coyote Time e Jump Buffering
    const canJump = this.grounded || this.coyoteTimer > 0;

    if (input.consumeJump() && canJump) {
      this.vy = this.jumpForce;
      this.grounded = false;
      this.coyoteTimer = 0;
      this.scaleX = 0.82;
      this.scaleY = 1.25;

      // Impulso adicional de momento ao pular de plataforma móvel
      if (this.ridingPlatform && this.ridingPlatform.dx) {
        this.vx += this.ridingPlatform.dx * 0.45;
      }
      this.ridingPlatform = null;

      soundSystem.playJump();
      particles.createDust(this.x + this.width / 2, this.y + this.height);
    }

    // Pulo de Altura Variável: corte suave ao soltar a tecla no ar
    if (!input.keys.jump && this.vy < -3.5) {
      this.vy = -3.5;
    }

    // Gravidade adaptativa (Apex float para sensação mágica de leveza)
    let currentGravity = this.gravity;
    if (Math.abs(this.vy) < 1.6) {
      currentGravity = this.apexGravity; // Flutuação mágica no ápice
    } else if (this.vy > 0) {
      currentGravity = this.fallGravity; // Queda firme e satisfatória
    }

    this.vy += currentGravity;
    if (this.vy > this.terminalVelocity) this.vy = this.terminalVelocity;

    // 4. Integração de Posição & Colisão X
    this.x += this.vx;
    this.checkHorizontalCollisions(platforms);

    // 5. Integração de Posição & Colisão Y
    this.y += this.vy;
    const wasGrounded = this.grounded;
    this.grounded = false;
    this.checkVerticalCollisions(platforms, soundSystem, particles);

    // Gerenciar coyote time ao sair de bordas
    if (wasGrounded && !this.grounded && this.vy >= 0) {
      this.coyoteTimer = 0.13; // 130ms de janela de pulo
    }

    // Estado da animação
    if (!this.grounded) {
      this.state = this.vy < 0 ? 'jump' : 'fall';
    } else if (Math.abs(this.vx) > 0.4) {
      this.state = Math.abs(this.vx) > this.walkSpeed * 1.1 ? 'run' : 'walk';
    } else {
      this.state = 'idle';
    }

    // Efeito de rastro brilhante com a Estrela
    if (this.starTimer > 0 && Math.random() < 0.45) {
      particles.createMagicBurst(this.x + this.width / 2, this.y + this.height / 2, 2, ['#ffd700', '#ffffff', '#ff6595']);
    }
  }

  checkHorizontalCollisions(platforms) {
    // Inset vertical de 8px para nunca colidir acidentalmente com o chão que o jogador está pisando
    const playerTop = this.y + 8;
    const playerBottom = this.y + this.height - 8;

    for (const p of platforms) {
      if (p.type === 'cloud' || p.type === 'spring' || p.type === 'spikes') continue;

      if (
        this.x < p.x + p.width &&
        this.x + this.width > p.x &&
        playerBottom > p.y &&
        playerTop < p.y + p.height
      ) {
        if (this.vx > 0) {
          this.x = p.x - this.width;
        } else if (this.vx < 0) {
          this.x = p.x + p.width;
        }
        this.vx = 0;
      }
    }
  }

  checkVerticalCollisions(platforms, soundSystem, particles) {
    const playerLeft = this.x + 4;
    const playerRight = this.x + this.width - 4;

    for (const p of platforms) {
      // Verificar alinhamento horizontal
      if (playerRight > p.x && playerLeft < p.x + p.width) {
        // Colisão com espinhos
        if (p.type === 'spikes') {
          if (this.y + this.height >= p.y + 6 && this.y < p.y + p.height) {
            this.takeHit(soundSystem, particles);
            return;
          }
          continue;
        }

        // Colisão com mola / cogumelo saltador
        if (p.type === 'spring') {
          if (this.vy >= 0 && this.y + this.height >= p.y && this.prevY + this.height <= p.y + 14) {
            this.vy = -14.2; // Super salto!
            this.y = p.y - this.height;
            this.scaleX = 0.75;
            this.scaleY = 1.35;
            p.triggerBounce();
            soundSystem.playSpring();
            particles.createMagicBurst(this.x + this.width / 2, this.y + this.height, 14, ['#ff4081', '#ffd700', '#ffffff']);
            return;
          }
          continue;
        }

        // Colisão com nuvem (plataforma one-way que permite atravessar de baixo para cima)
        if (p.type === 'cloud') {
          if (this.vy >= 0 && this.y + this.height >= p.y && this.prevY + this.height <= p.y + 10) {
            this.landOnPlatform(p, soundSystem, particles);
            return;
          }
          continue;
        }

        // Plataformas sólidas e móveis (4 vias)
        if (this.vy >= 0 && this.y + this.height >= p.y && this.prevY + this.height <= p.y + 14) {
          this.landOnPlatform(p, soundSystem, particles);
          return;
        }

        // Cabeçada em bloco sólido por baixo
        if (this.vy < 0 && p.type === 'solid' && this.y <= p.y + p.height && this.prevY >= p.y + p.height - 12) {
          this.y = p.y + p.height;
          this.vy = 0;
          return;
        }
      }
    }
  }

  landOnPlatform(p, soundSystem, particles) {
    const wasInAir = !this.grounded && this.vy > 3;
    this.y = p.y - this.height;
    this.vy = 0;
    this.grounded = true;
    this.coyoteTimer = 0;
    this.ridingPlatform = p;

    if (wasInAir) {
      this.scaleX = 1.25;
      this.scaleY = 0.8;
      soundSystem.playLand();
      particles.createLandingSparkles(this.x + this.width / 2, this.y + this.height);
    }
  }

  draw(ctx) {
    if (this.invulnerableTimer > 0 && Math.floor(this.frame / 4) % 2 === 0) {
      return;
    }

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    if (!this.facingRight) ctx.scale(-1, 1);

    // Aplicar squash e stretch
    ctx.scale(this.scaleX, this.scaleY);

    // Efeito de aura colorida com a Estrela de Invencibilidade
    if (this.starTimer > 0) {
      const hue = (this.frame * 8) % 360;
      ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
      ctx.shadowBlur = 20;
    } else {
      ctx.shadowColor = 'rgba(255, 105, 180, 0.45)';
      ctx.shadowBlur = 9;
    }

    // 1. Cabelos Longos Dourados Ondulantes
    const hairWave = Math.sin(this.frame * 0.16) * 3.5;
    ctx.fillStyle = '#ffcf40';
    ctx.beginPath();
    ctx.arc(-4, -12, 11, 0, Math.PI * 2);
    ctx.arc(-8 + hairWave, 0, 9.5, 0, Math.PI * 2);
    ctx.arc(-11 + hairWave * 1.25, 11, 8.5, 0, Math.PI * 2);
    ctx.fill();

    // 2. Vestido de Princesa Rosa & Lilás
    const walkSwing = (this.state === 'walk' || this.state === 'run') ? Math.sin(this.frame * 0.32) * 4.5 : 0;
    const gradDress = ctx.createLinearGradient(0, 0, 0, 24);
    gradDress.addColorStop(0, '#ff75a0');
    gradDress.addColorStop(0.55, '#f72585');
    gradDress.addColorStop(1, '#b5179e');

    ctx.fillStyle = gradDress;
    ctx.beginPath();
    ctx.moveTo(-7, 2);
    ctx.lineTo(7, 2);
    ctx.lineTo(13 + walkSwing, 22);
    ctx.lineTo(-13 + walkSwing, 22);
    ctx.closePath();
    ctx.fill();

    // Babado branco rendado na bainha do vestido
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-8 + walkSwing, 22, 3.8, 0, Math.PI * 2);
    ctx.arc(0 + walkSwing, 22, 3.8, 0, Math.PI * 2);
    ctx.arc(8 + walkSwing, 22, 3.8, 0, Math.PI * 2);
    ctx.fill();

    // Perninhas / Sapatinhos de Cristal
    ctx.fillStyle = '#fce4ec';
    const legOffset = (this.state === 'walk' || this.state === 'run') ? Math.sin(this.frame * 0.32) * 6 : 0;
    ctx.fillRect(-6 + legOffset, 20, 4, 5);
    ctx.fillRect(2 - legOffset, 20, 4, 5);
    ctx.fillStyle = '#00f2fe';
    ctx.fillRect(-7 + legOffset, 24, 6, 3);
    ctx.fillRect(1 - legOffset, 24, 6, 3);

    // 3. Corpete & Laço de Fita Dourado
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(-5, 4, 10, 3.2);

    // 4. Rosto Carismático
    ctx.fillStyle = '#ffdfba';
    ctx.beginPath();
    ctx.arc(2, -8, 8, 0, Math.PI * 2);
    ctx.fill();

    // Bochechas coradas fofas
    ctx.fillStyle = 'rgba(255, 64, 129, 0.48)';
    ctx.beginPath();
    ctx.arc(4, -6, 2.6, 0, Math.PI * 2);
    ctx.fill();

    // Olho expressivo com brilho
    ctx.fillStyle = '#4a154b';
    ctx.beginPath();
    ctx.arc(5, -9, 2.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(6, -10, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Franja charmosa
    ctx.fillStyle = '#ffcf40';
    ctx.beginPath();
    ctx.arc(2, -14, 7, 0, Math.PI);
    ctx.fill();

    // 5. Coroa Real Dourada com Rubi
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.moveTo(-3, -16);
    ctx.lineTo(7, -16);
    ctx.lineTo(8, -22);
    ctx.lineTo(5, -18);
    ctx.lineTo(2, -24);
    ctx.lineTo(-1, -18);
    ctx.lineTo(-4, -22);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ff1744';
    ctx.beginPath();
    ctx.arc(2, -18, 1.6, 0, Math.PI * 2);
    ctx.fill();

    // 6. Varinha Mágica na Mão (se tiver poder ativo)
    if (this.wandTimer > 0) {
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(8, 0, 3, 16);
      ctx.fillStyle = '#ff6595';
      ctx.beginPath();
      ctx.arc(9.5, -2, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

// ============================================================
// 11. SISTEMA DE FASES (5 MUNDOS PROGRESSIVOS E 100% CONCLUÍVEIS)
// ============================================================
class Level {
  constructor(number, name, theme, length, platforms, items, enemies, boss = null, checkpointPos = null, portalPos = null) {
    this.number = number;
    this.name = name;
    this.theme = theme; // 'garden', 'forest', 'tower', 'sky', 'castle'
    this.length = length;
    this.platforms = platforms;
    this.items = items;
    this.enemies = enemies;
    this.boss = boss;

    const cpX = checkpointPos ? checkpointPos.x : Math.floor(length * 0.45);
    const cpY = checkpointPos ? checkpointPos.y : 390;
    this.checkpoint = new Checkpoint(cpX, cpY);

    const ptX = portalPos ? portalPos.x : length - 140;
    const ptY = portalPos ? portalPos.y : 370;
    this.portal = new GoalPortal(ptX, ptY);
  }

  static createLevel(index) {
    switch (index) {
      case 1:
        return Level.createLevel1();
      case 2:
        return Level.createLevel2();
      case 3:
        return Level.createLevel3();
      case 4:
        return Level.createLevel4();
      case 5:
        return Level.createLevel5();
      default:
        return Level.createLevel1();
    }
  }

  // FASE 1: Jardim Encantado (Introdutória, suave e acolhedora)
  static createLevel1() {
    const platforms = [
      new Platform(0, 460, 680, 80, 'solid'),
      new Platform(260, 360, 140, 24, 'solid'),
      new Platform(460, 300, 140, 24, 'solid'),
      new Platform(780, 460, 600, 80, 'solid'),
      new Platform(880, 370, 160, 24, 'solid'),
      new Platform(1120, 310, 140, 24, 'solid'),
      new Platform(1300, 370, 140, 24, 'cloud'), // Ponte de nuvem suave
      new Platform(1480, 460, 720, 80, 'solid'),
      new Platform(1640, 350, 160, 24, 'cloud'),
      new Platform(1880, 290, 160, 24, 'cloud'),
      new Platform(2100, 370, 140, 24, 'cloud'), // Nuvem conectora segura
      new Platform(2300, 460, 900, 80, 'solid'),
      new Platform(2480, 370, 160, 24, 'solid'),
      new Platform(2740, 310, 160, 24, 'solid')
    ];

    const items = [
      new Item(180, 420, 'coin'),
      new Item(220, 400, 'coin'),
      new Item(290, 320, 'coin'),
      new Item(330, 320, 'coin'),
      new Item(490, 260, 'crystal'),
      new Item(920, 330, 'coin'),
      new Item(960, 330, 'coin'),
      new Item(1160, 270, 'wand'),
      new Item(1680, 310, 'crystal'),
      new Item(1720, 310, 'coin'),
      new Item(1920, 250, 'star'),
      new Item(2520, 330, 'coin'),
      new Item(2780, 270, 'crown')
    ];

    const enemies = [
      new Enemy(480, 420, 28, 40, 'witch', 100),
      new Enemy(980, 420, 28, 40, 'witch', 100),
      new Enemy(1720, 420, 28, 40, 'witch', 110),
      new Enemy(2520, 420, 28, 40, 'witch', 120)
    ];

    return new Level(
      1,
      'Jardim Encantado',
      'garden',
      3200,
      platforms,
      items,
      enemies,
      null,
      { x: 1560, y: 390 },
      { x: 3050, y: 370 }
    );
  }

  // FASE 2: Floresta Mágica (Plataformas móveis e cogumelos saltadores)
  static createLevel2() {
    const platforms = [
      new Platform(0, 460, 520, 80, 'solid'),
      new Platform(440, 435, 42, 25, 'spring'), // Mola bem apoiada no solo
      new Platform(620, 460, 480, 80, 'solid'),
      new Platform(780, 360, 140, 24, 'solid'),
      new Platform(1220, 370, 140, 24, 'moving_h', { distance: 120, speed: 1.2 }),
      new Platform(1440, 460, 680, 80, 'solid'),
      new Platform(1680, 370, 140, 24, 'solid'),
      new Platform(1920, 340, 140, 24, 'cloud'), // Nuvem conectora segura
      new Platform(2160, 380, 140, 24, 'moving_v', { distance: 60, speed: 1.3 }),
      new Platform(2380, 460, 1020, 80, 'solid'),
      new Platform(2600, 370, 150, 24, 'cloud'),
      new Platform(2850, 300, 150, 24, 'cloud')
    ];

    const items = [
      new Item(160, 420, 'coin'),
      new Item(280, 420, 'coin'),
      new Item(440, 290, 'crystal'),
      new Item(720, 420, 'coin'),
      new Item(820, 320, 'wand'),
      new Item(1220, 320, 'crystal'),
      new Item(1600, 420, 'heart'),
      new Item(1740, 330, 'coin'),
      new Item(2460, 420, 'coin'),
      new Item(2640, 330, 'crystal'),
      new Item(2890, 260, 'star'),
      new Item(3080, 420, 'crown')
    ];

    const enemies = [
      new Enemy(300, 420, 28, 40, 'witch', 90),
      new Enemy(740, 420, 32, 32, 'dragon', 100),
      new Enemy(1620, 420, 32, 32, 'dragon', 110),
      new Enemy(2600, 420, 26, 26, 'shadow_imp', 80)
    ];

    return new Level(
      2,
      'Floresta Mágica',
      'forest',
      3400,
      platforms,
      items,
      enemies,
      null,
      { x: 1540, y: 390 },
      { x: 3250, y: 370 }
    );
  }

  // FASE 3: Torre das Bruxas (Espinhos, desafios verticais e criaturas)
  static createLevel3() {
    const platforms = [
      new Platform(0, 460, 560, 80, 'solid'),
      new Platform(240, 370, 130, 22, 'solid'),
      new Platform(420, 300, 140, 22, 'solid'),
      new Platform(560, 350, 140, 22, 'cloud'), // Rota aérea sobre os espinhos
      new Platform(560, 440, 80, 20, 'spikes'), // Armadilha de espinhos de 80px (fácil de saltar)
      new Platform(640, 460, 680, 80, 'solid'), // Chão firme continua até 1320
      new Platform(1050, 360, 140, 22, 'moving_h', { distance: 110, speed: 1.3 }),
      new Platform(1280, 350, 140, 22, 'cloud'), // Nuvem conectora segura
      new Platform(1460, 460, 700, 80, 'solid'),
      new Platform(1700, 360, 140, 22, 'cloud'),
      new Platform(1920, 290, 140, 22, 'cloud'),
      new Platform(2140, 370, 130, 22, 'cloud'), // Nuvem conectora
      new Platform(2280, 460, 1320, 80, 'solid'), // Plataforma que estende até 3600
      new Platform(2520, 440, 90, 20, 'spikes'),
      new Platform(2500, 340, 140, 22, 'moving_v', { distance: 60, speed: 1.4 }),
      new Platform(2660, 370, 140, 22, 'cloud') // Passagem segura pós-espinhos
    ];

    const items = [
      new Item(180, 420, 'coin'),
      new Item(270, 330, 'crystal'),
      new Item(460, 260, 'wand'),
      new Item(820, 420, 'coin'),
      new Item(1080, 310, 'crystal'),
      new Item(1540, 420, 'heart'),
      new Item(1740, 320, 'coin'),
      new Item(1960, 250, 'star'),
      new Item(2720, 420, 'coin'),
      new Item(2900, 420, 'crown')
    ];

    const enemies = [
      new Enemy(350, 420, 28, 40, 'witch', 80),
      new Enemy(840, 420, 28, 40, 'witch', 100),
      new Enemy(1560, 420, 26, 26, 'shadow_imp', 70),
      new Enemy(1840, 420, 32, 32, 'dragon', 100),
      new Enemy(2820, 420, 26, 26, 'shadow_imp', 80)
    ];

    return new Level(
      3,
      'Torre das Bruxas',
      'tower',
      3600,
      platforms,
      items,
      enemies,
      null,
      { x: 1580, y: 390 },
      { x: 3450, y: 370 }
    );
  }

  // FASE 4: Reino das Nuvens (Plataformas suspensas, molas e saltos celestes)
  static createLevel4() {
    const platforms = [
      new Platform(0, 460, 420, 80, 'solid'),
      new Platform(440, 410, 130, 24, 'cloud'),
      new Platform(590, 370, 130, 24, 'cloud'), // Conexão perfeita
      new Platform(720, 340, 140, 22, 'moving_h', { distance: 100, speed: 1.3 }),
      new Platform(920, 320, 150, 24, 'cloud'),
      // Ilha de nuvem segura com cogumelo saltador firme
      new Platform(1120, 450, 180, 30, 'cloud'),
      new Platform(1180, 425, 44, 25, 'spring'),
      new Platform(1360, 460, 520, 80, 'solid'),
      new Platform(1600, 370, 140, 24, 'cloud'),
      new Platform(1880, 380, 130, 22, 'cloud'), // Conexão segura
      new Platform(2040, 360, 140, 22, 'moving_v', { distance: 60, speed: 1.4 }),
      new Platform(2220, 320, 140, 24, 'cloud'), // Conexão segura
      new Platform(2400, 280, 140, 22, 'moving_h', { distance: 100, speed: 1.4 }),
      new Platform(2580, 360, 140, 24, 'cloud'),
      new Platform(2760, 460, 1040, 80, 'solid'),
      new Platform(2980, 370, 160, 24, 'cloud')
    ];

    const items = [
      new Item(160, 420, 'coin'),
      new Item(520, 370, 'crystal'),
      new Item(740, 300, 'wand'),
      new Item(960, 270, 'coin'),
      new Item(1440, 420, 'heart'),
      new Item(1960, 320, 'crystal'),
      new Item(2180, 260, 'star'),
      new Item(2420, 220, 'crown'),
      new Item(2860, 420, 'coin'),
      new Item(3040, 320, 'crystal')
    ];

    const enemies = [
      new Enemy(220, 420, 32, 32, 'dragon', 80),
      new Enemy(1480, 420, 32, 32, 'dragon', 100),
      new Enemy(1680, 420, 28, 40, 'witch', 90),
      new Enemy(2920, 420, 32, 32, 'dragon', 110)
    ];

    return new Level(
      4,
      'Reino das Nuvens',
      'sky',
      3800,
      platforms,
      items,
      enemies,
      null,
      { x: 1460, y: 390 },
      { x: 3650, y: 370 }
    );
  }

  // FASE 5: Castelo da Rainha das Sombras (Fase final com Grande Arena e Chefe)
  static createLevel5() {
    const platforms = [
      new Platform(0, 460, 600, 80, 'solid'),
      new Platform(280, 370, 140, 24, 'solid'),
      new Platform(480, 300, 140, 24, 'solid'),
      new Platform(680, 460, 500, 80, 'solid'),
      new Platform(840, 370, 140, 22, 'cloud'),
      new Platform(1050, 300, 130, 22, 'moving_h', { distance: 100, speed: 1.3 }),
      new Platform(1260, 460, 560, 80, 'solid'),
      new Platform(1580, 440, 80, 20, 'spikes'),
      new Platform(1540, 340, 150, 22, 'cloud'),
      new Platform(1760, 380, 140, 22, 'cloud'), // Balcão conector para a arena

      // GRANDE ARENA DO CHEFE (x = 1900 até 3200)
      new Platform(1900, 460, 1300, 80, 'solid'),
      new Platform(2060, 360, 150, 22, 'cloud'),
      new Platform(2340, 300, 160, 22, 'cloud'),
      new Platform(2620, 360, 150, 22, 'cloud')
    ];

    const items = [
      new Item(180, 420, 'coin'),
      new Item(320, 330, 'crystal'),
      new Item(520, 260, 'wand'),
      new Item(760, 420, 'coin'),
      new Item(880, 330, 'heart'),
      new Item(1380, 420, 'wand'),
      new Item(1740, 420, 'heart'),
      new Item(2380, 260, 'crystal')
    ];

    const enemies = [
      new Enemy(380, 420, 28, 40, 'witch', 80),
      new Enemy(780, 420, 32, 32, 'dragon', 100),
      new Enemy(1350, 420, 26, 26, 'shadow_imp', 70)
    ];

    const boss = new Boss(2480, 384);

    return new Level(
      5,
      'Castelo da Rainha das Sombras',
      'castle',
      3200,
      platforms,
      items,
      enemies,
      boss,
      { x: 1380, y: 390 },
      { x: 3080, y: 370 }
    );
  }
}

// ============================================================
// 12. CÂMERA & PARALLAX BACKGROUND EM 5 CAMADAS
// ============================================================
class Camera {
  constructor(viewportWidth, viewportHeight) {
    this.x = 0;
    this.y = 0;
    this.width = viewportWidth;
    this.height = viewportHeight;
  }

  update(player, levelLength, dt = 1/60) {
    // Seguir suavemente a princesa com antecipação (Look-ahead)
    const targetX = player.x - this.width * 0.38;
    const lerpRate = 1 - Math.exp(-6.5 * dt);
    this.x += (targetX - this.x) * lerpRate;

    // Limites de mundo estritos
    if (this.x < 0) this.x = 0;
    if (this.x > levelLength - this.width) this.x = Math.max(0, levelLength - this.width);
  }

  drawParallax(ctx, theme, frame) {
    // 1. Céu com Degradê Suave
    const skyGrad = ctx.createLinearGradient(0, 0, 0, this.height);
    if (theme === 'garden') {
      skyGrad.addColorStop(0, '#fbcfe8');
      skyGrad.addColorStop(0.5, '#fce7f3');
      skyGrad.addColorStop(1, '#e0e7ff');
    } else if (theme === 'forest') {
      skyGrad.addColorStop(0, '#2e1065');
      skyGrad.addColorStop(0.55, '#581c87');
      skyGrad.addColorStop(1, '#db2777');
    } else if (theme === 'tower') {
      skyGrad.addColorStop(0, '#0f051d');
      skyGrad.addColorStop(0.55, '#3b0764');
      skyGrad.addColorStop(1, '#7e22ce');
    } else if (theme === 'sky') {
      skyGrad.addColorStop(0, '#38bdf8');
      skyGrad.addColorStop(0.5, '#c084fc');
      skyGrad.addColorStop(1, '#fbcfe8');
    } else {
      // Castelo da Rainha
      skyGrad.addColorStop(0, '#11021d');
      skyGrad.addColorStop(0.5, '#2e0249');
      skyGrad.addColorStop(1, '#6b21a8');
    }
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    // 2. Estrelas e Brilhos Distantes (Velocidade 0.08)
    const starShift = (this.x * 0.08) % this.width;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    for (let i = 0; i < 30; i++) {
      const sx = ((i * 71 + frame * 0.2 - starShift) % this.width + this.width) % this.width;
      const sy = (i * 31) % (this.height * 0.45);
      const twinkle = Math.sin(frame * 0.08 + i) * 1.5 + 2.0;
      ctx.beginPath();
      ctx.arc(sx, sy, Math.max(0.8, twinkle), 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Montanhas / Colinas Mágicas Distantes (Velocidade 0.2)
    const mtnShift = (this.x * 0.2) % 400;
    ctx.fillStyle = (theme === 'garden' || theme === 'sky') ? 'rgba(216, 180, 254, 0.35)' : 'rgba(121, 40, 202, 0.3)';
    ctx.beginPath();
    ctx.moveTo(0, this.height);
    for (let x = -400; x <= this.width + 400; x += 180) {
      const peakX = x - mtnShift;
      ctx.lineTo(peakX, this.height * 0.52);
      ctx.lineTo(peakX + 90, this.height * 0.38);
      ctx.lineTo(peakX + 180, this.height * 0.52);
    }
    ctx.lineTo(this.width, this.height);
    ctx.closePath();
    ctx.fill();

    // 4. Silhuetas de Torres do Castelo Rosa ao Fundo (Velocidade 0.35)
    const castleShift = (this.x * 0.35) % 520;
    ctx.fillStyle = 'rgba(244, 114, 182, 0.32)';
    for (let x = -520; x <= this.width + 520; x += 360) {
      const cx = x - castleShift;
      ctx.fillRect(cx + 80, this.height * 0.45, 48, this.height * 0.55);
      ctx.beginPath();
      ctx.moveTo(cx + 68, this.height * 0.45);
      ctx.lineTo(cx + 104, this.height * 0.32);
      ctx.lineTo(cx + 140, this.height * 0.45);
      ctx.closePath();
      ctx.fill();

      // Bandeira dourada
      ctx.fillStyle = 'rgba(255, 215, 0, 0.65)';
      ctx.fillRect(cx + 103, this.height * 0.28, 2, 20);
      ctx.beginPath();
      ctx.moveTo(cx + 105, this.height * 0.28);
      ctx.lineTo(cx + 120, this.height * 0.32);
      ctx.lineTo(cx + 105, this.height * 0.36);
      ctx.fill();
      ctx.fillStyle = 'rgba(244, 114, 182, 0.32)';
    }

    // 5. Pétalas de Flores / Vaga-lumes Flutuantes em Primeiro Plano
    if (theme === 'garden') {
      ctx.fillStyle = 'rgba(255, 182, 193, 0.65)';
      for (let i = 0; i < 12; i++) {
        const px = ((i * 97 + frame * 0.8 - this.x * 0.5) % this.width + this.width) % this.width;
        const py = ((i * 53 + frame * 0.5) % this.height + this.height) % this.height;
        ctx.beginPath();
        ctx.ellipse(px, py, 4, 2.2, Math.sin(frame * 0.05 + i), 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (theme === 'forest') {
      ctx.fillStyle = 'rgba(167, 243, 208, 0.7)';
      for (let i = 0; i < 14; i++) {
        const px = ((i * 83 + Math.sin(frame * 0.04 + i) * 30 - this.x * 0.4) % this.width + this.width) % this.width;
        const py = (i * 41 + Math.cos(frame * 0.04 + i) * 20) % (this.height * 0.8);
        const glow = Math.sin(frame * 0.1 + i) * 1.5 + 2.5;
        ctx.beginPath();
        ctx.arc(px, py, glow, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

// ============================================================
// 13. CLASSE PRINCIPAL: GAME ENGINE & LOOP (FIXED TIMESTEP)
// ============================================================
class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    this.sound = new SoundSystem();
    this.input = new InputHandler();
    this.particles = new ParticleSystem();
    this.camera = new Camera(this.canvas.width, this.canvas.height);

    this.saveData = StorageManager.load();
    this.currentLevelIndex = 1;
    this.level = null;
    this.player = null;
    this.projectiles = [];

    this.state = 'MENU'; // 'MENU', 'PLAYING', 'PAUSED', 'LEVEL_CLEAR', 'GAME_OVER', 'VICTORY'
    this.lastTime = performance.now();
    this.accumulator = 0;
    this.fixedStep = 1 / 60; // 60 FPS físico determinístico
    this.frame = 0;

    this.input.pauseCallback = () => this.togglePause();

    this.initUI();
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    requestAnimationFrame((t) => this.loop(t));
  }

  resizeCanvas() {
    const container = document.getElementById('gameContainer');
    if (!container) return;
    this.canvas.width = 960;
    this.canvas.height = 540;
    this.camera.width = this.canvas.width;
    this.camera.height = this.canvas.height;
  }

  initUI() {
    // Menu Principal
    document.getElementById('btnStartGame').onclick = () => {
      this.sound.playClick();
      this.sound.startMusic();
      this.startLevel(1);
    };

    const btnContinue = document.getElementById('btnContinueGame');
    if (this.saveData.unlockedLevels > 1) {
      btnContinue.style.display = 'flex';
      btnContinue.onclick = () => {
        this.sound.playClick();
        this.sound.startMusic();
        this.startLevel(this.saveData.unlockedLevels);
      };
    }

    document.getElementById('btnSelectLevel').onclick = () => {
      this.sound.playClick();
      this.openLevelSelect();
    };

    document.getElementById('btnHighScores').onclick = () => {
      this.sound.playClick();
      this.openHighScores();
    };

    document.getElementById('btnSettings').onclick = () => {
      this.sound.playClick();
      this.openSettings();
    };

    document.getElementById('btnHowToPlay').onclick = () => {
      this.sound.playClick();
      this.showScreen('howToPlayModal');
    };

    // Botões de Voltar Modais
    document.getElementById('btnBackFromLevels').onclick = () => this.returnToMainMenu();
    document.getElementById('btnBackFromScores').onclick = () => this.returnToMainMenu();
    document.getElementById('btnBackFromSettings').onclick = () => this.returnToMainMenu();
    document.getElementById('btnBackFromHowToPlay').onclick = () => this.returnToMainMenu();

    // Menu de Pausa
    document.getElementById('btnPauseGame').onclick = () => this.togglePause();
    document.getElementById('btnResumeGame').onclick = () => this.togglePause();
    document.getElementById('btnRestartLevel').onclick = () => {
      this.sound.playClick();
      this.startLevel(this.currentLevelIndex);
    };
    document.getElementById('btnExitToMenu').onclick = () => this.returnToMainMenu();

    // Telas de Fim de Fase, Game Over e Vitória
    document.getElementById('btnNextLevel').onclick = () => {
      this.sound.playClick();
      if (this.currentLevelIndex < 5) {
        this.startLevel(this.currentLevelIndex + 1);
      } else {
        this.showVictoryScreen();
      }
    };

    document.getElementById('btnReplayLevel').onclick = () => {
      this.sound.playClick();
      this.startLevel(this.currentLevelIndex);
    };
    document.getElementById('btnMenuFromClear').onclick = () => this.returnToMainMenu();

    document.getElementById('btnRetryLevel').onclick = () => {
      this.sound.playClick();
      this.startLevel(this.currentLevelIndex);
    };
    document.getElementById('btnMenuFromGameOver').onclick = () => this.returnToMainMenu();

    document.getElementById('btnPlayAgainVictory').onclick = () => {
      this.sound.playClick();
      this.startLevel(1);
    };
    document.getElementById('btnMenuFromVictory').onclick = () => this.returnToMainMenu();

    // Configurações
    const toggleMusic = document.getElementById('toggleMusic');
    const toggleSfx = document.getElementById('toggleSfx');
    const toggleMobile = document.getElementById('toggleMobileControls');

    toggleMusic.checked = this.saveData.musicEnabled;
    toggleSfx.checked = this.saveData.sfxEnabled;
    toggleMobile.checked = this.saveData.mobileControls;

    toggleMusic.onchange = (e) => {
      this.saveData.musicEnabled = e.target.checked;
      this.sound.setMusicEnabled(e.target.checked);
      StorageManager.save(this.saveData);
    };
    toggleSfx.onchange = (e) => {
      this.saveData.sfxEnabled = e.target.checked;
      this.sound.setSfxEnabled(e.target.checked);
      StorageManager.save(this.saveData);
    };
    toggleMobile.onchange = (e) => {
      this.saveData.mobileControls = e.target.checked;
      this.updateTouchControlsVisibility();
      StorageManager.save(this.saveData);
    };

    document.getElementById('btnResetProgress').onclick = () => {
      if (confirm('Deseja realmente apagar todo o progresso e recordes salvos?')) {
        StorageManager.reset();
        this.saveData = StorageManager.getDefaultData();
        alert('Progresso redefinido com sucesso!');
        this.returnToMainMenu();
      }
    };
  }

  showScreen(screenId) {
    const screens = [
      'mainMenu',
      'levelSelectMenu',
      'highScoresModal',
      'settingsModal',
      'howToPlayModal',
      'pauseModal',
      'levelClearModal',
      'gameOverModal',
      'victoryModal'
    ];
    screens.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        if (id === screenId) {
          el.style.display = 'flex';
          setTimeout(() => el.classList.add('active'), 10);
        } else {
          el.classList.remove('active');
          el.style.display = 'none';
        }
      }
    });
  }

  hideAllScreens() {
    const screens = [
      'mainMenu',
      'levelSelectMenu',
      'highScoresModal',
      'settingsModal',
      'howToPlayModal',
      'pauseModal',
      'levelClearModal',
      'gameOverModal',
      'victoryModal'
    ];
    screens.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove('active');
        el.style.display = 'none';
      }
    });
  }

  returnToMainMenu() {
    this.sound.playClick();
    this.state = 'MENU';
    document.getElementById('gameHud').style.display = 'none';
    document.getElementById('bossBarContainer').style.display = 'none';
    document.getElementById('touchControls').style.display = 'none';

    const btnContinue = document.getElementById('btnContinueGame');
    if (this.saveData.unlockedLevels > 1) {
      btnContinue.style.display = 'flex';
    }

    this.showScreen('mainMenu');
  }

  openLevelSelect() {
    const grid = document.getElementById('levelGrid');
    grid.innerHTML = '';
    const levelNames = [
      'Jardim Encantado',
      'Floresta Mágica',
      'Torre das Bruxas',
      'Reino das Nuvens',
      'Castelo da Rainha'
    ];

    for (let i = 1; i <= 5; i++) {
      const card = document.createElement('div');
      const isLocked = i > this.saveData.unlockedLevels;
      card.className = `level-card ${isLocked ? 'locked' : ''}`;

      const starsCount = this.saveData.levelStars[i - 1] || 0;
      const starsDisplay = isLocked ? '🔒' : '⭐'.repeat(starsCount) + '☆'.repeat(3 - starsCount);

      card.innerHTML = `
        <div class="level-number">Fase ${i}</div>
        <div class="level-name">${levelNames[i - 1]}</div>
        <div class="level-stars">${starsDisplay}</div>
      `;

      if (!isLocked) {
        card.onclick = () => {
          this.sound.playClick();
          this.sound.startMusic();
          this.startLevel(i);
        };
      }

      grid.appendChild(card);
    }

    this.showScreen('levelSelectMenu');
  }

  openHighScores() {
    document.getElementById('statHighScore').innerText = this.saveData.highScore.toLocaleString();
    document.getElementById('statTotalCoins').innerText = this.saveData.totalCoins.toLocaleString();
    document.getElementById('statTotalCrystals').innerText = this.saveData.totalCrystals.toLocaleString();
    document.getElementById('statUnlockedLevels').innerText = `${this.saveData.unlockedLevels} / 5`;
    document.getElementById('statBossDefeated').innerText = this.saveData.bossDefeated ? 'Sim ✨' : 'Ainda não';
    this.showScreen('highScoresModal');
  }

  openSettings() {
    this.showScreen('settingsModal');
  }

  updateTouchControlsVisibility() {
    const touchLayer = document.getElementById('touchControls');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (this.state === 'PLAYING' && this.saveData.mobileControls && (isTouchDevice || window.innerWidth <= 1024)) {
      touchLayer.style.display = 'flex';
    } else {
      touchLayer.style.display = 'none';
    }
  }

  startLevel(index) {
    this.currentLevelIndex = index;
    this.level = Level.createLevel(index);
    this.player = new Player(80, 380);
    this.projectiles = [];
    this.particles = new ParticleSystem();

    this.state = 'PLAYING';
    this.hideAllScreens();

    document.getElementById('gameHud').style.display = 'flex';
    document.getElementById('hudLevelName').innerText = `Fase ${index}: ${this.level.name}`;
    document.getElementById('bossBarContainer').style.display = this.level.boss ? 'block' : 'none';

    this.updateTouchControlsVisibility();
    this.updateHUD();
  }

  togglePause() {
    if (this.state === 'PLAYING') {
      this.state = 'PAUSED';
      this.sound.playClick();
      this.showScreen('pauseModal');
      document.getElementById('touchControls').style.display = 'none';
    } else if (this.state === 'PAUSED') {
      this.state = 'PLAYING';
      this.sound.playClick();
      this.hideAllScreens();
      this.updateTouchControlsVisibility();
    }
  }

  updateHUD() {
    document.getElementById('valLives').innerText = this.player.lives;
    document.getElementById('valCoins').innerText = this.player.coins;
    document.getElementById('valCrystals').innerText = this.player.crystals;
    document.getElementById('valScore').innerText = String(this.player.score).padStart(6, '0');

    const hudPowerup = document.getElementById('hudPowerup');
    const powerupIcon = document.getElementById('powerupIcon');
    const powerupBar = document.getElementById('powerupBar');

    if (this.player.starTimer > 0) {
      hudPowerup.style.display = 'flex';
      powerupIcon.innerText = '⭐';
      powerupBar.style.width = `${(this.player.starTimer / 10) * 100}%`;
    } else if (this.player.wandTimer > 0) {
      hudPowerup.style.display = 'flex';
      powerupIcon.innerText = '🪄';
      powerupBar.style.width = `${(this.player.wandTimer / 15) * 100}%`;
    } else {
      hudPowerup.style.display = 'none';
    }

    if (this.level.boss && this.level.boss.alive) {
      const percent = Math.max(0, (this.level.boss.health / this.level.boss.maxHealth) * 100);
      document.getElementById('bossHealthPercent').innerText = `${Math.round(percent)}%`;
      document.getElementById('bossBarFill').style.width = `${percent}%`;
    }
  }

  handleLevelComplete() {
    this.state = 'LEVEL_CLEAR';
    this.sound.playLevelClear();
    this.particles.createConfetti(this.player.x, this.player.y, 42);

    this.player.score += 2000;

    let stars = 1;
    if (this.player.coins >= 7) stars = 2;
    if (this.player.coins >= 7 && this.player.crystals >= 2) stars = 3;

    if (this.currentLevelIndex >= this.saveData.unlockedLevels && this.currentLevelIndex < 5) {
      this.saveData.unlockedLevels = this.currentLevelIndex + 1;
    }
    this.saveData.levelStars[this.currentLevelIndex - 1] = Math.max(
      this.saveData.levelStars[this.currentLevelIndex - 1] || 0,
      stars
    );
    this.saveData.totalCoins += this.player.coins;
    this.saveData.totalCrystals += this.player.crystals;
    this.saveData.highScore = Math.max(this.saveData.highScore, this.player.score);

    if (this.currentLevelIndex === 5) {
      this.saveData.bossDefeated = true;
    }

    StorageManager.save(this.saveData);

    document.getElementById('clearLevelTitle').innerText = `${this.level.name} Concluída!`;
    document.getElementById('clearCoins').innerText = `${this.player.coins}`;
    document.getElementById('clearCrystals').innerText = `${this.player.crystals}`;
    document.getElementById('clearScore').innerText = `${this.player.score}`;
    document.getElementById('starsAwarded').innerHTML = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

    document.getElementById('touchControls').style.display = 'none';
    this.showScreen('levelClearModal');
  }

  handleGameOver() {
    this.state = 'GAME_OVER';
    this.sound.playGameOver();
    document.getElementById('gameOverScore').innerText = this.player.score.toLocaleString();

    this.saveData.highScore = Math.max(this.saveData.highScore, this.player.score);
    StorageManager.save(this.saveData);

    document.getElementById('touchControls').style.display = 'none';
    this.showScreen('gameOverModal');
  }

  showVictoryScreen() {
    this.state = 'VICTORY';
    this.sound.playLevelClear();
    this.particles.createConfetti(this.canvas.width / 2, this.canvas.height / 2, 80);

    document.getElementById('victoryFinalScore').innerText = this.player.score.toLocaleString();
    document.getElementById('victoryTotalCoins').innerText = this.saveData.totalCoins.toLocaleString();
    document.getElementById('victoryTotalCrystals').innerText = this.saveData.totalCrystals.toLocaleString();

    document.getElementById('gameHud').style.display = 'none';
    document.getElementById('bossBarContainer').style.display = 'none';
    document.getElementById('touchControls').style.display = 'none';

    this.showScreen('victoryModal');
  }

  loop(timestamp) {
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
    this.lastTime = timestamp;
    this.frame++;

    if (this.state === 'PLAYING') {
      // Loop Físico com Fixed Timestep para estabilidade perfeita em 60/120/144Hz
      this.accumulator += dt;
      let updates = 0;
      while (this.accumulator >= this.fixedStep && updates < 5) {
        this.physicsUpdate(this.fixedStep);
        this.accumulator -= this.fixedStep;
        updates++;
      }
      if (updates >= 5) this.accumulator = 0; // Proteção contra espiral de lentidão
    }

    this.render();

    requestAnimationFrame((t) => this.loop(t));
  }

  physicsUpdate(step) {
    // 1. Atualizar plataformas móveis
    for (const p of this.level.platforms) {
      p.update(this.frame, step);
    }

    // 2. Atualizar controles e pulo com buffer
    this.input.update(step);

    // 3. Atualizar Princesa com física refinada
    this.player.physicsUpdate(step, this.input, this.level.platforms, this.sound, this.particles, this.projectiles);

    // Queda no abismo
    if (this.player.y > this.canvas.height + 60) {
      const isGameOver = this.player.takeHit(this.sound, this.particles);
      if (isGameOver) {
        this.handleGameOver();
        return;
      }
    }

    // 4. Atualizar Câmera Suavemente
    this.camera.update(this.player, this.level.length, step);

    // 5. Coleta de Itens
    for (const item of this.level.items) {
      if (item.collected) continue;
      item.update(step, this.frame);

      if (
        this.player.x < item.x + item.width &&
        this.player.x + this.player.width > item.x &&
        this.player.y < item.y + item.height &&
        this.player.y + this.player.height > item.y
      ) {
        item.collected = true;

        if (item.type === 'coin') {
          this.player.coins++;
          this.player.score += 100;
          this.sound.playCoin();
          this.particles.createMagicBurst(item.x, item.y, 8, ['#ffd700', '#ffffff']);
        } else if (item.type === 'crystal') {
          this.player.crystals++;
          this.player.score += 500;
          this.sound.playCrystal();
          this.particles.createMagicBurst(item.x, item.y, 14, ['#00e5ff', '#ff6595', '#ffffff']);
        } else if (item.type === 'heart') {
          if (this.player.lives < this.player.maxLives) this.player.lives++;
          this.player.score += 250;
          this.sound.playPowerup();
          this.particles.createMagicBurst(item.x, item.y, 16, ['#ff4081', '#ffffff']);
        } else if (item.type === 'wand') {
          this.player.wandTimer = 15.0;
          this.player.score += 400;
          this.sound.playPowerup();
          this.particles.createMagicBurst(item.x, item.y, 20, ['#ffd700', '#ff6595']);
        } else if (item.type === 'star') {
          this.player.starTimer = 10.0;
          this.player.score += 800;
          this.sound.playPowerup();
          this.particles.createMagicBurst(item.x, item.y, 22, ['#ffd700', '#76ff03', '#ff007f']);
        } else if (item.type === 'crown') {
          this.player.score += 2000;
          this.sound.playPowerup();
          this.particles.createMagicBurst(item.x, item.y, 30, ['#ffd700', '#ffffff']);
        }
      }
    }

    // 6. Inimigos & Combate com Stomp e Dano
    for (const enemy of this.level.enemies) {
      if (!enemy.alive) continue;
      enemy.update(step, this.player, this.projectiles);

      if (
        this.player.x < enemy.x + enemy.width &&
        this.player.x + this.player.width > enemy.x &&
        this.player.y < enemy.y + enemy.height &&
        this.player.y + this.player.height > enemy.y
      ) {
        // Se estiver caindo sobre o inimigo (Stomp) ou com a Estrela mágica
        if ((this.player.vy > 0 && this.player.y + this.player.height - enemy.y < 24) || this.player.starTimer > 0) {
          enemy.alive = false;
          this.player.vy = -9.2; // Pulo de ricochete satisfatório
          this.player.grounded = false;
          this.player.coyoteTimer = 0;
          this.player.score += 300;
          this.sound.playStomp();
          this.particles.createMagicBurst(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 16, ['#ff6595', '#ffd700']);
        } else {
          const isGameOver = this.player.takeHit(this.sound, this.particles);
          if (isGameOver) {
            this.handleGameOver();
            return;
          }
        }
      }
    }

    // 7. Chefe Final (Fase 5)
    if (this.level.boss && this.level.boss.alive) {
      this.level.boss.update(step, this.player, this.projectiles, this.sound);

      if (
        this.player.x < this.level.boss.x + this.level.boss.width &&
        this.player.x + this.player.width > this.level.boss.x &&
        this.player.y < this.level.boss.y + this.level.boss.height &&
        this.player.y + this.player.height > this.level.boss.y
      ) {
        if (this.player.vy > 0 && this.player.y + this.player.height - this.level.boss.y < 28) {
          const defeated = this.level.boss.takeDamage(this.sound, this.particles);
          this.player.vy = -10.0;
          this.player.grounded = false;
          if (defeated) {
            this.handleLevelComplete();
            return;
          }
        } else {
          const isGameOver = this.player.takeHit(this.sound, this.particles);
          if (isGameOver) {
            this.handleGameOver();
            return;
          }
        }
      }
    }

    // 8. Projéteis
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const proj = this.projectiles[i];
      proj.update(step);

      if (proj.life <= 0) {
        this.projectiles.splice(i, 1);
        continue;
      }

      if (proj.type === 'player_magic') {
        for (const enemy of this.level.enemies) {
          if (enemy.alive && Math.hypot(proj.x - (enemy.x + enemy.width / 2), proj.y - (enemy.y + enemy.height / 2)) < 24) {
            enemy.alive = false;
            proj.life = 0;
            this.player.score += 350;
            this.sound.playStomp();
            this.particles.createMagicBurst(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 16);
            break;
          }
        }

        if (this.level.boss && this.level.boss.alive) {
          if (Math.hypot(proj.x - (this.level.boss.x + this.level.boss.width / 2), proj.y - (this.level.boss.y + this.level.boss.height / 2)) < 32) {
            proj.life = 0;
            const defeated = this.level.boss.takeDamage(this.sound, this.particles);
            if (defeated) {
              this.handleLevelComplete();
              return;
            }
          }
        }
      } else {
        if (Math.hypot(proj.x - (this.player.x + this.player.width / 2), proj.y - (this.player.y + this.player.height / 2)) < 22) {
          proj.life = 0;
          const isGameOver = this.player.takeHit(this.sound, this.particles);
          if (isGameOver) {
            this.handleGameOver();
            return;
          }
        }
      }
    }

    // 9. Checkpoint
    if (!this.level.checkpoint.active && this.player.x >= this.level.checkpoint.x) {
      this.level.checkpoint.active = true;
      this.player.checkpointX = this.level.checkpoint.x;
      this.player.checkpointY = this.level.checkpoint.y - 20;
      this.sound.playPowerup();
      this.particles.createMagicBurst(this.level.checkpoint.x + 10, this.level.checkpoint.y, 22, ['#ffd700', '#ff6595']);
    }

    // 10. Portal de Vitória
    if (
      this.player.x < this.level.portal.x + this.level.portal.width &&
      this.player.x + this.player.width > this.level.portal.x &&
      this.player.y < this.level.portal.y + this.level.portal.height &&
      this.player.y + this.player.height > this.level.portal.y
    ) {
      if (!this.level.boss || !this.level.boss.alive) {
        this.handleLevelComplete();
        return;
      }
    }

    // 11. Partículas & HUD
    this.particles.update(step);
    this.updateHUD();
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.state === 'MENU') {
      this.camera.drawParallax(this.ctx, 'garden', this.frame);
      return;
    }

    if (!this.level || !this.player) return;

    // 1. Fundo com Parallax da Fase
    this.camera.drawParallax(this.ctx, this.level.theme, this.frame);

    // 2. Renderizar Elementos com Deslocamento da Câmera
    this.ctx.save();
    this.ctx.translate(-Math.round(this.camera.x), 0);

    // Checkpoint e Portal
    this.level.checkpoint.draw(this.ctx, this.frame);
    this.level.portal.draw(this.ctx, this.frame);

    // Plataformas (Frustum culling)
    for (const p of this.level.platforms) {
      if (p.x + p.width >= this.camera.x - 50 && p.x <= this.camera.x + this.camera.width + 50) {
        p.draw(this.ctx, this.level.theme);
      }
    }

    // Itens
    for (const item of this.level.items) {
      if (item.x + item.width >= this.camera.x - 50 && item.x <= this.camera.x + this.camera.width + 50) {
        item.draw(this.ctx, this.frame);
      }
    }

    // Inimigos
    for (const enemy of this.level.enemies) {
      if (enemy.x + enemy.width >= this.camera.x - 60 && enemy.x <= this.camera.x + this.camera.width + 60) {
        enemy.draw(this.ctx);
      }
    }

    // Chefe Final
    if (this.level.boss) {
      this.level.boss.draw(this.ctx);
    }

    // Projéteis
    for (const proj of this.projectiles) {
      proj.draw(this.ctx);
    }

    // Princesa
    this.player.draw(this.ctx);

    // Partículas
    this.particles.draw(this.ctx);

    this.ctx.restore();
  }
}

// Iniciar o jogo quando a página estiver carregada
window.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});
