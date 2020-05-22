
# 查询构建器

```tsx
/**
 * title: 一个查询构建器
 * desc: 用来构建高级查询
 */

import React, { useState } from 'react';
import { QueryBuild } from 'rc-query';
import * as PIXI from 'pixi.js'
import { Input, Form } from 'antd'
import 'antd/dist/antd.css'; 

export default () => {
    const query = []
    const [querys, setQuerys] = useState([])

    return  (
        <>
            <button onClick={()=>{
                setQuerys([{
                    key: '0',
                    width: 120,
                    margin: {
                        x: 50,
                        y: 15
                    },
                    height: 32,
                    render: (props) => {
                        return (
                            <div
                                style={props.style}
                            >
                              <Input />
                            </div>
                        )
                    },
                     children: [{
                        key: '0-0',
                        width: 120,
                        height: 32,
                        margin: {
                            x: 50,
                            y: 15
                        },
                        render: (props) => {
                            return (
                                <div
                                    style={props.style}
                                >
                                    <Input />
                                </div>
                            )
                        },
                    },{
                        key: '0-1',
                        width: 120,
                        height: 32,
                        margin: {
                            x: 50,
                            y: 15
                        },
                        render: (props) => {
                            return (
                                <div
                                    style={props.style}
                                >
                                  <Input />
                                </div>
                            )
                        },
                    },{
                        key: '0-2',
                        width: 120,
                        height: 32,
                        margin: {
                            x: 50,
                            y: 15
                        },
                        render: (props) => {
                            return (
                                <div
                                    style={props.style}
                                >
                                  <Input />
                                </div>
                            )
                        },
                    }] 
                },{
                    key: '1',
                    width: 120,
                    height: 32,
                    margin: {
                        x: 50,
                        y: 15
                    },
                    render: (props) => {
                        return (
                            <div
                                style={props.style}
                            >
                              <Input />
                            </div>
                        )
                    },
                   children: [{
                        key: '1-0',
                        width: 120,
                        height: 32,
                        margin: {
                            x: 50,
                            y: 15
                        },
                        render: (props) => {
                            return (
                                <div
                                    style={props.style}
                                >
                                     <Input />
                                </div>
                            )
                        },
                    }]
                },{
                    key: '2',
                    width: 120,
                    margin: {
                        x: 50,
                        y: 15
                    },
                    height: 32,
                    render: (props) => {
                        return (
                            <div
                                style={props.style}
                            >
                              <Input />
                            </div>
                        )
                    },
                    children: []
                },{
                    key: '3',
                    width: 120,
                    margin: {
                        x: 50,
                        y: 15
                    },
                    height: 32,
                    render: (props) => {
                        return (
                            <div
                                style={props.style}
                            >
                              <Input />
                            </div>
                        )
                    },
                    children: []
                },{
                    key: '4',
                    width: 120,
                    margin: {
                        x: 50,
                        y: 15
                    },
                    height: 32,
                    render: (props) => {
                        return (
                            <div
                                style={props.style}
                            >
                              <Input />
                            </div>
                        )
                    },
                    children: []
                }])
            }}> click </button>
            <QueryBuild querys={querys} rightClick={(position) => { alert(JSON.stringify(position))}} />
        </>
    )
};
```