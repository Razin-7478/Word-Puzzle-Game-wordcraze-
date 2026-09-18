# 🧩 Word Puzzle Game

A multi-level word puzzle game that demonstrates **Trie** and **Linked List** data structures.

**Two versions included:**
1. **Web Interface** (recommended) – Beautiful, fully playable in the browser
2. **Original C Console Version** – The classic terminal version from the lab

**Course:** Data Structures Lab (CSE 1302)  
**University:** University of Liberal Arts Bangladesh (ULAB)  
**Semester:** Summer 2025

---

## 🎮 Play Online (Web Version)

Just open `index.html` in any modern browser — no installation required!

**Or host it on GitHub Pages** (see instructions below).

### Features (Web UI)
- Modern dark theme with smooth animations
- Clickable letter tiles
- Real-time scoring (10 points per letter)
- Multi-level progression (3 levels)
- Dynamic scoreboard
- Shuffle letters button
- Fully responsive (works on mobile too)

### Data Structures Used
| Structure       | Purpose                                      |
|-----------------|----------------------------------------------|
| **Trie**        | Store dictionary & fast word validation      |
| **Linked List** | Store player scores across levels            |

---

## 🖥️ Console Version (Original C)

```bash
# Compile
gcc -o word_puzzle src/word_puzzle.c

# Run (words.txt must be in the same folder)
./word_puzzle
```

**Windows (Code::Blocks):** Open `src/word_puzzle.c`, place `words.txt` in the project folder, Build & Run.

---

## 📁 Project Structure

```
WordPuzzleGame/
├── index.html              ← Web game (open this!)
├── css/
│   └── style.css           ← Modern UI styles
├── js/
│   └── game.js             ← Game logic (Trie + Linked List in JS)
├── words.txt               ← Dictionary for C version
├── src/
│   └── word_puzzle.c       ← Original C source code
├── docs/
│   ├── Project_Report.pdf  ← Full project report
├── README.md
├── LICENSE
└── .gitignore
```

---

## 🚀 How to Play

1. Enter your name and click **Start Game**
2. You will see a set of letter tiles
3. Form valid English words using **only** those letters
4. Type the word and press Enter / Submit
5. Longer words = more points
6. Click **End Level** when finished
7. Continue to the next level or finish the game
8. View your scoreboard at the end

---

## 📤 Deploy to GitHub Pages (Optional)

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: `main` / folder: `/ (root)`
5. Save → after 1–2 minutes your game will be live at:  
   `https://YOUR_USERNAME.github.io/REPO_NAME/`

---

## 👥 Authors

- **Md. Basituzzaman** (243014003)
- **Mohammad Razin Masud** (243014111)

## Tools Used

- Web: HTML5, CSS3, Vanilla JavaScript
- Console: C (GCC / Code::Blocks)
- Data Structures: Trie, Linked List

## License

MIT License – see [LICENSE](LICENSE)
