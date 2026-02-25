// Audio Context
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
    if (!audioCtx) audioCtx = new AudioContext();
}

function playSound(type, delay = 0) {
    if (!soundEnabled || !audioCtx) return;
    const now = audioCtx.currentTime + delay;

    switch(type) {
        case 'shoot':
            const shootOsc = audioCtx.createOscillator();
            const shootGain = audioCtx.createGain();
            shootOsc.connect(shootGain);
            shootGain.connect(audioCtx.destination);
            shootOsc.type = 'sawtooth';
            shootOsc.frequency.setValueAtTime(300, now);
            shootOsc.frequency.exponentialRampToValueAtTime(50, now + 0.15);
            shootGain.gain.setValueAtTime(0.4, now);
            shootGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            shootOsc.start(now);
            shootOsc.stop(now + 0.15);
            break;

        case 'reload':
            for (let i = 0; i < 3; i++) {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.type = 'square';
                osc.frequency.setValueAtTime([800, 600, 1000][i], now + i * 0.08);
                gain.gain.setValueAtTime(0.3, now + i * 0.08);
                gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.05);
                osc.start(now + i * 0.08);
                osc.stop(now + i * 0.08 + 0.05);
            }
            break;

        case 'hit':
            const hitOsc = audioCtx.createOscillator();
            const hitGain = audioCtx.createGain();
            hitOsc.connect(hitGain);
            hitGain.connect(audioCtx.destination);
            hitOsc.type = 'sine';
            hitOsc.frequency.setValueAtTime(600, now);
            hitOsc.frequency.setValueAtTime(800, now + 0.1);
            hitOsc.frequency.setValueAtTime(400, now + 0.2);
            hitGain.gain.setValueAtTime(0.24, now);
            hitGain.gain.linearRampToValueAtTime(0, now + 0.3);
            hitOsc.start(now);
            hitOsc.stop(now + 0.3);
            break;

        case 'empty':
            for (let i = 0; i < 3; i++) {
                const clickOsc = audioCtx.createOscillator();
                const clickGain = audioCtx.createGain();
                clickOsc.connect(clickGain);
                clickGain.connect(audioCtx.destination);
                clickOsc.type = 'square';
                clickOsc.frequency.setValueAtTime(800 + i * 200, now + i * 0.05);
                clickGain.gain.setValueAtTime(0.2, now + i * 0.05);
                clickGain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.08);
                clickOsc.start(now + i * 0.05);
                clickOsc.stop(now + i * 0.05 + 0.08);
            }
            break;

        case 'laugh':
            for (let i = 0; i < 6; i++) {
                const lOsc = audioCtx.createOscillator();
                const lGain = audioCtx.createGain();
                lOsc.connect(lGain);
                lGain.connect(audioCtx.destination);
                lOsc.type = 'sawtooth';
                lOsc.frequency.setValueAtTime(300 + Math.random() * 200, now + i * 0.1);
                lGain.gain.setValueAtTime(0.15, now + i * 0.1);
                lGain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.08);
                lOsc.start(now + i * 0.1);
                lOsc.stop(now + i * 0.1 + 0.08);
            }
            break;

        case 'damage':
            const dmgOsc = audioCtx.createOscillator();
            const dmgGain = audioCtx.createGain();
            dmgOsc.connect(dmgGain);
            dmgGain.connect(audioCtx.destination);
            dmgOsc.type = 'sawtooth';
            dmgOsc.frequency.setValueAtTime(150, now);
            dmgOsc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
            dmgGain.gain.setValueAtTime(0.4, now);
            dmgGain.gain.linearRampToValueAtTime(0, now + 0.3);
            dmgOsc.start(now);
            dmgOsc.stop(now + 0.3);
            break;

        case 'combo':
            const comboOsc = audioCtx.createOscillator();
            const comboGain = audioCtx.createGain();
            comboOsc.connect(comboGain);
            comboGain.connect(audioCtx.destination);
            comboOsc.type = 'square';
            comboOsc.frequency.setValueAtTime(523, now);
            comboOsc.frequency.setValueAtTime(659, now + 0.1);
            comboOsc.frequency.setValueAtTime(784, now + 0.2);
            comboGain.gain.setValueAtTime(0.3, now);
            comboGain.gain.linearRampToValueAtTime(0, now + 0.4);
            comboOsc.start(now);
            comboOsc.stop(now + 0.4);
            break;

        case 'levelUp':
            for (let i = 0; i < 3; i++) {
                const lOsc = audioCtx.createOscillator();
                const lGain = audioCtx.createGain();
                lOsc.connect(lGain);
                lGain.connect(audioCtx.destination);
                lOsc.type = 'square';
                lOsc.frequency.setValueAtTime(440 + i * 110, now + i * 0.15);
                lGain.gain.setValueAtTime(0.3, now + i * 0.15);
                lGain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.2);
                lOsc.start(now + i * 0.15);
                lOsc.stop(now + i * 0.15 + 0.2);
            }
            break;

        case 'gameOver':
            const goOsc = audioCtx.createOscillator();
            const goGain = audioCtx.createGain();
            goOsc.connect(goGain);
            goGain.connect(audioCtx.destination);
            goOsc.type = 'sawtooth';
            goOsc.frequency.setValueAtTime(200, now);
            goOsc.frequency.exponentialRampToValueAtTime(50, now + 0.8);
            goGain.gain.setValueAtTime(0.4, now);
            goGain.gain.linearRampToValueAtTime(0, now + 0.8);
            goOsc.start(now);
            goOsc.stop(now + 0.8);
            break;

        case 'duck':
            const duckOsc = audioCtx.createOscillator();
            const duckGain = audioCtx.createGain();
            duckOsc.connect(duckGain);
            duckGain.connect(audioCtx.destination);
            duckOsc.type = 'sawtooth';
            duckOsc.frequency.setValueAtTime(600, now);
            duckOsc.frequency.exponentialRampToValueAtTime(400, now + 0.15);
            duckGain.gain.setValueAtTime(0.36, now);
            duckGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            duckOsc.start(now);
            duckOsc.stop(now + 0.15);
            break;

        case 'turkey':
            for (let i = 0; i < 4; i++) {
                const turkeyOsc = audioCtx.createOscillator();
                const turkeyGain = audioCtx.createGain();
                turkeyOsc.connect(turkeyGain);
                turkeyGain.connect(audioCtx.destination);
                turkeyOsc.type = 'sawtooth';
                turkeyOsc.frequency.setValueAtTime(150, now + i * 0.08);
                turkeyOsc.frequency.exponentialRampToValueAtTime(100, now + i * 0.08 + 0.06);
                turkeyGain.gain.setValueAtTime(0.3, now + i * 0.08);
                turkeyGain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.06);
                turkeyOsc.start(now + i * 0.08);
                turkeyOsc.stop(now + i * 0.08 + 0.06);
            }
            break;

        case 'deer':
            const deerOsc = audioCtx.createOscillator();
            const deerGain = audioCtx.createGain();
            deerOsc.connect(deerGain);
            deerGain.connect(audioCtx.destination);
            deerOsc.type = 'sine';
            deerOsc.frequency.setValueAtTime(800, now);
            deerOsc.frequency.setValueAtTime(1000, now + 0.1);
            deerOsc.frequency.exponentialRampToValueAtTime(600, now + 0.25);
            deerGain.gain.setValueAtTime(0.36, now);
            deerGain.gain.linearRampToValueAtTime(0, now + 0.25);
            deerOsc.start(now);
            deerOsc.stop(now + 0.25);
            break;

        case 'hog':
            const hogOsc = audioCtx.createOscillator();
            const hogGain = audioCtx.createGain();
            hogOsc.connect(hogGain);
            hogGain.connect(audioCtx.destination);
            hogOsc.type = 'sawtooth';
            hogOsc.frequency.setValueAtTime(180, now);
            hogOsc.frequency.exponentialRampToValueAtTime(120, now + 0.2);
            hogGain.gain.setValueAtTime(0.42, now);
            hogGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            hogOsc.start(now);
            hogOsc.stop(now + 0.2);
            break;

        case 'kamikaze':
            const kamOsc = audioCtx.createOscillator();
            const kamGain = audioCtx.createGain();
            kamOsc.connect(kamGain);
            kamGain.connect(audioCtx.destination);
            kamOsc.type = 'sawtooth';
            kamOsc.frequency.setValueAtTime(200, now);
            kamOsc.frequency.linearRampToValueAtTime(600, now + 1.5);
            kamGain.gain.setValueAtTime(0.4, now);
            kamGain.gain.linearRampToValueAtTime(0.01, now + 1.5);
            kamOsc.start(now);
            kamOsc.stop(now + 1.5);
            break;
    }
}

// Canvas Setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const container = document.getElementById('gameContainer');

function isLandscape() {
    return window.innerWidth > window.innerHeight;
}

function resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    if (gameRunning) updateHunterPosition();
}

function updateHunterPosition() {
    const screenWidth = canvas.width / (window.devicePixelRatio || 1);
    const screenHeight = canvas.height / (window.devicePixelRatio || 1);
    
    standX = screenWidth / 2;
    standY = isLandscape() ? screenHeight * 0.85 : screenHeight * 0.90;
    safeZoneY = screenHeight * 0.98;
}

window.addEventListener('resize', () => setTimeout(resize, 100));

// Assets
const ASSETS = {
    background: 'https://raw.githubusercontent.com/emfau88/Jadg/refs/heads/main/Hintergrund2.png',
    hunter: 'https://raw.githubusercontent.com/emfau88/Jadg/main/hunter2.png',
    duck: 'https://raw.githubusercontent.com/emfau88/Jadg/main/duck.png',
    hog: 'https://raw.githubusercontent.com/emfau88/Jadg/main/hog.png',
    deer: 'https://raw.githubusercontent.com/emfau88/Jadg/main/reh.png',
    turkey: 'https://raw.githubusercontent.com/emfau88/Jadg/main/truthahn.png'
};

const images = {};
let assetsLoaded = false;

function loadImage(name, url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            images[name] = img;
            resolve(true);
        };
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

async function loadAllAssets() {
    const results = await Promise.all(
        Object.entries(ASSETS).map(([name, url]) => loadImage(name, url))
    );
    assetsLoaded = results.every(r => r);
    return assetsLoaded;
}

// Spiel-Variablen
let gameRunning = false;
let score = 0;
let highScore = localStorage.getItem('waidmannsheil_highscore') || 0;
let ammo = 5;
let maxAmmo = 5;
let combo = 0;
let lastHitTime = 0;
let windDirection = 0;
let windStrength = 0;
let health = 5;
let gameTime = 0;
let invulnerable = 0;
let hogCounter = 0;

let currentLevel = 1;
let targetScore = 3000;
let animalsHunted = 0;
let animalsEscaped = 0;
let levelSpeedMultiplier = 1.2;
let spawnRate = 270;

let animals = [];
let particles = [];
let floatingTexts = [];

let standX = 0;
let standY = 0;
let standShake = 0;
let safeZoneY = 0;

function getAnimalYRange(type) {
    const screenHeight = canvas.height / (window.devicePixelRatio || 1);
    
    if (isLandscape()) {
        switch(type) {
            case 'duck': return [0.15, 0.30];
            case 'turkey': return [0.40, 0.60];
            case 'deer': return [0.45, 0.65];
            case 'hog': return [0.50, 0.70];
            default: return [0.40, 0.70];
        }
    } else {
        switch(type) {
            case 'duck': return [0.20, 0.35];
            case 'turkey': return [0.45, 0.65];
            case 'deer': return [0.50, 0.70];
            case 'hog': return [0.55, 0.75];
            default: return [0.45, 0.75];
        }
    }
}

const animalTypes = [
    { name: 'duck', image: 'duck', speed: 0.9, score: 100, health: 1, scale: 0.84, type: 'flying', sound: 'duck' },
    { name: 'turkey', image: 'turkey', speed: 0.7, score: 125, health: 1, scale: 0.96, type: 'ground', sound: 'turkey' },
    { name: 'deer', image: 'deer', speed: 0.6, score: 150, health: 1, scale: 1.08, type: 'ground', sound: 'deer' },
    { name: 'hog', image: 'hog', speed: 0.5, score: 250, health: 2, scale: 1.2, type: 'ground', sound: 'hog' }
];

class Animal {
    constructor() {
        const type = animalTypes[Math.floor(Math.random() * animalTypes.length)];
        this.type = type;
        this.imageName = type.image;
        this.soundType = type.sound;
        
        const screenWidth = canvas.width / (window.devicePixelRatio || 1);
        const screenHeight = canvas.height / (window.devicePixelRatio || 1);
        
        this.isKamikaze = false;
        if (type.name === 'hog') {
            hogCounter++;
            if (hogCounter % 3 === 0) this.isKamikaze = true;
        }
        
        this.x = Math.random() < 0.5 ? -120 : screenWidth + 120;
        
        const yRange = getAnimalYRange(type.name);
        const minY = screenHeight * yRange[0];
        const maxY = Math.min(screenHeight * yRange[1], safeZoneY - 120);
        this.y = minY + Math.random() * (maxY - minY);
        
        const speedMultiplier = levelSpeedMultiplier * (0.7 + Math.random() * 0.3);
        
        if (this.isKamikaze) {
            this.vx = (this.x < 0 ? 1 : -1) * type.speed * speedMultiplier;
            this.baseVx = this.vx;
            this.vy = 0;
            this.zigzagTimer = 0;
            playSound('kamikaze');
            showWarningText('⚠️ KAMIKAZE!');
        } else {
            this.vx = (this.x < 0 ? 1 : -1) * type.speed * speedMultiplier;
            this.vy = 0;
        }
        
        this.width = 84 * type.scale;
        this.height = 84 * type.scale;
        this.health = type.health;
        this.maxHealth = type.health;
        this.state = 'alive';
        this.laughTimer = 0;
        this.hitFlash = 0;
        this.hasLaughed = false;
        this.laughElement = null;
        this.indicatorElement = null;
        this.escaped = false;
    }

    update() {
        if (this.laughElement && this.state !== 'laughing') {
            this.laughElement.remove();
            this.laughElement = null;
        }

        if (this.state === 'hit') {
            this.y -= 0.8;
            this.width *= 0.97;
            this.height *= 0.97;
            if (this.indicatorElement) {
                this.indicatorElement.remove();
                this.indicatorElement = null;
            }
            if (this.width < 12) return false;
            return true;
        }

        if (this.state === 'laughing') {
            this.laughTimer--;
            this.y += Math.sin(this.laughTimer * 0.15) * 1.5;
            this.updatePosition();
            if (this.laughTimer <= 0) {
                this.state = 'alive';
                if (this.laughElement) {
                    this.laughElement.remove();
                    this.laughElement = null;
                }
            }
            return true;
        }

        if (this.isKamikaze) {
            this.zigzagTimer++;
            const zigzagOffset = Math.sin(this.zigzagTimer * 0.1) * 2;
            this.x += this.baseVx + zigzagOffset;
            const dy = standY - this.y;
            this.y += dy * 0.008;
            
            const distX = Math.abs(this.x - standX);
            const distY = Math.abs(this.y - standY);
            if (distX < 50 && distY < 50) {
                this.state = 'hit';
                health--;
                playSound('damage');
                standShake = 10;
                addFloatingText('💥 AUTSCH!', standX, standY - 100, '#e74c3c');
                if (this.indicatorElement) {
                    this.indicatorElement.remove();
                    this.indicatorElement = null;
                }
                if (health <= 0) setTimeout(() => gameOver(false), 500);
                return false;
            }
            
            const screenWidth = canvas.width / (window.devicePixelRatio || 1);
            const screenHeight = canvas.height / (window.devicePixelRatio || 1);
            if (this.x < -200 || this.x > screenWidth + 200 || this.y > screenHeight + 200) return false;
        } else {
            this.x += this.vx + windDirection * windStrength * 0.2;
            const screenWidth = canvas.width / (window.devicePixelRatio || 1);
            if ((this.vx > 0 && this.x > screenWidth + 180) || (this.vx < 0 && this.x < -180)) {
                if (!this.escaped && this.state === 'alive') {
                    this.escaped = true;
                    return 'escaped';
                }
                return false;
            }
        }

        this.updatePosition();
        return true;
    }

    updatePosition() {
        if (this.isKamikaze && this.state === 'alive' && !this.indicatorElement) {
            const indicator = document.createElement('div');
            indicator.className = 'kamikaze-indicator';
            indicator.innerHTML = '!!!';
            document.body.appendChild(indicator);
            this.indicatorElement = indicator;
        }
        
        if (this.indicatorElement) {
            const rect = canvas.getBoundingClientRect();
            const scaleX = rect.width / (canvas.width / (window.devicePixelRatio || 1));
            const scaleY = rect.height / (canvas.height / (window.devicePixelRatio || 1));
            this.indicatorElement.style.left = (rect.left + this.x * scaleX - 10) + 'px';
            this.indicatorElement.style.top = (rect.top + (this.y - this.height/2 - 30) * scaleY) + 'px';
        }
        
        if (this.laughElement) {
            const rect = canvas.getBoundingClientRect();
            const scaleX = rect.width / (canvas.width / (window.devicePixelRatio || 1));
            const scaleY = rect.height / (canvas.height / (window.devicePixelRatio || 1));
            this.laughElement.style.left = (rect.left + this.x * scaleX) + 'px';
            this.laughElement.style.top = (rect.top + (this.y - 60) * scaleY) + 'px';
        }
    }

    draw() {
        if (!images[this.imageName]) {
            ctx.fillStyle = '#888';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width/2, 0, Math.PI*2);
            ctx.fill();
            return;
        }

        ctx.save();
        ctx.translate(this.x, this.y);

        if (this.isKamikaze && this.state === 'alive') {
            ctx.filter = 'hue-rotate(-30deg) saturate(150%) brightness(120%)';
        }

        if (this.vx > 0 && !this.isKamikaze) ctx.scale(-1, 1);
        if (this.hitFlash > 0) {
            ctx.globalAlpha = 0.5 + Math.sin(this.hitFlash * 0.5) * 0.5;
            this.hitFlash--;
        }
        if (this.state === 'laughing') ctx.rotate(Math.sin(this.laughTimer * 0.2) * 0.15);

        ctx.drawImage(images[this.imageName], -this.width/2, -this.height/2, this.width, this.height);

        if (this.maxHealth > 1 && this.health > 0 && this.state !== 'laughing') {
            ctx.fillStyle = 'red';
            ctx.fillRect(-30, -this.height/2 - 15, 60, 8);
            ctx.fillStyle = '#0f0';
            ctx.fillRect(-30, -this.height/2 - 15, 60 * (this.health / this.maxHealth), 8);
        }

        ctx.restore();
    }

    checkHit(x, y) {
        const dx = x - this.x;
        const dy = y - this.y;
        return Math.sqrt(dx*dx + dy*dy) < this.width/2;
    }

    hit() {
        this.health--;
        this.hitFlash = 10;

        if (this.health <= 0) {
            this.state = 'hit';
            if (this.laughElement) {
                this.laughElement.remove();
                this.laughElement = null;
            }
            if (this.indicatorElement) {
                this.indicatorElement.remove();
                this.indicatorElement = null;
            }

            const now = Date.now();
            if (now - lastHitTime < 3000) {
                combo++;
                if (combo >= 2) {
                    playSound('combo');
                    showCombo(combo);
                }
            } else {
                combo = 1;
            }
            lastHitTime = now;

            const points = this.type.score * combo;
            score += points;
            animalsHunted++;

            addFloatingText(`+${points}${combo > 1 ? ' 🔥x'+combo : ''}`, this.x, this.y - 50, '#FFD700');
            createParticles(this.x, this.y, 12, '#FFD700');
            playSound(this.soundType, 0.05);
            playSound('hit');
            standShake = 4;
            checkLevelProgress();
        } else {
            addFloatingText('💥 Nochmal!', this.x, this.y - 50, '#FFA500');
            playSound(this.soundType, 0.05);
            playSound('hit');
        }
    }

    laugh() {
        if (this.state === 'alive' && !this.hasLaughed) {
            this.state = 'laughing';
            this.laughTimer = 150;
            this.hasLaughed = true;
            combo = 0;

            const laughDiv = document.createElement('div');
            laughDiv.className = 'laugh-overlay';
            laughDiv.innerHTML = '😂<br>HÖHÖ!';
            document.body.appendChild(laughDiv);
            this.laughElement = laughDiv;
            this.updatePosition();

            playSound('laugh');
            setTimeout(() => playSound('laugh'), 400);
        }
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = (Math.random() - 0.5) * 6;
        this.life = 35;
        this.color = color;
        this.size = Math.random() * 5 + 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.15;
        this.life--;
        this.size *= 0.97;
        return this.life > 0;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.life / 35;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class FloatingText {
    constructor(text, x, y, color) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.vy = -1.2;
        this.life = 70;
        this.color = color;
    }

    update() {
        this.y += this.vy;
        this.life--;
        return this.life > 0;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = Math.min(1, this.life / 25);
        ctx.font = 'bold 20px "Segoe UI", sans-serif';
        ctx.fillStyle = this.color;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.textAlign = 'center';
        ctx.strokeText(this.text, this.x, this.y);
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}

function createParticles(x, y, count, color) {
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function addFloatingText(text, x, y, color) {
    floatingTexts.push(new FloatingText(text, x, y, color));
}

function showWarningText(text) {
    const warning = document.createElement('div');
    warning.className = 'warning-text';
    warning.innerHTML = text;
    document.body.appendChild(warning);
    setTimeout(() => warning.remove(), 2000);
}

function showEscapedWarning() {
    const warning = document.createElement('div');
    warning.className = 'escaped-warning';
    warning.innerHTML = '💔 Entkommen!';
    document.body.appendChild(warning);
    setTimeout(() => warning.remove(), 1000);
}

function showCombo(count) {
    const display = document.getElementById('comboDisplay');
    document.getElementById('comboNum').textContent = count;
    display.classList.add('show');
    setTimeout(() => display.classList.remove('show'), 1000);
}

function updateWind() {
    if (gameTime % 500 === 0) {
        windDirection = Math.floor(Math.random() * 3) - 1;
        windStrength = Math.random() * 1 + 0.3;
        const arrows = ['⬅️', '⬆️', '➡️'];
        document.getElementById('windBox').textContent = arrows[windDirection + 1];
    }
}

function drawBackground() {
    if (images.background) {
        const bg = images.background;
        const screenWidth = canvas.width / (window.devicePixelRatio || 1);
        const screenHeight = canvas.height / (window.devicePixelRatio || 1);
        const scale = Math.max(screenWidth / bg.width, screenHeight / bg.height);
        const w = bg.width * scale;
        const h = bg.height * scale;
        const x = (screenWidth - w) / 2;
        const y = (screenHeight - h) / 2;
        ctx.drawImage(bg, x, y, w, h);
    }
}

function drawHunter() {
    if (!images.hunter) {
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(standX, standY - 48, 36, 0, Math.PI*2);
        ctx.fill();
        return;
    }

    let shakeX = 0, shakeY = 0;
    if (standShake > 0) {
        shakeX = (Math.random() - 0.5) * standShake;
        shakeY = (Math.random() - 0.5) * standShake;
        standShake *= 0.9;
        if (standShake < 0.5) standShake = 0;
    }

    ctx.save();
    ctx.translate(standX + shakeX, standY + shakeY);
    if (invulnerable > 0 && Math.floor(invulnerable / 10) % 2 === 0) ctx.globalAlpha = 0.5;

    const hunter = images.hunter;
    const screenWidth = canvas.width / (window.devicePixelRatio || 1);
    const screenHeight = canvas.height / (window.devicePixelRatio || 1);
    
    let scale = isLandscape() 
        ? Math.min(screenWidth * 0.4 / hunter.width, screenHeight * 0.4 / hunter.height)
        : Math.min(screenWidth * 0.54 / hunter.width, screenHeight * 0.48 / hunter.height);
    
    const w = hunter.width * scale;
    const h = hunter.height * scale;

    ctx.drawImage(hunter, -w/2, -h, w, h);
    ctx.restore();
}

function showMuzzleFlash() {
    const flash = document.createElement('div');
    flash.className = 'muzzle-flash';
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const scaleX = rect.width / (canvas.width / dpr);
    const scaleY = rect.height / (canvas.height / dpr);
    
    const flashY = isLandscape() ? standY - 100 : standY - 120;
    flash.style.left = (rect.left + (standX + 20) * scaleX) + 'px';
    flash.style.top = (rect.top + flashY * scaleY) + 'px';
    
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 100);
}

function checkLevelProgress() {
    if (score >= targetScore) levelComplete();
}

function levelComplete() {
    gameRunning = false;
    playSound('levelUp');
    document.querySelectorAll('.laugh-overlay, .kamikaze-indicator').forEach(el => el.remove());
    
    document.getElementById('completedLevel').textContent = currentLevel;
    document.getElementById('levelScore').textContent = score;
    document.getElementById('animalsHunted').textContent = animalsHunted;
    document.getElementById('livesLeft').textContent = health;
    
    document.getElementById('levelCompleteScreen').classList.remove('hidden');
    document.getElementById('gameUI').style.display = 'none';
}

function nextLevel() {
    currentLevel++;
    levelSpeedMultiplier += 0.2;
    spawnRate = Math.max(150, spawnRate - 30);
    targetScore += 2500 + (currentLevel * 500);
    
    animals = [];
    particles = [];
    floatingTexts = [];
    combo = 0;
    ammo = maxAmmo;
    windDirection = 0;
    animalsHunted = 0;
    animalsEscaped = 0;
    health = Math.min(5, health + 1);
    
    document.getElementById('levelCompleteScreen').classList.add('hidden');
    document.getElementById('gameUI').style.display = 'flex';
    document.getElementById('levelNum').textContent = currentLevel;
    document.getElementById('targetScore').textContent = targetScore;
    
    updateHunterPosition();
    gameRunning = true;
    gameTime = 0;
    gameLoop();
}

function gameOver(won = false) {
    gameRunning = false;
    document.querySelectorAll('.laugh-overlay, .kamikaze-indicator').forEach(el => el.remove());

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('waidmannsheil_highscore', highScore);
    }
    
    const title = document.getElementById('gameOverTitle');
    title.innerHTML = won ? '🏆<br>Meister<br>jäger!' : '🍺<br>O\'zapft<br>is!';
    
    document.getElementById('finalScore').textContent = score;
    document.getElementById('highScore').textContent = highScore;
    document.getElementById('finalLevel').textContent = currentLevel;
    document.getElementById('finalAnimals').textContent = animalsHunted;
    document.getElementById('gameOverStats').style.display = 'block';
    
    document.getElementById('gameOverScreen').classList.remove('hidden');
    document.getElementById('gameUI').style.display = 'none';
    
    playSound('gameOver');
}

function updateAmmoDisplay() {
    for (let i = 1; i <= 5; i++) {
        const bullet = document.getElementById('bullet' + i);
        if (bullet) bullet.classList.toggle('active', i <= ammo);
    }
}

function gameLoop() {
    if (!gameRunning) return;

    gameTime++;
    if (invulnerable > 0) invulnerable--;

    const screenWidth = canvas.width / (window.devicePixelRatio || 1);
    const screenHeight = canvas.height / (window.devicePixelRatio || 1);

    ctx.clearRect(0, 0, screenWidth, screenHeight);
    drawBackground();
    updateWind();

    if (gameTime % spawnRate === 0 && animals.length < 2 + Math.floor(currentLevel / 2)) {
        animals.push(new Animal());
    }

    animals = animals.filter(animal => {
        const result = animal.update();
        
        if (result === 'escaped') {
            health--;
            animalsEscaped++;
            showEscapedWarning();
            playSound('damage');
            addFloatingText('💔 Entkommen!', animal.x, animal.y - 50, '#e74c3c');
            if (health <= 0) setTimeout(() => gameOver(false), 500);
            return false;
        }
        
        if (result === true) animal.draw();
        return result === true;
    });

    particles = particles.filter(p => {
        const alive = p.update();
        if (alive) p.draw();
        return alive;
    });

    floatingTexts = floatingTexts.filter(t => {
        const alive = t.update();
        if (alive) t.draw();
        return alive;
    });

    drawHunter();
    document.getElementById('score').textContent = score;
    updateAmmoDisplay();

    let hearts = '';
    for (let i = 0; i < 5; i++) hearts += i < health ? '❤️' : '🖤';
    document.getElementById('healthBar').textContent = hearts;

    const reloadBtn = document.getElementById('reloadBtn');
    if (ammo >= maxAmmo) {
        reloadBtn.classList.add('disabled');
        reloadBtn.innerHTML = '✅ VOLL';
    } else {
        reloadBtn.classList.remove('disabled');
        reloadBtn.innerHTML = '🔄 LADEN';
    }

    requestAnimationFrame(gameLoop);
}

function shoot(x, y) {
    if (!gameRunning) return;

    if (ammo > 0) {
        ammo--;
        playSound('shoot');
        showMuzzleFlash();
        createParticles(standX, standY - 48, 8, '#FFA500');

        let hit = false;
        for (let animal of animals) {
            if (animal.checkHit(x, y)) {
                animal.hit();
                hit = true;
                break;
            }
        }

        if (!hit) {
            let nearby = animals.filter(a => {
                const dist = Math.abs(a.x - x) + Math.abs(a.y - y);
                return dist < 216 && a.state === 'alive';
            });

            if (nearby.length > 0) {
                nearby.sort((a, b) => {
                    const distA = Math.abs(a.x - x) + Math.abs(a.y - y);
                    const distB = Math.abs(b.x - x) + Math.abs(b.y - y);
                    return distA - distB;
                });
                nearby[0].laugh();

                for (let i = 1; i < Math.min(nearby.length, 2); i++) {
                    setTimeout(() => {
                        if (nearby[i] && nearby[i].state === 'alive') nearby[i].laugh();
                    }, i * 400);
                }
            }
            addFloatingText('💨 Wuusch!', x, y, '#fff');
        }
        standShake = 3;
    } else {
        playSound('empty');
        addFloatingText('🔫 LEER!', x, y, '#e74c3c');
    }
}

function reload() {
    if (ammo < maxAmmo) {
        ammo = maxAmmo;
        playSound('reload');
        addFloatingText('🔄 NACHGELADEN!', standX, standY - 144, '#2ecc71');
    }
}

async function startGame(resetLevel = true) {
    const loadPromise = loadAllAssets();
    const timeoutPromise = new Promise(r => setTimeout(() => r(false), 5000));

    try {
        await Promise.race([loadPromise, timeoutPromise]);
    } catch(e) {
        console.log('Asset loading issue, continuing anyway');
    }

    initAudio();

    if (resetLevel) {
        score = 0;
        currentLevel = 1;
        targetScore = 3000;
        levelSpeedMultiplier = 1.2;
        spawnRate = 270;
        health = 5;
        hogCounter = 0;
    }
    
    ammo = 5;
    combo = 0;
    gameTime = 0;
    invulnerable = 0;
    animals = [];
    particles = [];
    floatingTexts = [];
    windDirection = 0;
    animalsHunted = 0;
    animalsEscaped = 0;

    document.querySelectorAll('.laugh-overlay, .kamikaze-indicator').forEach(el => el.remove());
    document.getElementById('menuScreen').classList.add('hidden');
    document.getElementById('gameOverScreen').classList.add('hidden');
    document.getElementById('levelCompleteScreen').classList.add('hidden');
    document.getElementById('gameUI').style.display = 'flex';
    
    document.getElementById('levelNum').textContent = currentLevel;
    document.getElementById('targetScore').textContent = targetScore;

    updateHunterPosition();
    gameRunning = true;
    gameLoop();
}

// Event Listener
document.getElementById('startBtn').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    startGame(true);
});

document.getElementById('restartBtn').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    startGame(true);
});

document.getElementById('nextLevelBtn').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    nextLevel();
});

document.getElementById('reloadBtn').addEventListener('click', (e) => {
    e.preventDefault();
    reload();
});

document.getElementById('soundToggle').addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    document.getElementById('soundToggle').textContent = soundEnabled ? '🔊' : '🔇';
});

canvas.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = (e.clientX - rect.left);
    const y = (e.clientY - rect.top);

    if (y > (canvas.height / dpr) * 0.98) return;
    shoot(x, y);
});

document.addEventListener('touchmove', (e) => {
    if (e.scale !== 1) e.preventDefault();
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
}, false);

// Initial resize
resize();
