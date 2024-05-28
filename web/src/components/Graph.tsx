import { useEffect, useRef, } from "react"
import G6 from '@antv/g6';
type Props = {
    graph_data: any
    value_nodes: any
    route: any
}

export const Graph = ({ graph_data, value_nodes, route }: Props) => {
    console.log(Object.keys(graph_data))

    const ref = useRef(null)
    let graph: any = null

    // 边tooltip坐标

    const bindEvents = () => {
        // 监听edge上面mouse事件
        graph.on('edge:mouseenter', (evt: any) => {
            const { item, target } = evt
            debugger
            const type = target.get('type')
            if (type !== 'text') {
                return
            }
            const model = item.getModel()
            const { endPoint } = model
            // y=endPoint.y - height / 2，在同一水平线上，x值=endPoint.x - width - 10
            const y = endPoint.y - 35
            const x = endPoint.x - 150 - 10
            const point = graph.getCanvasByPoint(x, y)
        })




    }

    const found_key = (key) => {
        for (let value of route[0]) {
            console.log(value, key)
            if (key === value) {
                return true
            }
        }
    }

    useEffect(() => {
        console.log("route", route)
        let nodes = []
        let edges_graph = []
        for (let i = 0; i < value_nodes.length; i++) {
            for (let [key, value] of Object.entries(value_nodes[i])) {
                console.log(route[0].find(value => value === key))
                if (found_key(key)) {
                    console.log('ejka')
                    nodes.push({
                        id: key, label: `${key}-${value}`
                        , style: {
                            fill: '#ff5a5a',
                            stroke: '#000000'
                        }

                    })

                } else {
                    nodes.push({
                        id: key, label: `${key}-${value}`
                    })

                }
            }
        }
        for (let key in graph_data) {
            const connetions = graph_data[key]
            for (let [key_data, value] of Object.entries(connetions)) {

                if (found_key(key) && found_key(key_data)) {

                    edges_graph.push({
                        source: key, target: key_data, label: `${value}`
                        , style: {
                            lineWidth: 4,
                            stroke: '#ff5a5a'
                        }
                    })

                } else {
                    edges_graph.push({
                        source: key, target: key_data, label: `${value}`
                    })

                }
            }
        }



        if (!graph) {
            const miniMap = new G6.Minimap()
            graph = new G6.Graph({
                container: ref.current,
                animate: true,
                animateCfg: {
                    duration: 500, // Number, the duration of one animation
                },
                modes: {
                    default: ['drag-canvas', 'drag-node']
                },
                defaultNode: {
                    size: 45,
                    style: {
                        fill: '#0044fd',
                    }
                },

                defaultEdge: {
                    shape: 'circle-running',
                    style: {
                        lineWidth: 2,
                        stroke: '#0044fd'
                    }
                },
                // 节点交互状态配置
                nodeStateStyles: {
                    hover: {
                        stroke: 'red',
                        lineWidth: 3
                    }
                },
                edgeStateStyles: {
                    hover: {
                        stroke: 'blue',
                        lineWidth: 3
                    }
                },
                layout: {
                    type: 'dagre',
                    rankdir: 'LR',
                    nodesep: 30,
                    ranksep: 40
                },
                plugins: [miniMap]
            })
        }

        graph.data({
            nodes: nodes,
            edges: edges_graph
        }
        )

        graph.render()

        const edges = graph.getEdges()
        edges.forEach(edge => {
            const line = edge.getKeyShape()
            const stroke = line.attr('stroke')
            const targetNode = edge.getTarget()
            targetNode.update({
                style: { stroke }
            })
        })
        graph.paint()

        bindEvents()
    }, [graph_data])

    return (
        <div className="h-[800px] w-[600px] overflow-scroll">
            <div className="h-[800px] w-[600px] " ref={ref}>
            </div>
        </div>
    );


}
