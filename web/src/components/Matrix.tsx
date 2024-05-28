import { useState } from "react"
import { Input } from "./Input"
import { fetchApi } from "../api"

type Props = {
    rows: number
    columns: number
    setData: any

}

export const Matrix = ({ rows, columns, setData }: Props) => {

    const [initialValue, setInitialValue] = useState(0)

    const [matrix, setMatrix] = useState(Array.from({ length: rows }, () =>
        Array.from({ length: columns }, () => 0)))
    const [matrixCost, setMatrixCost] = useState(Array.from({ length: rows }, () =>
        Array.from({ length: columns }, () => 0)))


    const updateCellValue = (rowIndex: any, colIndex: any, newValue: any) => {
        const newMatrix = matrix.map((row, i) =>
            i === rowIndex ? row.map((cell, j) => (j === colIndex ? newValue : cell)) : row
        );
        setMatrix(newMatrix);
    };

    const updateCellValueCost = (rowIndex: any, colIndex: any, newValue: any) => {
        const newMatrix = matrixCost.map((row, i) =>
            i === rowIndex ? row.map((cell, j) => (j === colIndex ? newValue : cell)) : row
        );
        setMatrixCost(newMatrix);
    };


    return (
        <div className=" flex flex-col gap-2 ">

            <Input label="Valor" type={"number"} value={initialValue} onChange={(e: any) => { setInitialValue(e.target.value) }} />
            <h2 className="w-full text-center p-2 text-white bg-red-950 text-sm font-bold">Probabilidad de funcionamiento</h2>

            <table className={` table table-zebra  w-auto`}>
                <thead>
                    <tr className="text-xs font-bold">
                        {Array.from({ length: columns }, (_, index) => (
                            // Render a div for each number
                            <th key={index}>Componente {index + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {matrix.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td key={colIndex} >
                                    <input
                                        type="number"
                                        value={cell}
                                        className=" bg-transparent w-16 text-center border-none"
                                        onChange={(e: any) =>
                                            updateCellValue(rowIndex, colIndex, parseFloat(e.target.value))
                                        }
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className="w-full text-center p-2 text-white bg-red-950 text-sm  font-bold">Costos</h2>
            <table className={` table table-zebra  w-auto`}>
                <thead>
                    <tr className="text-xs font-bold">
                        {Array.from({ length: columns }, (_, index) => (
                            // Render a div for each number
                            <th key={index}>Componente {index + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {matrixCost.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td key={colIndex}>
                                    <input
                                        type="number"
                                        value={cell}
                                        className=" bg-transparent w-16 text-center border-none"
                                        onChange={(e: any) =>
                                            updateCellValueCost(rowIndex, colIndex, parseFloat(e.target.value))
                                        }
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="btn rounded-none bg-black text-white font-bold" onClick={async () => {
                const res = await fetchApi(initialValue, matrixCost, matrix)
                setData(res)

            }}>Aceptar</button>


        </div >
    )


}
