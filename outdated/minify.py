#!/usr/bin/env python3
"""
Simple Minifier for Life OS
Run: python minify.py
"""

import os
import re

def minify_css(content):
    """Minify CSS"""
    # Remove comments
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    # Remove whitespace
    content = re.sub(r'\s+', ' ', content)
    content = re.sub(r'\s?([{}:;,])\s?', r'\1', content)
    content = re.sub(r';}', '}', content)
    return content.strip()

def minify_js(content):
    """Minify JS"""
    # Remove single line comments
    content = re.sub(r'//.*', '', content)
    # Remove multi-line comments (keeping license comments)
    content = re.sub(r'/\*(?!.*LICENSE.*).*?\*/', '', content, flags=re.DOTALL)
    # Remove whitespace
    content = re.sub(r'\s+', ' ', content)
    content = re.sub(r';\s*', ';', content)
    content = re.sub(r',\s*', ',', content)
    content = re.sub(r'\(\s*', '(', content)
    content = re.sub(r'\s*\)', ')', content)
    content = re.sub(r'{\s*', '{', content)
    content = re.sub(r'\s*}', '}', content)
    return content.strip()

def main():
    print("📦 Minifying Life OS files...")
    
    # Minify CSS
    with open('styles.css', 'r', encoding='utf-8') as f:
        css = f.read()
    css_min = minify_css(css)
    
    with open('styles.min.css', 'w', encoding='utf-8') as f:
        f.write(css_min)
    
    # # Minify JS
    # with open('app.js', 'r', encoding='utf-8') as f:
    #     js = f.read()
    # js_min = minify_js(js)

    # with open('app.min.js', 'w', encoding='utf-8') as f:
    #     f.write(js_min)

    # Minify backup CSS
    # with open('backup.css', 'r', encoding='utf-8') as f:
    #     backup_css = f.read()
    # backup_css_min = minify_css(backup_css)

    # with open('backup.min.css', 'w', encoding='utf-8') as f:
    #     f.write(backup_css_min)

    # Minify backup JS
    # with open('backup.js', 'r', encoding='utf-8') as f:
    #     backup_js = f.read()
    # backup_js_min = minify_js(backup_js)

    # with open('backup.min.js', 'w', encoding='utf-8') as f:
    #     f.write(backup_js_min)

    print("✅ Minification complete!")
    print(f"📊 CSS: {len(css):,}B → {len(css_min):,}B ({len(css_min)/len(css)*100:.1f}%)")
    # print(f"📊 JS: {len(js):,}B → {len(js_min):,}B ({len(js_min)/len(js)*100:.1f}%)")
    # print(f"📊 Backup CSS: {len(backup_css):,}B → {len(backup_css_min):,}B ({len(backup_css_min)/len(backup_css)*100:.1f}%)")
    # print(f"📊 Backup JS: {len(backup_js):,}B → {len(backup_js_min):,}B ({len(backup_js_min)/len(backup_js)*100:.1f}%)")
    print("\n🚀 Files created:")
    print("  - styles.min.css")
    print("  - app.min.js")
    # print("  - backup.min.css")
    # print("  - backup.min.js")

if __name__ == '__main__':
    main()