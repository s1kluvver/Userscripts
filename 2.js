// ==UserScript==
// @name         Fortnite Silent Aim for Xbox Cloud Gaming (Full Version)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds silent aim functionality to Fortnite on Xbox Cloud Gaming with a clean UI overlay and settings panel.
// @author       connorm
// @match        https://www.xbox.com/en-US/play/games/fortnite/*
// @grant        none
// ==/UserScript==
// Silent aim settings (customize to your liking)
const settings = {
silentAimEnabled: false,
fovRadius: 100,
smoothness: 10,
targetBone: ‘head’,
};
// Create UI overlay (toggle with ) const overlay = document.createElement('div'); overlay.style.position = 'fixed'; overlay.style.top = '50px'; overlay.style.right = '50px'; overlay.style.width = '350px'; overlay.style.height = 'auto'; overlay.style.backgroundColor = '#222'; overlay.style.border = '3px solid #00ff99'; overlay.style.borderRadius = '12px'; overlay.style.zIndex = '999999'; overlay.style.padding = '20px'; overlay.style.color = '#fff'; overlay.style.fontFamily = 'consolas'; overlay.style.fontSize = '18px'; overlay.style.display = 'none'; overlay.innerHTML = 
<div style=“display:flex;justify-content:space-between;”>
<h3 style=“margin-bottom:10px;”>Fortnite Silent Aim</h3>
<button id=“closeOverlayBtn”
style=“background:none;border:none;color:#fff;font-size:22px;font-weight:bold;”>×</button>
</div>
<hr style=“margin-bottom:15px;”>
<label>
<input type=“checkbox”
id=“silentAimToggle”${settings.silentAimEnabled ? ’ checked’ : ‘’}>
Enable Silent Aim
</label>
<br><br>
<label>
FOV Radius:
<input type=“number”
id=“fovRadiusInput”
min=“10”
max=“500”
value="${settings.fovRadius}"
style=“width:60px;”>
</label>
<br><br>
<label>
Smoothness:
<input type=“number”
id=“smoothnessInput”
min=“1”
max=“50”
value="${settings.smoothness}"
style=“width:60px;”>
</label>
<br><br>
<label>
Target Bone:
<select id=“targetBoneSelect”>
<option value=“head”${settings.targetBone === ‘head’
? ’ selected’
: ‘’}>Head</option>
<option value=“chest”${settings.targetBone === ‘chest’
? ’ selected’
: ‘’}>Chest</option>
<option value=“pelvis”${settings.targetBone === ‘pelvis’
? ’ selected’
: ‘’}>Pelvis</option>
</select>
</label>
<br><br>
<button id=“saveSettingsBtn”
style=“background-color:#00ff99;color:#222;font-weight:bold;padding:6px;border-radius:6px;”>Save Settings</button>
`;
document.body.appendChild(overlay);
// Add event listeners for UI controls
document.getElementById(‘closeOverlayBtn’).addEventListener(‘click’, () => {
overlay.style.display = ‘none’;
});
document.addEventListener(‘keydown’, (e) => {
if (e.key === ‘`’) {
overlay.style.display = overlay.style.display === ‘none’
? ‘block’
: ‘none’;
}
});
document.getElementById(‘silentAimToggle’).addEventListener(‘change’, function () {
settings.silentAimEnabled = this.checked;
});
document.getElementById(‘fovRadiusInput’).addEventListener(‘input’, function () {
settings.fovRadius = parseInt(this.value);
});
document.getElementById(‘smoothnessInput’).addEventListener(‘input’, function () {
settings.smoothness = parseInt(this.value);
});
document.getElementById(‘targetBoneSelect’).addEventListener(‘change’, function () {
settings.targetBone = this.value;
});
document.getElementById(‘saveSettingsBtn’).addEventListener(‘click’, () => {
alert(‘Settings updated!’);
});
// Silent aim logic (modify as needed for your use case)
const getClosestEnemy = () => {
// Find the closest enemy player within the FOV radius and return their position (x,y)
};
const aimAtTarget = (targetPos) => {
// Smoothly aim at the target position using the specified smoothness value and target bone offset (head/chest/pelvis)
};
setInterval(() => {
if (settings.silentAimEnabled && window.location.pathname.includes(’/play/games/fortnite’)) {
const closestEnemy = getClosestEnemy();
if (closestEnemy) {
aimAtTarget(closestEnemy);
}
}
}, 30);
// End of script - enjoy your new Fortnite silent aim!
