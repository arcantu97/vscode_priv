const files = {
  "welcome.js": {
    language: "JavaScript",
    icon: "js",
    code: [
      "function greet(name) {",
      "  return `Hello, ${name}!`;",
      "}",
      "",
      "const message = greet(\"world\");",
      "console.log(message);"
    ]
  },
  "README.md": {
    language: "Markdown",
    icon: "md",
    code: [
      "# vscode-dummy",
      "",
      "A small, interactive VS Code-inspired mockup.",
      "",
      "Click a file in the Explorer to preview it."
    ]
  },
  "package.json": {
    language: "JSON",
    icon: "json",
    code: [
      "{",
      '  "name": "vscode-dummy",',
      '  "version": "1.0.0",',
      '  "description": "A dummy editor interface"',
      "}"
    ]
  }
};

const codeElement = document.querySelector("#code");
const lineNumbers = document.querySelector("#line-numbers");
const languageElement = document.querySelector("#language");

function openFile(name) {
  const file = files[name];
  if (!file) return;

  codeElement.textContent = file.code.join("\n");
  lineNumbers.textContent = file.code.map((_, index) => index + 1).join("\n");
  languageElement.textContent = file.language;
  document.querySelector("#tab-name").textContent = name;
  document.querySelector("#breadcrumb-name").textContent = name;
  const symbol = file.language === "JavaScript" ? "greet" : "";
  document.querySelector("#breadcrumb-symbol").textContent = symbol;
  document.querySelector("#breadcrumb-separator").hidden = !symbol;
  const icon = document.querySelector("#tab-icon");
  icon.className = `file-icon ${file.icon}`;
  icon.textContent = file.icon === "json" ? "{ }" : file.icon.toUpperCase();

  document.querySelectorAll(".file").forEach((button) => {
    const active = button.dataset.file === name;
    button.classList.toggle("active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
}

document.querySelectorAll(".file").forEach((button) => {
  button.addEventListener("click", () => openFile(button.dataset.file));
});

document.querySelector("#toggle-terminal").addEventListener("click", () => {
  const terminal = document.querySelector("#terminal");
  terminal.hidden = !terminal.hidden;
});

document.querySelector("#hide-terminal").addEventListener("click", () => {
  document.querySelector("#terminal").hidden = true;
});

openFile("welcome.js");
