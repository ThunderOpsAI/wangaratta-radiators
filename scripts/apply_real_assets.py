from PIL import Image
import os
import shutil

# 1. Prepare Logo
# Copy logo.jpg tightly cropped with white background as mcpherson-logo.png
img = Image.open('images/logo.jpg')
# Crop tightly: x in [10, 1060], y in [350, 670]
w, h = img.size
cropped_logo = img.crop((15, 350, 1060, 670))
cropped_logo.save('public/images/mcpherson-logo.png', quality=95)
cropped_logo.save('public/images/mcpherson-logo.jpg', quality=95)

# Also create mcpherson-logo.svg that wraps the clean logo
import base64
with open('public/images/mcpherson-logo.png', 'rb') as f:
    b64 = base64.b64encode(f.read()).decode('utf-8')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {cropped_logo.width} {cropped_logo.height}" width="100%" height="100%">
  <image href="data:image/png;base64,{b64}" width="{cropped_logo.width}" height="{cropped_logo.height}" />
</svg>'''
with open('public/images/mcpherson-logo.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

# Icon for favicon
icon_crop = cropped_logo.crop((0, 0, int(cropped_logo.width * 0.3), cropped_logo.height))
icon_sq = Image.new('RGB', (max(icon_crop.size) + 20, max(icon_crop.size) + 20), (255, 255, 255))
icon_sq.paste(icon_crop, ((icon_sq.width - icon_crop.width)//2, (icon_sq.height - icon_crop.height)//2))
icon_sq.save('public/images/mcpherson-icon.png')
fav_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
fav_images = [icon_sq.resize(s, Image.Resampling.LANCZOS) for s in fav_sizes]
fav_images[0].save('public/favicon.ico', format='ICO', sizes=fav_sizes, append_images=fav_images[1:])

# 2. Map and convert real images into public/images/projects
# Mapping:
# 2.webp -> Pool surround exposed aggregate (REPLACES generic patio project-05)
# 1.webp -> Hand trowel finishing
# 3.webp -> Screed driveway pour with crew
# 5.webp -> Walkway pour with chute & bobcat
# 6.webp -> Commercial polished warehouse floor
# 8.webp -> Completed house slab on residential lot
# 9.webp -> Pump truck boom hose pouring over rebar mesh
# 10.webp -> Finished engineered foundation slab with plumbing
# 11.webp -> Chute pouring concrete on steel mesh

def save_jpg(src_webp, dest_jpg):
    im = Image.open(src_webp).convert('RGB')
    im.save(os.path.join('public/images/projects', dest_jpg), quality=90)
    print(f"Saved {dest_jpg} from {src_webp}")

save_jpg('images/2.webp', 'project-05-alfresco-entertaining-patio.jpg') # Pool surround exposed aggregate
save_jpg('images/2.webp', 'project-pool-surround-exposed.jpg')
save_jpg('images/1.webp', 'project-04-nil-exposure-polished.jpg') # Trowel finishing
save_jpg('images/1.webp', 'project-concrete-finishing-trowel.jpg')
save_jpg('images/3.webp', 'project-01-exposed-aggregate-driveway.jpg') # Driveway pour with crew & screed
save_jpg('images/8.webp', 'project-03-house-foundation-pour.jpg') # Residential house slab
save_jpg('images/10.webp', 'project-02-machinery-shed-slab.jpg') # Engineered foundation slab
save_jpg('images/6.webp', 'project-06-commercial-civic-slab.jpg') # Polished commercial floor
save_jpg('images/5.webp', 'project-07-bobcat-excavation-prep.jpg') # Walkway & bobcat prep
save_jpg('images/9.webp', 'project-08-formwork-steel-mesh.jpg') # Pump boom pouring over steel mesh
save_jpg('images/11.webp', 'project-09-aggregate-detail-texture.jpg') # Chute pour onto mesh
save_jpg('images/2.webp', 'project-10-curved-decorative-pathway.jpg') # Pool / aggregate pathway
save_jpg('images/10.webp', 'project-11-shed-slab-after.jpg')
save_jpg('images/8.webp', 'project-12-driveway-after.jpg')

print("All real images mapped and saved successfully!")
