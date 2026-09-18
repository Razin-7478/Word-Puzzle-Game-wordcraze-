# Word Puzzle Game

A multi-level word puzzle game written in C. Players form valid English words from a given set of shuffled letters. Word validation uses a **Trie** data structure for fast dictionary lookups. Scores are stored dynamically using a **Linked List**.

**Course:** Data Structures Lab (CSE 1302)  
**University:** University of Liberal Arts Bangladesh (ULAB)  
**Semester:** Summer 2025

## Features

- Multi-level gameplay (3 levels with different letter sets)
- Fast word validation using Trie
- Score based on word length (10 points per letter)
- Dynamic scoreboard with Linked List
- Dictionary loaded from external file (`words.txt`)
- Random letter shuffling for variety
- Input validation (letters must come from the puzzle)

## Data Structures Used

| Structure     | Purpose                                      |
|---------------|----------------------------------------------|
| **Trie**      | Store dictionary & check if a word is valid  |
| **Linked List** | Store player scores across levels          |

## Requirements

- C compiler (GCC recommended)
- `words.txt` dictionary file in the same directory as the executable

## How to Compile & Run

```bash
# Compile
gcc -o word_puzzle src/word_puzzle.c

# Run (make sure words.txt is in the current directory)
./word_puzzle
```

**Windows (Code::Blocks / MinGW):**
1. Open the `.c` file in Code::Blocks
2. Place `words.txt` in the project folder
3. Build and Run

## How to Play

1. Enter your player name
2. You will see a set of letters for the current level
3. Type valid English words using **only** those letters
4. Type `end` when you want to finish the level
5. Choose whether to continue to the next level
6. At the end, your scoreboard will be displayed

## Project Structure

```
WordPuzzleGame/
├── README.md
├── LICENSE
├── .gitignore
├── words.txt                 # Dictionary file
├── src/
│   └── word_puzzle.c         # Main source code
└── docs/
    ├── Project_Report.pdf    # Full project report
    └── Hotel_Booking_System.c # Bonus: another project (optional)
```

## Authors

- Md. Basituzzaman (243014003)
- Mohammad Razin Masud (243014111)

## Tools Used

- IDE: Code::Blocks 20.03
- Compiler: GCC
- Language: C

## License

This project is released under the MIT License. See [LICENSE](LICENSE) for details.
