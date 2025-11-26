// ==UserScript==
// @name         Fortnite Cloud Visual Overlay (Simulation)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Simulates ESP-like overlays and target tracking purely client-side for learning / visualization.
// @author       You
// @match        https://www.xbox.com
// @grant        none
// ==/UserScript==

(() => {
  const ui = document.createElement("div");
  Object.assign(ui.style, {
    position: "fixed",
    top: "50px",
    right: "50px",
    width: "320px",
    background: "rgba(20,20,20,0.9)",
    border: "2px solid #0f0",
    borderRadius: "8px",
    padding: "18px",
    color: "#fff",
    fontFamily: "Consolas, monospace",
    zIndex: "999999",
    display: "none",
  });

  ui.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <h3 style="margin:0;">Overlay Simulation</h3>
      <button id="closeUI" style="background:none;border:none;color:#0f0;font-size:20px;cursor:pointer;">×</button>
    </div>
    <hr>
    <label><input type="checkbox" id="espToggle"> Show Outlines</label><br>
    <label><input type="checkbox" id="aimToggle"> Simulate Aim Tracking</label>
  `;
  document.body.appendChild(ui);

  const canvas = document.createElement("canvas");
  Object.assign(canvas.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "99990",
  });
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  let espEnabled = false;
  let aimEnabled = false;

  document.getElementById("espToggle").onchange = e => {
    espEnabled = e.target.checked;
  };
  document.getElementById("aimToggle").onchange = e => {
    aimEnabled = e.target.checked;
  };
  document.getElementById("closeUI").onclick = () => ui.style.display = "none";
  document.addEventListener("keydown", e => {
    if (e.key === "`") ui.style.display = ui.style.display === "none" ? "block" : "none";
  });

  const fakeTargets = Array.from({length:8}, () => ({
    x: Math.random()*innerWidth,
    y: Math.random()*innerHeight,
    size: 80 + Math.random()*40,
    vx: (Math.random()-0.5)*2,
    vy: (Math.random()-0.5)*2
  }));

  function drawOverlay() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if (espEnabled) {
      ctx.strokeStyle = "#00ff99";
      ctx.lineWidth = 2;
      fakeTargets.forEach(t=>{
        ctx.strokeRect(t.x, t.y, t.size, t.size);
      });
    }
    if (aimEnabled) {
      const target = fakeTargets[Math.floor(Math.random()*fakeTargets.length)];
      ctx.beginPath();
      ctx.strokeStyle = "#ff0066";
      ctx.arc(target.x+target.size/2, target.y+target.size/2, 40, 0, 2*Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(innerWidth/2, innerHeight/2);
      ctx.lineTo(target.x+target.size/2, target.y+target.size/2);
      ctx.stroke();
    }
  }

  function tick() {
    fakeTargets.forEach(t=>{
      t.x += t.vx;
      t.y += t.vy;
      if (t.x < 0 || t.x+t.size > innerWidth) t.vx *= -1;
      if (t.y < 0 || t.y+t.size > innerHeight) t.vy *= -1;
    });
    drawOverlay();
    requestAnimationFrame(tick);
  }
  tick();

  window.addEventListener("resize",()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  });
})();
