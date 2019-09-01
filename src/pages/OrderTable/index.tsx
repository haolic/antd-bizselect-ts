import React, { useState, ReactElement } from "react";
import { Table, Input, Switch, Icon, Popconfirm } from "antd";
import "./index.less";

interface Record {
  key: string;
  name: string;
  address: string;
  width?: number;
  [propName: string]: any;
}
const defaultEditingRow = { key: "", name: "", address: "" };
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
  const [editingRow, setEditingRow] = useState(defaultEditingRow);
  const [dataSource, setDataSource] = useState(defDataSource);
  const toggleEdit = (record: Record) => {
    if (editingRow.key) {
      setEditingRow(defaultEditingRow);
    } else {
      setEditingRow({
        key: record.key,
        name: record.name,
        address: record.address
      });
    }
  };
  const inputing = (
    val: string,
    idx: number,
    record: Record,
    keyName: string
  ) => {
    record[keyName] = val;
    const newRowData = [...dataSource];
    setDataSource(newRowData);
  };
  const cancelInput = (record: Record) => {
    record.address = editingRow.address;
    record.name = editingRow.name;
    const newRowData = [...dataSource];
    setEditingRow(defaultEditingRow);
    setDataSource(newRowData);
  };
  const deleteConfirm = (idx: number) => {
    console.log("删除");
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 250,
      render: (text: string, record: Record, index: number): ReactElement =>
        editingRow.key === record.key ? (
          <Input
            value={text}
            style={{
              width: 100
            }}
            size="small"
            onChange={e => {
              inputing(e.target.value, index, record, "name");
            }}
          ></Input>
        ) : (
          <span>{text}</span>
        )
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text: string, record: Record, index: number): ReactElement =>
        editingRow.key === record.key ? (
          <Input
            value={text}
            size="small"
            onChange={e => {
              inputing(e.target.value, index, record, "address");
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
      render: (t: string, record: Record, idx: number) => {
        return (
          <div className="option-col">
            <span
              className={`${
                !editingRow.key || editingRow.key === record.key
                  ? ""
                  : "disabled-option-item"
              } option-item`}
              onClick={() => {
                if (!editingRow.key) {
                  toggleEdit(record);
                }
                if (editingRow.key === record.key) {
                  toggleEdit(record);
                }
              }}
            >
              {editingRow.key === record.key ? (
                <Icon type="check" />
              ) : (
                <Icon type="edit" />
              )}
            </span>
            <span
              className="option-item"
              onClick={() => {
                cancelInput(record);
              }}
            >
              {editingRow.key === record.key ? <Icon type="close" /> : null}
            </span>
            <span className="option-item">
              <Icon type="plus-circle" />
            </span>
            <span className="option-item">
              <Icon type="enter" />
            </span>
            <Popconfirm
              placement="topLeft"
              title="确定删除？"
              trigger="click"
              okText="确定"
              cancelText="取消"
              onConfirm={() => deleteConfirm(idx)}
            >
              <Icon type="delete" />
            </Popconfirm>
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
