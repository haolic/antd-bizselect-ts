import React, { useState, ReactElement } from 'react';
import { Table, Input, Button, Switch } from 'antd';
import './index.less';

interface Record {
  key: string;
  name: string;
  address: string;
  width?: number;
}
const defaultEditRow: string[] = [];
const defDataSource = [
  {
    key: '1',
    name: '百度',
    address: 'http://www.baidu.com',
    width: 100
  },
  {
    key: '2',
    name: '淘宝',
    address: 'http://www.taobao.com'
  },
  {
    key: '3',
    name: '淘宝',
    address: 'http://www.taobao.com',
    children: [{
      key: '3-1',
      name: 't百度dd',
      address: 'http://www.baidu.com',
      width: 100,
      children: [{
        key: '3-1-1',
        name: 'ddd百度',
        address: 'http://www.baidu.com',
        width: 100
      }]
    }]
  },
  {
    key: '4',
    name: '淘宝',
    address: 'http://www.taobao.com'
  },
  {
    key: '5',
    name: '淘宝',
    address: 'http://www.taobao.com'
  }
];
const OrderTable = () => {
  const [editingRow, setEditingRow] = useState(defaultEditRow);
  const [dataSource, setDataSource] = useState(defDataSource);
  const edit = (record: Record) => {
    if (editingRow.includes(record.key)) {
      setEditingRow(editingRow.filter(el => el !== record.key));
    } else {
      setEditingRow([...editingRow, record.key]);
    }
    console.log(record);
  };
  const inputing = (val: string, idx: number) => {
    const newRowData = [...dataSource];
    newRowData[idx].address = val;
    setDataSource(newRowData);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (text: string, record: Record, index: number): ReactElement =>
        editingRow.includes(record.key) ? (
          <Input
            value={text}
            size="small"
            onChange={e => {
              inputing(e.target.value, index);
            }}
          ></Input>
        ) : (
          <a href={text} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        )
    },
    {
      title: '是否隐藏',
      dataIndex: 'isHide',
      key: 'isHide',
      render: (text: string, record: Record, index: number): ReactElement => (
        <Switch size="small" defaultChecked />
      )
    },
    {
      title: 'Option',
      dataIndex: 'option',
      key: 'option',
      width: 200,
      render: (t: string, record: Record) => {
        return (
          <div className="option-col">
            <Button
              size="small"
              className="option-item"
              onClick={() => edit(record)}
            >
              {editingRow.includes(record.key) ? '保存' : '编辑'}
            </Button>
            <Button size="small" className="option-item">
              +
            </Button>
            <Button size="small" className="option-item">
              +子菜单
            </Button>
            <Button size="small" className="option-item">
              删除
            </Button>
          </div>
        );
      }
    }
  ];
  return (
    <div>
      <Table
        size="small"
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      ></Table>
    </div>
  );
};

export default OrderTable;
