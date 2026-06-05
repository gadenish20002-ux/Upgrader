import json
import re

with open('/home/supergut/.gemini/antigravity/brain/3acafa49-eb74-429c-bbc5-41514a026299/.system_generated/logs/transcript.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        if data.get('type') == 'USER_INPUT' and 'ng-lottie' in data.get('content', ''):
            content = data['content']
            start = content.find('<ng-lottie')
            if start != -1:
                svg_content = content[start:]
                
                # We need to transform the HTML to React JSX
                # For now, let's just save it to a raw file
                with open('raw_svg.txt', 'w', encoding='utf-8') as out:
                    out.write(svg_content)
                break
