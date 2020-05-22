import { ReactNode } from 'react';

export interface PixiCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 画布初始化完成
     */
    onStart?: (app: PIXI.Application, dom: Element) => void
}


export interface Query {
    /**
     * 组件唯一的key
     */
    key: string,
    
    /**
     * 组件的宽度
     */
    width: number,
    
    /**
     * 组件的高度
     */
    height: number,

    /**
     * 子节点信息
     */
    children: Query[]

    /**
     * 外边距
     */
    margin?: Position
    /**
     * 组件的坐标信息
     */
    position?: Position

    /**
     * 渲染的组件节点信息
     */
    render: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>
}


export interface QueryBuildProps {
    querys?: Query[],
    rightClick?: (position: Position, query?: Query | undefined ) => void 
}

/**
 * 位置信息
 */
export interface Position {
    x: number
    y: number
}
