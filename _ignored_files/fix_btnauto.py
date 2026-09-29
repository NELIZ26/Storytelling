import codecs

with codecs.open('js/story.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix both occurrences
find_str = "SB.el('btn-auto').innerHTML = SB.state.autoplay ? '<i class=\"fa-solid fa-pause\"></i> Pausa' : '<i class=\"fa-solid fa-play\"></i> Película';"
replace_str = "const btnAuto = SB.el('btn-auto'); if (btnAuto) btnAuto.innerHTML = SB.state.autoplay ? '<i class=\"fa-solid fa-pause\"></i> Pausa' : '<i class=\"fa-solid fa-play\"></i> Película';"

text = text.replace(find_str, replace_str)

with codecs.open('js/story.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Fixed btn-auto")
