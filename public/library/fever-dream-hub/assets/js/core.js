/* ============================================================
   FEVER DREAM HUB — core
   State, persistence, proof records, export/import, agent API.
   ============================================================ */
(function (global) {
  'use strict';

  var FD = global.FD || (global.FD = {});

  /* ---------------------------------------------------------- constants */
  var LS_KEY = 'feverdream.production.v1';
  var LS_SHOTS = 'feverdream.shots.v1';
  var STATE_VERSION = 1;

  /* ---------------------------------------------------------- utilities */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
  function pad3(n) { return String(n).padStart(3, '0'); }
  function nowIso() { return new Date().toISOString(); }
  function fmtTime(iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    if (isNaN(d)) return '—';
    return d.toLocaleString(undefined, { year: 'numeric', month: 'short', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
  function fmtAgo(iso) {
    if (!iso) return '';
    var s = (Date.now() - new Date(iso)) / 1000;
    if (s < 60) return Math.floor(s) + 's ago';
    if (s < 3600) return Math.floor(s / 60) + 'm ago';
    if (s < 86400) return Math.floor(s / 3600) + 'h ago';
    return Math.floor(s / 86400) + 'd ago';
  }

  /* FNV-1a 32-bit — a compact fingerprint for each proof record */
  function checksum(obj) {
    var str = JSON.stringify(obj);
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
    }
    return ('0000000' + h.toString(16)).slice(-8);
  }

  /* ---------------------------------------------------------- clip data */
  var VARIANT_META = {
    clips228:      { label: '228-Clip Conjoined',  file: 'clips-clips228.js',      canonical: true,  note: 'Flagship — 57:00, both tracks interleaved beat-for-beat.' },
    bible_boy:     { label: 'Bible · Boy Solo',    file: 'clips-bible_boy.js',     note: 'Master Bible Part 2 — Boy solo with full beat sheet.' },
    bible_girl:    { label: 'Bible · Girl Solo',   file: 'clips-bible_girl.js',    note: 'Master Bible Part 1 — Girl solo, prose format.' },
    bible_conjoined: { label: 'Bible · Conjoined', file: 'clips-bible_conjoined.js', note: 'Master Bible Part 3 — unified conjoined running.' },
    plan:          { label: 'Master Plan',         file: 'clips-plan.js',          note: '8-sequence 114-gen build with full beat sheet.' },
    boy:           { label: 'Boy Solo',            file: 'clips-boy.js',           note: 'Track A standalone script.' },
    girl:          { label: 'Girl Solo',           file: 'clips-girl.js',          note: 'Track B standalone script.' },
    conjoined:     { label: 'Conjoined Running',   file: 'clips-conjoined.js',    note: 'Parallel intercut, Track A / Track B pairs.' },
    original:      { label: 'Original Plan',       file: 'clips-original.js',      note: 'First draft — the nameless man, six acts.' }
  };

  var VARIANT_LOADED = {};
  var variantCache = {};

  function loadVariant(key) {
    if (VARIANT_LOADED[key]) return Promise.resolve(variantCache[key]);
    var meta = VARIANT_META[key];
    if (!meta) return Promise.reject(new Error('unknown variant ' + key));
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = 'assets/js/data/' + meta.file;
      s.onload = function () {
        VARIANT_LOADED[key] = true;
        variantCache[key] = (global.FD_VARIANTS && global.FD_VARIANTS[key]) || [];
        resolve(variantCache[key]);
      };
      s.onerror = function () { reject(new Error('failed to load ' + meta.file)); };
      document.head.appendChild(s);
    });
  }

  function getVariant(key) { return variantCache[key] || []; }
  function clipById(key, id) {
    var arr = getVariant(key);
    for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i];
    return null;
  }

  /* ---------------------------------------------------------- state */
  function blankState() {
    return {
      version: STATE_VERSION,
      createdAt: nowIso(),
      updatedAt: nowIso(),
      activeVariant: 'clips228',
      tasks: {},          // id -> proof record
      ledger: [],         // append-only event log
      settings: { shotMode: 'url' }
    };
  }

  var state = blankState();
  var listeners = [];

  function load() {
    var raw = null;
    try { raw = global.localStorage.getItem(LS_KEY); } catch (e) { raw = null; }
    if (raw) {
      try {
        var parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          state = Object.assign(blankState(), parsed);
          state.tasks = parsed.tasks || {};
          state.ledger = parsed.ledger || [];
          state.settings = Object.assign({ shotMode: 'url' }, parsed.settings || {});
        }
      } catch (e) { state = blankState(); }
    }
    return state;
  }

  var saveTimer = null;
  function save(immediate) {
    clearTimeout(saveTimer);
    var doIt = function () {
      state.updatedAt = nowIso();
      try {
        global.localStorage.setItem(LS_KEY, JSON.stringify(state));
      } catch (e) {
        FD.toast('Could not save to localStorage — storage quota exceeded or unavailable.', true);
      }
      emit();
    };
    if (immediate) doIt(); else saveTimer = setTimeout(doIt, 120);
  }

  function emit() { listeners.forEach(function (f) { try { f(state); } catch (e) { console.error(e); } }); }
  function subscribe(fn) { listeners.push(fn); return function () { listeners = listeners.filter(function (f) { return f !== fn; }); }; }

  /* ---------------------------------------------------------- ledger */
  function logEvent(type, taskId, payload) {
    state.ledger.push(Object.assign({
      ts: nowIso(), type: type, taskId: taskId || null
    }, payload || {}));
    if (state.ledger.length > 2000) state.ledger = state.ledger.slice(-2000);
  }

  /* ---------------------------------------------------------- tasks */
  /* Task ids are stable strings:
       phase:<slug>        pre-production & delivery steps
       clip:<variant>:<clipId>
       check:<slug>        continuity review questions
  */
  function taskIdForClip(variant, clipId) { return 'clip:' + variant + ':' + clipId; }

  function blankTask(id, title, sub, group) {
    return {
      id: id, title: title, sub: sub || '', group: group || '',
      done: false, doneAt: null, model: '', modelVersion: '', promptUsed: '',
      docUrl: '', shotUrl: '', notes: '', shotId: '', shotBytes: 0,
      checksum: '', updatedAt: nowIso()
    };
  }

  function getTask(id) {
    var rec = state.tasks[id];
    if (!rec) return null;
    return rec;
  }

  function taskMeta(id) {
    /* derive title/sub/group from the id without needing the record */
    var lore = FD.lore();
    if (id.indexOf('phase:') === 0) {
      var slug = id.slice(6);
      var ph = (lore.phases || []).filter(function (p) { return p.id === slug; })[0];
      if (ph) return { title: ph.title, sub: ph.sub, group: ph.group };
      return { title: slug, sub: '', group: 'Phases' };
    }
    if (id.indexOf('check:') === 0) {
      var cs = id.slice(6);
      var item = (lore.checks || []).filter(function (c) { return c.id === cs; })[0];
      if (item) return { title: item.title, sub: item.sub, group: 'Continuity review' };
      return { title: cs, sub: '', group: 'Continuity review' };
    }
    if (id.indexOf('clip:') === 0) {
      var parts = id.split(':');
      var variant = parts[1], clipId = parts.slice(2).join(':');
      var c = clipById(variant, clipId);
      if (c) {
        return {
          title: (c.beat || c.prompt.slice(0, 60)) ,
          sub: c.timecode + ' · ' + (c.track || 'both') + ' · ' + (c.setting || c.actName || ''),
          group: c.act ? ('Act ' + c.act + ' — ' + (c.actName || '')) : 'Clips'
        };
      }
      return { title: clipId, sub: '', group: 'Clips' };
    }
    return { title: id, sub: '', group: 'Other' };
  }

  function ensureTask(id) {
    if (!state.tasks[id]) {
      var m = taskMeta(id);
      state.tasks[id] = blankTask(id, m.title, m.sub, m.group);
    } else {
      var m2 = taskMeta(id);
      state.tasks[id].title = m2.title;
      state.tasks[id].sub = m2.sub;
      state.tasks[id].group = m2.group;
    }
    return state.tasks[id];
  }

  /* Complete a task with proof of work. */
  function complete(id, proof) {
    proof = proof || {};
    var t = ensureTask(id);
    var wasDone = t.done;
    t.done = true;
    t.doneAt = t.doneAt || nowIso();
    t.updatedAt = nowIso();
    if (proof.model !== undefined) t.model = proof.model || '';
    if (proof.modelVersion !== undefined) t.modelVersion = proof.modelVersion || '';
    if (proof.promptUsed !== undefined) t.promptUsed = proof.promptUsed || '';
    if (proof.docUrl !== undefined) t.docUrl = proof.docUrl || '';
    if (proof.shotUrl !== undefined) t.shotUrl = proof.shotUrl || '';
    if (proof.notes !== undefined) t.notes = proof.notes || '';
    if (proof.shotId !== undefined) t.shotId = proof.shotId || '';
    if (proof.shotBytes !== undefined) t.shotBytes = proof.shotBytes || 0;
    t.checksum = checksum({ id: t.id, model: t.model, modelVersion: t.modelVersion,
      promptUsed: t.promptUsed, docUrl: t.docUrl, shotUrl: t.shotUrl, shotId: t.shotId, doneAt: t.doneAt });
    logEvent(wasDone ? 'updated' : 'completed', id, {
      model: t.model, modelVersion: t.modelVersion, docUrl: t.docUrl, shotUrl: t.shotUrl,
      checksum: t.checksum, summary: t.title
    });
    save();
    return t;
  }

  function uncomplete(id) {
    var t = state.tasks[id];
    if (!t) return null;
    t.done = false; t.doneAt = null; t.checksum = '';
    t.updatedAt = nowIso();
    logEvent('reopened', id, { summary: t.title });
    save();
    return t;
  }

  function updateTask(id, patch) {
    var t = ensureTask(id);
    Object.keys(patch || {}).forEach(function (k) { if (k !== 'id') t[k] = patch[k]; });
    t.updatedAt = nowIso();
    if (t.done) {
      t.checksum = checksum({ id: t.id, model: t.model, modelVersion: t.modelVersion,
        promptUsed: t.promptUsed, docUrl: t.docUrl, shotUrl: t.shotUrl, shotId: t.shotId, doneAt: t.doneAt });
    }
    save();
    return t;
  }

  /* ---------------------------------------------------------- screenshots */
  /* Preferred home: IndexedDB (binary). Fallback: localStorage data URLs. */
  var idbPromise = null;
  function idb() {
    if (idbPromise) return idbPromise;
    idbPromise = new Promise(function (resolve, reject) {
      if (!global.indexedDB) return reject(new Error('no indexeddb'));
      var req = global.indexedDB.open('feverdream-shots', 1);
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains('shots')) db.createObjectStore('shots');
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
    return idbPromise;
  }

  function putShot(id, dataUrl) {
    return idb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction('shots', 'readwrite');
        tx.objectStore('shots').put(dataUrl, id);
        tx.oncomplete = function () { resolve(true); };
        tx.onerror = function () { reject(tx.error); };
      });
    }).catch(function () {
      // fallback: localStorage
      try {
        var all = JSON.parse(global.localStorage.getItem(LS_SHOTS) || '{}');
        all[id] = dataUrl;
        global.localStorage.setItem(LS_SHOTS, JSON.stringify(all));
        return true;
      } catch (e) {
        throw new Error('Could not store screenshot: localStorage quota exceeded. Use a screenshot URL instead.');
      }
    });
  }

  function getShot(id) {
    return idb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction('shots', 'readonly');
        var r = tx.objectStore('shots').get(id);
        r.onsuccess = function () { resolve(r.result || null); };
        r.onerror = function () { reject(r.error); };
      });
    }).catch(function () {
      var all = JSON.parse(global.localStorage.getItem(LS_SHOTS) || '{}');
      return all[id] || null;
    });
  }

  function deleteShot(id) {
    return idb().then(function (db) {
      return new Promise(function (resolve) {
        var tx = db.transaction('shots', 'readwrite');
        tx.objectStore('shots').delete(id);
        tx.oncomplete = function () { resolve(true); };
        tx.onerror = function () { resolve(false); };
      });
    }).catch(function () {
      var all = JSON.parse(global.localStorage.getItem(LS_SHOTS) || '{}');
      delete all[id];
      try { global.localStorage.setItem(LS_SHOTS, JSON.stringify(all)); } catch (e) {}
      return false;
    });
  }

  /* Compress an image file to a compact data URL so proofs stay portable. */
  function compressImage(file, maxW, quality) {
    maxW = maxW || 900; quality = quality || 0.72;
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onerror = function () { reject(new Error('read failed')); };
      reader.onload = function () {
        var img = new Image();
        img.onerror = function () { reject(new Error('decode failed')); };
        img.onload = function () {
          var w = img.width, h = img.height;
          var scale = Math.min(1, maxW / w);
          var cw = Math.round(w * scale), ch = Math.round(h * scale);
          var canvas = document.createElement('canvas');
          canvas.width = cw; canvas.height = ch;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, cw, ch);
          var url = canvas.toDataURL('image/jpeg', quality);
          resolve({ dataUrl: url, bytes: url.length, w: cw, h: ch });
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  /* ---------------------------------------------------------- task list */
  function buildTaskList(variant) {
    variant = variant || state.activeVariant;
    var lore = FD.lore();
    var out = [];

    (lore.phases || []).forEach(function (p) {
      out.push(Object.assign(blankTask('phase:' + p.id, p.title, p.sub, p.group), {
        key: 'phase:' + p.id, kind: 'phase', order: p.order == null ? 50 : p.order
      }));
    });

    (lore.checks || []).forEach(function (c) {
      out.push(Object.assign(blankTask('check:' + c.id, c.title, c.sub, 'Continuity review'), {
        key: 'check:' + c.id, kind: 'check', order: 900
      }));
    });

    var clips = getVariant(variant);
    clips.forEach(function (c) {
      var id = taskIdForClip(variant, c.id);
      var t = blankTask(id, c.beat || c.prompt.slice(0, 60), '', c.act ? ('Act ' + c.act) : 'Clips');
      t.key = id; t.kind = 'clip'; t.order = 500 + c.n; t.clip = c;
      out.push(t);
    });

    out.forEach(function (t) {
      var rec = state.tasks[t.key];
      if (rec) {
        t.done = rec.done; t.doneAt = rec.doneAt; t.model = rec.model;
        t.modelVersion = rec.modelVersion; t.promptUsed = rec.promptUsed;
        t.docUrl = rec.docUrl; t.shotUrl = rec.shotUrl; t.notes = rec.notes;
        t.shotId = rec.shotId; t.shotBytes = rec.shotBytes; t.checksum = rec.checksum;
        t.updatedAt = rec.updatedAt;
      }
    });
    return out;
  }

  function taskStats(list) {
    var done = 0, total = list.length;
    list.forEach(function (t) { if (t.done) done++; });
    return { done: done, total: total, open: total - done,
      pct: total ? Math.round((done / total) * 100) : 0 };
  }

  function nextTasks(limit, variant) {
    var list = buildTaskList(variant).filter(function (t) { return !t.done; });
    list.sort(function (a, b) { return a.order - b.order; });
    return limit ? list.slice(0, limit) : list;
  }

  /* ---------------------------------------------------------- export */
  function exportState() {
    return {
      project: 'Fever Dream',
      exportedAt: nowIso(),
      stateVersion: STATE_VERSION,
      activeVariant: state.activeVariant,
      tasks: state.tasks,
      ledger: state.ledger
    };
  }

  function exportMarkdown() {
    var lore = FD.lore();
    var list = buildTaskList();
    var st = taskStats(list);
    var L = [];
    L.push('# FEVER DREAM — Production Ledger');
    L.push('');
    L.push('- Exported: ' + fmtTime(nowIso()));
    L.push('- Active checklist variant: **' + (VARIANT_META[state.activeVariant] || {}).label + '**');
    L.push('- Progress: **' + st.done + ' / ' + st.total + '** (' + st.pct + '%)');
    L.push('');
    L.push('## Completed work');
    L.push('');
    L.push('| Task | Model | Version | Documentation | Screenshot | Finished | Checksum |');
    L.push('|---|---|---|---|---|---|---|');
    list.filter(function (t) { return t.done; }).forEach(function (t) {
      L.push('| ' + [t.title.replace(/\|/g, '\\|'), t.model || '—', t.modelVersion || '—',
        t.docUrl ? '[' + (t.docUrl.length > 40 ? t.docUrl.slice(0, 40) + '…' : t.docUrl) + '](' + t.docUrl + ')' : '—',
        t.shotUrl ? '[' + (t.shotUrl.length > 40 ? t.shotUrl.slice(0, 40) + '…' : t.shotUrl) + '](' + t.shotUrl + ')' : (t.shotId ? 'stored locally' : '—'),
        fmtTime(t.doneAt), t.checksum || '—'].join(' | ') + ' |');
    });
    L.push('');
    L.push('## Open items');
    L.push('');
    list.filter(function (t) { return !t.done; }).forEach(function (t) {
      L.push('- [ ] **' + t.title + '** — ' + (t.sub || '') + ' _(' + t.group + ')_');
    });
    L.push('');
    L.push('## Event ledger');
    L.push('');
    state.ledger.slice().reverse().forEach(function (e) {
      L.push('- `' + e.ts + '` **' + e.type + '** ' + (e.taskId || '') +
        (e.model ? ' — model: ' + e.model : '') + (e.checksum ? ' — `' + e.checksum + '`' : ''));
    });
    return L.join('\n');
  }

  function exportCSV() {
    var list = buildTaskList();
    var rows = [['task_id', 'title', 'group', 'done', 'model', 'model_version', 'doc_url', 'screenshot_url', 'notes', 'done_at', 'checksum']];
    list.forEach(function (t) {
      rows.push([t.key, t.title, t.group, t.done ? 'yes' : 'no', t.model, t.modelVersion,
        t.docUrl, t.shotUrl, t.notes, t.doneAt || '', t.checksum || '']);
    });
    return rows.map(function (r) {
      return r.map(function (c) {
        c = String(c == null ? '' : c);
        return /[",\n]/.test(c) ? '"' + c.replace(/"/g, '""') + '"' : c;
      }).join(',');
    }).join('\n');
  }

  function importState(obj, merge) {
    if (!obj || typeof obj !== 'object') throw new Error('Not a valid export file.');
    if (merge) {
      var incoming = obj.tasks || {};
      Object.keys(incoming).forEach(function (k) {
        if (!state.tasks[k]) state.tasks[k] = incoming[k];
        else if (incoming[k].done && !state.tasks[k].done) state.tasks[k] = incoming[k];
      });
      if (obj.ledger) state.ledger = state.ledger.concat(obj.ledger);
    } else {
      state.tasks = obj.tasks || {};
      state.ledger = obj.ledger || [];
      if (obj.activeVariant) state.activeVariant = obj.activeVariant;
    }
    logEvent('imported', null, { summary: merge ? 'Merged external state' : 'Replaced state from file' });
    save(true);
  }

  function resetAll() {
    state = blankState();
    try { global.localStorage.removeItem(LS_KEY); } catch (e) {}
    try { global.localStorage.removeItem(LS_SHOTS); } catch (e) {}
    idb().then(function (db) {
      try { db.transaction('shots', 'readwrite').objectStore('shots').clear(); } catch (e) {}
    }).catch(function () {});
    logEvent('reset', null, { summary: 'All state cleared' });
    save(true);
  }

  /* ---------------------------------------------------------- verify */
  /* Re-derive every proof checksum and cross-check it against the ledger.
     A record that was edited after it was written will not match. */
  function verify() {
    var res = { checked: 0, ok: 0, tampered: [], missing: [], orphaned: [], ledgerEntries: 0 };
    var ledgerByTask = {};
    (state.ledger || []).forEach(function (e) {
      if (!e.taskId) return;
      res.ledgerEntries++;
      if (e.type === 'completed' || e.type === 'updated') {
        ledgerByTask[e.taskId] = e;
      }
    });

    Object.keys(state.tasks || {}).forEach(function (id) {
      var t = state.tasks[id];
      if (!t.done) return;
      res.checked++;
      var expect = checksum({ id: t.id, model: t.model, modelVersion: t.modelVersion,
        promptUsed: t.promptUsed, docUrl: t.docUrl, shotUrl: t.shotUrl, shotId: t.shotId, doneAt: t.doneAt });
      if (expect !== t.checksum) { res.tampered.push({ id: id, expected: expect, found: t.checksum }); return; }
      var ev = ledgerByTask[id];
      if (!ev) { res.missing.push(id); return; }
      if (ev.checksum && ev.checksum !== t.checksum) { res.tampered.push({ id: id, expected: ev.checksum, found: t.checksum }); return; }
      res.ok++;
    });

    /* ledger entries with no surviving task record */
    Object.keys(ledgerByTask).forEach(function (id) {
      if (!state.tasks[id] || !state.tasks[id].done) res.orphaned.push(id);
    });

    res.verified = res.ok === res.checked && res.tampered.length === 0 && res.missing.length === 0;
    return res;
  }

  /* ---------------------------------------------------------- misc */
  var toastTimer = null;
  function toast(msg, isErr) {
    var t = $('#toast');
    if (!t) return;
    t.textContent = msg;
    t.className = 'toast' + (isErr ? ' err' : '');
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, isErr ? 5200 : 2600);
  }

  function lore() { return global.FD_LORE || { characters: [], relics: [], directives: [], documents: [] }; }

  function download(filename, content, mime) {
    var blob = new Blob([content], { type: mime || 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 200);
  }

  /* ---------------------------------------------------------- public API */
  FD.esc = esc; FD.$ = $; FD.$$ = $$; FD.el = el; FD.clamp = clamp; FD.pad3 = pad3;
  FD.nowIso = nowIso; FD.fmtTime = fmtTime; FD.fmtAgo = fmtAgo; FD.checksum = checksum;
  FD.toast = toast; FD.lore = lore; FD.download = download;

  FD.VARIANT_META = VARIANT_META;
  FD.loadVariant = loadVariant;
  FD.getVariant = getVariant;
  FD.clipById = clipById;
  FD.variantCache = variantCache;

  FD.getState = function () { return state; };
  FD.reload = load;
  FD.save = save;
  FD.subscribe = subscribe;
  FD.emit = emit;
  FD.logEvent = logEvent;

  FD.getTask = getTask;
  FD.ensureTask = ensureTask;
  FD.complete = complete;
  FD.uncomplete = uncomplete;
  FD.updateTask = updateTask;
  FD.buildTaskList = buildTaskList;
  FD.taskStats = taskStats;
  FD.nextTasks = nextTasks;
  FD.taskIdForClip = taskIdForClip;

  FD.putShot = putShot;
  FD.getShot = getShot;
  FD.deleteShot = deleteShot;
  FD.compressImage = compressImage;

  FD.exportState = exportState;
  FD.exportMarkdown = exportMarkdown;
  FD.exportCSV = exportCSV;
  FD.importState = importState;
  FD.resetAll = resetAll;
  FD.verify = verify;

  FD.LS_KEY = LS_KEY;
  FD.LS_SHOTS = LS_SHOTS;

})(window);
