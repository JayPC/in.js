/**
 * in.js
 *
 * Input Wrapper for javascript/HTML5.
 *
 * Author: John Close <SnowdramaGames@gmail.com>
 * Github: https://github.com/JayPC
 * Version: 0.0.1
 *
 * Copyright 2016 John Close
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 *     
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */
var keyCodes = {
	KEY_0: 48,
	KEY_1: 49,
	KEY_2: 50,
	KEY_3: 51,
	KEY_4: 52,
	KEY_5: 53,
	KEY_6: 54,
	KEY_7: 55,
	KEY_8: 56,
	KEY_9: 57,
	KEY_MINUS: 189,
	KEY_PLUS: 187,

	KEY_A: 65,
	KEY_B: 66,
	KEY_C: 67,
	KEY_D: 68,
	KEY_E: 69,
	KEY_F: 70,
	KEY_G: 71,
	KEY_H: 72,
	KEY_I: 73,
	KEY_J: 74,
	KEY_K: 75,
	KEY_L: 76,
	KEY_M: 77,
	KEY_N: 78,
	KEY_O: 79,
	KEY_P: 80,
	KEY_Q: 81,
	KEY_R: 82,
	KEY_S: 83,
	KEY_T: 84,
	KEY_U: 85,
	KEY_V: 86,
	KEY_W: 87,
	KEY_X: 88,
	KEY_Y: 89,
	KEY_Z: 90,
	KEY_UP: 38,
	KEY_DOWN: 40,
	KEY_LEFT: 37,
	KEY_RIGHT: 39,
	KEY_SHIFT: 16,
	KEY_TAB: 9,
	KEY_CAPS_LOCK: 20,

	//TODO Add the other keys:
}

var mouseCodes = {
	LEFT_MOUSE_BUTTON: 0,
	MIDDLE_MOUSE_BUTTON: 1,
	RIGHT_MOUSE_BUTTON: 2
}

var input = {
	keysDown: [],
	keysPressed: [],
	mouseButtonsDown: [],
	mouseLocation: {
		X: 0,
		Y: 0,
	},
	mouseClickInfo: { //The last status of the mouse 
		X: 0,
		Y: 0,
		button: 0,
		down: false
	},
	mouseDrag: {
		distance: 0, //Total difference
		distanceX: 0, //Difference X
		distanceY: 0, //Difference Y
	},
	keyBindings: keyCodes,
	mouseButtons: mouseCodes,
	mouseWheelCount: 0
}

addEventListener("keydown", function (e) {
	console.log(e.keyCode);
	input.keysDown[e.keyCode] = true;
	input.keysPressed[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete input.keysDown[e.keyCode];
}, false);

addEventListener("mousedown", function (e) {
	input.mouseClickInfo.X = e.clientX;
	input.mouseClickInfo.Y = e.clientY;
	input.mouseClickInfo.button = e.button;
	input.mouseClickInfo.down = true;

	input.mouseButtonsDown[e.button] = true;
}, false);

addEventListener("mouseup", function (e) {
	input.mouseClickInfo.X = e.clientX;
	input.mouseClickInfo.Y = e.clientY;
	input.mouseClickInfo.button = e.button;
	input.mouseClickInfo.down = false;
	
	delete input.mouseButtonsDown[e.button];
}, false);

addEventListener("mousemove", function (e) {
	input.mouseLocation.X = e.clientX;
	input.mouseLocation.Y = e.clientY;

	if(input.mouseClickInfo.down){
		input.mouseDrag.distanceX = input.mouseLocation.X - input.mouseClickInfo.X;
		input.mouseDrag.distanceY = input.mouseLocation.Y - input.mouseClickInfo.Y;
		input.mouseDrag.distance = Math.sqrt( input.mouseDrag.distanceX*input.mouseDrag.distanceX + input.mouseDrag.distanceY*input.mouseDrag.distanceY );
	}
}, false);

addEventListener("mousewheel", function (e) {
	input.mouseWheelCount += Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
	console.log();
}, false);

function getMousePos(canvas, e) {
	var rect = canvas.getBoundingClientRect();
	return {
		X: e.clientX - rect.left,
		Y: e.clientY - rect.top
	};
}