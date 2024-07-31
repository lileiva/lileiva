// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "lileiva" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "lileiva.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from lileiva!");
    }
  );

  context.subscriptions.push(disposable);

  const disposable2 = vscode.commands.registerCommand(
    "extension.convertArrowToNamedFunction",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const document = editor.document;
      const selection = editor.selection;
      const text = document.getText(selection);

      const arrowFunctionRegex =
        /(\w+)\s*=\s*(async\s*)?\(([^)]*)\)\s*=>\s*{([^}]*)}/;
      const match = arrowFunctionRegex.exec(text);

      if (match) {
        const [_, functionName, asyncKeyword, params, body] = match;
        const namedFunction = `${
          asyncKeyword ? "async " : ""
        }function ${functionName}(${params}) {${body}}`;

        editor.edit((editBuilder) => {
          editBuilder.replace(selection, namedFunction);
        });
      } else {
        vscode.window.showErrorMessage(
          "No arrow function found in the selected text."
        );
      }
    }
  );

  context.subscriptions.push(disposable2);
}

// This method is called when your extension is deactivated
export function deactivate() {}
