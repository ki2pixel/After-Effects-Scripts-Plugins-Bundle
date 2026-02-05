# Why Repomix?

Repomix's strength lies in its ability to work with any subscription service like ChatGPT, Claude, Gemini, Grok without worrying about costs, while providing complete codebase context that eliminates the need for file exploration—making analysis faster and often more accurate.

With the entire codebase available as context, Repomix enables a wide range of applications including implementation planning, bug investigation, third-party library security checks, documentation generation, and much more.

# Using the CLI Tool

Repomix can be used as a command-line tool, offering powerful features and customization options.

**The CLI tool can access private repositories** as it uses your locally installed git.

### Quick Start

You can try Repomix instantly in your project directory without installation:

```bash
npx repomix@latest
```

Or install globally for repeated use:

```bash
# Install using npm
npm install -g repomix

# Alternatively using yarn
yarn global add repomix

# Alternatively using bun
bun add -g repomix

# Alternatively using Homebrew (macOS/Linux)
brew install repomix

# Then run in any project directory
repomix
```

That's it! Repomix will generate a `repomix-output.xml` file in your current directory, containing your entire repository in an AI-friendly format.

### Usage

To pack your entire repository:

```bash
repomix
```

To pack a specific directory:

```bash
repomix path/to/directory
```

To pack specific files or directories using [glob patterns](https://en.wikipedia.org/wiki/Glob_(programming)):

```bash
repomix --include "src/**/*.ts,**/*.md"
```

To exclude specific files or directories:

```bash
repomix --ignore "**/*.log,tmp/"
```

To pack a remote repository:

```bash
# Using shorthand format
npx repomix --remote yamadashy/repomix

# Using full URL (supports branches and specific paths)
npx repomix --remote https://github.com/yamadashy/repomix
npx repomix --remote https://github.com/yamadashy/repomix/tree/main

# Using commit's URL
npx repomix --remote https://github.com/yamadashy/repomix/commit/836abcd7335137228ad77feb286!
```

To initialize a new configuration file (`repomix.config.json`):

```bash
repomix --init
```

Once you have generated the packed file, you can use it with Generative AI tools like Claude, ChatGPT, and Gemini.

### Docker Usage

You can also run Repomix using Docker 🐳
This is useful if you want to run Repomix in an isolated environment or prefer using containers.

Basic usage (current directory):

```bash
docker run -v .:/app -it --rm ghcr.io/yamadashy/repomix
```

To pack a specific directory:

```bash
docker run -v .:/app -it --rm ghcr.io/yamadashy/repomix path/to/directory
```

Process a remote repository and output to a `output` directory:

```bash
docker run -v ./output:/app -it --rm ghcr.io/yamadashy/repomix --remote https://github.com/ya
```

### Output Formats

Choose your preferred output format:

```bash
# XML format (default)
repomix --style xml

# Markdown format
repomix --style markdown

# JSON format
repomix --style json

# Plain text format
repomix --style plain
```

### Customization

Create a `repomix.config.json` for persistent settings:

```json
{
  "output": {
    "style": "markdown",
    "filePath": "custom-output.md",
    "removeComments": true,
    "showLineNumbers": true,
    "topFilesLength": 10
  },
  "ignore": {
    "customPatterns": ["*.test.ts", "docs/**"]
  }
}
```