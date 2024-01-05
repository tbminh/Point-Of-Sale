import { Space } from 'antd';
import React, { useState } from 'react';
import PageContents from '../PageContents';
import AppHeader from '../AppHeader';
import  { TabletOutlined, MenuOutlined, BellOutlined } from '@ant-design/icons';

const AppFooter = () => {


    return (
        <div className="AppFooter">
            <Space>
                <TabletOutlined />
                <MenuOutlined />
                <BellOutlined />
            </Space>
        </div>
    )
}

export default AppFooter