/**
 * PRINCESS: MAGIC KINGDOM
 * Jogo de Plataforma 2D em HTML5 Canvas, CSS3 e JavaScript Puro (ES6+)
 * 
 * Desenvolvido sem engines, frameworks ou bibliotecas externas.
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
    this.melodyNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 440.00, 392.00]; // Dó, Ré, Mi, Sol, Lá, Dó alta (Escala Pentatônica Mágica)
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
      this.ctx.resume();
    }
  }

  // Efeito sonoro: Pulo alegre
  playJump() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, t);
    osc.frequency.exponentialRampToValueAtTime(560, t + 0.15);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.linearRampToValueAtTime(0.01, t + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.16);
  }

  // Efeito sonoro: Coleta de Moeda (Ting metálico brilhante)
  playCoin() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, t); // B5
    osc.frequency.setValueAtTime(1318.51, t + 0.08); // E6

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.3);
  }

  // Efeito sonoro: Coleta de Cristal Mágico (Arpejo cristalino)
  playCrystal() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    [1046.50, 1318.51, 1567.98, 2093.00].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const st = t + idx * 0.05;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, st);

      gain.gain.setValueAtTime(0.18, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(st);
      osc.stop(st + 0.2);
    });
  }

  // Efeito sonoro: Derrotar inimigo com pulo
  playStomp() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.exponentialRampToValueAtTime(60, t + 0.18);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.19);
  }

  // Efeito sonoro: Dano / Perder vida
  playHurt() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.linearRampToValueAtTime(110, t + 0.28);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.linearRampToValueAtTime(0.01, t + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.3);
  }

  // Efeito sonoro: Coletar Power-up (Varinha / Estrela / Coração)
  playPowerup() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const freqs = [392, 523.25, 659.25, 783.99, 1046.50];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const st = t + idx * 0.06;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, st);

      gain.gain.setValueAtTime(0.2, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(st);
      osc.stop(st + 0.25);
    });
  }

  // Efeito sonoro: Disparo de Magia da Varinha
  playShoot() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(1400, t + 0.12);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.13);
  }

  // Efeito sonoro: Clique de Botão da Interface
  playClick() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.05);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.06);
  }

  // Efeito sonoro: Vitória / Fase Concluída
  playLevelClear() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const fanfare = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
    fanfare.forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const st = t + idx * 0.14;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, st);

      gain.gain.setValueAtTime(0.25, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(st);
      osc.stop(st + 0.35);
    });
  }

  // Efeito sonoro: Game Over
  playGameOver() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const sadNotes = [392.00, 369.99, 349.23, 311.13, 261.63];
    sadNotes.forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const st = t + idx * 0.22;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, st);

      gain.gain.setValueAtTime(0.22, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(st);
      osc.stop(st + 0.45);
    });
  }

  // Efeito sonoro: Dano no Chefe
  playBossHurt() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(70, t + 0.22);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.23);
  }

  // Iniciar Música de Fundo Sintetizada (Fairy-tale Chimes Procedural)
  startMusic() {
    if (!this.musicEnabled || this.musicTimer) return;
    this.init();

    this.musicTimer = setInterval(() => {
      if (!this.musicEnabled || !this.ctx) return;

      const t = this.ctx.currentTime;
      const melodyFreq = this.melodyNotes[this.musicStep % this.melodyNotes.length];
      const bassFreq = this.bassNotes[Math.floor(this.musicStep / 2) % this.bassNotes.length];

      // Nota Melódica Suave
      const oscMel = this.ctx.createOscillator();
      const gainMel = this.ctx.createGain();
      oscMel.type = 'sine';
      oscMel.frequency.setValueAtTime(melodyFreq, t);
      gainMel.gain.setValueAtTime(0.06, t);
      gainMel.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      oscMel.connect(gainMel);
      gainMel.connect(this.ctx.destination);
      oscMel.start(t);
      oscMel.stop(t + 0.38);

      // Baixo a cada 2 passos
      if (this.musicStep % 2 === 0) {
        const oscBass = this.ctx.createOscillator();
        const gainBass = this.ctx.createGain();
        oscBass.type = 'triangle';
        oscBass.frequency.setValueAtTime(bassFreq, t);
        gainBass.gain.setValueAtTime(0.08, t);
        gainBass.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
        oscBass.connect(gainBass);
        gainBass.connect(this.ctx.destination);
        oscBass.start(t);
        oscBass.stop(t + 0.55);
      }

      this.musicStep = (this.musicStep + 1) % 32;
    }, 280);
  }

  stopMusic() {
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }

  setMusicEnabled(val) {
    this.musicEnabled = val;
    if (val) this.startMusic();
    else this.stopMusic();
  }

  setSfxEnabled(val) {
    this.sfxEnabled = val;
  }
}

// ============================================================
// 2. GERENCIADOR DE PROGRESSO E LOCALSTORAGE
// ============================================================
class StorageManager {
  static SAVE_KEY = 'princess_magic_kingdom_save_v1';

  static getDefaultData() {
    return {
      highScore: 0,
      totalCoins: 0,
      totalCrystals: 0,
      unlockedLevels: 1, // de 1 a 5
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
// 3. GERENCIADOR DE ENTRADA (TECLADO + TOUCH MOBILE)
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

    this.jumpPressed = false; // Flag para impedir pulo infinito segurando a tecla
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
        if (!this.keys.jump) this.jumpPressed = true;
        this.keys.jump = true;
        // Prevenir rolagem da página
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
        if (isJump && !this.keys[keyName]) this.jumpPressed = true;
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

  isJumpTriggered() {
    if (this.jumpPressed) {
      this.jumpPressed = false;
      return true;
    }
    return false;
  }
}

// ============================================================
// 4. SISTEMA DE PARTÍCULAS MÁGICAS & EFEITOS
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
    this.type = type; // 'circle', 'star', 'sparkle', 'confetti'
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.15;
  }

  update(dt) {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotSpeed;
    this.life -= dt;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    const progress = this.life / this.maxLife;
    ctx.save();
    ctx.globalAlpha = Math.max(0, progress);
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;

    if (this.type === 'star') {
      // Desenhar pequena estrela brilhante de 4 pontas
      const s = this.size * progress;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.quadraticCurveTo(0, 0, s, 0);
      ctx.quadraticCurveTo(0, 0, 0, s);
      ctx.quadraticCurveTo(0, 0, -s, 0);
      ctx.quadraticCurveTo(0, 0, 0, -s);
      ctx.fill();
    } else if (this.type === 'confetti') {
      ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(1, this.size * progress), 0, Math.PI * 2);
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

  // Explosão mágica ao derrotar inimigos ou pegar itens especiais
  createMagicBurst(x, y, count = 16, colors = ['#ffd700', '#ff6595', '#b388eb', '#ffffff']) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const speed = 1.5 + Math.random() * 3.5;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 1.0;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 3 + Math.random() * 5;
      const life = 0.5 + Math.random() * 0.5;
      const type = Math.random() > 0.4 ? 'star' : 'circle';
      this.particles.push(new Particle(x, y, vx, vy, color, size, life, type));
    }
  }

  // Poeira de salto / aterrissagem
  createDust(x, y) {
    for (let i = 0; i < 6; i++) {
      const vx = (Math.random() - 0.5) * 2;
      const vy = -Math.random() * 1.5;
      this.particles.push(new Particle(x, y, vx, vy, 'rgba(255, 230, 240, 0.6)', 3 + Math.random() * 3, 0.35, 'circle'));
    }
  }

  // Confetes festivos de vitória
  createConfetti(x, y, count = 30) {
    const colors = ['#ff4081', '#ffd700', '#00e5ff', '#b388eb', '#ffffff', '#76ff03'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      this.particles.push(
        new Particle(
          x,
          y,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed - 3,
          colors[Math.floor(Math.random() * colors.length)],
          6 + Math.random() * 6,
          1.2 + Math.random() * 1.0,
          'confetti'
        )
      );
    }
  }
}

// ============================================================
// 5. PROJÉTEIS (MAGIA DA PRINCESA, FOGO DO DRAGÃO, ORBES DO CHEFE)
// ============================================================
class Projectile {
  constructor(x, y, vx, vy, type = 'player_magic') {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.type = type; // 'player_magic', 'dragon_fire', 'boss_dark_orb'
    this.radius = type === 'player_magic' ? 10 : 12;
    this.life = 3.0; // segundos
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
      // Estrela mágica reluzente rosa e dourada
      const glow = Math.sin(this.frame * 0.2) * 4 + 10;
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = glow;
      ctx.fillStyle = '#ff6595';

      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const outerAngle = (i * 2 * Math.PI) / 5 - Math.PI / 2 + this.frame * 0.1;
        const innerAngle = outerAngle + Math.PI / 5;
        const rOuter = 11;
        const rInner = 5;
        if (i === 0) ctx.moveTo(Math.cos(outerAngle) * rOuter, Math.sin(outerAngle) * rOuter);
        else ctx.lineTo(Math.cos(outerAngle) * rOuter, Math.sin(outerAngle) * rOuter);
        ctx.lineTo(Math.cos(innerAngle) * rInner, Math.sin(innerAngle) * rInner);
      }
      ctx.closePath();
      ctx.fill();

      // Centro brilhante
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'dragon_fire') {
      // Chama roxa do dragãozinho
      ctx.shadowColor = '#b388eb';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#9b51e0';
      ctx.beginPath();
      ctx.arc(0, 0, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffb3ba';
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Orbe Sombrio da Rainha das Sombras
      ctx.shadowColor = '#ff007f';
      ctx.shadowBlur = 16;
      ctx.fillStyle = '#2a0845';
      ctx.beginPath();
      ctx.arc(0, 0, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#e056fd';
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }

    ctx.restore();
  }
}

// ============================================================
// 6. ITENS COLETÁVEIS & OBSTÁCULOS
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
    // Leve flutuação mágica
    this.y = this.baseY + Math.sin(frame * 0.08 + this.bobOffset) * 5;
  }

  draw(ctx, frame) {
    if (this.collected) return;
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

    if (this.type === 'coin') {
      // Moeda de ouro com brilho e efeito 3D simulado
      const scaleX = Math.abs(Math.sin(frame * 0.08 + this.bobOffset));
      ctx.scale(Math.max(0.15, scaleX), 1);
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 8;
      ctx.fillStyle = '#ffd166';
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#f4a261';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Borda interna e detalhe de coroa
      ctx.fillStyle = '#e76f51';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('★', 0, 0);
    } else if (this.type === 'crystal') {
      // Cristal mágico multifacetado azul-celeste e rosa
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#4facfe';
      ctx.beginPath();
      ctx.moveTo(0, -14);
      ctx.lineTo(11, -3);
      ctx.lineTo(8, 12);
      ctx.lineTo(-8, 12);
      ctx.lineTo(-11, -3);
      ctx.closePath();
      ctx.fill();

      // Brilho da faceta
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.moveTo(0, -14);
      ctx.lineTo(5, -3);
      ctx.lineTo(0, 10);
      ctx.lineTo(-5, -3);
      ctx.closePath();
      ctx.fill();
    } else if (this.type === 'heart') {
      // Coração mágico rosa
      ctx.shadowColor = '#ff4081';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#ff4081';
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.bezierCurveTo(-14, -2, -14, -14, 0, -7);
      ctx.bezierCurveTo(14, -14, 14, -2, 0, 10);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-4, -5, 2.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'wand') {
      // Varinha de condão dourada com estrela na ponta
      ctx.shadowColor = '#ff6595';
      ctx.shadowBlur = 14;
      ctx.rotate(0.3);

      // Cabo dourado
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(-2, -2, 4, 22);

      // Estrela no topo
      ctx.fillStyle = '#ff6595';
      ctx.beginPath();
      ctx.arc(0, -5, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, -5, 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'star') {
      // Estrela de invencibilidade (muda de cor)
      const hue = (frame * 6) % 360;
      ctx.shadowColor = `hsl(${hue}, 100%, 65%)`;
      ctx.shadowBlur = 15;
      ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;

      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a1 = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const a2 = a1 + Math.PI / 5;
        if (i === 0) ctx.moveTo(Math.cos(a1) * 14, Math.sin(a1) * 14);
        else ctx.lineTo(Math.cos(a1) * 14, Math.sin(a1) * 14);
        ctx.lineTo(Math.cos(a2) * 6, Math.sin(a2) * 6);
      }
      ctx.closePath();
      ctx.fill();
    } else if (this.type === 'crown') {
      // Coroa de ouro rara com rubis
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 15;
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

      // Jóias da coroa
      ctx.fillStyle = '#ff1744';
      ctx.beginPath();
      ctx.arc(0, -2, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

// ============================================================
// 7. PLATAFORMAS & ELEMENTOS DO CENÁRIO
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

    // Parâmetros de movimento
    this.moveDistance = options.distance || 140;
    this.moveSpeed = options.speed || 1.2;
    this.moveOffset = options.offset || 0;
  }

  update(frame) {
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

  draw(ctx, theme = 'castle') {
    ctx.save();

    if (this.type === 'solid') {
      // Plataforma de Mármore Rosa / Jardim Mágico
      const grad = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
      grad.addColorStop(0, '#ff99c8');
      grad.addColorStop(0.2, '#f77fbe');
      grad.addColorStop(1, '#8e44ad');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(this.x, this.y, this.width, this.height, [8, 8, 4, 4]);
      ctx.fill();

      // Topo gramado mágico com flores
      ctx.fillStyle = '#ffcbf2';
      ctx.beginPath();
      ctx.roundRect(this.x, this.y, this.width, 6, [8, 8, 0, 0]);
      ctx.fill();

      // Detalhes de tijolos elegantes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1;
      for (let bx = this.x + 20; bx < this.x + this.width; bx += 35) {
        ctx.beginPath();
        ctx.moveTo(bx, this.y + 7);
        ctx.lineTo(bx, this.y + this.height - 4);
        ctx.stroke();
      }
    } else if (this.type === 'cloud') {
      // Plataforma Nuvem Fofa Lilás e Branca
      ctx.fillStyle = 'rgba(255, 235, 250, 0.9)';
      ctx.shadowColor = '#e0aaff';
      ctx.shadowBlur = 10;

      // Série de arcos criando aspecto fofo de nuvem
      ctx.beginPath();
      const r = this.height / 2;
      ctx.arc(this.x + r, this.y + r, r, Math.PI * 0.5, Math.PI * 1.5);
      ctx.arc(this.x + this.width * 0.35, this.y + r * 0.6, r * 1.2, Math.PI, Math.PI * 2);
      ctx.arc(this.x + this.width * 0.7, this.y + r * 0.5, r * 1.3, Math.PI, Math.PI * 2);
      ctx.arc(this.x + this.width - r, this.y + r, r, Math.PI * 1.5, Math.PI * 0.5);
      ctx.closePath();
      ctx.fill();

      // Brilho do contorno
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (this.type === 'moving_h' || this.type === 'moving_v') {
      // Plataforma Mágica Flutuante Dourada e Rosa
      const grad = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y);
      grad.addColorStop(0, '#ffd166');
      grad.addColorStop(0.5, '#ff75a0');
      grad.addColorStop(1, '#b388eb');

      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 12;
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(this.x, this.y, this.width, this.height, 10);
      ctx.fill();

      // Asinhas mágicas decorativas nas pontas
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(this.x - 4, this.y + this.height / 2, 6, 0, Math.PI * 2);
      ctx.arc(this.x + this.width + 4, this.y + this.height / 2, 6, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'spring') {
      // Cogumelo Saltador Mágico
      const cx = this.x + this.width / 2;
      const cy = this.y + this.height;

      // Caule
      ctx.fillStyle = '#fceade';
      ctx.fillRect(cx - 7, this.y + 10, 14, this.height - 10);

      // Chapéu rosa com pintinhas brancas
      ctx.shadowColor = '#ff6595';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#ff4081';
      ctx.beginPath();
      ctx.arc(cx, this.y + 12, this.width / 2, Math.PI, 0);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx - 8, this.y + 8, 3, 0, Math.PI * 2);
      ctx.arc(cx + 8, this.y + 8, 3, 0, Math.PI * 2);
      ctx.arc(cx, this.y + 3, 3.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'spikes') {
      // Cristais pontiagudos / espinhos sombrios
      ctx.fillStyle = '#7928ca';
      ctx.shadowColor = '#ff007f';
      ctx.shadowBlur = 6;
      const count = Math.floor(this.width / 14);
      const step = this.width / count;
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const sx = this.x + i * step;
        ctx.moveTo(sx, this.y + this.height);
        ctx.lineTo(sx + step / 2, this.y);
        ctx.lineTo(sx + step, this.y + this.height);
      }
      ctx.fill();
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
    // Mastro Dourado
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(this.x + 4, this.y, 6, this.height);

    // Esfera no topo
    ctx.fillStyle = '#ff6595';
    ctx.beginPath();
    ctx.arc(this.x + 7, this.y, 8, 0, Math.PI * 2);
    ctx.fill();

    // Bandeira rosa/lilás ondulando
    const wave = Math.sin(frame * 0.1) * 4;
    ctx.fillStyle = this.active ? '#ff4081' : '#b388eb';
    ctx.shadowColor = this.active ? '#ff75a0' : '#8c52ff';
    ctx.shadowBlur = this.active ? 15 : 4;

    ctx.beginPath();
    ctx.moveTo(this.x + 10, this.y + 6);
    ctx.lineTo(this.x + 36 + wave, this.y + 16);
    ctx.lineTo(this.x + 10, this.y + 28);
    ctx.closePath();
    ctx.fill();

    if (this.active) {
      // Coroa bordada na bandeira
      ctx.fillStyle = '#ffd700';
      ctx.font = '10px Arial';
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

    // Portal mágico giratório com arcos de castelo
    ctx.shadowColor = '#ff6595';
    ctx.shadowBlur = 20;

    // Arco de mármore branco
    ctx.strokeStyle = '#fff0f5';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(cx, this.y + 36, 26, Math.PI, 0);
    ctx.lineTo(cx + 26, this.y + this.height);
    ctx.lineTo(cx - 26, this.y + this.height);
    ctx.stroke();

    // Interior de vórtice mágico
    const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 32);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.4, '#ff99c8');
    grad.addColorStop(0.8, '#7928ca');
    grad.addColorStop(1, 'transparent');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.fill();

    // Estrelas giratórias no portal
    ctx.fillStyle = '#ffd700';
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2 + frame * 0.05;
      const px = cx + Math.cos(a) * 18;
      const py = cy + Math.sin(a) * 18;
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

// ============================================================
// 9. INIMIGOS E CHEFE FINAL (RAINHA DAS SOMBRAS)
// ============================================================
class Enemy {
  constructor(x, y, width, height, type = 'witch') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type; // 'witch', 'dragon', 'shadow_imp'
    this.vx = -1.2;
    this.vy = 0;
    this.facingRight = false;
    this.alive = true;
    this.patrolLeft = x - 120;
    this.patrolRight = x + 120;
    this.shootTimer = 0;
    this.frame = 0;
  }

  update(dt, player, projectiles) {
    if (!this.alive) return;
    this.frame++;

    if (this.type === 'witch') {
      // Bruxa Sombria patrulha calmamente com vassoura
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
      // Dragãozinho patrulha e cospe pequenas chamas mágicas
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
      if (this.shootTimer >= 3.2) {
        this.shootTimer = 0;
        // Atirar bola de fogo se o jogador estiver por perto
        const dist = Math.abs(player.x - this.x);
        if (dist < 420) {
          const shootVx = this.facingRight ? 3.0 : -3.0;
          projectiles.push(new Projectile(this.x + this.width / 2, this.y + 12, shootVx, 0, 'dragon_fire'));
        }
      }
    } else if (this.type === 'shadow_imp') {
      // Criatura Encantada das sombras persegue a princesa quando próxima
      const dx = player.x - this.x;
      if (Math.abs(dx) < 320) {
        this.vx = dx > 0 ? 1.0 : -1.0;
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

      // Vassoura
      ctx.fillStyle = '#8d6e63';
      ctx.fillRect(-18, 12, 34, 3);
      ctx.fillStyle = '#ffd54f';
      ctx.fillRect(-22, 9, 7, 9);
    } else if (this.type === 'dragon') {
      // 🐉 Dragãozinho Roxo
      // Asinhas batendo
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

      // Olho grande e expressivo
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
      const bounce = Math.abs(Math.sin(this.frame * 0.15)) * 4;
      ctx.shadowColor = '#ff007f';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#1d0033';
      ctx.beginPath();
      ctx.arc(0, 4 - bounce, 13, 0, Math.PI * 2);
      ctx.fill();

      // Olhos brilhantes magenta
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
    this.state = 'idle'; // 'idle', 'teleport', 'cast', 'dash'
    this.actionTimer = 0;
    this.frame = 0;
    this.phase = 1; // 1, 2, 3
  }

  takeDamage(soundSystem, particles) {
    if (this.invulnerableTimer > 0 || !this.alive) return false;
    this.health -= 1;
    this.invulnerableTimer = 1.2; // 1.2s de invulnerabilidade e piscada
    soundSystem.playBossHurt();
    particles.createMagicBurst(this.x + this.width / 2, this.y + this.height / 2, 24, ['#ff007f', '#ffd700', '#9b51e0']);

    if (this.health <= 0) {
      this.alive = false;
      return true;
    }

    // Mudança de fase conforme perde vida
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

    // Ciclo de Ataques e Padrões da Rainha
    const cooldown = this.phase === 3 ? 1.8 : this.phase === 2 ? 2.4 : 3.0;

    if (this.actionTimer >= cooldown) {
      this.actionTimer = 0;
      const attackType = Math.random();

      if (attackType < 0.45) {
        // Ataque 1: Salva de Orbes Sombrios
        const dir = this.facingRight ? 1 : -1;
        const orbSpeed = this.phase === 3 ? 4.5 : 3.2;
        projectiles.push(new Projectile(this.x + this.width / 2, this.y + 20, dir * orbSpeed, -0.6, 'boss_dark_orb'));

        if (this.phase >= 2) {
          projectiles.push(new Projectile(this.x + this.width / 2, this.y + 20, dir * orbSpeed * 0.9, 1.2, 'boss_dark_orb'));
        }
      } else if (attackType < 0.8) {
        // Ataque 2: Teletransporte Mágico pelo Salão
        const arenaLeft = this.startX - 280;
        const arenaRight = this.startX + 280;
        this.x = arenaLeft + Math.random() * (arenaRight - arenaLeft);
      } else {
        // Ataque 3: Salto ameaçador
        this.y = this.startY - 60;
        setTimeout(() => {
          this.y = this.startY;
        }, 500);
      }
    }
  }

  draw(ctx) {
    if (!this.alive) return;

    // Efeito de piscar ao sofrer dano
    if (this.invulnerableTimer > 0 && Math.floor(this.frame / 4) % 2 === 0) {
      return;
    }

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    if (this.facingRight) ctx.scale(-1, 1);

    // Aura sombria imponente
    ctx.shadowColor = this.phase === 3 ? '#ff007f' : '#8a2be2';
    ctx.shadowBlur = 20;

    // Capa elegante escura com forro lilás
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

    // Rosto pálido e elegante
    ctx.fillStyle = '#fce4ec';
    ctx.beginPath();
    ctx.arc(0, -16, 12, 0, Math.PI * 2);
    ctx.fill();

    // Cabelo preto azulado volumoso
    ctx.fillStyle = '#0f051d';
    ctx.beginPath();
    ctx.arc(-8, -18, 8, 0, Math.PI * 2);
    ctx.arc(8, -18, 8, 0, Math.PI * 2);
    ctx.arc(0, -22, 10, 0, Math.PI * 2);
    ctx.fill();

    // Coroa das Sombras com jóia roxa
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

    // Olhos penetrantes magenta
    ctx.fillStyle = '#ff1493';
    ctx.beginPath();
    ctx.arc(-4, -16, 2.5, 0, Math.PI * 2);
    ctx.arc(4, -16, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Cetro Sombrio na mão
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
    this.width = 32;
    this.height = 48;

    // Física e Movimentação
    this.vx = 0;
    this.vy = 0;
    this.speed = 3.6;
    this.runMultiplier = 1.45;
    this.jumpForce = -10.2;
    this.gravity = 0.44;
    this.grounded = false;
    this.facingRight = true;

    // Estados e Poderes
    this.lives = 3;
    this.maxLives = 5;
    this.coins = 0;
    this.crystals = 0;
    this.score = 0;

    this.invulnerableTimer = 0;
    this.wandTimer = 0; // Se > 0, pode disparar magia
    this.starTimer = 0; // Se > 0, invencível e rápida
    this.shootCooldown = 0;

    this.state = 'idle'; // 'idle', 'walk', 'run', 'jump', 'fall', 'hurt', 'victory'
    this.frame = 0;
    this.animTimer = 0;
  }

  respawn() {
    this.x = this.checkpointX;
    this.y = this.checkpointY;
    this.vx = 0;
    this.vy = 0;
    this.invulnerableTimer = 2.0; // 2s de proteção ao reaparecer
  }

  takeHit(soundSystem, particles) {
    // Se estiver com estrela mágica ou invulnerabilidade temporária, ignora dano
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

  update(dt, input, platforms, soundSystem, particles, projectiles) {
    this.frame++;
    this.animTimer += dt;

    // Atualizar cronômetros de powerups
    if (this.invulnerableTimer > 0) this.invulnerableTimer -= dt;
    if (this.wandTimer > 0) this.wandTimer -= dt;
    if (this.starTimer > 0) this.starTimer -= dt;
    if (this.shootCooldown > 0) this.shootCooldown -= dt;

    // 1. Movimentação Horizontal
    let moveSpeed = this.speed;
    if (input.keys.run || this.starTimer > 0) {
      moveSpeed *= this.runMultiplier;
    }

    if (input.keys.left) {
      this.vx = -moveSpeed;
      this.facingRight = false;
    } else if (input.keys.right) {
      this.vx = moveSpeed;
      this.facingRight = true;
    } else {
      this.vx *= 0.75;
      if (Math.abs(this.vx) < 0.1) this.vx = 0;
    }

    // 2. Disparo de Magia da Varinha
    if (input.keys.shoot && this.wandTimer > 0 && this.shootCooldown <= 0) {
      this.shootCooldown = 0.28;
      const projSpeed = this.facingRight ? 7.5 : -7.5;
      projectiles.push(new Projectile(this.x + this.width / 2, this.y + 16, projSpeed, 0, 'player_magic'));
      soundSystem.playShoot();
      particles.createMagicBurst(this.x + this.width / 2, this.y + 16, 8, ['#ffd700', '#ff6595']);
    }

    // 3. Pulo com física sensível à pressão
    if (input.isJumpTriggered() && this.grounded) {
      this.vy = this.jumpForce;
      this.grounded = false;
      soundSystem.playJump();
      particles.createDust(this.x + this.width / 2, this.y + this.height);
    }

    // Corte suave de pulo ao soltar o botão no ar (jump cut)
    if (!input.keys.jump && this.vy < -4) {
      this.vy *= 0.6;
    }

    // Aplicar gravidade
    this.vy += this.gravity;
    if (this.vy > 12) this.vy = 12; // Terminal velocity

    // 4. Integração de Posição & Colisão com Plataformas
    this.x += this.vx;
    this.checkHorizontalCollisions(platforms);

    this.y += this.vy;
    this.grounded = false;
    this.checkVerticalCollisions(platforms, soundSystem, particles);

    // Determinar estado de animação
    if (!this.grounded) {
      this.state = this.vy < 0 ? 'jump' : 'fall';
    } else if (Math.abs(this.vx) > 0.5) {
      this.state = Math.abs(this.vx) > this.speed * 1.1 ? 'run' : 'walk';
    } else {
      this.state = 'idle';
    }

    // Efeito de rastro brilhante com estrela mágica ativa
    if (this.starTimer > 0 && Math.random() < 0.4) {
      particles.createMagicBurst(this.x + this.width / 2, this.y + this.height / 2, 2, ['#ffd700', '#ffffff', '#ff6595']);
    }
  }

  checkHorizontalCollisions(platforms) {
    for (const p of platforms) {
      if (p.type === 'cloud' || p.type === 'spring' || p.type === 'spikes') continue;

      if (
        this.x < p.x + p.width &&
        this.x + this.width > p.x &&
        this.y < p.y + p.height &&
        this.y + this.height > p.y
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
    for (const p of platforms) {
      if (
        this.x + this.width * 0.8 > p.x &&
        this.x + this.width * 0.2 < p.x + p.width
      ) {
        // Colisão com topo da plataforma ao descer
        if (this.vy >= 0 && this.y + this.height >= p.y && this.y + this.height <= p.y + p.height + this.vy + 2) {
          if (p.type === 'spring') {
            // Super salto no cogumelo mágico!
            this.vy = -14.5;
            this.y = p.y - this.height;
            soundSystem.playJump();
            particles.createMagicBurst(this.x + this.width / 2, this.y + this.height, 12, ['#ff4081', '#ffd700']);
            return;
          }

          if (p.type === 'spikes') {
            this.takeHit(soundSystem, particles);
            return;
          }

          // Plataforma sólida, móvel ou nuvem
          this.y = p.y - this.height;
          this.vy = 0;
          this.grounded = true;

          // Se a plataforma estiver se movendo, acompanhar
          if (p.type === 'moving_h' && p.dx) {
            this.x += p.dx;
          }
          if (p.type === 'moving_v' && p.dy) {
            this.y += p.dy;
          }
          return;
        }

        // Colisão com a parte de baixo (cabeçada em bloco sólido)
        if (this.vy < 0 && p.type === 'solid' && this.y <= p.y + p.height && this.y >= p.y) {
          this.y = p.y + p.height;
          this.vy = 0;
        }
      }
    }
  }

  draw(ctx) {
    // Piscar se invulnerável
    if (this.invulnerableTimer > 0 && Math.floor(this.frame / 4) % 2 === 0) {
      return;
    }

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    if (!this.facingRight) ctx.scale(-1, 1);

    // Efeito de aura colorida com a Estrela de Invencibilidade
    if (this.starTimer > 0) {
      const hue = (this.frame * 8) % 360;
      ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
      ctx.shadowBlur = 18;
    } else {
      ctx.shadowColor = 'rgba(255, 105, 180, 0.4)';
      ctx.shadowBlur = 8;
    }

    // 1. Cabelos Longos Dourados / Castanho Claro Ondulantes
    const hairWave = Math.sin(this.frame * 0.15) * 3;
    ctx.fillStyle = '#ffcf40';
    ctx.beginPath();
    ctx.arc(-4, -12, 11, 0, Math.PI * 2);
    ctx.arc(-8 + hairWave, 0, 9, 0, Math.PI * 2);
    ctx.arc(-11 + hairWave * 1.2, 10, 8, 0, Math.PI * 2);
    ctx.fill();

    // 2. Vestido de Princesa Rosa & Lilás
    const walkSwing = this.state === 'walk' || this.state === 'run' ? Math.sin(this.frame * 0.3) * 4 : 0;
    const gradDress = ctx.createLinearGradient(0, 0, 0, 24);
    gradDress.addColorStop(0, '#ff75a0');
    gradDress.addColorStop(0.6, '#f72585');
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
    ctx.arc(-8 + walkSwing, 22, 3.5, 0, Math.PI * 2);
    ctx.arc(0 + walkSwing, 22, 3.5, 0, Math.PI * 2);
    ctx.arc(8 + walkSwing, 22, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Perninhas / Sapatinhos de Cristal
    ctx.fillStyle = '#fce4ec';
    const legOffset = (this.state === 'walk' || this.state === 'run') ? Math.sin(this.frame * 0.3) * 6 : 0;
    ctx.fillRect(-6 + legOffset, 20, 4, 5);
    ctx.fillRect(2 - legOffset, 20, 4, 5);
    ctx.fillStyle = '#00f2fe';
    ctx.fillRect(-7 + legOffset, 24, 6, 3);
    ctx.fillRect(1 - legOffset, 24, 6, 3);

    // 3. Corpete & Laço de Fita Dourado
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(-5, 4, 10, 3);

    // 4. Rosto Carismático
    ctx.fillStyle = '#ffdfba';
    ctx.beginPath();
    ctx.arc(2, -8, 8, 0, Math.PI * 2);
    ctx.fill();

    // Bochechas coradas fofas
    ctx.fillStyle = 'rgba(255, 64, 129, 0.45)';
    ctx.beginPath();
    ctx.arc(4, -6, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Olho grande e expressivo com brilho
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
    ctx.arc(2, -18, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // 6. Varinha Mágica na Mão (se tiver o poder ativo)
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
// 11. SISTEMA DE FASES (5 MUNDOS PROGRESSIVOS E RICOS)
// ============================================================
class Level {
  constructor(number, name, theme, length, platforms, items, enemies, boss = null) {
    this.number = number;
    this.name = name;
    this.theme = theme; // 'garden', 'forest', 'tower', 'sky', 'castle'
    this.length = length;
    this.platforms = platforms;
    this.items = items;
    this.enemies = enemies;
    this.boss = boss;
    this.checkpoint = new Checkpoint(Math.floor(length * 0.48), 380);
    this.portal = new GoalPortal(length - 120, 370);
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

  // FASE 1: Jardim Encantado
  static createLevel1() {
    const platforms = [
      // Chão principal com buracos suaves para introduzir pulo
      new Platform(0, 460, 680, 80, 'solid'),
      new Platform(780, 460, 600, 80, 'solid'),
      new Platform(1480, 460, 720, 80, 'solid'),
      new Platform(2300, 460, 900, 80, 'solid'),

      // Plataformas elevadas e pontes de mármore
      new Platform(260, 360, 140, 24, 'solid'),
      new Platform(460, 300, 140, 24, 'solid'),
      new Platform(880, 370, 160, 24, 'solid'),
      new Platform(1120, 310, 140, 24, 'solid'),
      new Platform(1620, 350, 160, 24, 'cloud'),
      new Platform(1860, 280, 160, 24, 'cloud'),
      new Platform(2460, 370, 160, 24, 'solid'),
      new Platform(2720, 310, 160, 24, 'solid')
    ];

    const items = [
      // Moedas em arcos alegres
      new Item(180, 420, 'coin'),
      new Item(220, 400, 'coin'),
      new Item(290, 320, 'coin'),
      new Item(330, 320, 'coin'),
      new Item(490, 260, 'crystal'),
      new Item(920, 330, 'coin'),
      new Item(960, 330, 'coin'),
      new Item(1160, 270, 'wand'),
      new Item(1660, 310, 'crystal'),
      new Item(1700, 310, 'coin'),
      new Item(1900, 240, 'star'),
      new Item(2500, 330, 'coin'),
      new Item(2760, 270, 'crown')
    ];

    const enemies = [
      new Enemy(480, 420, 28, 40, 'witch'),
      new Enemy(980, 420, 28, 40, 'witch'),
      new Enemy(1720, 420, 28, 40, 'witch'),
      new Enemy(2520, 420, 28, 40, 'witch')
    ];

    return new Level(1, 'Jardim Encantado', 'garden', 3200, platforms, items, enemies);
  }

  // FASE 2: Floresta Mágica (Plataformas móveis e cogumelos saltadores)
  static createLevel2() {
    const platforms = [
      new Platform(0, 460, 500, 80, 'solid'),
      new Platform(620, 460, 440, 80, 'solid'),
      // Cogumelo saltador
      new Platform(420, 435, 34, 25, 'spring'),
      // Plataforma móvel horizontal sobre lago de névoa
      new Platform(1180, 380, 120, 22, 'moving_h', { distance: 160, speed: 1.3 }),
      new Platform(1500, 460, 600, 80, 'solid'),
      new Platform(1700, 370, 140, 24, 'solid'),
      // Plataforma móvel vertical
      new Platform(2180, 360, 120, 22, 'moving_v', { distance: 80, speed: 1.5 }),
      new Platform(2380, 460, 1000, 80, 'solid'),
      new Platform(2580, 380, 140, 24, 'cloud'),
      new Platform(2820, 310, 150, 24, 'cloud')
    ];

    const items = [
      new Item(150, 420, 'coin'),
      new Item(280, 420, 'coin'),
      new Item(420, 300, 'crystal'),
      new Item(700, 420, 'coin'),
      new Item(800, 420, 'wand'),
      new Item(1180, 330, 'crystal'),
      new Item(1600, 420, 'heart'),
      new Item(1740, 330, 'coin'),
      new Item(2460, 420, 'coin'),
      new Item(2620, 340, 'crystal'),
      new Item(2860, 270, 'star'),
      new Item(3050, 420, 'crown')
    ];

    const enemies = [
      new Enemy(300, 420, 28, 40, 'witch'),
      new Enemy(740, 420, 32, 32, 'dragon'),
      new Enemy(1620, 420, 32, 32, 'dragon'),
      new Enemy(2600, 420, 26, 26, 'shadow_imp')
    ];

    return new Level(2, 'Floresta Mágica', 'forest', 3400, platforms, items, enemies);
  }

  // FASE 3: Torre das Bruxas (Espinhos, armadilhas e criaturas encantadas)
  static createLevel3() {
    const platforms = [
      new Platform(0, 460, 550, 80, 'solid'),
      new Platform(550, 460, 180, 80, 'spikes'), // Armadilha de espinhos no chão
      new Platform(730, 460, 600, 80, 'solid'),
      new Platform(250, 360, 120, 22, 'solid'),
      new Platform(450, 290, 140, 22, 'solid'),
      new Platform(650, 340, 120, 22, 'cloud'),
      new Platform(950, 360, 140, 22, 'moving_h', { distance: 130, speed: 1.4 }),
      new Platform(1450, 460, 700, 80, 'solid'),
      new Platform(1700, 370, 130, 22, 'cloud'),
      new Platform(1920, 290, 130, 22, 'cloud'),
      new Platform(2250, 460, 1200, 80, 'solid'),
      new Platform(2400, 440, 100, 20, 'spikes'),
      new Platform(2580, 350, 150, 22, 'moving_v', { distance: 90, speed: 1.6 })
    ];

    const items = [
      new Item(180, 420, 'coin'),
      new Item(280, 320, 'crystal'),
      new Item(490, 250, 'wand'),
      new Item(800, 420, 'coin'),
      new Item(1000, 310, 'crystal'),
      new Item(1520, 420, 'heart'),
      new Item(1740, 330, 'coin'),
      new Item(1960, 250, 'star'),
      new Item(2700, 420, 'coin'),
      new Item(2850, 420, 'crown')
    ];

    const enemies = [
      new Enemy(350, 420, 28, 40, 'witch'),
      new Enemy(840, 420, 28, 40, 'witch'),
      new Enemy(1550, 420, 26, 26, 'shadow_imp'),
      new Enemy(1820, 420, 32, 32, 'dragon'),
      new Enemy(2800, 420, 26, 26, 'shadow_imp')
    ];

    return new Level(3, 'Torre das Bruxas', 'tower', 3600, platforms, items, enemies);
  }

  // FASE 4: Reino das Nuvens (Plataformas suspensas, dragões e desafios aéreos)
  static createLevel4() {
    const platforms = [
      new Platform(0, 460, 400, 80, 'solid'),
      new Platform(480, 420, 140, 24, 'cloud'),
      new Platform(700, 360, 130, 22, 'moving_h', { distance: 150, speed: 1.5 }),
      new Platform(1020, 320, 160, 24, 'cloud'),
      new Platform(1260, 435, 34, 25, 'spring'), // Mola para grande impulso
      new Platform(1380, 460, 450, 80, 'solid'),
      new Platform(1900, 380, 140, 22, 'moving_v', { distance: 100, speed: 1.7 }),
      new Platform(2150, 320, 150, 24, 'cloud'),
      new Platform(2400, 260, 140, 22, 'moving_h', { distance: 160, speed: 1.6 }),
      new Platform(2700, 460, 1000, 80, 'solid'),
      new Platform(2900, 370, 160, 24, 'cloud')
    ];

    const items = [
      new Item(160, 420, 'coin'),
      new Item(520, 380, 'crystal'),
      new Item(750, 310, 'wand'),
      new Item(1070, 270, 'coin'),
      new Item(1450, 420, 'heart'),
      new Item(1950, 330, 'crystal'),
      new Item(2200, 270, 'star'),
      new Item(2460, 220, 'crown'),
      new Item(2800, 420, 'coin'),
      new Item(3000, 420, 'crystal')
    ];

    const enemies = [
      new Enemy(220, 420, 32, 32, 'dragon'),
      new Enemy(1480, 420, 32, 32, 'dragon'),
      new Enemy(1620, 420, 28, 40, 'witch'),
      new Enemy(2850, 420, 32, 32, 'dragon')
    ];

    return new Level(4, 'Reino das Nuvens', 'sky', 3800, platforms, items, enemies);
  }

  // FASE 5: Castelo da Rainha das Sombras (Fase final com Arena e Chefe!)
  static createLevel5() {
    const platforms = [
      new Platform(0, 460, 600, 80, 'solid'),
      new Platform(300, 370, 140, 24, 'solid'),
      new Platform(520, 300, 140, 24, 'solid'),
      new Platform(700, 460, 500, 80, 'solid'),
      new Platform(880, 370, 140, 22, 'cloud'),
      new Platform(1100, 300, 140, 22, 'moving_h', { distance: 120, speed: 1.4 }),
      new Platform(1300, 460, 500, 80, 'solid'),
      new Platform(1450, 440, 120, 20, 'spikes'),

      // ENTRADA DA GRANDE ARENA DO CHEFE (x = 1900 até 3200)
      new Platform(1900, 460, 1300, 80, 'solid'),
      new Platform(2050, 360, 140, 22, 'cloud'),
      new Platform(2350, 310, 160, 22, 'cloud'),
      new Platform(2650, 360, 140, 22, 'cloud')
    ];

    const items = [
      new Item(180, 420, 'coin'),
      new Item(340, 330, 'crystal'),
      new Item(560, 260, 'wand'),
      new Item(780, 420, 'coin'),
      new Item(920, 330, 'heart'),
      new Item(1350, 420, 'wand'), // Varinha antes da arena do chefe!
      new Item(1980, 420, 'heart'),
      new Item(2390, 270, 'crystal')
    ];

    const enemies = [
      new Enemy(380, 420, 28, 40, 'witch'),
      new Enemy(800, 420, 32, 32, 'dragon'),
      new Enemy(1020, 420, 26, 26, 'shadow_imp')
    ];

    // Chefe posicionado na grande arena
    const boss = new Boss(2480, 384);

    return new Level(5, 'Castelo da Rainha das Sombras', 'castle', 3200, platforms, items, enemies, boss);
  }
}

// ============================================================
// 12. CÂMERA & PARALLAX BACKGROUND
// ============================================================
class Camera {
  constructor(viewportWidth, viewportHeight) {
    this.x = 0;
    this.y = 0;
    this.width = viewportWidth;
    this.height = viewportHeight;
  }

  update(player, levelLength) {
    // Seguir suavemente a princesa horizontalmente com antecipação
    const targetX = player.x - this.width * 0.38;
    this.x += (targetX - this.x) * 0.1;

    // Limites de mundo
    if (this.x < 0) this.x = 0;
    if (this.x > levelLength - this.width) this.x = levelLength - this.width;
  }

  drawParallax(ctx, theme, frame) {
    // 1. Gradiente de Céu
    const skyGrad = ctx.createLinearGradient(0, 0, 0, this.height);
    if (theme === 'garden') {
      skyGrad.addColorStop(0, '#ffb8d2');
      skyGrad.addColorStop(0.5, '#ffd1e8');
      skyGrad.addColorStop(1, '#e8d5f5');
    } else if (theme === 'forest') {
      skyGrad.addColorStop(0, '#3a0ca3');
      skyGrad.addColorStop(0.5, '#7209b7');
      skyGrad.addColorStop(1, '#f72585');
    } else if (theme === 'tower') {
      skyGrad.addColorStop(0, '#1a002b');
      skyGrad.addColorStop(0.6, '#4a0e4e');
      skyGrad.addColorStop(1, '#9b51e0');
    } else if (theme === 'sky') {
      skyGrad.addColorStop(0, '#4cc9f0');
      skyGrad.addColorStop(0.5, '#b5179e');
      skyGrad.addColorStop(1, '#ffc6ff');
    } else {
      // Castelo Sombrio Real
      skyGrad.addColorStop(0, '#10001a');
      skyGrad.addColorStop(0.5, '#2e0854');
      skyGrad.addColorStop(1, '#6a0dad');
    }
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    // 2. Nuvens e Estrelas Distantes (Velocidade 0.1)
    const starShift = (this.x * 0.08) % this.width;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    for (let i = 0; i < 28; i++) {
      const sx = ((i * 67 + frame * 0.2 - starShift) % this.width + this.width) % this.width;
      const sy = (i * 29) % (this.height * 0.45);
      const twinkle = Math.sin(frame * 0.08 + i) * 1.5 + 2;
      ctx.beginPath();
      ctx.arc(sx, sy, Math.max(0.8, twinkle), 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Montanhas Mágicas Distantes (Velocidade 0.2)
    const mtnShift = (this.x * 0.2) % 400;
    ctx.fillStyle = 'rgba(121, 40, 202, 0.25)';
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
    ctx.fillStyle = 'rgba(255, 105, 180, 0.32)';
    for (let x = -520; x <= this.width + 520; x += 360) {
      const cx = x - castleShift;
      // Torre com telhado cônico
      ctx.fillRect(cx + 80, this.height * 0.45, 48, this.height * 0.55);
      ctx.beginPath();
      ctx.moveTo(cx + 68, this.height * 0.45);
      ctx.lineTo(cx + 104, this.height * 0.32);
      ctx.lineTo(cx + 140, this.height * 0.45);
      ctx.closePath();
      ctx.fill();

      // Bandeira dourada
      ctx.fillStyle = 'rgba(255, 215, 0, 0.6)';
      ctx.fillRect(cx + 103, this.height * 0.28, 2, 20);
      ctx.beginPath();
      ctx.moveTo(cx + 105, this.height * 0.28);
      ctx.lineTo(cx + 120, this.height * 0.32);
      ctx.lineTo(cx + 105, this.height * 0.36);
      ctx.fill();
      ctx.fillStyle = 'rgba(255, 105, 180, 0.32)';
    }
  }
}

// ============================================================
// 13. CLASSE PRINCIPAL: GAME ENGINE & LOOP
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
    this.frame = 0;

    // Vincular callback de pausa
    this.input.pauseCallback = () => this.togglePause();

    this.initUI();
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Iniciar loop de jogo
    requestAnimationFrame((t) => this.loop(t));
  }

  resizeCanvas() {
    // Mantém proporção e resolução nítida
    const container = document.getElementById('gameContainer');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    this.canvas.width = 960;
    this.canvas.height = 540;
    this.camera.width = this.canvas.width;
    this.camera.height = this.canvas.height;
  }

  // ==========================================================
  // INTERFACE, MENUS E TELAS
  // ==========================================================
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

  // ==========================================================
  // INÍCIO E CONTROLE DE FASES
  // ==========================================================
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

    // Powerup ativo
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

    // Barra do Chefe
    if (this.level.boss && this.level.boss.alive) {
      const percent = Math.max(0, (this.level.boss.health / this.level.boss.maxHealth) * 100);
      document.getElementById('bossHealthPercent').innerText = `${Math.round(percent)}%`;
      document.getElementById('bossBarFill').style.width = `${percent}%`;
    }
  }

  // ==========================================================
  // EVENTOS DE VITÓRIA & GAME OVER
  // ==========================================================
  handleLevelComplete() {
    this.state = 'LEVEL_CLEAR';
    this.sound.playLevelClear();
    this.particles.createConfetti(this.player.x, this.player.y, 40);

    // Bônus de pontuação por término de fase
    this.player.score += 2000;

    // Calcular estrelas (1 a 3 estrelas com base em moedas/cristais)
    let stars = 1;
    if (this.player.coins >= 8) stars = 2;
    if (this.player.coins >= 8 && this.player.crystals >= 2) stars = 3;

    // Salvar progresso
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

    // Exibir Modal de Vitória da Fase
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

  // ==========================================================
  // LOOP PRINCIPAL DE ATUALIZAÇÃO E RENDERIZAÇÃO
  // ==========================================================
  loop(timestamp) {
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
    this.lastTime = timestamp;
    this.frame++;

    if (this.state === 'PLAYING') {
      this.update(dt);
    }

    this.render();

    requestAnimationFrame((t) => this.loop(t));
  }

  update(dt) {
    // 1. Atualizar plataformas móveis
    for (const p of this.level.platforms) {
      p.update(this.frame);
    }

    // 2. Atualizar Jogador
    this.player.update(dt, this.input, this.level.platforms, this.sound, this.particles, this.projectiles);

    // Queda no abismo
    if (this.player.y > this.canvas.height + 60) {
      const isGameOver = this.player.takeHit(this.sound, this.particles);
      if (isGameOver) {
        this.handleGameOver();
        return;
      }
    }

    // 3. Atualizar Câmera
    this.camera.update(this.player, this.level.length);

    // 4. Atualizar e Colidir Itens
    for (const item of this.level.items) {
      if (item.collected) continue;
      item.update(dt, this.frame);

      // Colisão Princesa x Item
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
          this.player.wandTimer = 15.0; // 15 segundos de poder da varinha
          this.player.score += 400;
          this.sound.playPowerup();
          this.particles.createMagicBurst(item.x, item.y, 20, ['#ffd700', '#ff6595']);
        } else if (item.type === 'star') {
          this.player.starTimer = 10.0; // 10 segundos de invencibilidade
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

    // 5. Atualizar Inimigos & Combate
    for (const enemy of this.level.enemies) {
      if (!enemy.alive) continue;
      enemy.update(dt, this.player, this.projectiles);

      // Colisão Princesa x Inimigo
      if (
        this.player.x < enemy.x + enemy.width &&
        this.player.x + this.player.width > enemy.x &&
        this.player.y < enemy.y + enemy.height &&
        this.player.y + this.player.height > enemy.y
      ) {
        // Se estiver caindo sobre a cabeça do inimigo ou com a Estrela mágica
        if ((this.player.vy > 0 && this.player.y + this.player.height - enemy.y < 22) || this.player.starTimer > 0) {
          enemy.alive = false;
          this.player.vy = -8.5; // Pulo de ricochete satisfatório
          this.player.score += 300;
          this.sound.playStomp();
          this.particles.createMagicBurst(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 16, ['#ff6595', '#ffd700']);
        } else {
          // Princesa recebe dano
          const isGameOver = this.player.takeHit(this.sound, this.particles);
          if (isGameOver) {
            this.handleGameOver();
            return;
          }
        }
      }
    }

    // 6. Atualizar Chefe Final (se houver)
    if (this.level.boss && this.level.boss.alive) {
      this.level.boss.update(dt, this.player, this.projectiles, this.sound);

      // Colisão Princesa x Chefe
      if (
        this.player.x < this.level.boss.x + this.level.boss.width &&
        this.player.x + this.player.width > this.level.boss.x &&
        this.player.y < this.level.boss.y + this.level.boss.height &&
        this.player.y + this.player.height > this.level.boss.y
      ) {
        if (this.player.vy > 0 && this.player.y + this.player.height - this.level.boss.y < 26) {
          const defeated = this.level.boss.takeDamage(this.sound, this.particles);
          this.player.vy = -10.0;
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

    // 7. Atualizar Projéteis
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const proj = this.projectiles[i];
      proj.update(dt);

      if (proj.life <= 0) {
        this.projectiles.splice(i, 1);
        continue;
      }

      // Projétil da Princesa atingindo Inimigos ou Chefe
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
        // Projétil de Dragão ou Chefe atingindo a Princesa
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

    // 8. Checkpoint
    if (!this.level.checkpoint.active && this.player.x >= this.level.checkpoint.x) {
      this.level.checkpoint.active = true;
      this.player.checkpointX = this.level.checkpoint.x;
      this.player.checkpointY = this.level.checkpoint.y - 20;
      this.sound.playPowerup();
      this.particles.createMagicBurst(this.level.checkpoint.x + 10, this.level.checkpoint.y, 20, ['#ffd700', '#ff6595']);
    }

    // 9. Portal de Vitória / Fim de Fase
    if (
      this.player.x < this.level.portal.x + this.level.portal.width &&
      this.player.x + this.player.width > this.level.portal.x &&
      this.player.y < this.level.portal.y + this.level.portal.height &&
      this.player.y + this.player.height > this.level.portal.y
    ) {
      // Se tiver chefe vivo, o portal só ativa quando derrotado
      if (!this.level.boss || !this.level.boss.alive) {
        this.handleLevelComplete();
        return;
      }
    }

    // 10. Partículas
    this.particles.update(dt);

    // 11. Sincronizar HUD
    this.updateHUD();
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.state === 'MENU') {
      // Fundo animado no menu
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

    // Plataformas
    for (const p of this.level.platforms) {
      // Frustum culling para performance
      if (p.x + p.width >= this.camera.x && p.x <= this.camera.x + this.camera.width) {
        p.draw(this.ctx, this.level.theme);
      }
    }

    // Itens
    for (const item of this.level.items) {
      if (item.x + item.width >= this.camera.x && item.x <= this.camera.x + this.camera.width) {
        item.draw(this.ctx, this.frame);
      }
    }

    // Inimigos
    for (const enemy of this.level.enemies) {
      if (enemy.x + enemy.width >= this.camera.x && enemy.x <= this.camera.x + this.camera.width) {
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
