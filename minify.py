import os
import rjsmin
import cssmin

def minify_files():
    folders = ['core', 'engine', 'styles', 'ui', 'utils']

    for folder in folders:
        if not os.path.exists(folder):
            print(f"Folder {folder} does not exist. Skipping.")
            continue

        for filename in os.listdir(folder):
            filepath = os.path.join(folder, filename)

            if os.path.isfile(filepath):
                if filename.endswith('.js') and not filename.endswith('.min.js'):
                    # Minify JavaScript
                    try:
                        with open(filepath, 'r', encoding='utf-8') as f:
                            content = f.read()
                        minified = rjsmin.jsmin(content)
                        min_filepath = filepath.replace('.js', '.min.js')
                        with open(min_filepath, 'w', encoding='utf-8') as f:
                            f.write(minified)
                        print(f"Minified {filepath} to {min_filepath}")
                    except Exception as e:
                        print(f"Error minifying {filepath}: {e}")

                elif filename.endswith('.css') and not filename.endswith('.min.css'):
                    # Minify CSS
                    try:
                        with open(filepath, 'r', encoding='utf-8') as f:
                            content = f.read()
                        minified = cssmin.cssmin(content)
                        min_filepath = filepath.replace('.css', '.min.css')
                        with open(min_filepath, 'w', encoding='utf-8') as f:
                            f.write(minified)
                        print(f"Minified {filepath} to {min_filepath}")
                    except Exception as e:
                        print(f"Error minifying {filepath}: {e}")

if __name__ == "__main__":
    minify_files()
