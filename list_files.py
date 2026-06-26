import os
for root, dirs, files in os.walk('.'):
    for f in files:
        if not f.endswith('.png') and not '.git' in root and not '.firebase' in root:
            print(os.path.join(root, f))
