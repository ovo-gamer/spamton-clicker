(() => {
    if (new URLSearchParams(window.location.search).get("developer") !== "1") return;
    if (!window.gameDeveloperTools) {
        throw new Error("Developer tools failed to initialize.");
    }

    const styles = document.createElement("style");
    styles.textContent = `
        #developer-panel {
            position: fixed;
            z-index: 99999970;
            right: 12px;
            bottom: 0;
            width: min(440px, calc(100vw - 24px));
            max-height: 85vh;
            color: white;
            background: rgba(15, 15, 20, .97);
            border: 2px solid #ffcc00;
            border-bottom: 0;
            box-shadow: 0 0 12px #000;
            font: 14px 'Courier New', monospace;
            text-align: left;
        }
        #developer-panel[hidden] { display: none; }
        #developer-panel button,
        #developer-panel input {
            box-sizing: border-box;
            min-height: 36px;
            font: inherit;
        }
        #developer-toggle {
            width: 100%;
            padding: 8px 12px;
            color: #ffcc00;
            background: #222;
            border: 0;
            cursor: pointer;
            font-weight: bold !important;
            text-align: left;
        }
        #developer-controls {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 8px;
            padding: 12px;
            max-height: calc(85vh - 45px);
            overflow-y: auto;
        }
        #developer-controls label { grid-column: 1 / -1; }
        #developer-controls input {
            width: 100%;
            padding: 5px 8px;
        }
        #developer-controls button {
            padding: 5px 10px;
            color: white;
            background: #333;
            border: 1px solid #ffcc00;
            cursor: pointer;
        }
        #developer-controls .developer-wide { grid-column: 1 / -1; }
        #developer-status {
            grid-column: 1 / -1;
            min-height: 1.2em;
            color: #9fffc0;
        }
    `;
    document.head.appendChild(styles);

    const panel = document.createElement("section");
    panel.id = "developer-panel";
    panel.hidden = true;
    panel.innerHTML = `
        <button id="developer-toggle" type="button" aria-expanded="false">Developer tools — this browser's local save</button>
        <div id="developer-controls" hidden>
            <label for="developer-kromer">Add Kromer</label>
            <input id="developer-kromer" type="number" min="1" step="1" value="1000000">
            <button id="developer-add-kromer" type="button">Add</button>
            <label for="developer-kps">Set Kromer per second (KPS)</label>
            <input id="developer-kps" type="number" min="0" step="1" value="0">
            <button id="developer-set-kps" type="button">Set KPS</button>
            <label for="developer-kpc">Set Kromer per click (KPC)</label>
            <input id="developer-kpc" type="number" min="0" step="1" value="1">
            <button id="developer-set-kpc" type="button">Set KPC</button>
            <label for="developer-friend-level">Set Friend level (0–100)</label>
            <input id="developer-friend-level" type="number" min="0" max="100" step="1" value="0">
            <button type="button" data-darkner="friend">Set Friend</button>
            <label for="developer-lancer-level">Set Lancer level (0–100)</label>
            <input id="developer-lancer-level" type="number" min="0" max="100" step="1" value="0">
            <button type="button" data-darkner="lancer">Set Lancer</button>
            <label for="developer-pink-level">Set Pink level (0–100)</label>
            <input id="developer-pink-level" type="number" min="0" max="100" step="1" value="0">
            <button type="button" data-darkner="pink">Set Pink</button>
            <label for="developer-gaster-level">Set Gaster level (0–100)</label>
            <input id="developer-gaster-level" type="number" min="0" max="100" step="1" value="0">
            <button type="button" data-darkner="gaster">Set Gaster</button>
            <button id="developer-unlock-achievements" class="developer-wide" type="button">Unlock all achievements</button>
            <label for="developer-pipis-count">Spawn Pipis (1–25)</label>
            <input id="developer-pipis-count" type="number" min="1" max="25" step="1" value="1">
            <button id="developer-spawn-pipis" type="button">Spawn</button>
            <div id="developer-status" role="status" aria-live="polite"></div>
        </div>
    `;
    document.body.appendChild(panel);

    const toggle = panel.querySelector("#developer-toggle");
    const controls = panel.querySelector("#developer-controls");
    const status = panel.querySelector("#developer-status");
    const area = document.getElementById("area-jogo");

    function updateVisibility() {
        panel.hidden = getComputedStyle(area).display === "none";
    }

    function run(action, successMessage) {
        try {
            const result = action();
            status.textContent = successMessage(result);
        } catch (error) {
            console.error("Developer tool action failed.", error);
            status.textContent = error.message || "Action failed.";
        }
    }

    toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        controls.hidden = expanded;
    });
    panel.querySelector("#developer-add-kromer").addEventListener("click", () => {
        const amount = panel.querySelector("#developer-kromer").value;
        run(() => window.gameDeveloperTools.addKromer(amount), total => `Added Kromer. Balance: ${Math.floor(total).toLocaleString()}.`);
    });
    panel.querySelector("#developer-set-kps").addEventListener("click", () => {
        const value = panel.querySelector("#developer-kps").value;
        run(() => window.gameDeveloperTools.setKps(value), total => `KPS set to ${total.toLocaleString()}.`);
    });
    panel.querySelector("#developer-set-kpc").addEventListener("click", () => {
        const value = panel.querySelector("#developer-kpc").value;
        run(() => window.gameDeveloperTools.setKpc(value), total => `KPC set to ${total.toLocaleString()}.`);
    });
    panel.querySelectorAll("[data-darkner]").forEach(button => {
        button.addEventListener("click", () => {
            const name = button.dataset.darkner;
            const value = panel.querySelector(`#developer-${name}-level`).value;
            run(() => window.gameDeveloperTools.setDarknerLevel(name, value), level => `${name[0].toUpperCase()}${name.slice(1)} set to level ${level}.`);
        });
    });
    panel.querySelector("#developer-unlock-achievements").addEventListener("click", () => {
        run(() => window.gameDeveloperTools.unlockAllAchievements(), total => `Unlocked ${total} achievements.`);
    });
    panel.querySelector("#developer-spawn-pipis").addEventListener("click", () => {
        const count = panel.querySelector("#developer-pipis-count").value;
        run(() => window.gameDeveloperTools.spawnPipis(count), total => `Spawned ${total} Pipis.`);
    });

    new MutationObserver(updateVisibility).observe(area, { attributes: true, attributeFilter: ["style"] });
    updateVisibility();
})();
