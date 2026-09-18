#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <time.h>
#include <ctype.h>

#define ALPHABET_SIZE 26
#define MAX_WORD_LEN 20
#define PUZZLE_SIZE 7
#define MAX_LEVELS 3

typedef struct TrieNode {
    struct TrieNode *children[ALPHABET_SIZE];
    bool isEndOfWord;
} TrieNode;

TrieNode* createNode() {
    TrieNode *node = (TrieNode *)malloc(sizeof(TrieNode));
    node->isEndOfWord = false;
    for (int i = 0; i < ALPHABET_SIZE; i++)
        node->children[i] = NULL;
    return node;
}

void insert(TrieNode *root, const char *word) {
    TrieNode *current = root;
    while (*word) {
        int index = *word - 'a';
        if (!current->children[index])
            current->children[index] = createNode();
        current = current->children[index];
        word++;
    }
    current->isEndOfWord = true;
}

bool search(TrieNode *root, const char *word) {
    TrieNode *current = root;
    while (*word) {
        int index = *word - 'a';
        if (!current->children[index])
            return false;
        current = current->children[index];
        word++;
    }
    return current && current->isEndOfWord;
}

typedef struct ScoreNode {
    char player[50];
    int level;
    int score;
    struct ScoreNode *next;
} ScoreNode;

ScoreNode* addScore(ScoreNode *head, const char *player, int level, int score) {
    ScoreNode *newNode = (ScoreNode *)malloc(sizeof(ScoreNode));
    strcpy(newNode->player, player);
    newNode->level = level;
    newNode->score = score;
    newNode->next = head;
    return newNode;
}

void showScoreboard(ScoreNode *head) {
    printf("\nScoreboard:\n");
    while (head) {
        printf("Player: %s | Level %d | %d points\n", head->player, head->level, head->score);
        head = head->next;
    }
}

void shuffle(char *letters, int size) {
    for (int i = size - 1; i > 0; i--) {
        int j = rand() % (i + 1);
        char temp = letters[i];
        letters[i] = letters[j];
        letters[j] = temp;
    }
}

const char levelWords[MAX_LEVELS][20][MAX_WORD_LEN] = {
    {"cat", "dog", "bat", "rat", "tab", "bag", "god", "cab", "tag", "bad"},
    {"tree", "bee", "see", "rest", "bet", "set", "tea", "eat", "ate", "net"},
    {"sun", "run", "fun", "fur", "rug", "gun", "gum", "bug", "cup", "cap"}
};

void loadDictionary(const char *filename, TrieNode *root) {
    FILE *fp = fopen(filename, "r");
    if (!fp) {
        return;
    }

    char buffer[MAX_WORD_LEN];
    while (fgets(buffer, sizeof(buffer), fp)) {
        buffer[strcspn(buffer, "\r\n")] = 0;

        if (strlen(buffer) == 0)
            continue;

        for (int i = 0; buffer[i]; i++) {
            buffer[i] = tolower((unsigned char)buffer[i]);
        }

        int len = strlen(buffer);
        if (len > PUZZLE_SIZE)
            continue;

        bool valid = true;
        for (int i = 0; i < len; i++) {
            if (buffer[i] < 'a' || buffer[i] > 'z') {
                valid = false;
                break;
            }
        }
        if (!valid)
            continue;

        insert(root, buffer);
    }
    fclose(fp);
}

bool canFormWord(const char *word, const char *puzzle, int puzzleLen) {
    int letterCount[26] = {0};
    int wordCount[26] = {0};

    for (int i = 0; i < puzzleLen; i++)
        letterCount[puzzle[i] - 'a']++;

    for (int i = 0; word[i]; i++) {
        char c = word[i];
        if (c < 'a' || c > 'z')
            return false;
        wordCount[c - 'a']++;
        if (wordCount[c - 'a'] > letterCount[c - 'a'])
            return false;
    }
    return true;
}

void flushInput() {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main() {
    srand(time(0));

    char currentPlayer[50];
    printf("Enter your player name: ");
    scanf("%49s", currentPlayer);
    flushInput();

    ScoreNode *scoreList = NULL;

    TrieNode *dictionary = createNode();
    loadDictionary("words.txt", dictionary);

    for (int levelIndex = 0; levelIndex < MAX_LEVELS; levelIndex++) {
        printf("\nStarting Level %d...\n", levelIndex + 1);

        char puzzle[PUZZLE_SIZE];
        int used[26] = {0}, pIndex = 0;

        for (int i = 0; i < 10 && pIndex < PUZZLE_SIZE; i++) {
            const char *word = levelWords[levelIndex][i];
            for (int j = 0; word[j] && pIndex < PUZZLE_SIZE; j++) {
                int letter = word[j] - 'a';
                if (!used[letter]) {
                    used[letter] = 1;
                    puzzle[pIndex++] = word[j];
                }
            }
        }

        shuffle(puzzle, pIndex);

        printf("\nUse these letters:\n\n");
        for (int i = 0; i < pIndex; i++)
            printf("%c ", puzzle[i]);
        printf("\n\nEnter words (type 'end' to finish this level):\n");

        char input[MAX_WORD_LEN];
        int levelScore = 0;

        while (1) {
            printf("-> ");
            if (scanf("%19s", input) != 1) {
                break;
            }
            flushInput();

            for (int i = 0; input[i]; i++)
                input[i] = tolower((unsigned char)input[i]);

            if (strcmp(input, "end") == 0)
                break;

            if (!canFormWord(input, puzzle, pIndex)) {
                printf("%s is invalid: uses letters outside the puzzle.\n", input);
                continue;
            }

            if (search(dictionary, input)) {
                int score = strlen(input) * 10;
                levelScore += score;
                printf("Great job! You nailed '%s' (+%d points)\n", input, score);
            } else {
                printf("%s is not a valid dictionary word.\n", input);
            }
        }

        scoreList = addScore(scoreList, currentPlayer, levelIndex + 1, levelScore);
        printf("\nLevel %d Complete! You scored: %d points\n", levelIndex + 1, levelScore);

        if (levelIndex + 1 < MAX_LEVELS) {
            char choice[10];
            printf("Do you want to play the next level? (yes/no): ");
            if (scanf("%9s", choice) != 1) {
                break;
            }
            flushInput();
            for (int i = 0; choice[i]; i++)
                choice[i] = tolower((unsigned char)choice[i]);
            if (strcmp(choice, "no") == 0 || strcmp(choice, "n") == 0)
                break;
        } else {
            printf("You've completed all levels!\n");
        }
    }

    showScoreboard(scoreList);

    return 0;
}

