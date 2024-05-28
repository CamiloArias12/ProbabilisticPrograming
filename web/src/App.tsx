import { useState } from "react"
import { Input } from "./components/Input"
import { Matrix } from "./components/Matrix"
import { Graph } from "./components/Graph"
import { Tables } from "./components/Tables"

function App() {

    const [component, setComponent] = useState(0)
    const [parallelUnit, setParallelUnit] = useState(0)
    const [showMatrix, setShowMatrix] = useState(false)
    const [data, setData] = useState(null)


    return (
        <div className='flex flex-col h-full w-full  gap-2 overflow-scroll'>
            <p className="w-full text-center p-4 text-white bg-red-950 text-xl  font-bold">Programación Dinámica Probabilística PDP</p>
            <div className=" flex flex-row h-full ">
                <div className='flex flex-col gap-2 w-1/2 overflow-scroll h-full  px-4 border-r-4 border-red-950'>
                    <div className='flex flex-row gap-2 items-end '>
                        <Input label="Numero de componentes" type={"number"} value={component} onChange={(e: any) => {
                            setShowMatrix(false)
                            setComponent(e.target.value)
                        }} />
                        <Input label="Numero de unidades" type={"number"} value={parallelUnit} onChange={(e: any) => {
                            setShowMatrix(false)
                            setParallelUnit(e.target.value)
                        }} />

                        <button className="btn rounded-none bg-black text-white font-bold w-auto" onClick={() => { setShowMatrix(true) }}>Aceptar</button>
                    </div>
                    {showMatrix && <Matrix columns={Number(component)} rows={Number(parallelUnit)} setData={setData} />}
                    {data && <Tables tables={data.tables} />}
                </div>
                <div className="w-1/2">
                    {data && <Graph graph_data={data.graph} value_nodes={data.nodes} route={data.route} />}
                </div>
            </div>

        </div>
    )
}

export default App
