import React, { useState, ReactElement } from "react";
import { Table, Input, Switch, Icon } from "antd";
import "./index.less";

interface Record {
  key: string;
  name: string;
  address: string;
  width?: number;
}
const defDataSource = [
  {
    key: "1",
    name: "百度",
    address: "http://www.baidu.com",
    width: 100
  },
  {
    key: "2",
    name: "淘宝",
    address: "http://www.taobao.com"
  },
  {
    key: "3",
    name: "淘宝",
    address: "http://www.taobao.com",
    children: [
      {
        key: "3-1",
        name: "t百度dd",
        address: "http://www.baidu.com",
        width: 100,
        children: [
          {
            key: "3-1-1",
            name: "ddd百度",
            address: "http://www.baidu.com",
            width: 100
          }
        ]
      }
    ]
  },
  {
    key: "4",
    name: "淘宝",
    address: "http://www.taobao.com"
  },
  {
    key: "5",
    name: "淘宝",
    address: "http://www.taobao.com"
  }
];
const OrderTable = () => {
  const [editingRow, setEditingRow] = useState("");
  const [dataSource, setDataSource] = useState(defDataSource);
  const toggleEdit = (record: Record) => {
    if (editingRow) {
      setEditingRow("");
    } else {
      setEditingRow(record.key);
    }
  };
  const inputing = (val: string, idx: number, record: Record) => {
    record.address = val;
    const newRowData = [...dataSource];
    setDataSource(newRowData);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text: string, record: Record, index: number): ReactElement =>
        editingRow === record.key ? (
          <Input
            value={text}
            size="small"
            onChange={e => {
              inputing(e.target.value, index, record);
            }}
          ></Input>
        ) : (
          <a href={text} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        )
    },
    {
      title: "隐藏",
      dataIndex: "isHide",
      key: "isHide",
      width: 50,
      render: (text: string, record: Record, index: number): ReactElement => (
        <Switch size="small" defaultChecked />
      )
    },
    {
      title: "Option",
      dataIndex: "option",
      key: "option",
      width: 200,
      render: (t: string, record: Record) => {
        return (
          <div className="option-col">
            <span
              className={`${
                !editingRow || editingRow === record.key
                  ? ""
                  : "disabled-option-item"
              } option-item`}
              onClick={() => {
                if (!editingRow) {
                  toggleEdit(record);
                }
                if (editingRow === record.key) {
                  toggleEdit(record);
                }
              }}
            >
              {editingRow === record.key ? (
                <Icon type="check" />
              ) : (
                <Icon type="edit" />
              )}
            </span>
            <span className="option-item" onClick={() => setEditingRow("")}>
              {editingRow === record.key ? <Icon type="close" /> : null}
            </span>
            <span className="option-item">
              <Icon type="plus-circle" />
            </span>
            <span className="option-item">
              <Icon type="enter" />
            </span>
            <span className="option-item">
              <Icon type="delete" />
            </span>
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
