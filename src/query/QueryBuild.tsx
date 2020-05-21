import React, { useEffect, useState } from 'react'
import * as PIXI from 'pixi.js'
import { PixiCanvas } from '../canvas/PixiCanvas'
import { Brush } from '../canvas/utils/Brush'
import { Query, QueryBuildProps, Position } from '../interface'

const loops = (querys: Query[], position: Position, callback: (element: Query, position: Position) => void) => {
    querys.forEach((query) => {
        if (query.children && query.children.length > 0) {
            loops(query.children, position, callback)
        }
        callback(query, position)
    })
}

const getQuerySize = (element: Query) => ({
    width: element.width! | 200,
    height: element.height! | 43
})

const draw = (app: PIXI.Application, dom: Element, props: QueryBuildProps) => {
    app.stage.children.forEach((element, index) => {
        app.stage.removeChildren(index)
    })
    const x = 20;
    const y = app.view.height / 2;
    const startRound = new PIXI.Graphics()
    app.stage.addChild(Brush.round({
        x,
        y
    }))
    
    app.stage.addChild(startRound)


    const elements: JSX.Element[] = []

    loops(props.querys!, {x , y}, (element, position) => {
        debugger
        let startPosition: Position = {
            x,
            y: y + 7
        }
        if(position.x !== x && position.y !== y){
            startPosition.x = position.x + (getQuerySize(element).width / 2)
            startPosition.y = position.y + ( getQuerySize(element).height / 2)

        }
        let endPosition: Position = {
            x: startPosition.x +  props.space!.width ,
            y: startPosition.y +  props.space!.height + (getQuerySize(element).height / 2)
        }
        
        app.stage.addChild(Brush.linkLine(startPosition, endPosition))

        element.position = endPosition
        if(element.render){
            const DynamicComponent = element.render
            elements.push((
                <DynamicComponent
                    key={element.id}
                    style={{
                        position: 'absolute',
                        left: endPosition.x,
                        top: endPosition.y - (getQuerySize(element).height / 2),
                        float: 'left',
                        borderStyle: 'solid 1px',
                        zIndex: 1000,
                        width: getQuerySize(element).width,
                        height: getQuerySize(element).height
                    }}
                    {...element}
                />
            ))
        }
        position.x = endPosition.x
        position.y = endPosition.y
    })
    return elements
}

export const QueryBuild = (props: QueryBuildProps) => {
    const app = React.useRef<PIXI.Application>();
    const dom = React.useRef<Element>();
    const [elements, setElements] = useState<JSX.Element[]>([])
    useEffect(() => {
        const element = draw(app.current!, dom.current!, props)
        setElements(element)
    }, [props.querys])
    return (
        <>
            <PixiCanvas
                onStart={(tempApp, tempDom) => {
                    app.current = tempApp
                    dom.current = tempDom
                }}
            >
                {elements}
            </PixiCanvas>
        </>
    )
}

QueryBuild.defaultProps = {
    querys: [],
    space: {
        height: 20,
        width: 80
    },
}

