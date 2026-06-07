import os

def check_seq(prefix, count, path):
    missing = []
    for i in range(count):
        fname = f"{prefix}{str(i).zfill(4)}.png"
        if not os.path.exists(os.path.join(path, fname)):
            missing.append(fname)
    if missing:
        print(f"Missing in {path}: {len(missing)} files")
        if len(missing) < 10:
            print(missing)

check_seq("f", 152, "public/assets/win-anim/frame")
check_seq("s", 156, "public/assets/win-anim/salut1")
check_seq("s", 156, "public/assets/win-anim/salut2")
check_seq("s", 156, "public/assets/win-anim/salut3")
check_seq("a", 48, "public/assets/win-anim/arrow")
check_seq("sm", 134, "public/assets/win-anim/smoke1")
check_seq("sm", 135, "public/assets/win-anim/smoke2")
check_seq("sm", 133, "public/assets/win-anim/smoke3")
check_seq("sm", 136, "public/assets/win-anim/smoke4")
print("Done checking.")
