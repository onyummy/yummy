import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/common/layout";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import MyIngredient from "../../components/mypage/MyIngredient";
import { Row } from "antd";

export default function mypage() {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const [ingredienrList, setIngredienrList] = useState([]);
    useState(() => {
        const getIngredienrList = async () => {
            const res = await fetch("/api/mypage/ingredient");
            const data = await res.json();

            setIngredienrList(data);
        };

        getIngredienrList();
       
    })
    const ingredienr = ingredienrList.map((ingredienr, index) => (
        <MyIngredient key={ingredienr.name} {...ingredienr} />
    ));
    
    return (
        <Layout>
           <Avatar size={64} icon={<UserOutlined />} />
           <Row gutter={32}>
                {ingredienr}
           </Row>
        </Layout>
    );
}
