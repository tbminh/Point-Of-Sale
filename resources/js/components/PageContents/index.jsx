import { Card, Space, Typography, List, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import './styles.scss'
import { connect_string } from '../../Api';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
const PageContents = () => {

    return (
        <div style={{
            display: 'flex',
            flex: 1,
            overflowY: 'auto',
            padding: 10,
        }}>
            <Outlet />
        </div>
    )
}

export default PageContents;
