// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// To expose this command in the Command Palette so it is discovered by users, you also need a corresponding command contribution in package
	let disposable = vscode.commands.registerCommand('tv-remote-control.start', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('tv-remote-control start!');
		// Create and show a new webview
		const panel = vscode.window.createWebviewPanel(
			'tv-remote-control ', // Identifies the type of the webview. Used internally
			'tv-remote-control', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in 
			{
				enableScripts: true  // Enable scripts in the webview
			} // Webview options 
		);
		panel.webview.html = getWebviewContent();
		// handle message from the webview
		panel.webview.onDidReceiveMessage(
			message => {
				switch (message.command) {
					case 'up':
						operateFunc('adb shell input keyevent 19');
						break;
					case 'down':
						operateFunc('adb shell input keyevent 20');
						break;
					case 'right':
						operateFunc('adb shell input keyevent 22');
						break;
					case 'left':
						operateFunc('adb shell input keyevent 21');
						break;
					case 'menu':
						operateFunc('adb shell input keyevent 82');
						break;
					case 'back':
						operateFunc('adb shell input keyevent 4');
						break;
					case 'ok':
						operateFunc('adb shell input keyevent 23');
					default:
						break;
				}
			},
			undefined,
			context.subscriptions);

		/**
		 * 执行adb指令
		 *
		 * @param {String} command - adb指令
		 */
		const adbCommander = require('adb-commander');
		function operateFunc(command: String) {
			adbCommander.exeCommand(command).then(({ result , err}: any) => {
				if (err) {
					console.error('exeCommand "adb devices" failed');
				} else {
					console.log('success');
				}
				console.log(result, err);
			});
		}

	});

	context.subscriptions.push(disposable);
}

function getWebviewContent() {
	return `<!DOCTYPE html>
	<html lang="en">
	
	<head>
		<meta charset="UTF-8">
		<meta name="viewport"
			content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
		<title>TV Remote Control Simulator</title>
		<style type="text/css">
			html,
			body,
			div,
			span,
			applet,
			object,
			iframe,
			h1,
			h2,
			h3,
			h4,
			h5,
			h6,
			p,
			blockquote,
			pre,
			a,
			abbr,
			acronym,
			address,
			big,
			cite,
			code,
			del,
			dfn,
			em,
			img,
			ins,
			kbd,
			q,
			s,
			samp,
			small,
			strike,
			strong,
			sub,
			sup,
			tt,
			var,
			b,
			u,
			i,
			center,
			dl,
			dt,
			dd,
			ol,
			ul,
			li,
			fieldset,
			form,
			label,
			legend,
			table,
			caption,
			tbody,
			tfoot,
			thead,
			tr,
			th,
			td,
			article,
			aside,
			canvas,
			details,
			embed,
			figure,
			figcaption,
			footer,
			header,
			hgroup,
			menu,
			nav,
			output,
			ruby,
			section,
			summary,
			time,
			mark,
			audio,
			video {
				margin: 0;
				padding: 0;
				border: 0;
				font-size: 100%;
				font: inherit;
				vertical-align: baseline;
			}
	
			body {
				display: flex;
				width: 100%;
				flex-direction: column;
				align-items: center;
			}
	
			.container {
				width: 100%;
				max-width: 400px;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				align-content: center;
				margin-top: 40px;
			}
	
			.btns-box {
				padding: 0 20px;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
	
			.btn {
				width: 100px;
				height: 100px;
				font-size: 20px;
				text-align: center;
				line-height: 100px;
				border: 1px solid grey;
				border-radius: 100%;
				cursor: pointer;
				user-select: none;
			}
	
			.btn:active {
				background-color: grey;
			}
	
			.btns-outer-container {
				position: relative;
				width: 280px;
				height: 280px;
				text-align: center;
				line-height: 140px;
				border-radius: 100%;
				border: 2px solid grey;
				margin: 0 auto;
				transform-origin: center;
				transform: rotate(45deg);
				overflow: hidden;
			}
	
			.btn-circle {
				float: left;
				width: 138px;
				height: 138px;
				border: 1px solid grey;
				line-height: 136px;
				text-align: center;
				cursor: pointer;
			}
	
			.btn-circle:active {
				background-color: grey;
			}
	
			.btns-inner-container {
				position: absolute;
				width: 138px;
				height: 138px;
				border-radius: 100%;
				border: 2px solid grey;
				margin-left: 70px;
				margin-right: 70px;
				margin-top: 70px;
				z-index: 99;
				background-color: #fff;
				cursor: pointer;
			}
			.btns-inner-container:active {
				background-color: grey;
			}
			.no-rotate {
				display: inline-block;
				transform-origin: center;
				transform: rotate(-45deg);
				user-select: none;
			}
	
			.title {
				margin-bottom: 20px;
				text-align: center;
				font-size: 40px;
				user-select: none;
			}
		</style>
	</head>
	
	<body>
		<div class="container">
			<text class="title">TV Remote Control Simulator</text>
			<div class="btns-outer-container">
				<div class="btn-circle" data-key="38"><span class="no-rotate" data-key="38">up</span></div>
				<div class="btn-circle" data-key="39"><span class="no-rotate" data-key="39">right</span></div>
				<div class="btn-circle" data-key="37"><span class="no-rotate" data-key="37">left</span></div>
				<div class="btn-circle" data-key="40"><span class="no-rotate" data-key="40">down</span></div>
				<div class="btns-inner-container" data-key="13"><span class="no-rotate" data-key="13">OK</span></div>
			</div>
			<div class="btns-box">
				<div class="btn btn-right" data-key="66">back</div>
				<div class="btn btn-left" data-key="16">menu</div>
			</div>
		</div>
	</body>
	<script type="text/javascript">
    ; (function () {
        const oBtnContainer = document.getElementsByClassName('container')[0];
		const vscode = acquireVsCodeApi();

        document.addEventListener('keydown', listenerFunc, false);
        oBtnContainer.addEventListener('click', clickBtn, false);

        function clickBtn(ev) {
            const e = ev || window.event,
                tar = e.target || e.srcElement,
                keyCode = Number(tar.dataset.key);
            operateFunc(keyCode);
        }

        function listenerFunc(ev) {
            const e = ev || window.event;
            operateFunc(e.keyCode);
        }

        function operateFunc(keyCode) {
            switch (keyCode) {
                case 37:
                    sendRequest('left');
                    break;
                case 38:
                    sendRequest('up');
                    break;
                case 39:
                    sendRequest('right');
                    break;
                case 40:
                    sendRequest('down');
                    break;
                case 13:
                    sendRequest('ok');
                    break;
                case 16:
                    sendRequest('menu');
                    break;
                case 66:
                    sendRequest('back');
                    break;
                default:
                    break;
            }
		}

		function sendRequest (path) {
			vscode.postMessage({
				command: path,
			})
		}
    })();
    </script>
	</html>`;
}

// this method is called when your extension is deactivated
export function deactivate() { }
