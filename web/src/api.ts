export const fetchApi = async (initialValue: number, matrix_value_node: any, matrix_value_connection: any) => {
    try {

        const matrix_node = []
        const matrix_connection = []
        for (let i = 0; i < matrix_value_node[0].length; i++) {
            const list = []
            const list_conection = []
            for (let j = 0; j < matrix_value_node.length; j++) {
                list.push(matrix_value_node[j][i])
                list_conection.push(matrix_value_connection[j][i])
            }
            matrix_node.push(list)
            matrix_connection.push(list_conection)
        }

        const response = await fetch('http://localhost:8000/', {


            method: 'POST',
            body: JSON.stringify({
                initial_value: initialValue,
                matrix_value_node: matrix_node,
                matrix_value_connection: matrix_connection
            }),
            headers: {
                'Content-type': 'application/json',
            }

        })

        const data_api = await response.json()
        console.log(data_api)
        return data_api
    } catch (e) {
        console.log(e)
    }
}
