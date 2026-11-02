import { seedLabel } from './seed.js';
import { ENTITY_INFO } from './entities.js';
const pad = n => String(n).padStart(2, '0');
const wait = ms => new Promise(r => setTimeout(r, ms));

export class UI {
    constructor(isMobile) {
        this.isMobile = isMobile;
        this.started = false;
        if (isMobile) document.body.classList.add('mobile');
        this.menu = document.getElementById('menu');
        this.eyebrow = document.getElementById('menu-eyebrow');
        this.startBtn = document.getElementById('start-btn');
        this.fullscreenBtn = document.getElementById('fullscreen-btn');
        const fullscreenTarget = document.documentElement;
        const requestFullscreen = fullscreenTarget.requestFullscreen || fullscreenTarget.webkitRequestFullscreen;
        const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen;
        const isFullscreen = () => !!(document.fullscreenElement || document.webkitFullscreenElement);
        if (!requestFullscreen || !exitFullscreen) {
            this.fullscreenBtn.hidden = true;
        } else {
            const syncFullscreen = () => {
                const active = isFullscreen();
                this.fullscreenBtn.textContent = active ? 'Exit Fullscreen' : 'Fullscreen';
                this.fullscreenBtn.setAttribute('aria-pressed', String(active));
            };
            this.fullscreenBtn.addEventListener('click', async () => {
                try {
                    if (isFullscreen()) await exitFullscreen.call(document);
                    else await requestFullscreen.call(fullscreenTarget);
                } catch {
                    this.fullscreenBtn.textContent = 'Unavailable';
                    window.setTimeout(syncFullscreen, 1400);
                }
            });
            document.addEventListener('fullscreenchange', syncFullscreen);
            document.addEventListener('webkitfullscreenchange', syncFullscreen);
            syncFullscreen();
        }
        this.paused = false;
        if (isMobile) {
            this.pauseBtn = document.getElementById('pause-btn');
            this.pauseBtn.addEventListener('click', () => { this.showMenu(true); this.pauseCb?.(); });
        }
        this.toast = document.getElementById('toast');
        this.glitch = document.getElementById('glitch');
        this.firstWorld = true;
    }
    onStart(cb) {
        this.startBtn.addEventListener('click', () => {
            const first = !this.started;
            this.started = true;
            if (this.isMobile) this.hideMenu();
            cb();
            if (first) this.showToast();
        });
    }
    setLevels(names) {
        this.levelNames = [...names];
        this.levelsEl = document.getElementById('levels');
        this.levelsEl.innerHTML = names.map((n, i) =>
            '<button class="level" data-i="' + i + '"><span class="li">' + pad(i) + '</span>' + n + '</button>').join('');
        this.mainCard = this.menu.querySelector('.menu-card:not(#level-screen)');
        this.levelScreen = document.getElementById('level-screen');
        document.getElementById('levels-btn').addEventListener('click', () => this.showLevels(true));
        document.getElementById('levels-back').addEventListener('click', () => this.showLevels(false));
        this.entityScreen = document.getElementById('entity-screen');
        this.entityList = document.getElementById('entity-list');
        document.getElementById('entity-log-btn').addEventListener('click', () => {
            this.renderEntityLog(this.getEncountered());
            this.showEntityLog(true);
        });
        document.getElementById('entities-back').addEventListener('click', () => this.showEntityLog(false));
        // on phones, tapping the level tag opens the level select
        document.getElementById('world-tag').addEventListener('click', () => { if (this.started) { this.showMenu(true); this.showLevels(true); } });
        this.markLevel();
    }
    onPick(cb) {
        this.levelsEl.addEventListener('click', (e) => {
            const b = e.target.closest('.level');
            if (!b) return;
            this.started = true;
            this.eyebrow.textContent = 'Paused';
            this.startBtn.textContent = 'Resume';
            if (this.isMobile) this.hideMenu();
            this.showLevels(false);
            cb(Number(b.dataset.i));
        });
    }
    setEntityLog(getEncountered) {
        this.getEncountered = getEncountered;
    }
    renderEntityLog(encountered) {
        this.entityList.innerHTML = Object.entries(ENTITY_INFO).map(([kind, entity]) => encountered.has(kind)
            ? '<article class="entity-entry"><div class="entity-name">' + entity.name + '</div><div class="entity-description">' + entity.description + '</div></article>'
            : '<article class="entity-entry unknown"><span class="entity-question">?</span><div><div class="entity-name">???</div><div class="entity-description">Not encountered</div></div></article>').join('');
    }
    showEntityLog(on) {
        this.entityScreen.hidden = !on;
        this.levelScreen.hidden = true;
        this.mainCard.hidden = on;
    }
    showLevels(on) {
        this.levelScreen.hidden = !on;
        this.entityScreen.hidden = true;
        this.mainCard.hidden = on;
    }
    renameLevel(i, name) {
        (this.levelNames ??= [])[i] = name;
        const b = this.levelsEl?.querySelector('.level[data-i="' + i + '"]');
        if (b) b.innerHTML = '<span class="li">' + pad(i) + '</span>' + name;
    }
    markLevel() {
        if (!this.levelsEl) return;
        this.levelsEl.querySelectorAll('.level').forEach(b => b.classList.toggle('current', Number(b.dataset.i) === this.index));
    }
    onPause(cb) {
        this.pauseCb = cb;
    }
    hideMenu() {
        this.menu.classList.add('hidden');
        document.body.classList.add('playing');
        document.body.classList.remove('paused');
        this.paused = false;
    }
    showMenu(paused) {
        if (paused) {
            this.eyebrow.textContent = 'Paused';
            this.startBtn.textContent = 'Resume';
            this.paused = true;
            document.body.classList.add('paused');
        }
        this.showLevels(false);
        this.menu.classList.remove('hidden');
    }
    setWorld(name, index, seed) {
        this.name = name; this.index = index; this.seed = seedLabel(seed);
        document.getElementById('world-index').textContent = pad(index);
        document.getElementById('world-seed').textContent = this.seed;
        document.getElementById('world-name').textContent = name;
        this.markLevel();
        if (this.started) this.showToast();
    }
    showToast() {
        this.toast.querySelector('.toast-index').textContent = 'LEVEL ' + pad(this.index) + ' · ' + this.seed;
        this.toast.querySelector('.toast-name').textContent = this.name;
        this.toast.classList.remove('show');
        void this.toast.offsetWidth;
        this.toast.classList.add('show');
    }
    levelName(i) { return this.levelNames?.[i]; }
    onMultiplayer(cb) {
        this.mpBtn = document.getElementById('mp-toggle');
        this.playersEl = document.getElementById('players');
        this.mpBtn.addEventListener('click', () => cb(this.mpBtn.getAttribute('aria-pressed') !== 'true'));
    }
    onPlayer(cb) {
        this.playersEl.addEventListener('click', (e) => {
            const b = e.target.closest('.player');
            if (b) cb(b.dataset.id);
        });
    }
    setPlayers(on, list) {
        if (!this.mpBtn) return;
        this.mpBtn.setAttribute('aria-pressed', String(on));
        this.mpBtn.textContent = on ? 'Multiplayer · On' : 'Multiplayer · Off';
        this.playersEl.hidden = !on;
        if (!on) return;
        const esc = s => String(s).replace(/[&<>"']/g, c => '&#' + c.charCodeAt(0) + ';');
        const html = list.length ? list.map(p =>
            '<button class="player' + (p.here ? ' here' : '') + '" data-id="' + esc(p.id) + '">' +
            '<img src="https://images.websim.com/avatar/' + encodeURIComponent(p.username) + '" alt="">' +
            '<span class="pn">@' + esc(p.username) + '</span>' +
            '<span class="pl">' + pad(p.world) + ' ' + esc(p.level) + ' · ' + seedLabel(p.seed) + '</span></button>').join('')
            : '<div class="no-players">Nobody else is exploring</div>';
        // only touch the DOM when something changed, so a click is never cut in half
        if (html !== this.playersHtml) { this.playersHtml = html; this.playersEl.innerHTML = html; }
    }
    onQuality(cb) {
        this.qualityEl = document.getElementById('quality');
        this.qualityEl.addEventListener('click', (e) => {
            const b = e.target.closest('.q');
            if (b) cb(b.dataset.q);
        });
    }
    markQuality(q) {
        this.qualityEl?.querySelectorAll('.q').forEach(b => b.classList.toggle('on', b.dataset.q === q));
    }
    async glitchIn() { this.glitch.classList.add('on'); await wait(420); }
    async glitchOut() { await wait(180); this.glitch.classList.remove('on'); await wait(200); }
}
