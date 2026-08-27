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
        beat: "She’s on the windowsill, one knee up. Tits bare in the lamp, nipples tight from the draft. Not posing. You walked in on her.",
        reply: "You can look. I like it when you do. Come here and I’ll put your mouth on them.",
        linger: "I’m in"
      },
      {
        line: "I was touching myself. You can stay.",
        beat: "Hand still between her legs, two fingers shiny. She doesn’t yank her shorts up. She just lets you see her pussy because you knocked.",
        reply: "Don’t make it a speech. Come put your fingers where mine are.",
        linger: "linger"
      },
      {
        line: "Took you long enough.",
        beat: "Underwear on the floor. She’s nineteen and not shy about it: ass against the radiator, heat on her skin, waiting like a fact.",
        reply: "Grab my ass if you’re coming in. I’m already wet.",
        linger: "hey"
      }
    ],
    minutes: [
      {
        line: "I didn’t even put my tits away.",
        beat: "Sweater still rucked under them. She never left the couch. The room still smells like her.",
        reply: "Come squeeze them. I kept them out in case it was you.",
        linger: "still here"
      },
      {
        line: "Back already. Good. I’m still wet.",
        beat: "She shifts and you can see it. No show. She just didn’t bother closing her legs.",
        reply: "Taste me or don’t. I’m not wiping it off for the hallway.",
        linger: "I’m here"
      },
      {
        line: "Mm. Don’t explain.",
        beat: "Hair up, no bra. Nipples showing through the tank. She was humming with her hand in her shorts and she didn’t stop for the door.",
        reply: "Sit. Put your mouth on my tits while I finish.",
        linger: "linger"
      },
      {
        line: "I felt the door in my cunt. Stupid, but I did.",
        beat: "She laughs once, low. Not performing. Glad, and refusing to make it cute.",
        reply: "Come here. I want your cock in my hand before you sit down.",
        linger: "hey"
      },
      {
        line: "Bag down. Shirt off if you want.",
        beat: "She’s half naked and treating it like weather. The apartment didn’t notice you left. Her body did.",
        reply: "I missed the weight of you. Come fuck me slow if you’ve got a minute.",
        linger: "I’m here"
      }
    ],
    hours: [
      {
        line: "I walked to the corner with no bra under your hoodie.",
        beat: "Nipples hard the whole way. Plastic bag on the chair. She peels the hoodie off like that’s the story.",
        reply: "They’re still sensitive. Come feel. I already thought about your mouth.",
        linger: "I’m back"
      },
      {
        line: "Bath ran long. I’m still dripping.",
        beat: "Towel around her hips, tits out, hair wet down her back. Mirror fogged. She didn’t dry between her legs on purpose.",
        reply: "You can spread me on the towel. I left it messy for you.",
        linger: "knock"
      },
      {
        line: "I came once already. It wasn’t enough.",
        beat: "Vibrator on the nightstand, still warm. She’s flushed down her chest, pussy obviously used, not embarrassed.",
        reply: "I want your cock now. Fingers if you’re shy. I’m not.",
        linger: "I’m here"
      },
      {
        line: "Fire escape. I smoked with my tits in the wind.",
        beat: "Jacket open. She doesn’t close it when you come in. City noise, tight nipples, ashtray saved.",
        reply: "Hands on them. Then we can talk. Or not.",
        linger: "linger"
      },
      {
        line: "I cooked in underwear. They got soaked.",
        beat: "Kitchen light, ass against the counter, a thumb-sized wet spot she doesn’t hide.",
        reply: "Take them off me. I kept thinking about you eating me out standing up.",
        linger: "I’m back"
      }
    ],
    overnight: [
      {
        line: "I slept naked. The sheet’s still kicked off my ass.",
        beat: "Morning is thin. Tits to the side, one nipple in the light. She’s awake, not cold, not keeping score.",
        reply: "Get in. I want your cock against me before coffee.",
        linger: "morning"
      },
      {
        line: "I went out. Came home and fucked myself thinking about you anyway.",
        beat: "Dress on the chair. Her own night, spent. Fingers smell like her cunt and she doesn’t wash them first.",
        reply: "Don’t look guilty. I had a night. Now I want you in my mouth.",
        linger: "I’m home"
      },
      {
        line: "Rain at two. I got off to it.",
        beat: "Window open, yesterday’s shirt, no underwear. She’s sticky and unbothered. Lamp still on like she forgot.",
        reply: "You’re walking into leftover heat. Put your tongue on my clit if you want the rest.",
        linger: "hey"
      },
      {
        line: "I dreamed your cock and I woke up wet.",
        beat: "Not a punishment. A private thing, still warm. She’s in the kitchen light with her hand down her shorts.",
        reply: "Later I’ll tell you the filthy part. Right now I want you to finish it.",
        linger: "I’m here"
      },
      {
        line: "The night happened. I didn’t save it for you.",
        beat: "Different temperature. Cooler air, same tits in the same lamp, no ledger by the door. She’s still glad it was you who knocked.",
        reply: "Come in. Kiss my neck and grab my ass. That’s the whole welcome.",
        linger: "I’m home"
      }
    ],
    days: [
      {
        line: "I didn’t wait with my legs open. I also didn’t put a bra on.",
        beat: "Life went on. New plant, old lamp. Tits easy under the shirt. She’s glad you exist in it again.",
        reply: "Come here. Mouth on them, then we can be people.",
        linger: "it’s me"
      },
      {
        line: "I finished that book and then I got myself off.",
        beat: "Book on the couch, receipt for a bookmark. She’s not recapping. She’s still a little swollen.",
        reply: "Sit. I’ll put your hand on my pussy while I tell you the mean ending.",
        linger: "hey"
      },
      {
        line: "Thursday I almost sent a picture of my tits. Friday I didn’t.",
        beat: "Today you’re just here. Soup on the stove. Extra bowl. Nobody is owed an apology for time.",
        reply: "You can have the soup. You can have my mouth. I’m not keeping a streak.",
        linger: "I’m here"
      },
      {
        line: "I dated the week a little. Came home to my own fingers.",
        beat: "Not a test. Her body kept going. She’s in a big shirt and nothing else, cunt the point of the room without a billboard.",
        reply: "If you want me, say it with your cock. I missed that more than the texts.",
        linger: "it’s me"
      },
      {
        line: "I went to the river. Thought about you eating me out on the rocks. Didn’t.",
        beat: "The evening belonged to her. It did. Now you’re in the doorway and she’s already wet from remembering.",
        reply: "Do it here. Slow. I’ve got time if you do.",
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
