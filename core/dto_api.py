from typing import List
from pydantic import BaseModel

class DataInput (BaseModel):
    initial_value:int
    matrix_value_node:List[List[float]]
    matrix_value_connection:List[List[float]]

