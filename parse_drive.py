import re

filepath = r"C:\Users\DELL\.gemini\antigravity\brain\7bfcc32b-1b71-4903-9268-50a153591aa4\.system_generated\steps\478\content.md"

with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

# Let's search for any strings that look like filenames or titles
print("Length of content:", len(text))

# Google Drive INITIAL_DATA usually contains lists of files
# Let's look for any occurrences of names/titles of gemstones or common image extensions like png, jpg, webp, pdf
extensions = re.findall(r'["\']([^"\']+\.(?:png|jpg|jpeg|webp|pdf|docx|xlsx))["\']', text, re.IGNORECASE)
print("Found extensions count:", len(extensions))
for ext in list(set(extensions))[:30]:
    print(ext)

# Let's also look for strings like "Ceylon" or "Sapphire" or "Emerald" or "Ruby" to see where they are
words = ["Sapphire", "Emerald", "Ruby", "Panna", "Neelam", "Pukhraj", "Manik", "Opal", "Pearl", "Coral"]
for w in words:
    matches = list(re.finditer(w, text, re.IGNORECASE))
    print(f"Word '{w}' matches:", len(matches))
