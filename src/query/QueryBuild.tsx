import React, { useEffect, useState } from 'react'
import * as PIXI from 'pixi.js'
import { PixiCanvas } from '../canvas/PixiCanvas'
import { Brush } from '../canvas/utils/Brush'
import { Query, QueryBuildProps, Position } from '../interface'



// 计算子节点中所有的高度信息
const loopsTotalHeight = (querys: Query[], totalHeight: number) => {
    let tempTotalHeight = 0;
    if(querys && querys.length > 0){
        querys.forEach((element) =>{
            const margin = element.margin || { x: 0 , y: 0}
            tempTotalHeight += element.height + margin.y
            if(element.children && element.children.length > 0){
                tempTotalHeight = loopsTotalHeight(element.children, tempTotalHeight)
            }
        })
    }
    return tempTotalHeight + totalHeight;
}
 
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
    let y = start.y
    querys.forEach((query) => {

        // 外边距
        const margin = query.margin || { x: 0 , y: 0}
        
        // 所有子节点的共同高度 - 没有加上子节点的子节点的高度
        let totalHeight = loopsTotalHeight(query.children!, 0)
        
        // 结束节点
        const endNode = {
            x: start.x + width,
            y: y + query.height + margin.y
        }

        callback(query, start, endNode)

        // 如果有子节点信息,进行递归处理
        if(query.children && query.children.length > 0){
            y += totalHeight + query.height + margin.y 
            loops(query.children, {
                x: endNode.x + (query.width / 2),
                y: endNode.y
            }, width, callback)
            
        } else {
            y += query.height + margin.y
        }
    })
}

const draw = (app: PIXI.Application, dom: Element, props: QueryBuildProps) => {
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
            props.rightClick({
                x: dom.clientLeft + x,
                y: dom.clientTop + y
            })
        }
    }))

    app.stage.addChild(startRound)
    const components: JSX.Element[] = []
    loops(props.querys!, {
        x,
        y
    }, 200,(query, start, end)=>{
        
        app.view.width = app.view.width > end.x + 100 ? app.view.width : end.x + 20
        app.view.height = app.view.height > end.y + 100 ? app.view.height : end.y + 20
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
    const dom = React.useRef<Element>();
    const [components, setComponents] = useState<JSX.Element[]>([])
    useEffect(() => {
        const components = draw(app.current!, dom.current!, props)
        setComponents(components)
    }, [props.querys])
    return (
        <>
            <PixiCanvas
                onStart={(tempApp, tempDom) => {
                    tempApp.view.width = 40 + 100
                    tempApp.view.height = 20 + 100
                    dom.current = tempDom
                    app.current = tempApp 
                }}
            >
                {components}
            </PixiCanvas>
        </>
    )
}


