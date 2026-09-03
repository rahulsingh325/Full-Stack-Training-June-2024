import os, json


def read_data(file_path):
    if os.path.exists(file_path):
        with open(file_path, "r") as file:
            try:
                content = file.read().strip()
                if not content:  # empty file
                    return []
                return json.loads(content)
            except json.JSONDecodeError:
                return []  # corrupted file fallback
    else:
        # create empty file if it doesn't exist
        with open(file_path, "w") as file:
            json.dump([], file)
        return []