from fastapi import Request, Query


def get_common_query(
    request:Request,
    limit:int = Query(50, ge=1, le=100),
    skip:int = Query(0, ge=0),
    search:str = Query(None),
    date: str = Query(None)
):
    return {
        "search":search,
        "limit":limit,
        "skip":skip,
        "request":request,
        "date":date
    }