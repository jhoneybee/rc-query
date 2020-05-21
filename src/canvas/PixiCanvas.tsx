import React, { useEffect } from 'react'
import * as PIXI from 'pixi.js'
import { PixiCanvasProps } from '../interface'

PIXI.utils.skipHello()

/**
 * 画布信息，用来构建复杂的绘画
 */
export const PixiCanvas = (props: PixiCanvasProps) => {
    const domRef = React.createRef<HTMLDivElement>()
    const { onStart , ...restProps} = props
    useEffect(() => {
        if(domRef.current){
            const app = new PIXI.Application({
                transparent: true,
                // antialias: true, 
            })
            domRef.current.appendChild(app.view)
            if(onStart){
                onStart(app, domRef.current)
            }
        }
    }, [])
    return <div {...restProps} ref={domRef} style={{position: 'relative'}} />
}