/* ============================================================
   FEVER DREAM HUB — prompt lint
   Implements the Master Plan's Part 2 directives as live checks.
   ============================================================ */
(function (global) {
  'use strict';

  var FD = global.FD || (global.FD = {});

  /* Directive 1 — The 'AI-Tell' Absolute Ban */
  var AI_TELL = ['testament', 'beacon', 'symphony', 'labyrinthine', 'tapestry', 'delve', 'navigate', 'palpable'];
  /* Directive 2 — Sensory Filter Stripping */
  var SENSORY = ['felt', 'saw', 'heard', 'noticed', 'watched', 'realized'];

  /* Carried relics — when each enters the track and must persist afterwards.
     Derived from the Girl solo script's generation numbers. */
  var RELIC_TIMELINE = {
    girl: [
      { key: 'cup',   from: 23, to: 114, label: 'cracked ceramic cup' },
      { key: 'mirror',from: 45, to: 114, label: 'clouded mirror (wrapped in coat wool)' },
      { key: 'key',   from: 65, to: 114, label: 'smooth key (teeth worn smooth)' }
    ],
    bible_girl: [
      { key: 'cup',   from: 23, to: 114, label: 'cracked ceramic cup' },
      { key: 'mirror',from: 45, to: 114, label: 'clouded mirror (wrapped in coat wool)' },
      { key: 'key',   from: 65, to: 114, label: 'smooth key (teeth worn smooth)' }
    ],
    original: [
      { key: 'cup',   from: 23, to: 114, label: 'cracked ceramic cup' },
      { key: 'mirror',from: 45, to: 114, label: 'clouded mirror (wrapped in coat wool)' },
      { key: 'key',   from: 65, to: 114, label: 'smooth key (teeth worn smooth)' }
    ]
  };

  var RELIC_WORDS = {
    cup: ['cup', 'mug', 'ceramic'],
    mirror: ['mirror', 'glass'],
    key: ['key']
  };

  var STYLE_HINTS = ['sepia', 'ochre', 'purple', 'bruised', 'grain', 'vhs', '35mm', 'analog',
    'stone gray', 'grime', 'gate weave', 'practical-effect', 'pragmatic'];
  var BODY_HINTS = ['skin', 'bone', 'blood', 'bile', 'flesh', 'wound', 'breath', 'lung', 'hand',
    'feet', 'finger', 'nail', 'throat', 'cuticle', 'tile', 'floor', 'door', 'stair', 'coil'];
  var OVERLONG = 1600;

  function hit(text, word) {
    var re = new RegExp('\\b' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
    var m = re.exec(text);
    return m ? m.index : -1;
  }

  function firstHit(text, words) {
    var best = -1, found = null;
    words.forEach(function (w) {
      var i = hit(text, w);
      if (i >= 0 && (best < 0 || i < best)) { best = i; found = w; }
    });
    return { word: found, index: best };
  }

  /**
   * lint(text, opts) -> { issues: [...], score: {pass,warn,fail}, verdict }
   * opts: { variant, clipNumber, track }
   */
  function lint(text, opts) {
    opts = opts || {};
    var issues = [];
    var t = String(text || '');

    function fail(title, detail, hint, word) {
      issues.push({ level: 'fail', title: title, detail: detail || '', hint: hint || '', word: word || '' });
    }
    function warn(title, detail, hint) {
      issues.push({ level: 'warn', title: title, detail: detail || '', hint: hint || '' });
    }
    function pass(title, detail) {
      issues.push({ level: 'pass', title: title, detail: detail || '' });
    }

    if (!t.trim()) {
      return { issues: [{ level: 'fail', title: 'Empty prompt', detail: 'Nothing to lint.',
        hint: 'Paste the generation prompt from the Clip Board first.' }],
        score: { pass: 0, warn: 0, fail: 1 }, verdict: 'fail' };
    }

    /* --- Directive 1: AI-tell absolute ban --- */
    var aiHits = AI_TELL.filter(function (w) { return hit(t, w) >= 0; });
    if (aiHits.length) {
      fail('AI-Tell Absolute Ban violated',
        'Banned word' + (aiHits.length > 1 ? 's' : '') + ': ' + aiHits.join(', ') + '.',
        'Directive 1: "Zero occurrences of ' + AI_TELL.join(', ') + '. Any sentence harboring these words is incinerated."',
        aiHits[0]);
    } else {
      pass('AI-Tell Absolute Ban clear', 'None of the ' + AI_TELL.length + ' banned words appear.');
    }

    /* --- Directive 2: sensory filter stripping --- */
    var sHits = SENSORY.filter(function (w) { return hit(t, w) >= 0; });
    if (sHits.length) {
      fail('Sensory Filter Stripping violated',
        'Passive perception verb' + (sHits.length > 1 ? 's' : '') + ': ' + sHits.join(', ') + '.',
        'Directive 2: "The camera never observes passive perception. Physical stimuli impact meat directly."',
        sHits[0]);
    } else {
      pass('Sensory Filter clear', 'No passive-perception verbs found.');
    }

    /* --- Directive 5: cadence / single take --- */
    var hasTiming = /\b\d{2}\s*-\s*\d{2}\s*s\b|\b00-05s\b|\b0-5s\b|15s|15-second|fifteen second/i.test(t);
    var hasMultiShot = /\bmulti-?shot\b|\bsplit-?screen\b|\bcut to\b|\bthen\b.*\bthen\b/i.test(t);
    if (hasTiming && !hasMultiShot) {
      pass('Single-take cadence described', 'Explicit 15-second timing is present.');
    } else if (!hasTiming) {
      warn('No timing beats found',
        'The source prompts break 15 seconds into 00-05s / 05-10s / 10-15s beats.',
        'Add explicit timing so the model holds one discrete take.');
    } else {
      warn('Possible multi-shot in a 15s slot',
        'Multi-shot or split-screen language detected inside a single 15-second generation.',
        'Directive 5: each generation is one discrete cinematic take.');
    }

    /* --- physical grounding (Directive 3) --- */
    var bodyHit = firstHit(t, BODY_HINTS);
    if (bodyHit.word) {
      pass('Physical grounding present', 'Found "' + bodyHit.word + '" — stimuli land on meat.');
    } else {
      warn('No physical grounding detected',
        'No body or material nouns found in the prompt.',
        'Directive 3: every action beat needs clumsiness, exhaustion and tactile detail.');
    }

    /* --- style lock --- */
    var styleHit = firstHit(t, STYLE_HINTS);
    if (styleHit.word) {
      pass('Style vocabulary present', 'Found "' + styleHit.word + '".');
    } else {
      warn('No style vocabulary detected',
        'The film relies on a locked palette and analog texture.',
        'Carry sepia / ochre / bruised purple / grain / grime through every prompt.');
    }

    /* --- dialogue --- */
    var dialogue = t.match(/["'“][^"'”]{3,}["'”]/);
    if (dialogue) {
      warn('Quoted dialogue detected',
        'Contains speech: ' + dialogue[0].slice(0, 60),
        'The continuity lock says no dialogue unless a later production pass adds it.');
    }

    /* --- prompt length --- */
    if (t.length > OVERLONG) {
      warn('Long prompt (' + t.length + ' chars)',
        'Some video APIs cap the text prompt around 1500-2000 characters.',
        'Trim to the single strongest physical action.');
    }

    /* --- relic continuity --- */
    var timeline = RELIC_TIMELINE[opts.variant];
    if (timeline && opts.clipNumber) {
      timeline.forEach(function (r) {
        var present = RELIC_WORDS[r.key].some(function (w) { return hit(t, w) >= 0; });
        if (opts.clipNumber >= r.from && opts.clipNumber <= r.to) {
          if (!present) {
            warn('Carried relic not mentioned: ' + r.label,
              'From generation ' + r.from + ' onward this relic is in the character\'s hands.',
              'Continuity requires the coat, injuries, carried objects and fatigue to persist clip to clip.');
          }
        } else if (opts.clipNumber < r.from && present) {
          warn('Relic appears too early: ' + r.label,
            'This relic is not acquired until generation ' + r.from + '.',
            'Remove it so the object does not teleport into the hands.');
        }
      });
    }

    var score = { pass: 0, warn: 0, fail: 0 };
    issues.forEach(function (i) { score[i.level]++; });
    var verdict = score.fail ? 'fail' : (score.warn ? 'warn' : 'pass');

    return { issues: issues, score: score, verdict: verdict };
  }

  /* Lint every prompt in a variant — used to report on the corpus itself. */
  function lintVariant(key) {
    var clips = FD.getVariant(key);
    var banned = AI_TELL.concat(SENSORY);
    var hits = [];
    clips.forEach(function (c) {
      var found = banned.filter(function (w) { return hit(c.prompt, w) >= 0; });
      if (found.length) hits.push({ id: c.id, n: c.n, words: found });
    });
    return { total: clips.length, hits: hits };
  }

  FD.lint = lint;
  FD.lintVariant = lintVariant;
  FD.AI_TELL = AI_TELL;
  FD.SENSORY = SENSORY;
  FD.RELIC_TIMELINE = RELIC_TIMELINE;

})(window);
