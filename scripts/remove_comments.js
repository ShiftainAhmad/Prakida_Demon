
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target directory: src relative to where this script is (in /scripts so ../src)
const targetDir = path.resolve(__dirname, '../src');

// Extensions to process
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.html'];

function removeComments(content, ext) {
    if (ext === '.html') {
        // HTML comments <!-- ... -->
        return content.replace(/<!--[\s\S]*?-->/g, '');
    }

    // JS/CSS/TS style comments
    // 1. Strings: "..." or '...' or `...` (don't replace comments inside strings)
    // 2. Multi-line comments: /* ... */
    // 3. Single-line comments: // ... (not for CSS, but CSS often uses preprocessors, so keeping simple for now. Standard CSS is only /* */)
    //    Note: strict CSS only supports /* */ but we apply generic C-style stripping for JS variants.

    // Regex explanation:
    // (["'`])(?:(?=(\\?))\2.)*?\1  -> Matches strings (double, single, backtick)
    // |
    // \/\*[\s\S]*?\*\/             -> Matches multi-line comments
    // |
    // \/\/.*$                      -> Matches single-line comments

    // However, regex for code parsing is tricky.
    // Let's use a widely trusted regex pattern for C-like languages.

    // This simple regex handles most cases but might be brittle with complex nested structures or URLs in strings.
    // For a "proper" cleanup, we often rely on tools, but here is a robust-enough regex for typical codebase.

    const pattern = /((["'`])(?:(?=(\\?))\3.)*?\2)|(\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$)/gm;

    return content.replace(pattern, (match, stringGroup, quote, escape, commentGroup, precedingChar) => {
        if (stringGroup) {
            return stringGroup; // It's a string, keep it
        }
        if (commentGroup) {
            // It's a comment
            // Check if it's a single line comment with a preceding char (like `code // comment`)
            if (precedingChar) {
                return precedingChar; // Keep the character before //
            }
            return '';
        }
        return match;
    });
}

function processDirectory(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else {
            const ext = path.extname(fullPath).toLowerCase();
            if (extensions.includes(ext)) {
                try {
                    const content = fs.readFileSync(fullPath, 'utf8');
                    const newContent = removeComments(content, ext);

                    if (content !== newContent) {
                        fs.writeFileSync(fullPath, newContent, 'utf8');
                        console.log(`Processed: ${fullPath}`);
                    }
                } catch (err) {
                    console.error(`Error processing ${fullPath}:`, err);
                }
            }
        }
    }
}

console.log(`Starting comment removal in: ${targetDir}`);
if (fs.existsSync(targetDir)) {
    processDirectory(targetDir);
    console.log('Done.');
} else {
    console.error(`Directory not found: ${targetDir}`);
}
