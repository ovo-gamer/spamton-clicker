//Não mexe aqui o telefone quebra se você mexer, um tal de leyfo ajudou a consertar, não faço a menor ideia de quem é esse :P
function gerenciarCamadasMorte(protegerDaTinta, areaJogo) {
    const telefone = document.getElementById("telefone_p");
    const area = areaJogo || document.getElementById("area-jogo");
    if (!telefone || !area) return;

    if (protegerDaTinta) {
        if (telefone.parentElement !== document.body) {
            document.body.appendChild(telefone);
        }

        telefone.style.setProperty("display", "block", "important");
        telefone.style.setProperty("position", "fixed", "important");
        telefone.style.setProperty("top", "20px", "important");
        telefone.style.setProperty("left", "20px", "important");
        telefone.style.setProperty("right", "auto", "important");
        telefone.style.setProperty("bottom", "auto", "important");
        telefone.style.setProperty("width", "60px", "important");
        telefone.style.setProperty("height", "60px", "important");
        telefone.style.setProperty("margin", "0", "important");
        telefone.style.setProperty("z-index", "2147483647", "important");
    } else {
        if (telefone.parentElement !== area) {
            area.insertBefore(telefone, area.firstChild);
        }

        ["display", "position", "top", "left", "right", "bottom", "width", "height", "margin", "z-index"]
            .forEach(prop => telefone.style.removeProperty(prop));
    }
}
