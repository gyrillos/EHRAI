import json
import os
import sys
import cv2
import torch
import pytesseract
from PIL import Image
from transformers import TrOCRProcessor, VisionEncoderDecoderModel

def ocr_each_page():


    pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

    all_text = []

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    preview_path = os.path.join(BASE_DIR, "previews")

    processor = TrOCRProcessor.from_pretrained("microsoft/trocr-base-handwritten")
    model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-handwritten")
    model.eval()

    for filename in sorted(os.listdir(preview_path)):
        full_path = os.path.join(preview_path, filename)

        img = cv2.cvtColor(cv2.imread(full_path), cv2.COLOR_BGR2RGB)

        config_tesseract = '--psm 6'

        printed_text = pytesseract.image_to_string(img, config=config_tesseract)

        pil_img = Image.fromarray(img).convert("RGB")
        pixel_values = processor(images=pil_img, return_tensors="pt").pixel_values

        with torch.no_grad():
            generated_ids = model.generate(pixel_values, max_new_tokens=64)

        handwriting_text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0].strip()

        # combine both results
        text = f"TESSERACT:\n{printed_text}\n\nTrOCR:\n{handwriting_text}"
        all_text.append(text)

    with open(os.path.join(BASE_DIR, "./OCR", "OCRText.txt"), "w") as file:
        file.writelines(line + "\n" for line in all_text)





def main():
    try:
        ocr_each_page()
        print(json.dumps({"status": "OCR complete"}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()

