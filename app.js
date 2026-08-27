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
        line: "Door’s open. I didn’t bother with a shirt.",
        beat: "She’s on the windowsill. Tits in the lamp, not posing. You walked in on that.",
        reply: "You can look. I like it when you do.",
        linger: "I’m in",
        settle: "She doesn’t cover up. She just stays in the lamp."
      },
      {
        line: "I was touching myself. You can stay.",
        beat: "She doesn’t yank her shorts up. She lets you see her pussy because you knocked.",
        reply: "Don’t make it a speech. Put yours where mine are.",
        linger: "linger",
        settle: "She waits. The door can stay open."
      },
      {
        line: "Took you long enough.",
        beat: "Underwear on the floor. Ass against the radiator, waiting like a fact.",
        reply: "Grab it if you’re coming in.",
        linger: "hey",
        settle: "She doesn’t get up. Radiator ticks."
      }
    ],
    minutes: [
      {
        line: "I didn’t even put my tits away.",
        beat: "Sweater still rucked under them. She never left the couch.",
        reply: "Come here. I kept them out in case it was you.",
        linger: "still here",
        settle: "She tugs the sweater once. Leaves it."
      },
      {
        line: "Back already. Good. I’m still wet.",
        beat: "She shifts and you can see it. No show. She just didn’t bother closing her legs.",
        reply: "I’m not wiping it off for the hallway.",
        linger: "I’m here",
        settle: "She makes a space on the couch. That’s it."
      },
      {
        line: "Mm. Don’t explain.",
        beat: "Nipples showing through the tank. She was humming and she didn’t stop for the door.",
        reply: "Sit. On them while I finish.",
        linger: "linger",
        settle: "She goes back to humming. Expects you to sit."
      },
      {
        line: "I felt the door in my cunt. Stupid, but I did.",
        beat: "She laughs once, low. Not performing. Glad, and refusing to make it cute.",
        reply: "Come here anyway.",
        linger: "hey",
        settle: "She pats the couch. Not cute about it."
      },
      {
        line: "Bag down.",
        beat: "She’s half naked and treating it like weather. The apartment didn’t notice you left.",
        reply: "I missed the weight of you. Stay a minute.",
        linger: "I’m here",
        settle: "She nods at the floor. Stay."
      }
    ],
    hours: [
      {
        line: "I walked to the corner with no bra under your hoodie.",
        beat: "She peels it off like that’s the story. Plastic bag on the chair.",
        reply: "They’re still sensitive. Come feel.",
        linger: "I’m back",
        settle: "She dumps the bag. Hoodie on the chair."
      },
      {
        line: "Bath ran long. I’m still dripping.",
        beat: "Towel around her hips. Mirror fogged. She didn’t dry off on purpose.",
        reply: "I left it messy for you.",
        linger: "knock",
        settle: "She doesn’t wrap the towel tighter."
      },
      {
        line: "I came once already. It wasn’t enough.",
        beat: "Vibrator on the nightstand, still warm. She’s flushed. Not embarrassed.",
        reply: "I want your cock now.",
        linger: "I’m here",
        settle: "She leaves the vibrator where it is."
      },
      {
        line: "Fire escape. I smoked with my tits in the wind.",
        beat: "Jacket open. She doesn’t close it when you come in. Ashtray saved.",
        reply: "On them. Then we can talk. Or not.",
        linger: "linger",
        settle: "She flicks ash. Jacket still open."
      },
      {
        line: "I cooked in underwear. They got soaked.",
        beat: "Kitchen light. A small wet spot she doesn’t hide.",
        reply: "Take them off me.",
        linger: "I’m back",
        settle: "She turns the burner down. Waits."
      }
    ],
    overnight: [
      {
        line: "I slept naked. The sheet’s still kicked off my ass.",
        beat: "Morning is thin. She’s awake, not cold, not keeping score.",
        reply: "Get in.",
        linger: "morning",
        settle: "She doesn’t pull the sheet up."
      },
      {
        line: "I went out. Came home and fucked myself thinking about you anyway.",
        beat: "Dress on the chair. Her own night, spent. She doesn’t wash her fingers first.",
        reply: "Don’t look guilty. I had a night. Now you’re here.",
        linger: "I’m home",
        settle: "She makes coffee like you live here."
      },
      {
        line: "Rain at two. I got off to it.",
        beat: "Window open, yesterday’s shirt, no underwear. Sticky and unbothered. Lamp still on like she forgot.",
        reply: "You’re walking into leftover heat.",
        linger: "hey",
        settle: "She leaves the window. Rain’s done."
      },
      {
        line: "I dreamed your cock and I woke up wet.",
        beat: "Not a punishment. A private thing, still warm. Kitchen light. Shorts still on.",
        reply: "Finish it.",
        linger: "I’m here",
        settle: "She doesn’t change. Kitchen still on."
      },
      {
        line: "The night happened. I didn’t save it for you.",
        beat: "Different temperature. Cooler air, same lamp, no ledger by the door.",
        reply: "Come in. I’m glad it was you who knocked.",
        linger: "I’m home",
        settle: "She yawns into the cooler air. Come in."
      }
    ],
    days: [
      {
        line: "I didn’t wait with my legs open. I also didn’t put a bra on.",
        beat: "Life went on. New plant, old lamp. Easy under the shirt. She’s glad you exist in it again.",
        reply: "Come here first. Then we can be people.",
        linger: "it’s me",
        settle: "She waters the plant with the kettle. Then she looks at you."
      },
      {
        line: "I finished that book and then I got myself off.",
        beat: "Book on the couch, receipt for a bookmark. She’s not recapping. She’s still a little swollen.",
        reply: "Sit. Hand here while I tell you the mean ending.",
        linger: "hey",
        settle: "She marks the page with the receipt. Sits."
      },
      {
        line: "Thursday I almost sent a picture of my tits. Friday I didn’t.",
        beat: "Today you’re just here. Soup on the stove. Extra bowl. Nobody is owed an apology for time.",
        reply: "You can have the soup. I’m not keeping a streak.",
        linger: "I’m here",
        settle: "She gets two bowls. That’s the whole welcome."
      },
      {
        line: "I dated the week a little. Came home to my own fingers.",
        beat: "Not a test. She kept going. Big shirt, nothing else.",
        reply: "If you want me, say it. I missed that more than the texts.",
        linger: "it’s me",
        settle: "She shrugs the shirt straight. Not a test."
      },
      {
        line: "I went to the river. Thought about you eating me out on the rocks. Didn’t.",
        beat: "The evening belonged to her. It did. Now you’re in the doorway and she’s already wet from remembering.",
        reply: "Do it here. Slow.",
        linger: "linger",
        settle: "She locks the door behind you. Slow is fine."
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

  function peekBeat(bucket) {
    var list = BEATS[bucket] || BEATS.minutes;
    var rot = loadRot();
    var i = rot[bucket] | 0;
    if (i < 0 || i >= list.length) i = 0;
    return { beat: list[i], i: i, n: list.length };
  }

  function advanceRot(bucket, i, n) {
    var rot = loadRot();
    rot[bucket] = (i + 1) % n;
    try {
      localStorage.setItem(KEY_ROT, JSON.stringify(rot));
    } catch (e) {}
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

  function writeLast(ts) {
    try {
      localStorage.setItem(KEY_LAST, String(ts));
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
  var settleEl = document.getElementById("settle");
  var lingerEl = document.getElementById("linger");
  var hintEl = document.getElementById("home-hint");

  var now = Date.now();
  var last = readLast();
  var bucket = bucketFor(last, now);
  var peeked = peekBeat(bucket);
  var beat = peeked.beat;

  var visitCounted = false;
  function countVisit() {
    if (visitCounted) return;
    visitCounted = true;
    writeLast(now);
    advanceRot(bucket, peeked.i, peeked.n);
  }

  stage.classList.add("temp-" + bucket);
  lineEl.textContent = beat.line;
  beatEl.textContent = beat.beat;
  replyEl.textContent = beat.reply;
  settleEl.textContent = beat.settle;
  lingerEl.textContent = beat.linger;
  lingerEl.hidden = false;

  function lightRoom() {
    stage.classList.add("lit");
  }
  function showKnock() {
    knock.classList.remove("entering");
    knock.classList.add("ready");
    window.setTimeout(countVisit, 2000);
  }

  if (reducedMotion()) {
    lightRoom();
    showKnock();
  } else {
    window.setTimeout(lightRoom, 180);
    window.setTimeout(showKnock, 1100);
  }

  lingerEl.addEventListener("click", function () {
    countVisit();
    lingerEl.hidden = true;
    lingerEl.disabled = true;
    knock.classList.add("lingered");
    replyEl.hidden = false;
    settleEl.hidden = false;
    var shownHint = false;
    try { shownHint = localStorage.getItem(KEY_HINT) === "1"; } catch (e) {}
    if (!shownHint && !isStandalone()) {
      hintEl.hidden = false;
      hintEl.textContent = "On a phone: Share → Add to Home Screen. Then I’m just a knock.";
      try { localStorage.setItem(KEY_HINT, "1"); } catch (e) {}
    }
  });
})();
