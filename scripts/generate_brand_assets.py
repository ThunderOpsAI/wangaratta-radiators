from PIL import Image
import numpy as np

# Load transparent logo
logo = Image.open('scripts/logo_transparent.png')
arr = np.array(logo)

# Save standard full-res PNG
logo.save('public/images/mcpherson-logo.png', optimize=True)
logo.save('public/images/mcpherson-logo.webp', quality=95)

# 1. Create dark-background version (where black/dark gray pixels become crisp white)
arr_dark = arr.copy()
r = arr_dark[:, :, 0]
g = arr_dark[:, :, 1]
b = arr_dark[:, :, 2]
a = arr_dark[:, :, 3]

# Black/dark pixels: low red, green, and blue, but high alpha
is_dark = (r < 80) & (g < 80) & (b < 80) & (a > 50)
# Transition near edges
is_dark_transition = (r < 140) & (g < 140) & (b < 140) & (b <= r + 20) & (a > 30)

arr_dark[is_dark, 0] = 255
arr_dark[is_dark, 1] = 255
arr_dark[is_dark, 2] = 255

arr_dark[is_dark_transition, 0] = 255
arr_dark[is_dark_transition, 1] = 255
arr_dark[is_dark_transition, 2] = 255

logo_dark = Image.fromarray(arr_dark)
logo_dark.save('public/images/mcpherson-logo-dark-mode.png', optimize=True)

# 2. Create icon / favicon from SMC mark + arrow (left part of logo)
# In logo_transparent: SMC mark is on the left
# Let's crop just the SMC mark + angled line
# The angled line ends around x = 270 in logo_transparent.png
w, h = logo.size
smc_icon = logo.crop((0, 0, int(w * 0.28), h))
# Square container with padding
size = max(smc_icon.width, smc_icon.height) + 20
icon_sq = Image.new('RGBA', (size, size), (255, 255, 255, 0))
offset_x = (size - smc_icon.width) // 2
offset_y = (size - smc_icon.height) // 2
icon_sq.paste(smc_icon, (offset_x, offset_y), smc_icon)
icon_sq.save('public/images/mcpherson-icon.png')

# Save multi-size favicon.ico
fav_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
fav_images = [icon_sq.resize(s, Image.Resampling.LANCZOS) for s in fav_sizes]
fav_images[0].save('public/favicon.ico', format='ICO', sizes=fav_sizes, append_images=fav_images[1:])

print("Created logos and favicons successfully!")
