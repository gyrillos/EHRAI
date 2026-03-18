import sys
import os
from PIL import Image

output_folder = r"C:\Users\kyril\EHR_AI\Python\previews"

def convert_tiff_to_png(tiff_path):

    for f in os.path.join(output_folder):
        full_path = os.path.join(output_folder, f)
        if os.path.isfile(full_path):
            os.remove(full_path)

    tif = Image.open(tiff_path)
    output_files = []

    for i in range(tif.n_frames):
        tif.seek(i)

        page = tif.convert("RGB")

        filename = f"page_{i + 1}.png"
        output_path = os.path.join(output_folder, filename)

        page.save(output_path, "PNG")
        output_files.append(output_path)

    return output_files

def main():
    if len(sys.argv) < 2:
        print("Usage: python process_document.py <tiff_path>")
        sys.exit(1)

    tiff_path = sys.argv[1]

    try:
        files = convert_tiff_to_png(tiff_path)

        for file in files:
            print(file)

    except Exception as e:
        print(f"ERROR: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    main()
