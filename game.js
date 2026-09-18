/**
 * Word Puzzle Game
 * Data Structures: Trie (dictionary) + Linked List (scoreboard)
 * Same logic as the original C project.
 */

// ===================== TRIE =====================
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const ch of word.toLowerCase()) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.root;
    for (const ch of word.toLowerCase()) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return node !== null && node.isEndOfWord;
  }
}

// ===================== LINKED LIST (Scoreboard) =====================
class ScoreNode {
  constructor(player, level, score) {
    this.player = player;
    this.level = level;
    this.score = score;
    this.next = null;
  }
}

class ScoreList {
  constructor() {
    this.head = null;
  }

  add(player, level, score) {
    const node = new ScoreNode(player, level, score);
    node.next = this.head;
    this.head = node;
  }

  toArray() {
    const arr = [];
    let cur = this.head;
    while (cur) {
      arr.push({ player: cur.player, level: cur.level, score: cur.score });
      cur = cur.next;
    }
    return arr.reverse(); // chronological order
  }
}

// ===================== GAME DATA =====================
const MAX_LEVELS = 3;
const PUZZLE_SIZE = 7;

const LEVEL_WORDS = [
  ["cat", "dog", "bat", "rat", "tab", "bag", "god", "cab", "tag", "bad"],
  ["tree", "bee", "see", "rest", "bet", "set", "tea", "eat", "ate", "net"],
  ["sun", "run", "fun", "fur", "rug", "gun", "gum", "bug", "cup", "cap"]
];

// Built-in dictionary (same spirit as words.txt + common short words)
const DICTIONARY = [
  "cat","dog","bat","rat","tab","bag","god","cab","tag","bad",
  "tree","bee","see","rest","bet","set","tea","eat","ate","net",
  "sun","run","fun","fur","rug","gun","gum","bug","cup","cap",
  "the","and","for","are","but","not","you","all","can","her",
  "was","one","our","out","day","get","has","him","his","how",
  "man","new","now","old","two","way","who","boy","did","its",
  "let","put","say","she","too","use","dad","mom","car","bus",
  "red","big","hot","cold","book","look","good","time","like",
  "come","make","know","take","from","been","have","they","with",
  "this","that","will","your","what","when","than","them","some",
  "then","into","only","over","such","back","also","after","most",
  "other","about","many","these","would","there","their","which",
  "could","first","people","should","because","through","between",
  "act","age","ago","air","arm","art","ask","bad","bar","bed",
  "beg","bit","box","boy","bus","buy","can","car","cat","cop",
  "cow","cry","cup","cut","dad","day","die","dig","dog","dot",
  "dry","due","ear","eat","egg","end","eye","fan","far","fat",
  "few","fit","fix","fly","fog","for","fox","fun","gap","gas",
  "get","god","got","gun","guy","had","ham","has","hat","hen",
  "her","hid","him","hip","his","hit","hop","hot","how","hug",
  "hum","ice","ill","ink","its","jam","jar","job","joy","key",
  "kid","kit","lab","lad","lap","law","lay","led","leg","let",
  "lid","lie","lip","lit","log","lot","low","mad","man","map",
  "mat","may","men","met","mix","mob","mom","mop","mud","mug",
  "nap","net","new","nod","nor","not","now","nut","odd","off",
  "oil","old","one","opt","our","out","owe","own","pad","pan",
  "par","pat","paw","pay","pen","pet","pie","pig","pin","pit",
  "pod","pop","pot","pro","pub","pun","pup","put","rag","ram",
  "ran","rap","rat","raw","ray","red","rib","rid","rig","rim",
  "rip","rob","rod","rot","row","rub","rug","run","rut","sad",
  "sag","sat","saw","say","sea","see","set","sew","she","shy",
  "sin","sip","sir","sit","six","ski","sky","sly","sob","son",
  "sop","sow","soy","spa","spy","sub","sum","sun","sup","tab",
  "tad","tag","tan","tap","tar","tea","ten","the","thy","tie",
  "tin","tip","toe","ton","too","top","tow","toy","try","tub",
  "tug","two","use","van","vat","vet","via","vie","vow","war",
  "was","wax","way","web","wed","wet","who","why","wig","win",
  "wit","won","wow","yak","yam","yap","yaw","yea","yes","yet",
  "you","zip","zoo","able","acid","aged","also","area","army",
  "away","baby","back","ball","band","bank","base","bath","bear",
  "beat","been","beer","bell","belt","best","bill","bird","blow",
  "blue","boat","body","bomb","bond","bone","book","boom","born",
  "boss","both","bowl","bulk","burn","bush","busy","call","calm",
  "came","camp","card","care","case","cash","cast","cave","cell",
  "chat","chip","city","club","coal","coat","code","cold","come",
  "cook","cool","cope","copy","core","cost","crew","crop","dark",
  "data","date","dawn","days","dead","deal","dear","debt","deep",
  "deny","desk","dial","diet","dirt","disc","disk","does","done",
  "door","dose","down","draw","drew","drop","drug","dual","duke",
  "dust","duty","each","earn","ease","east","easy","edge","else",
  "even","ever","evil","exit","face","fact","fail","fair","fall",
  "farm","fast","fate","fear","feed","feel","feet","fell","felt",
  "file","fill","film","find","fine","fire","firm","fish","five",
  "flat","flow","food","foot","ford","form","fort","four","free",
  "from","fuel","full","fund","gain","game","gate","gave","gear",
  "gene","gift","girl","give","glad","goal","goes","gold","golf",
  "gone","good","gray","grew","grow","gulf","hair","half","hall",
  "hand","hang","hard","harm","hate","have","head","hear","heat",
  "held","hell","help","here","hero","high","hill","hire","hold",
  "hole","holy","home","hope","host","hour","huge","hung","hunt",
  "hurt","idea","inch","into","iron","item","jack","jane","jean",
  "john","join","jump","jury","just","keen","keep","kent","kept",
  "kick","kill","kind","king","knee","knew","know","lack","lady",
  "laid","lake","land","lane","last","late","lead","left","less",
  "life","lift","like","line","link","list","live","load","loan",
  "lock","logo","long","look","lord","lose","loss","lost","love",
  "luck","made","mail","main","make","male","many","mark","mass",
  "matt","meal","mean","meat","meet","menu","mere","mike","mile",
  "milk","mill","mind","mine","miss","mode","mood","moon","more",
  "most","move","much","must","name","navy","near","neck","need",
  "news","next","nice","nick","nine","node","none","nose","note",
  "okay","once","only","onto","open","oral","over","pace","pack",
  "page","paid","pain","pair","palm","park","part","pass","past",
  "path","peak","pick","pink","pipe","plan","play","plot","plug",
  "plus","poll","pool","poor","port","post","pull","pure","push",
  "race","rail","rain","rank","rare","rate","read","real","rear",
  "rely","rent","rest","rice","rich","ride","ring","rise","risk",
  "road","rock","role","roll","roof","room","root","rose","rule",
  "rush","ruth","safe","said","sake","sale","salt","same","sand",
  "save","seat","seed","seek","seem","seen","self","sell","send",
  "sent","sept","ship","shop","shot","show","shut","sick","side",
  "sign","site","size","skin","slip","slow","snow","soft","soil",
  "sold","sole","some","song","soon","sort","soul","spot","star",
  "stay","step","stop","such","suit","sure","take","tale","talk",
  "tall","tank","tape","task","team","tech","tell","tend","term",
  "test","text","than","that","them","then","they","thin","this",
  "thus","till","time","tiny","told","tone","tony","took","tool",
  "tour","tops","tore","torn","tour","tour","town","tree","trip",
  "true","tune","turn","type","unit","upon","used","user","vary",
  "vast","very","vice","view","vote","wage","wait","wake","walk",
  "wall","want","ward","warm","wash","wave","ways","weak","wear",
  "week","well","went","were","west","what","when","whom","wide",
  "wife","wild","will","wind","wine","wing","wire","wise","wish",
  "with","wood","word","wore","work","yard","yeah","year","your",
  "zero","zone"
];

// ===================== GAME STATE =====================
const state = {
  player: "",
  levelIndex: 0,
  levelScore: 0,
  foundWords: new Set(),
  puzzle: [],
  dictionary: new Trie(),
  scoreboard: new ScoreList(),
  totalScore: 0
};

// ===================== HELPERS =====================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function canFormWord(word, puzzle) {
  const counts = {};
  for (const ch of puzzle) counts[ch] = (counts[ch] || 0) + 1;
  for (const ch of word) {
    if (!counts[ch] || counts[ch] <= 0) return false;
    counts[ch]--;
  }
  return true;
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function setFeedback(msg, type = "info") {
  const el = document.getElementById("feedback");
  el.textContent = msg;
  el.className = "feedback " + type;
}

function clearFeedback() {
  setFeedback("");
}

// ===================== PUZZLE GENERATION =====================
function generatePuzzle(levelIndex) {
  const used = {};
  const letters = [];
  const words = LEVEL_WORDS[levelIndex];

  for (let i = 0; i < words.length && letters.length < PUZZLE_SIZE; i++) {
    for (const ch of words[i]) {
      if (!used[ch] && letters.length < PUZZLE_SIZE) {
        used[ch] = true;
        letters.push(ch);
      }
    }
  }
  return shuffle(letters);
}

// ===================== RENDER =====================
function renderTiles() {
  const container = document.getElementById("tiles");
  container.innerHTML = "";
  state.puzzle.forEach(ch => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = ch.toUpperCase();
    tile.addEventListener("click", () => {
      const input = document.getElementById("word-input");
      input.value += ch.toUpperCase();
      input.focus();
    });
    container.appendChild(tile);
  });
}

function renderFoundWords() {
  const container = document.getElementById("found-words");
  container.innerHTML = "";
  [...state.foundWords].sort().forEach(w => {
    const chip = document.createElement("span");
    chip.className = "word-chip";
    chip.textContent = w;
    container.appendChild(chip);
  });
  document.getElementById("word-count").textContent = state.foundWords.size;
}

function updateStats() {
  document.getElementById("level-num").textContent = state.levelIndex + 1;
  document.getElementById("level-score").textContent = state.levelScore;
  document.getElementById("player-display").textContent = state.player || "—";
}

// ===================== GAME FLOW =====================
function startLevel() {
  state.levelScore = 0;
  state.foundWords = new Set();
  state.puzzle = generatePuzzle(state.levelIndex);

  renderTiles();
  renderFoundWords();
  updateStats();
  clearFeedback();
  document.getElementById("word-input").value = "";
  document.getElementById("word-input").focus();

  showScreen("game-screen");
}

function submitWord() {
  const input = document.getElementById("word-input");
  let word = input.value.trim().toLowerCase();
  input.value = "";

  if (!word) return;

  if (word.length < 2) {
    setFeedback("Word must be at least 2 letters.", "error");
    return;
  }

  if (!canFormWord(word, state.puzzle)) {
    setFeedback(`"${word}" uses letters outside the puzzle.`, "error");
    return;
  }

  if (state.foundWords.has(word)) {
    setFeedback(`You already found "${word}".`, "error");
    return;
  }

  if (!state.dictionary.search(word)) {
    setFeedback(`"${word}" is not a valid dictionary word.`, "error");
    return;
  }

  // Valid!
  const points = word.length * 10;
  state.levelScore += points;
  state.foundWords.add(word);
  setFeedback(`Great! "${word}" +${points} points`, "success");
  renderFoundWords();
  updateStats();
}

function endLevel() {
  state.scoreboard.add(state.player, state.levelIndex + 1, state.levelScore);
  state.totalScore += state.levelScore;

  document.getElementById("completed-level").textContent = state.levelIndex + 1;
  document.getElementById("completed-score").textContent = state.levelScore;

  const nextBtn = document.getElementById("btn-next-level");
  if (state.levelIndex + 1 >= MAX_LEVELS) {
    nextBtn.style.display = "none";
    // auto go to final after short delay or just show finish
  } else {
    nextBtn.style.display = "inline-flex";
  }

  showScreen("level-complete-screen");
}

function nextLevel() {
  state.levelIndex++;
  if (state.levelIndex >= MAX_LEVELS) {
    showFinal();
  } else {
    startLevel();
  }
}

function showFinal() {
  document.getElementById("total-score").textContent = state.totalScore;
  document.getElementById("final-player").textContent = `Player: ${state.player}`;

  const list = document.getElementById("scoreboard-list");
  list.innerHTML = "";
  const scores = state.scoreboard.toArray();
  if (scores.length === 0) {
    list.innerHTML = "<p style='color:var(--text-muted)'>No scores yet.</p>";
  } else {
    scores.forEach(s => {
      const row = document.createElement("div");
      row.className = "score-row";
      row.innerHTML = `<span>Level ${s.level} — ${s.player}</span><span class="pts">${s.score} pts</span>`;
      list.appendChild(row);
    });
  }

  showScreen("final-screen");
}

function resetGame() {
  state.levelIndex = 0;
  state.levelScore = 0;
  state.foundWords = new Set();
  state.scoreboard = new ScoreList();
  state.totalScore = 0;
  startLevel();
}

// ===================== INIT =====================
function initDictionary() {
  DICTIONARY.forEach(w => state.dictionary.insert(w));
}

function init() {
  initDictionary();

  // Start button
  document.getElementById("btn-start").addEventListener("click", () => {
    const name = document.getElementById("player-name").value.trim();
    if (!name) {
      document.getElementById("player-name").focus();
      return;
    }
    state.player = name;
    state.levelIndex = 0;
    state.scoreboard = new ScoreList();
    state.totalScore = 0;
    startLevel();
  });

  // Enter key on name
  document.getElementById("player-name").addEventListener("keydown", e => {
    if (e.key === "Enter") document.getElementById("btn-start").click();
  });

  // Submit word
  document.getElementById("btn-submit").addEventListener("click", submitWord);
  document.getElementById("word-input").addEventListener("keydown", e => {
    if (e.key === "Enter") submitWord();
  });

  // Shuffle
  document.getElementById("btn-shuffle").addEventListener("click", () => {
    state.puzzle = shuffle(state.puzzle);
    const tiles = document.getElementById("tiles");
    tiles.classList.add("shuffling");
    renderTiles();
    setTimeout(() => tiles.classList.remove("shuffling"), 300);
  });

  // End level
  document.getElementById("btn-end-level").addEventListener("click", endLevel);

  // Next level
  document.getElementById("btn-next-level").addEventListener("click", nextLevel);

  // Finish early
  document.getElementById("btn-finish-early").addEventListener("click", showFinal);

  // Replay
  document.getElementById("btn-replay").addEventListener("click", () => {
    document.getElementById("player-name").value = state.player;
    showScreen("start-screen");
  });
}

document.addEventListener("DOMContentLoaded", init);
