export const Tables = ({ tables }: { tables: any }) => {
    const size = tables.length


    return (
        <>
            {tables.map((table, index) => (
                <>
                    <h2 className="w-full text-center p-1 text-white bg-red-950 text-sm font-bold">Etapa {size - index}</h2>
                    <table className={` table w-auto`}>
                        <thead>
                            {table.map((row, index) => (
                                <tr>
                                    {row.map((cell, colIndex) => (
                                        <>
                                            {index === 0 &&
                                                <th key={colIndex} >
                                                    {cell === -1 ? "" : cell}
                                                </th>
                                            }
                                        </>

                                    ))}

                                </tr>
                            ))}
                        </thead>

                        <tbody>
                            {table.map((row, index) => (
                                <tr>
                                    {row.map((cell, colIndex) => (
                                        <>
                                            {index !== 0 &&
                                                <th key={colIndex} >
                                                    {cell === -1 ? "" : cell.toString().substring(0, 4)}
                                                </th>
                                            }
                                        </>
                                    ))}

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ))}
        </>
    )


}

