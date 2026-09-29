import codecs

with codecs.open('js/games.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix the quotes
text = text.replace('SB.showToast("<i class="fa-solid fa-xmark"></i> Intenta de nuevo.");', 
                    "SB.showToast('<i class=\"fa-solid fa-xmark\"></i> Intenta de nuevo.');")

with codecs.open('js/games.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Fixed syntax error")
