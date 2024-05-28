from dto_api import DataInput

def get_nodes(data,value):
    list_node=[]
    list_node.append([value])
    for i in range(0,len(data)):
            _list=[]
            for x in list_node[len(list_node)-1]:
                for j in range(0,len(data[0])):
                    if(i<len(data)-1):
                        if(verifyNode(data[i],x,i) and x-(data[i][j]*100)>0 ):
                                if (x-(data[i][j]*100)) not in _list :
                                    _list.append(x-data[i][j]*100)
                    else:
                        if (x-(data[i][j]*100)) not in _list and x-(data[i][j]*100)>=0 :
                             _list.append(x-data[i][j]*100)
            list_node.append(sorted(_list,reverse=True))
    print(list_node) 
    return list_node

def list_final(list_node):
    count=65
    list_final=[]
    for i in range(0,len(list_node)):
        data=dict({})
        for j in range(0,len(list_node[i])):
            data[chr(count)]=list_node[i][j]
            count=count+1
        list_final.append(data.copy())
    print(list_final)
    return list_final

def verifyNode(array,value,i):
    for x in range(0,len(array)):
        if(value-(array[x]*100)>0 ):
            return True
    return False

def create_grap(nodes,matrix_one,matrix_two):
    dict_final={}
    for i in range(0,len(nodes)-1):
        for key,value in nodes[i].items():
                data=dict({})
                for y in range(0,len(matrix_one[0])):
                    if(i<len(matrix_one)):
                        key_node=search_node_value(nodes[i+1],value-matrix_one[i][y]*100)
                        if(key_node!=None):
                            data[key_node]=matrix_two[i][y]
                if(data=={}):
                    return [i,value]
                dict_final[key]=data
    return dict_final


def search_node_value(nodes,value_node):
    for key,value in nodes.items():
        if(value==value_node):
            return key
    return None 

def solver(nodes,graph):
    table_values=[]
    for i in range(0,len(nodes)-1):
        cols=getKey(nodes[i])
        row=getKey(nodes[i+1])
        table_stage=[]
        table_stage.append([f"S{len(nodes)-i-1}"]+cols+[f"F{len(nodes)-i-1} * S{len(nodes)-i-1}",'X'])
        for x in row:
            _list=[-1]*(len(cols)+3)
            count=0
            for key ,value in graph[x].items():
                if(i==0):
                    _list[cols.index(key)+1]=value
                else:
                    row_preview=[_list_preview for _list_preview in table_values[len(table_values)-1] if key in _list_preview][0]
                    _list[cols.index(key)+1]=value*row_preview[len(row_preview)-2]
                    count=count+1
            _list[0]=x
            _list[len(_list)-2]=max(_list[1:len(cols)+1])
            _list[len(_list)-1]=cols[_list.index(max(_list[1:len(cols)+1]))-1]
            table_stage.append(_list)
            print(_list)
        table_values.append(table_stage)
        i=i+1
        print()
    
    return table_values
def getKey(nodes):
    key_list=[]
    for key in nodes:
        key_list.append(key)
         
    return key_list    
        
def get_route(tables):
    _list_route=[]
    _list_route.append(tables[0][1][0])
    _list_route.append(tables[0][1][len(tables[0][1])-1])
    for i in range(1,len(tables)):
        array=[_list_preview for _list_preview in tables[i] if _list_route[len(_list_route)-1] in _list_preview][0]
        _list_route.append(array[len(array)-1])

    print(_list_route)
    return _list_route,


def main_solve(data:DataInput):
    list_node=get_nodes(data.matrix_value_node,data.initial_value)
    nodes=list_final(list_node)

    dict_final=create_grap(nodes,data.matrix_value_node,data.matrix_value_connection)
    while(isinstance(dict_final,list)):
        list_node[dict_final[0]].remove(dict_final[1])
        nodes=list_final(list_node)
        dict_final=create_grap(nodes,data.matrix_value_node,data.matrix_value_connection)

    nodes=list_final(list_node)
    print(dict_final)
    tables=solver(list(reversed(nodes)),dict(reversed(list(dict_final.items()))))

    route=get_route(list(reversed(tables)))

    
    return {
            "graph":dict_final,
            "nodes":nodes,
            "tables":tables,
            "route":route
            }






