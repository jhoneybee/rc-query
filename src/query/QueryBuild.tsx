import React, { useEffect, useState } from 'react'
import * as PIXI from 'pixi.js'
import { PixiCanvas } from '../canvas/PixiCanvas'
import { Brush } from '../canvas/utils/Brush'
import { Query, QueryBuildProps, Position } from '../interface'


/**
 * 将Query信息初始化对应的坐标信息
 * @param querys 当前初始化的query信息
 * @param start  起始位置信息
 * @param width  线的预占宽度
 */
const loops = (
    querys: Query[], 
    start: Position, 
    width: number,
    callback: (query: Query , start: Position, end: Position)=> void
) => {
    let y = 0
    querys.forEach((query, index) => {

        // 外边距
        const margin = query.margin || { x: 0 , y: 0}
        
        // 所有子节点的共同高度
        let totalHeight = - (query.height + margin.y)  - ((query.height + margin.y) / 2)
        if(query.children && query.children.length > 0){
            query.children.forEach((element) => {
                totalHeight += element.height + margin.y
            })
        }
        
        // 结束节点
        const endNode = {
            x: start.x + width,
            y: start.y + (index * (query.height + margin.y)) 
        }

        callback(query, start, {
            x: endNode.x,
            y: endNode.y + y
        })

        // 如果有子节点信息,进行递归处理
        if(query.children && query.children.length > 0){
            loops(query.children, {
                x: endNode.x + (query.width / 2),
                y: endNode.y
            }, width, callback)
            
            y = totalHeight + endNode.y
            console.log(JSON.stringify(y))
        }
    })
}

const draw = (app: PIXI.Application, props: QueryBuildProps) => {
    app.stage.children.forEach((element, index) => {
        app.stage.removeChildren(index)
    })
    const x = 40;
    const y = 20;
    const startRound = new PIXI.Graphics()

    // 添加一个原点为起始点
    app.stage.addChild(Brush.round({
        x,
        y
    }, () => {
        if(props.rightClick){
            props.rightClick({x,y})
        }
    }))

    app.stage.addChild(startRound)
    const components: JSX.Element[] = []
    loops(props.querys!, {
        x,
        y
    }, 200,(query, start, end)=>{
        console.log(JSON.stringify(end))
        app.stage.addChild(Brush.linkLine(start, end))
        if(query.render){
            const DynamicComponent = query.render
            components.push((
                <DynamicComponent
                    key={query.key}
                    style={{
                        position: 'absolute',
                        left: end.x,
                        top: end.y - (query.height / 2),
                        float: 'left',
                        //background: '#1e1f26',
                        zIndex: 1000,
                        width: query.width,
                        height: query.height
                    }}
                    {...{
                        query
                    }}
                />
            ))
        }
    })
    return components
}

export const QueryBuild = (props: QueryBuildProps) => {
    const app = React.useRef<PIXI.Application>();
    const [components, setComponents] = useState<JSX.Element[]>([])
    useEffect(() => {
        const components = draw(app.current!, props)
        setComponents(components)
    }, [props.querys])
    return (
        <>
            <PixiCanvas
                onStart={(tempApp) => {
                    app.current = tempApp
                }}
            >
                {components}
            </PixiCanvas>
        </>
    )
}


