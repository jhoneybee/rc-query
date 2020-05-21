
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
                    id: '0',
                    type: 'AND',
                    record: {},
                    render: (props) => {
                        return (
                            <div
                                style={props.style}
                            >
                                <Input />
                            </div>
                        )
                    }
                },{
                    id: '0',
                    type: 'AND',
                    record: {},
                    render: (props) => {
                        return (
                            <div
                                style={props.style}
                            >
                                <Input />
                            </div>
                        )
                    }
                }])
            }}> click </button>
            <QueryBuild querys={querys} rightClick={(position) => { alert(JSON.stringify(position))}} />
        </>
    )
};
```