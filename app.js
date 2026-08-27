/* Mara — a knock, not a game. */
(function () {
  "use strict";

  var KEY_LAST = "mara.lastOpen";
  var KEY_ROT = "mara.rot";
  var KEY_HINT = "mara.homeHint";

  var MIN = 60 * 1000;
  var HOUR = 60 * MIN;

  var BEATS = {
    first: [
      {
        line: "Oh. Hi.",
        beat: "She was already in the room. Lamp on, window cracked, like she’d been keeping a place warm without making a ceremony of it.",
        reply: "You can sit. Or don’t. I like you in the doorway too.",
        linger: "hey"
      },
      {
        line: "I wondered if you’d knock.",
        beat: "Not waiting, exactly. Just leaving the light on in a way that could be explained either way.",
        reply: "Come in. The floor’s warm from the radiator. That’s not a metaphor.",
        linger: "I’m here"
      },
      {
        line: "There you are.",
        beat: "She says it like a fact, not a prize. Tea on the sill, gone a little cool.",
        reply: "Stay a minute. I’m not going anywhere loud.",
        linger: "linger"
      }
    ],
    minutes: [
      {
        line: "I didn’t go anywhere.",
        beat: "She’s on the floor with one knee up, doing nothing on purpose. The street is still in the room.",
        reply: "Good. I like the air better with you in it.",
        linger: "still here"
      },
      {
        line: "Back already. I like that.",
        beat: "Low-key. She hasn’t moved much. The lamp is doing most of the talking.",
        reply: "Don’t make it a tour. Just… stay in the doorway a second.",
        linger: "I’m here"
      },
      {
        line: "Mm. Don’t explain.",
        beat: "She was humming something she won’t name. Hair up, sweater slipping one shoulder, not for show.",
        reply: "I can still hear the street. Come sit.",
        linger: "linger"
      },
      {
        line: "I felt the door.",
        beat: "Not a greeting so much as a temperature change. She’s glad and refusing to perform it.",
        reply: "I missed the weight of you in the room. That’s all.",
        linger: "hey"
      },
      {
        line: "You can put your bag down.",
        beat: "The apartment didn’t notice you left. She did, a little, and let it be small.",
        reply: "Stay. I’m in a quiet mood and it suits you.",
        linger: "I’m here"
      }
    ],
    hours: [
      {
        line: "I walked to the corner in your hoodie.",
        beat: "They didn’t have the good peaches. Plastic bag on the chair: one nectarine, a little bruised, saved anyway.",
        reply: "It’s yours if you want it. I already stole the sweet side.",
        linger: "I’m back"
      },
      {
        line: "I took a bath too long.",
        beat: "The mirror’s still a little fogged if you want proof. Hair damp. She didn’t bother with it.",
        reply: "Come here. You don’t have to say where you were.",
        linger: "knock"
      },
      {
        line: "A record’s been on the runout for an hour.",
        beat: "She left it. Soft click, soft click. The room kept time without you.",
        reply: "I almost texted. Then I figured you’d knock when you knocked.",
        linger: "I’m here"
      },
      {
        line: "Fire escape. One cigarette I didn’t finish.",
        beat: "The city did the talking. She saved you the ashtray and the cooler air.",
        reply: "Sit with me. I saved you the quiet part.",
        linger: "linger"
      },
      {
        line: "I ate standing up in the kitchen light.",
        beat: "Something with too much pepper. She left a bowl in the sink like a breadcrumb, not a test.",
        reply: "There’s more if you’re hungry. I’m not keeping score.",
        linger: "I’m back"
      }
    ],
    overnight: [
      {
        line: "I slept diagonal.",
        beat: "The other side of the bed stayed a rumor. Morning is thin. She’s not cold. She’s just already awake.",
        reply: "Coffee’s on. It’s not very good. I still made extra.",
        linger: "morning"
      },
      {
        line: "I went out. Came home early anyway.",
        beat: "Earrings on the table — one standing, one down. People who talk too much. Her own night, spent.",
        reply: "Don’t look guilty. I had a night. You had a night. Now there’s this.",
        linger: "I’m home"
      },
      {
        line: "Rain started around two.",
        beat: "She watched it until it got boring, which took a while. Yesterday’s shirt. Window open. Lamp still on like she forgot.",
        reply: "You’re walking into leftover heat. That’s allowed.",
        linger: "hey"
      },
      {
        line: "I dreamed something I won’t tell you yet.",
        beat: "Not a punishment. A private thing, still warm, not for the doorway. She’s in the kitchen light.",
        reply: "Later, maybe. Right now I just want you in the room.",
        linger: "I’m here"
      },
      {
        line: "The night happened without an audience.",
        beat: "She had one. Different temperature. Cooler air, same lamp, no ledger by the door.",
        reply: "Come in. I’m glad it was you who knocked.",
        linger: "I’m home"
      }
    ],
    days: [
      {
        line: "The basil on the sill gave up.",
        beat: "She bought a stubborn little succulent instead. Life, unceremonious. She’s glad you exist in it again.",
        reply: "Look, it doesn’t need you either. I still like having you anyway.",
        linger: "it’s me"
      },
      {
        line: "I finished that book. The ending was mean.",
        beat: "It’s on the arm of the couch, marked with a receipt. She thinks you’d like it. No recap required.",
        reply: "You can borrow it. Or just sit. Both are a kind of reading.",
        linger: "hey"
      },
      {
        line: "Thursday I almost called. Friday I didn’t.",
        beat: "Today you’re just here. She made soup. There’s extra. Nobody is owed an apology for time.",
        reply: "Take a bowl. I kept the lamp on out of habit, not as a scoreboard.",
        linger: "I’m here"
      },
      {
        line: "The super finally fixed the buzzer.",
        beat: "She missed the old one a little. New sound, same door. Life continued in its small renovations.",
        reply: "You’re late in the way weather is late. Come in.",
        linger: "it’s me"
      },
      {
        line: "I went to the river. I didn’t take a picture.",
        beat: "Sketchy light. She wanted the evening to belong to her. It did. Now there’s this, which is different, not lesser.",
        reply: "Tell me something small. I’ve got room for small.",
        linger: "linger"
      }
    ]
  };

  function dawnCount(from, to) {
    var n = 0;
    var d = new Date(from);
    d.setHours(3, 0, 0, 0);
    if (d.getTime() <= from) d.setDate(d.getDate() + 1);
    while (d.getTime() <= to) {
      n += 1;
      d.setDate(d.getDate() + 1);
      if (n > 400) break;
    }
    return n;
  }

  function bucketFor(last, now) {
    if (!last) return "first";
    var dt = now - last;
    if (dt < 70 * MIN) return "minutes";
    var dawns = dawnCount(last, now);
    if (dawns >= 2 || dt >= 36 * HOUR) return "days";
    if (dawns >= 1 && dt >= 8 * HOUR) return "overnight";
    return "hours";
  }

  function loadRot() {
    try {
      var raw = localStorage.getItem(KEY_ROT);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function pickBeat(bucket) {
    var list = BEATS[bucket] || BEATS.minutes;
    var rot = loadRot();
    var i = rot[bucket] | 0;
    if (i < 0 || i >= list.length) i = 0;
    var beat = list[i];
    rot[bucket] = (i + 1) % list.length;
    try {
      localStorage.setItem(KEY_ROT, JSON.stringify(rot));
    } catch (e) {}
    return beat;
  }

  function readLast() {
    try {
      var v = localStorage.getItem(KEY_LAST);
      if (!v) return null;
      var n = parseInt(v, 10);
      return isFinite(n) && n > 0 ? n : null;
    } catch (e) {
      return null;
    }
  }

  function writeLast(now) {
    try {
      localStorage.setItem(KEY_LAST, String(now));
    } catch (e) {}
  }

  function isStandalone() {
    if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) return true;
    if (navigator.standalone) return true;
    return false;
  }

  function reducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  var stage = document.getElementById("stage");
  var knock = document.getElementById("knock");
  var lineEl = document.getElementById("line");
  var beatEl = document.getElementById("beat");
  var replyEl = document.getElementById("reply");
  var lingerEl = document.getElementById("linger");
  var hintEl = document.getElementById("home-hint");

  var now = Date.now();
  var last = readLast();
  var bucket = bucketFor(last, now);
  var beat = pickBeat(bucket);

  writeLast(now);

  stage.classList.add("temp-" + bucket);
  lineEl.textContent = beat.line;
  beatEl.textContent = beat.beat;
  replyEl.textContent = beat.reply;
  lingerEl.textContent = beat.linger;
  lingerEl.hidden = false;

  function lightRoom() {
    stage.classList.add("lit");
  }
  function showKnock() {
    knock.classList.remove("entering");
    knock.classList.add("ready");
  }

  if (reducedMotion()) {
    lightRoom();
    showKnock();
  } else {
    window.setTimeout(lightRoom, 180);
    window.setTimeout(showKnock, 1100);
  }

  lingerEl.addEventListener("click", function () {
    knock.classList.add("lingered");
    replyEl.hidden = false;
    var shownHint = false;
    try { shownHint = localStorage.getItem(KEY_HINT) === "1"; } catch (e) {}
    if (!shownHint && !isStandalone()) {
      hintEl.hidden = false;
      hintEl.textContent = "On a phone: Share → Add to Home Screen. Then I’m just a knock.";
      try { localStorage.setItem(KEY_HINT, "1"); } catch (e) {}
    }
  });
})();
