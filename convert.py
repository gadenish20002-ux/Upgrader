import re

with open('raw_svg.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace ng-lottie with div, keeping classes
# Extract the classes from ng-lottie
m = re.search(r'<ng-lottie\s+class="([^"]+)"', content)
classes = m.group(1) if m else "w-full transition-opacity duration-500 lg:absolute lg:-left-[16.5%] lg:w-[133%] opacity-100"

# Add mt-5 and pointer-events-none just in case, to match spacing and avoid blocking clicks
classes += " mt-5 pointer-events-none"

# Extract the inner HTML (everything inside <ng-lottie>)
inner_m = re.search(r'<ng-lottie[^>]*>(.*?)</ng-lottie>', content, flags=re.DOTALL)
inner_html = inner_m.group(1) if inner_m else ""

# If inner_html wasn't found properly, maybe the tag is not closed as expected. Let's fallback
if not inner_html:
    inner_html = re.sub(r'^<ng-lottie[^>]*>', '', content)
    inner_html = re.sub(r'</ng-lottie>$', '', inner_html)

# We must escape backticks and $ for template literals if we use it, or just use JSON dumps
import json
inner_html_json = json.dumps(inner_html)

react_component = f"""
export function UnauthAnimation() {{
  return (
    <div 
      className="{classes}"
      dangerouslySetInnerHTML={{{{ __html: {inner_html_json} }}}}
    />
  );
}}
"""

with open('components/unauth-animation.tsx', 'w', encoding='utf-8') as f:
    f.write(react_component)
