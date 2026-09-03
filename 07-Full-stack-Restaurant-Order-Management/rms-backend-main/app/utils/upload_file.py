from app.config import UPLOAD_DIR, IMAGES_DIR
import os, uuid, shutil

async def upload_single_file(file):
    try:
        file_extention = os.path.splitext(file.filename)[1]
        file_name = f"{uuid.uuid4()}{file_extention}"
        file_path = os.path.join(UPLOAD_DIR, IMAGES_DIR, file_name)
        
        with open(file_path, 'wb') as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        return file_path
    except Exception as error:
        print('Error in upload_single_file', error)
    
    
    