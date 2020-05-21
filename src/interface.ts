import { ReactNode } from 'react';

export interface PixiCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 画布初始化完成
     */
    onStart?: (app: PIXI.Application, dom: Element) => void
}


export interface Query {
    // 唯一ID
    id: string
    // 数据类型
    type: 'AND' | 'OR' | 'NORMAL'
    // 当前的坐标位置
    position: Position,
    // 保存的数据
    record: any,
    // 子节点信息
    children: Query[],
    // 组件的宽度
    width?: number,
    // 组件的高度
    height?: number,
    // 渲染dom节点
    render: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>
}


export interface QueryBuildProps {
    querys?: Query[],
    space?: {
        height: number,
        width: number
    },
    rightClick?: (position: Position, query?: Query | undefined ) => void 
}

/**
 * 位置信息
 */
export interface Position {
    x: number
    y: number
}
