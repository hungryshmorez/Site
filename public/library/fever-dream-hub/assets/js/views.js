/* ============================================================
   FEVER DREAM HUB — views
   ============================================================ */
(function (global) {
  'use strict';

  var FD = global.FD;
  var esc = FD.esc, $ = FD.$, $$ = FD.$$;
  var V = global.FDViews = {};

  /* ============================================================ START */
  V.start = function (root) {
    var lore = FD.lore();
    var variant = FD.getState().activeVariant;
    var list = FD.buildTaskList(variant);
    var stats = FD.taskStats(list);
    var next = FD.nextTasks(5, variant);

    var html = '';

    html += '<div class="hero">';
    html += '<h1>FEVER DREAM</h1>';
    html += '<div class="lede">' + esc(lore.premise.logline) + '</div>';
    html += '<div style="margin-top:10px">';
    html += '<span class="tag tag-ochre">57:00 · 228 clips × 15s</span>';
    html += '<span class="tag tag-purple">Dual conjoined</span>';
    html += '<span class="tag">1990s dark-surrealist practical effects</span>';
    html += '<span class="tag">Seedance prompt format</span>';
    html += '</div>';
    html += '<div class="stat-row">';
    html += tile(228, 'Clips in the flagship cut');
    html += tile(114 + 114, 'Solo generations');
    html += tile((lore.documents || []).length, 'Source PDFs indexed');
    html += tile(stats.done, 'Tasks completed');
    html += tile(stats.open, 'Tasks open');
    html += '</div>';
    html += '</div>';

    /* --- what to do next --- */
    html += '<h2>How an agent works this</h2>';
    html += '<p class="lede">This site is the single source of context for the film. Nothing is scattered '
      + 'across PDFs any more — every generation, every continuity rule and every directive is here, '
      + 'and the checklist remembers what has been done.</p>';

    var steps = [
      ['Read the Master Bible', 'Lock the premise, the two continuity locks, the carried relics and the five '
        + 'surgical directives before generating anything. <code>Master Bible →</code>'],
      ['Lock your references', 'Generate the Boy and Girl reference sheets, the palette board, the figment '
        + 'sheets and the relic images. These are the first tasks on the checklist — everything downstream inherits their look.'],
      ['Take the next clip', 'The checklist hands you the next unchecked clip in sequence, with the source prompt '
        + 'ready to copy. Clip it, send it, and record the proof.'],
      ['Record the proof', 'Model, version, prompt you actually sent, documentation link, screenshot. '
        + 'A checksum fingerprint is written so the record can be verified later.'],
      ['Lint before you send', 'The Prompt Lint panel applies the Master Plan\'s banned-word and sensory '
        + 'directives to your prompt. Fix the failures before spending a generation.'],
      ['Review the ledger', 'The event log and the export give you a provable record of the whole production. '
        + 'Export JSON, Markdown or CSV and commit it next to the clips.']
    ];
    html += '<div class="panel"><div class="steps">';
    steps.forEach(function (s) {
      html += '<div class="step"><h4>' + esc(s[0]) + '</h4><p>' + s[1] + '</p></div>';
    });
    html += '</div></div>';

    /* --- next up --- */
    html += '<h2>Next up</h2>';
    if (!next.length) {
      html += '<div class="panel"><p style="margin:0">Everything on the checklist for <strong>' +
        esc((FD.VARIANT_META[variant] || {}).label) + '</strong> is complete. Export the ledger and ship it.</p></div>';
    } else {
      html += '<div class="panel"><div class="tablewrap"><table><thead><tr>' +
        '<th>Task</th><th>Group</th><th>Detail</th><th></th></tr></thead><tbody>';
      next.forEach(function (t) {
        html += '<tr><td><strong>' + esc(t.title) + '</strong><br><span class="small mono">' + esc(t.key) + '</span></td>' +
          '<td>' + esc(t.group) + '</td>' +
          '<td class="muted">' + esc((t.sub || '').slice(0, 130)) + '</td>' +
          '<td><button class="btn btn-tiny" data-goto="' + esc(t.key) + '">Open</button></td></tr>';
      });
      html += '</tbody></table></div></div>';
    }

    /* --- corpus --- */
    html += '<h2>The corpus</h2>';
    html += '<p class="lede">Seven production PDFs, fully parsed. Every generation in every script is '
      + 'searchable and copyable — including the two scripts that only exist as prose inside the Bible.</p>';
    html += '<div class="tablewrap"><table><thead><tr><th>Document</th><th>Role</th><th class="num">Pages</th>' +
      '<th class="num">Size</th><th class="num">Generations</th></tr></thead><tbody>';
    (lore.documents || []).forEach(function (d) {
      html += '<tr><td><strong>' + esc(d.title) + '</strong><br><span class="small">' + esc(d.pdf) + '</span></td>' +
        '<td><span class="tag ' + (d.canonical ? 'tag-ochre' : '') + '">' + esc(d.role) + '</span><br>' +
        '<span class="small">' + esc(d.blurb) + '</span></td>' +
        '<td class="num">' + d.pages + '</td>' +
        '<td class="num">' + Math.round(d.bytes / 1024) + ' KB</td>' +
        '<td class="num">' + d.parsed + '</td></tr>';
    });
    html += '</tbody></table></div>';

    html += '<div class="note red"><b>One source defect to know about.</b> The Girl\'s solo script ' +
      '(and the original plan it descends from) mislabels its generation numbers: entries 031 and 091 are ' +
      'each labelled twice, and 068 is skipped entirely. That is a defect in the source PDF, not in this site. ' +
      'Every affected entry is flagged in the data and keeps its true sequence position, so the 114 clips ' +
      'here line up 1:1 with the 114 clips in the source.</div>';

    root.innerHTML = html;

    $$('[data-goto]').forEach(function (b) {
      b.addEventListener('click', function () {
        var key = b.getAttribute('data-goto');
        global.FDChecklist.selected = key;
        global.FDNav('checklist');
      });
    });
  };

  function tile(n, l) {
    return '<div class="stat"><div class="n">' + n + '</div><div class="l">' + esc(l) + '</div></div>';
  }

  /* ============================================================ MASTER BIBLE */
  V.bible = function (root) {
    var lore = FD.lore();
    var html = '';

    html += '<h1>Master Bible</h1>';
    html += '<p class="lede">' + esc(lore.premise.logline) + '</p>';

    html += '<div class="panel"><div class="panel-h"><span class="t">The conjoining</span>' +
      '<span class="tag tag-purple">Trauma Bay 4</span></div>' +
      '<p style="margin:0">' + esc(lore.premise.conjoin) + '</p></div>';

    html += '<div class="panel"><div class="panel-h"><span class="t">Visual language — the lock</span></div>' +
      '<p style="margin:0">' + esc(lore.premise.style) + '</p></div>';

    /* characters */
    html += '<h2>Contacts &amp; continuity locks</h2>';
    html += '<p class="lede">The four recurring presences. Every generation prompt inherits these descriptions, ' +
      'so an agent never has to guess what a character looks like between clips.</p>';
    html += '<div class="grid g2">';
    (lore.characters || []).forEach(function (c) {
      html += '<div class="panel" style="margin:0">';
      html += '<div class="panel-h"><span class="t" style="font-family:var(--serif);font-size:17px;letter-spacing:.04em;text-transform:none;color:var(--ochre-2)">' + esc(c.name) + '</span></div>';
      html += '<p class="small" style="color:var(--purple-2);margin:0 0 8px">' + esc(c.role) + '</p>';
      html += '<dl class="kv">';
      html += '<dt>Continuity</dt><dd>' + esc(c.continuity) + '</dd>';
      html += '<dt>Arc</dt><dd>' + esc(c.arc) + '</dd>';
      if (c.relic) html += '<dt>Carries</dt><dd>' + esc(c.relic) + '</dd>';
      html += '<dt>Appears in</dt><dd>' + (c.films || []).map(function (f) {
        return esc((FD.VARIANT_META[f] || {}).label || f);
      }).join(' · ') + '</dd>';
      html += '</dl></div>';
    });
    html += '</div>';

    /* relics */
    html += '<h2>Carried objects</h2>';
    html += '<p class="lede">Relics are continuity hazards: the prompt lint checks that each one appears ' +
      'from the generation it is acquired, and not before.</p>';
    html += '<div class="grid g3">';
    (lore.relics || []).forEach(function (r) {
      html += '<div class="panel" style="margin:0">';
      html += '<div class="panel-h"><span class="t" style="color:var(--ink)">' + esc(r.name) + '</span></div>';
      html += '<p class="small" style="margin:0 0 6px">' + esc(r.detail) + '</p>';
      html += '<dl class="kv" style="margin:0">';
      html += '<dt>First seen</dt><dd>' + esc(r.first) + '</dd>';
      html += '<dt>Arc</dt><dd>' + esc(r.arc) + '</dd>';
      html += '</dl></div>';
    });
    html += '</div>';

    /* directives */
    html += '<h2>Surgical directives</h2>';
    html += '<p class="lede">Master Plan, Part 2. These are hard rules from the source, and the Prompt Lint ' +
      'panel enforces the first two automatically.</p>';
    (lore.directives || []).forEach(function (d) {
      html += '<div class="panel">';
      html += '<div class="panel-h"><span class="t">' + esc(d.head) + ' — ' + esc(d.title) + '</span>' +
        '<span class="tag tag-ochre">' + esc(d.kind) + '</span></div>';
      html += '<p style="margin:0 0 8px">' + esc(d.body) + '</p>';
      if (d.kind === 'banned-words') {
        html += '<div>' + d.words.map(function (w) {
          return '<span class="banword">' + esc(w) + '</span>';
        }).join(' ') + '</div>';
      } else if (d.kind === 'checklist') {
        html += '<ul style="margin:0;padding-left:18px;font-size:12px;color:var(--ink-dim)">' +
          d.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
      } else if (d.kind === 'protocol') {
        html += '<div class="tablewrap"><table><thead><tr><th>Biome</th><th>Failing system</th></tr></thead><tbody>' +
          d.items.map(function (i) {
            return '<tr><td>' + esc(i[0]) + '</td><td class="muted">' + esc(i[1]) + '</td></tr>';
          }).join('') + '</tbody></table></div>';
      }
      html += '</div>';
    });

    /* structures */
    html += '<h2>Structure</h2>';
    html += '<h3>228-clip conjoined — production roadmap</h3>';
    html += '<div class="panel"><div class="tablewrap"><table><thead><tr><th>Act</th><th>Clips</th><th>Timecode</th>' +
      '<th>Cross-cutting architecture</th></tr></thead><tbody>';
    (lore.acts228 || []).forEach(function (a) {
      html += '<tr><td><strong>' + esc(a.n) + '</strong> · ' + esc(a.name) + '</td><td class="mono">' + esc(a.clips) +
        '</td><td class="mono">' + esc(a.ts) + '</td><td class="muted">' + esc(a.note) + '</td></tr>';
    });
    html += '</tbody></table></div></div>';

    html += '<h3>Master Plan — 8-sequence structure</h3>';
    html += '<div class="panel"><div class="tablewrap"><table><thead><tr><th class="num">Seq</th><th>Generations</th>' +
      '<th>Timecode</th><th>Biome</th><th>Physiological state</th><th>Figment</th></tr></thead><tbody>';
    (lore.seqs_plan || []).forEach(function (s) {
      html += '<tr><td class="num">' + s.n + '</td><td class="mono">' + esc(s.gen) + '</td><td class="mono">' +
        esc(s.ts) + '</td><td>' + esc(s.biome) + '</td><td class="muted">' + esc(s.phys) + '</td>' +
        '<td class="muted">' + esc(s.figment) + '</td></tr>';
    });
    html += '</tbody></table></div></div>';

    /* corpus lint report */
    html += '<h3>Corpus lint — do the source prompts obey their own directives?</h3>';
    var report = FD.lintVariant('clips228');
    var allHits = [];
    Object.keys(FD.VARIANT_META).forEach(function (k) {
      var r = FD.lintVariant(k);
      allHits = allHits.concat(r.hits.map(function (h) {
        return { variant: k, id: h.id, n: h.n, words: h.words };
      }));
    });
    html += '<div class="note' + (allHits.length ? ' red' : ' purple') + '">Scanned <strong>' +
      (lore.documents || []).reduce(function (a, d) { return a + d.parsed; }, 0) +
      '</strong> prompts across every script against Directive 1 (AI-tell ban) and Directive 2 (sensory filter). ' +
      (allHits.length
        ? '<strong>' + allHits.length + '</strong> prompt' + (allHits.length === 1 ? '' : 's') + ' in the source material trip the ban.'
        : 'None of them trip the ban — the corpus is clean against its own rules.') + '</div>';
    if (allHits.length) {
      html += '<div class="tablewrap"><table><thead><tr><th>Clip</th><th>Script</th><th>Banned words</th></tr></thead><tbody>';
      allHits.slice(0, 60).forEach(function (h) {
        html += '<tr><td class="mono">' + esc(h.id) + '</td><td>' +
          esc((FD.VARIANT_META[h.variant] || {}).label || h.variant) + '</td><td>' +
          h.words.map(function (w) { return '<span class="banword">' + esc(w) + '</span>'; }).join(' ') + '</td></tr>';
      });
      html += '</tbody></table></div>';
    }

    root.innerHTML = html;
  };

  /* ============================================================ CLIP BOARD */
  var clipState = { variant: null, act: 'all', track: 'all', q: '' };

  V.clips = function (root) {
    var variant = FD.getState().activeVariant;
    if (clipState.variant !== variant) { clipState.variant = variant; clipState.act = 'all'; clipState.track = 'all'; clipState.q = ''; }
    var meta = FD.VARIANT_META[variant];
    var clips = FD.getVariant(variant);
    var state = FD.getState();

    var html = '';
    html += '<h1>Clip Board</h1>';
    html += '<p class="lede">' + esc(meta.note) + ' <span class="small">— ' + clips.length +
      ' generations, every field below is parsed straight out of the source PDF.</span></p>';

    /* toolbar */
    html += '<div class="toolbar">';
    html += '<select id="cb-variant" style="width:auto;min-width:300px">';
    Object.keys(FD.VARIANT_META).forEach(function (k) {
      var m = FD.VARIANT_META[k];
      html += '<option value="' + k + '"' + (k === variant ? ' selected' : '') + '>' + esc(m.label) + ' — ' + esc(m.note) + '</option>';
    });
    html += '</select>';
    html += '<input type="text" class="grow" id="cb-q" placeholder="Search prompts, beats, settings, actions…" value="' + esc(clipState.q) + '">';
    html += '<button class="btn" id="cb-open">Open next unchecked</button>';
    html += '</div>';

    /* filter chips */
    html += '<div class="chipbar" id="cb-chips"></div>';
    html += '<div id="cb-results"></div>';

    root.innerHTML = html;

    $('#cb-variant').addEventListener('change', function () {
      state.activeVariant = this.value;
      FD.save(true);
      V.clips(root);
    });
    $('#cb-q').addEventListener('input', function () {
      clipState.q = this.value;
      renderClips(root);
    });
    $('#cb-open').addEventListener('click', function () {
      var next = FD.nextTasks(1, variant).filter(function (t) { return t.kind === 'clip'; })[0];
      if (!next) { FD.toast('No open clip tasks for this script.'); return; }
      global.FDChecklist.selected = next.key;
      global.FDNav('checklist');
    });

    renderClips(root);
  };

  function renderClips(root) {
    var variant = FD.getState().activeVariant;
    var clips = FD.getVariant(variant);
    var lore = FD.lore();
    var q = clipState.q.trim().toLowerCase();

    /* act / track chips */
    var acts = [];
    clips.forEach(function (c) {
      var a = c.act || (lore.acts228 || []).length ? c.act : null;
      if (c.act && acts.indexOf(c.act) < 0) acts.push(c.act);
    });
    acts.sort();
    var chips = '<span class="chip" style="cursor:default;border-style:dashed">act:</span>';
    chips += '<button class="chip' + (clipState.act === 'all' ? ' on' : '') + '" data-act="all">all</button>';
    acts.forEach(function (a) {
      var meta = (lore.acts228 || []).filter(function (x) { return x.n === a; })[0];
      chips += '<button class="chip' + (clipState.act === a ? ' on' : '') + '" data-act="' + esc(a) + '">' +
        esc(a) + (meta ? ' · ' + esc(meta.name) : '') + '</button>';
    });
    if (acts.length) {
      chips += '<span class="chip" style="cursor:default;border-style:dashed;margin-left:10px">track:</span>';
      ['all', 'boy', 'girl', 'both'].forEach(function (t) {
        chips += '<button class="chip' + (clipState.track === t ? ' on' : '') + '" data-track="' + t + '">' + t + '</button>';
      });
    }
    $('#cb-chips').innerHTML = chips;
    $$('#cb-chips [data-act]').forEach(function (b) {
      b.addEventListener('click', function () { clipState.act = b.getAttribute('data-act'); renderClips(root); });
    });
    $$('#cb-chips [data-track]').forEach(function (b) {
      b.addEventListener('click', function () { clipState.track = b.getAttribute('data-track'); renderClips(root); });
    });

    var shown = clips.filter(function (c) {
      if (clipState.act !== 'all' && String(c.act) !== String(clipState.act)) return false;
      if (clipState.track !== 'all' && c.track !== clipState.track) return false;
      if (!q) return true;
      var hay = [c.beat, c.prompt, c.setting, c.camera, c.action, c.audio, c.subtext, c.trackA, c.trackB].join(' ').toLowerCase();
      return hay.indexOf(q) >= 0;
    });

    var html = '<p class="small" style="margin:0 0 10px">' + shown.length + ' of ' + clips.length + ' generations shown</p>';
    html += '<div class="clipgrid">';
    shown.forEach(function (c) {
      var key = FD.taskIdForClip(variant, c.id);
      var rec = state_task(key);
      html += '<div class="clipcard' + (rec && rec.done ? ' done' : '') + '" data-clip="' + esc(c.id) + '">';
      html += '<span class="trackbar t-' + esc(c.track || 'both') + '"></span>';
      html += '<div class="num">' + esc(variant.toUpperCase()) + ' ' + FD.pad3(c.n) +
        (c.act ? ' · ACT ' + esc(c.act) : '') + ' · ' + esc(c.timecode) + '</div>';
      html += '<div class="beat">' + esc(c.beat || c.prompt.slice(0, 70)) + '</div>';
      html += '<div class="meta">' + esc((c.track || 'both').toUpperCase()) + ' · ' +
        esc(c.setting || c.actName || '') + '</div>';
      if (c.srcRef) {
        html += '<div class="meta" style="color:var(--purple-2)">↳ girl solo #' + c.srcRef.n +
          ' (seq ' + c.srcRef.seq + ')</div>';
      }
      html += '</div>';
    });
    html += '</div>';
    $('#cb-results').innerHTML = html;

    $$('#cb-results .clipcard').forEach(function (n) {
      n.addEventListener('click', function () { openClip(n.getAttribute('data-clip'), variant); });
    });
  }

  function state_task(key) { return FD.getTask(key); }

  /* --- clip drawer --- */
  function openClip(clipId, variant) {
    var c = FD.clipById(variant, clipId);
    if (!c) return;
    var scrim = $('#drawer-scrim'), drawer = $('#drawer'), body = $('#drawer-body');
    var key = FD.taskIdForClip(variant, c.id);
    var rec = FD.getTask(key);

    var html = '';
    html += '<h2>' + esc(c.beat || 'Generation ' + c.n) + '</h2>';
    html += '<div class="pid mono" style="color:var(--ochre);font-size:10px;letter-spacing:.14em;margin-bottom:12px">' +
      esc(c.id.toUpperCase()) + ' · ' + esc(c.timecode) + ' · ' + esc(c.track || 'both').toUpperCase() +
      (c.act ? ' · ACT ' + esc(c.act) + ' — ' + esc(c.actName || '') : '') + '</div>';

    if (c.anomaly) {
      html += '<div class="note red"><b>Source anomaly.</b> ' + esc(c.anomaly) + '</div>';
    }

    html += '<div class="toolbar">';
    html += '<button class="btn btn-primary btn-tiny" id="d-done">' + (rec && rec.done ? '✓ Completed — open record' : 'Mark complete') + '</button>';
    html += '<button class="btn btn-tiny" id="d-copy">Copy prompt</button>';
    html += '<button class="btn btn-tiny" id="d-json">Copy JSON</button>';
    html += '<button class="btn btn-tiny" id="d-lint">Lint prompt</button>';
    html += '</div>';

    html += '<div class="fieldbox"><div class="ft">Visual Generation Prompt (Cinematic / Seedance)</div>' +
      '<div class="fv mono">' + esc(c.prompt) + '</div></div>';

    var fields = [
      ['Sequence / Scene Beat', c.beat],
      ['Setting / Biome', c.setting],
      ['Camera & Optics', c.camera],
      ['Action & Physical Timing (15s)', c.action],
      ['Audio Design & Soundscape', c.audio],
      ['Psychological / Somatic Subtext', c.subtext],
      ['Narrative Beat', c.narrative],
      ['Dual Cinematic Structure', c.structure],
      ['Track A — The Boy', c.trackA],
      ['Track B — The Girl', c.trackB],
      ['Acoustic Bridge & ICU Echo', c.bridge],
      ['Continuity Anchor', c.anchor]
    ];
    fields.forEach(function (f) {
      if (!f[1]) return;
      html += '<div class="fieldbox"><div class="ft">' + esc(f[0]) + '</div><div class="fv' +
        (f[0].indexOf('Prompt') >= 0 ? ' mono' : '') + '">' + esc(f[1]) + '</div></div>';
    });

    html += '<div class="panel"><div class="panel-h"><span class="t">Provenance</span></div><dl class="kv" style="margin:0">';
    html += '<dt>Source PDF</dt><dd>' + esc(sourceName(c.source)) + '</dd>';
    html += '<dt>Script</dt><dd>' + esc((FD.VARIANT_META[variant] || {}).label || variant) + '</dd>';
    html += '<dt>Generation</dt><dd>' + c.n + ' of ' + (c.total || '—') + '</dd>';
    html += '<dt>Duration</dt><dd>' + ((c.end && c.start) ? (c.end - c.start) + 's' : '—') + '</dd>';
    if (c.srcRef) {
      html += '<dt>Cross-ref</dt><dd>Girl solo script, generation <strong>' + c.srcRef.n +
        '</strong> (true sequence position ' + c.srcRef.seq +
        '). The flagship prints this as “Memory Generation ' + c.srcRef.label +
        ' Adaptation”, which is the Girl script\'s own mislabelled number — use the sequence position, ' +
        'not the printed label.</dd>';
    }
    html += '<dt>Task id</dt><dd class="mono">' + esc(key) + '</dd>';
    html += '</dl></div>';

    body.innerHTML = html;
    scrim.hidden = false; drawer.hidden = false;

    $('#d-copy').addEventListener('click', function () { FD.copy(c.prompt); FD.toast('Prompt copied.'); });
    $('#d-json').addEventListener('click', function () { FD.copy(JSON.stringify(c, null, 2)); FD.toast('Clip JSON copied.'); });
    $('#d-lint').addEventListener('click', function () {
      var res = FD.lint(c.prompt, { variant: c.variant, clipNumber: c.n });
      FD.toast(res.verdict === 'pass' ? 'This source prompt passes every directive.' :
        res.score.fail + ' failure(s), ' + res.score.warn + ' warning(s).', res.verdict === 'fail');
    });
    $('#d-done').addEventListener('click', function () {
      global.FDChecklist.selected = key;
      closeDrawer();
      global.FDNav('checklist');
    });
  }

  function sourceName(id) {
    var lore = FD.lore();
    var d = (lore.documents || []).filter(function (x) { return x.id === id; })[0];
    return d ? d.title : id;
  }

  function closeDrawer() {
    $('#drawer-scrim').hidden = true;
    $('#drawer').hidden = true;
  }
  V.closeDrawer = closeDrawer;

  /* ============================================================ LINT */
  V.lint = function (root) {
    var lore = FD.lore();
    var html = '';
    html += '<h1>Prompt Lint</h1>';
    html += '<p class="lede">The Master Plan\'s Part 2 directives, turned into live checks. Paste a prompt ' +
      'before you spend a generation. It also checks the carried relics for the Girl track, so an object ' +
      'never teleports into the character\'s hands.</p>';

    html += '<div class="grid g2" style="align-items:start">';
    html += '<div class="panel"><div class="panel-h"><span class="t">Prompt</span>' +
      '<span class="small" id="lint-count">0 chars</span></div>' +
      '<textarea id="lint-text" rows="16" placeholder="Paste or type a generation prompt here…"></textarea>' +
      '<div class="field-row" style="margin-top:10px">' +
      '<label class="fld"><span class="lab">Script</span><select id="lint-variant">' +
      Object.keys(FD.VARIANT_META).map(function (k) {
        return '<option value="' + k + '">' + esc(FD.VARIANT_META[k].label) + '</option>';
      }).join('') + '</select></label>' +
      '<label class="fld"><span class="lab">Generation number</span><input type="text" id="lint-num" placeholder="e.g. 45"></label>' +
      '</div>' +
      '<button class="btn btn-tiny" id="lint-clear">Clear</button> ' +
      '<button class="btn btn-tiny" id="lint-sample">Load a sample source prompt</button>' +
      '</div>';

    html += '<div class="panel"><div class="panel-h"><span class="t">Verdict</span>' +
      '<span id="lint-verdict" class="tag">—</span></div>' +
      '<div id="lint-out"><p class="muted" style="margin:0">Nothing to lint yet.</p></div></div>';
    html += '</div>';

    html += '<h2>What is checked</h2>';
    html += '<div class="grid g2">';
    html += '<div class="panel"><div class="panel-h"><span class="t">Directive 1 — AI-Tell Absolute Ban</span></div>' +
      '<p class="small">Zero occurrences of:</p><div>' +
      FD.AI_TELL.map(function (w) { return '<span class="banword">' + esc(w) + '</span>'; }).join(' ') + '</div></div>';
    html += '<div class="panel"><div class="panel-h"><span class="t">Directive 2 — Sensory Filter Stripping</span></div>' +
      '<p class="small">Eradicate passive perception verbs:</p><div>' +
      FD.SENSORY.map(function (w) { return '<span class="banword">' + esc(w) + '</span>'; }).join(' ') + '</div></div>';
    html += '<div class="panel"><div class="panel-h"><span class="t">Directive 3 — Messy Biological Realism</span></div>' +
      '<p class="small">Every action beat should carry physical clumsiness, somatic exhaustion, coughing spasms, ' +
      'torn cuticles, slipping on greasy tile and dragging numb limbs.</p></div>';
    html += '<div class="panel"><div class="panel-h"><span class="t">Directive 5 — Strict Generation Cadence</span></div>' +
      '<p class="small">Exactly 15 seconds per generation: a discrete cinematic take with a locked focal ' +
      'length, clear optical physics, spatial blocking and an audio cue.</p></div>';
    html += '</div>';

    root.innerHTML = html;

    var ta = $('#lint-text');
    function run() {
      var text = ta.value;
      $('#lint-count').textContent = text.length + ' chars';
      var num = parseInt($('#lint-num').value, 10);
      var res = FD.lint(text, { variant: $('#lint-variant').value, clipNumber: isNaN(num) ? null : num });
      var v = $('#lint-verdict');
      v.textContent = res.verdict.toUpperCase() + ' · ' + res.score.pass + ' pass / ' + res.score.warn +
        ' warn / ' + res.score.fail + ' fail';
      v.className = 'tag ' + (res.verdict === 'pass' ? 'tag-green' : res.verdict === 'warn' ? 'tag-ochre' : 'tag-red');
      var out = $('#lint-out');
      if (!text.trim()) { out.innerHTML = '<p class="muted" style="margin:0">Nothing to lint yet.</p>'; return; }
      out.innerHTML = res.issues.map(function (i) {
        var icon = i.level === 'fail' ? '✕' : i.level === 'warn' ? '!' : '✓';
        return '<div class="lintrow ' + i.level + '"><div class="ic">' + icon + '</div><div class="msg">' +
          '<b>' + esc(i.title) + '</b> — ' + esc(i.detail) +
          (i.hint ? '<span class="hint">' + esc(i.hint) + '</span>' : '') + '</div></div>';
      }).join('');
    }
    ta.addEventListener('input', run);
    $('#lint-num').addEventListener('input', run);
    $('#lint-variant').addEventListener('change', run);
    $('#lint-clear').addEventListener('click', function () { ta.value = ''; run(); });
    $('#lint-sample').addEventListener('click', function () {
      var c = FD.getVariant('clips228')[44];
      if (!c) return;
      ta.value = c.prompt;
      $('#lint-num').value = c.n;
      run();
    });
  };

  /* ============================================================ MODELS */
  V.models = function (root) {
    var lore = FD.lore();
    var html = '';
    html += '<h1>Models &amp; Documentation</h1>';
    html += '<p class="lede">Every prompt in the corpus is labelled <strong>“Visual Generation Prompt ' +
      '(Cinematic / Seedance)”</strong>, so Seedance is the family these scripts were written for. ' +
      'The others are real alternatives, each with a link to its own documentation — attach that link to ' +
      'the checklist record and the proof is verifiable by anyone.</p>';

    html += '<div class="grid g2">';
    (lore.models || []).forEach(function (m) {
      html += '<div class="mcard' + (m.primary ? ' primary' : '') + '">';
      html += '<div class="mh"><span class="n">' + esc(m.name) + '</span><span class="badge">' + esc(m.vendor) + '</span>' +
        (m.primary ? '<span class="badge">★ ' + esc(m.badge) + '</span>' : '') + '</div>';
      html += '<div class="small mono" style="color:var(--purple-2)">' + esc(m.duration) + '</div>';
      html += '<p>' + esc(m.why) + '</p>';
      html += '<div class="small" style="letter-spacing:.13em;text-transform:uppercase;color:var(--muted);margin-top:10px">Documentation</div>';
      html += '<ul class="docs">';
      m.docs.forEach(function (d) {
        html += '<li><a href="' + esc(d[1]) + '" target="_blank" rel="noopener">' + esc(d[0]) + '</a></li>';
      });
      html += '</ul></div>';
    });
    html += '</div>';

    html += '<div class="note purple"><b>One key, many models.</b> Runway Dev proxies Seedance 2.5, MiniMax H3, ' +
      'Kling and Veo behind a single API, and reports which model actually served the request in the response ' +
      'metadata. If you want one credential for the whole production, that is the simplest route — and its ' +
      'model catalogue is a good cross-check when you record a model against a clip.</div>';

    html += '<div class="note"><b>Cadence fit.</b> This film needs exactly 15 seconds per generation. ' +
      'Seedance 2.0/2.5 and MiniMax H3 both reach 15s natively. Veo tops out at 8s and Hailuo at 10s, so ' +
      'those need either a longer-run stitch or an extension pass — record that in the notes field when you ' +
      'check the clip off, because the proof is more useful when it explains the workaround.</div>';

    root.innerHTML = html;
  };

  /* ============================================================ SOURCES */
  V.sources = function (root) {
    var lore = FD.lore();
    var html = '';
    html += '<h1>Sources</h1>';
    html += '<p class="lede">Seven PDFs, parsed in full. Nothing here is a summary — every generation, ' +
      'every field, and the closing critique checklists are all present in the Clip Board.</p>';

    html += '<div class="tablewrap"><table><thead><tr><th>Document</th><th>File</th><th>Role</th>' +
      '<th class="num">Pages</th><th class="num">Size</th><th class="num">Generations</th><th></th></tr></thead><tbody>';
    (lore.documents || []).forEach(function (d) {
      html += '<tr><td><strong>' + esc(d.title) + '</strong></td>' +
        '<td class="mono small"><a href="source-pdfs/' + encodeURIComponent(d.pdf) + '" download style="color:var(--ochre-2)">' +
        esc(d.pdf) + '</a></td>' +
        '<td><span class="tag ' + (d.canonical ? 'tag-ochre' : '') + '">' + esc(d.role) + '</span></td>' +
        '<td class="num">' + d.pages + '</td>' +
        '<td class="num">' + Math.round(d.bytes / 1024) + ' KB</td>' +
        '<td class="num">' + d.parsed + '</td>' +
        '<td><button class="btn btn-tiny" data-open="' + esc(d.variant) + '">Open</button></td></tr>';
    });
    html += '</tbody></table></div>';
    html += '<p class="small">The original PDFs ship with the site — click a filename to download the untouched source.</p>';

    html += '<h2>Source defects found while parsing</h2>';
    html += '<div class="note red"><b>Duplicate / missing generation numbers in the Girl\'s solo script.</b> ' +
      'Entries 031 and 091 are each labelled twice and 068 is skipped, so the script holds 114 entries but ' +
      'only 112 distinct generation numbers. The same defect is present in the original plan. This site keeps ' +
      'the true sequence position for every entry and flags the two duplicated ones, so nothing is silently ' +
      'shifted.</div>';

    var gtl = lore.girl_track_link;
    if (gtl) {
      html += '<div class="note purple"><b>The flagship inherits the same defect — and the fix is provable.</b> ' +
        'The 228-clip conjoined cut labels its girl clips “Memory Generation <em>NNN</em> Adaptation”, ' +
        'where <em>NNN</em> is the Girl script\'s own printed number. Matching the two scripts by that label ' +
        'lines up only 54 of 102 clips. Matching by <strong>true sequence position</strong> lines up ' +
        '<strong>' + gtl.linked + ' of ' + gtl.linked + '</strong>, one for one and in order: the flagship ' +
        'reuses the Girl script\'s first ' + gtl.girl_generations_used + ' generations, and her remaining ' +
        'twelve are folded into the shared climax at clips 205–228. Every affected clip carries a ' +
        '<code>srcRef</code> field pointing at the right Girl script entry, and the Clip Board drawer shows it.</div>';
    }

    html += '<h2>Master Bible parts</h2>';
    html += '<div class="panel"><ul style="margin:0;padding-left:18px;color:var(--ink-dim);font-size:12.5px">' +
      (lore.bible_parts || []).map(function (p) {
        return '<li><strong>Part ' + p.n + '</strong> — ' + esc(p.title) + '</li>';
      }).join('') + '</ul></div>';

    root.innerHTML = html;

    $$('[data-open]').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-open');
        FD.getState().activeVariant = v;
        FD.save(true);
        global.FDNav('clips');
      });
    });
  };

  /* ============================================================ PROTOCOL */
  V.protocol = function (root) {
    var p = global.FD_PROTOCOL || { body: 'Protocol file missing.' };
    var html = '';
    html += '<h1>Agent Protocol</h1>';
    html += '<p class="lede">This page is the contract. An agent that lands here should read it top to bottom ' +
      'and then work the checklist — nothing else is required, because everything else is already on this site.</p>';
    html += '<div class="toolbar">';
    html += '<a class="btn" href="AGENTS.md" download>Download AGENTS.md</a>';
    html += '<button class="btn" id="p-copy">Copy protocol</button>';
    html += '<button class="btn" id="p-json">Copy machine-readable schema</button>';
    html += '</div>';
    html += '<pre>' + esc(p.body) + '</pre>';
    root.innerHTML = html;
    $('#p-copy').addEventListener('click', function () { FD.copy(p.body); FD.toast('Protocol copied.'); });
    $('#p-json').addEventListener('click', function () {
      FD.copy(JSON.stringify(p.schema || {}, null, 2));
      FD.toast('Schema copied.');
    });
  };

})(window);
