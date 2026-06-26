with open('js/database.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.finditer(r'id:\s*["\']([^"\']+)["\'],\s*name:\s*["\']([^"\']+)["\']', text)
for m in matches:
    print(m.group(1), "-->", m.group(2))
