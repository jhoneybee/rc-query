import React, { useEffect, useState } from 'react'
import * as PIXI from 'pixi.js'
import { PixiCanvas } from '../canvas/PixiCanvas'
import { Brush } from '../canvas/utils/Brush'
import { Query, QueryBuildProps, Position } from '../interface'

const loops = (querys: Query[], level: number, callback: (element: Query, level: number, index: number) => void) => {
    querys.forEach((query, index) => {
        callback(query, level, index)
        if (query.children && query.children.length > 0) {
            loops(query.children, level, callback)
        }
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
    }, () => {
        if(props.rightClick){
            props.rightClick({x,y})
        }
    }))
    
    app.stage.addChild(startRound)


    const elements: JSX.Element[] = []

    loops(props.querys!, 0 , (element, level, index) => {
        let startPosition: Position = {
            x,
            y: y + 7
        }
        if(level > 1){
            startPosition.x = x + (props.space!.width * level) + (getQuerySize(element).width / 2)
            startPosition.y = y + (props.space!.height * level) + (getQuerySize(element).height / 2)

        }
        let endPosition: Position = {
            x: startPosition.x +  props.space!.width +  (getQuerySize(element).width / 2) ,
            y: startPosition.y +  props.space!.height + ((index + 1) *(getQuerySize(element).height))
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
        return {x: endPosition.x, y:  endPosition.y}
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

