#!/usr/bin/env python3
"""
Renames animation frames from Russian names to sequential numbered files.
"""
import os
import shutil

BASE = os.path.dirname(os.path.abspath(__file__))
SRC_BASE = os.path.join(BASE, "public", "assets", "Анимация выигрыша")
DST_BASE = os.path.join(BASE, "public", "assets", "win-anim")

def sort_key(name):
    """Sort files: 'Без названия.png' first (=0), then by number."""
    if name == "Без названия.png":
        return -1
    # Try to extract number like "Без названия (N).png" -> N
    import re
    m = re.match(r"Без названия \((\d+)\)\.png", name)
    if m:
        return int(m.group(1))
    # Timestamp-based names come after
    return 10000 + name  # string sort fallback

def copy_frames(src_dir, dst_dir, prefix):
    os.makedirs(dst_dir, exist_ok=True)
    files = os.listdir(src_dir)
    # Filter only .png files
    files = [f for f in files if f.endswith(".png")]
    
    # Sort them
    import re
    def key(name):
        if name == "Без названия.png":
            return (0, 0, "")
        m = re.match(r"Без названия \((\d+)\)\.png", name)
        if m:
            return (1, int(m.group(1)), "")
        # timestamp names
        return (2, 0, name)
    
    files.sort(key=key)
    
    for i, fname in enumerate(files):
        src = os.path.join(src_dir, fname)
        dst = os.path.join(dst_dir, f"{prefix}{i:04d}.png")
        shutil.copy2(src, dst)
        print(f"  [{i:4d}] {fname} -> {os.path.basename(dst)}")
    
    print(f"  Total: {len(files)} frames")
    return len(files)

print("=== Copying Рамка (frame border) ===")
n_frame = copy_frames(
    os.path.join(SRC_BASE, "Рамка"),
    os.path.join(DST_BASE, "frame"),
    "f"
)

print("\n=== Copying Салют (fireworks) ===")
n_salut = copy_frames(
    os.path.join(SRC_BASE, "Салют"),
    os.path.join(DST_BASE, "salut"),
    "s"
)

print("\n=== Copying Стрелка (arrow) ===")
n_arrow = copy_frames(
    os.path.join(SRC_BASE, "Стрелка"),
    os.path.join(DST_BASE, "arrow"),
    "a"
)

print(f"\nDone! frame={n_frame}, salut={n_salut}, arrow={n_arrow}")
