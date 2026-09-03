



def get_limited_data(limit, skip, data:list):
    start = limit * skip
    end = start + limit
    
    return {
        "data":data[start:end],
        "total":len(data),
        "limit":limit,
        "skip":skip,
    }