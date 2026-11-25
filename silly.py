import shutil

INDEX_FILE = "index.html"

shutil.copyfile(INDEX_FILE, INDEX_FILE + ".bak")

with open(INDEX_FILE, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Default #silly-titulo to CORDINHAS MALUCAS and toggle dynamically in renderizarSillyStrings()
html = html.replace(
    '<div class="titulo-menu-pausa" id="silly-titulo" style="color: cyan; margin-bottom: 4px;">SILLY STRINGS</div>',
    '<div class="titulo-menu-pausa" id="silly-titulo" style="color: cyan; margin-bottom: 4px;">CORDINHAS MALUCAS</div>',
    1,
)

html = html.replace(
    'function renderizarSillyStrings() {\n            const en = idiomaAtual === "en";',
    'function renderizarSillyStrings() {\n            const en = idiomaAtual === "en";\n            document.getElementById("silly-titulo").textContent = en ? "SILLY STRINGS" : "CORDINHAS MALUCAS";',
    1,
)

# 2. Flip #tela-certificado base HTML text from English to Portuguese
cert_replacements = [
    (
        '<h2 id="certificado-titulo-h2" style="color: cyan; text-shadow: 2px 2px black; margin-bottom: 18px;">ACHIEVEMENT CERTIFICATE</h2>',
        '<h2 id="certificado-titulo-h2" style="color: cyan; text-shadow: 2px 2px black; margin-bottom: 18px;">CERTIFICADO DE CONQUISTA</h2>',
    ),
    (
        '<div id="certificado-titulo" style="font-size: 26px; color: yellow; font-weight: bold; text-shadow: 2px 2px black; margin-bottom: 12px; letter-spacing: 1px;">CERTIFICATE OF ACHIEVEMENT</div>',
        '<div id="certificado-titulo" style="font-size: 26px; color: yellow; font-weight: bold; text-shadow: 2px 2px black; margin-bottom: 12px; letter-spacing: 1px;">CERTIFICADO DE CONQUISTA</div>',
    ),
    (
        '<div id="certificado-confirma" style="font-size: 15px; color: #000000; text-shadow: 1px 1px #ffffff; margin-bottom: 14px;">This certificate confirms that</div>',
        '<div id="certificado-confirma" style="font-size: 15px; color: #000000; text-shadow: 1px 1px #ffffff; margin-bottom: 14px;">Este certificado confirma que</div>',
    ),
    (
        '<div id="certificado-reconhecido" style="font-size: 14px; color: #000000; text-shadow: 1px 1px #ffffff; margin-bottom: 12px;">has been officially recognized for</div>',
        '<div id="certificado-reconhecido" style="font-size: 14px; color: #000000; text-shadow: 1px 1px #ffffff; margin-bottom: 12px;">foi oficialmente reconhecido por</div>',
    ),
    (
        '<div id="certificado-desbloqueou" style="font-size: 20px; color: yellow; font-weight: bold; text-shadow: 2px 2px black; margin-bottom: 12px; letter-spacing: 1px;">unlocking all achievements</div>',
        '<div id="certificado-desbloqueou" style="font-size: 20px; color: yellow; font-weight: bold; text-shadow: 2px 2px black; margin-bottom: 12px; letter-spacing: 1px;">desbloquear todas as conquistas</div>',
    ),
    (
        '<div id="certificado-em" style="font-size: 13px; color: #000000; text-shadow: 1px 1px #ffffff;">in Spamton clicker</div>',
        '<div id="certificado-em" style="font-size: 13px; color: #000000; text-shadow: 1px 1px #ffffff;">no Spamton clicker</div>',
    ),
    (
        '<div style="margin-top: 24px; font-size: 11px; color: #666666; text-shadow: 1px 1px #ffffff;" id="certificado-assinado">Signed by Spamton on this device</div>',
        '<div style="margin-top: 24px; font-size: 11px; color: #666666; text-shadow: 1px 1px #ffffff;" id="certificado-assinado">Assinado pelo Spamton neste dispositivo</div>',
    ),
    (
        '<div style="font-size: 9px; color: #666666; text-shadow: 1px 1px #ffffff;" id="certificado-sig-right-sub">CEO of Everything</div>',
        '<div style="font-size: 9px; color: #666666; text-shadow: 1px 1px #ffffff;" id="certificado-sig-right-sub">CEO de Tudo</div>',
    ),
]

for old, new in cert_replacements:
    html = html.replace(old, new, 1)

with open(INDEX_FILE, "w", encoding="utf-8") as f:
    f.write(html)

print("Updated CORDINHAS MALUCAS title and flipped Certificate HTML to native Portuguese!")
