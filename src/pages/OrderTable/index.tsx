import React, { useState, ReactElement } from 'react';
import { Table, Input } from 'antd';
import TableOptionCol from './components/TableOptionCol';
import './index.less';

interface Record {
  key: string;
  name: string;
  address: string;
  [propName: string]: any;
}

const loopAddKey = (data: any, pKey: string) => {
  const newData = data.map((item: any, idx: number) => {
    item.key = pKey ? `${pKey}-${idx.toString()}` : idx.toString();
    if (item.children) {
      item.children = loopAddKey(item.children, item.key);
    }
    return item;
  });
  return newData;
};
const useDealKeyData = (data: any) => {
  const newData = loopAddKey(data, '');
  return useState(newData);
};
const deleteRow = (arr: any, record: Record, idx: number) => {
  const newArr = [...arr];
  if (newArr.filter(el => el.key === record.key).length) {
    return newArr.filter(el => el.key !== record.key);
  } else {
    for (let el of newArr) {
      if (el.children) {
        el.children = [...deleteRow(el.children, record, idx)];
        if (!el.children.length) {
          el.children = undefined;
        }
      }
    }
    return newArr;
  }
};
const defaultEditingRow = { key: '', name: '', address: '' };
const defDataSource = [
  {
    key: '1',
    name: '百度',
    address: 'http://www.baidu.com',
    status: 'show'
  },
  {
    key: '2',
    name: '淘宝',
    address: 'http://www.taobao.com',
    status: 'show'
  },
  {
    key: '3',
    name: '淘宝',
    address: 'http://www.taobao.com',
    status: 'hidden',
    children: [
      {
        key: '3-1',
        name: 't百度dd',
        address: 'http://www.baidu.com',
        status: 'show',
        children: [
          {
            key: '3-1-1',
            name: 'ddd百度',
            address: 'http://www.baidu.com',
            status: 'show'
          }
        ]
      }
    ]
  },
  {
    key: '4',
    name: '淘宝',
    address: 'http://www.taobao.com',
    status: 'show'
  },
  {
    key: '5',
    name: '淘宝',
    address: 'http://www.taobao.com',
    status: 'hidden'
  }
];
const defaultExplan: any = [];
const OrderTable = () => {
  const [explanRowKeys, setExplanRowKeys] = useState(defaultExplan);
  const [editingRow, setEditingRow] = useState(defaultEditingRow);
  const [dataSource, setDataSource] = useDealKeyData(defDataSource);
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
  const deleteConfirm = (record: Record, idx: number, editingRow: any) => {
    const newDataSource = deleteRow(dataSource, record, idx);
    setDataSource(newDataSource);
  };
  const addRow = (record: Record, idx: number, type: string) => {
    const initRecord = {
      name: '',
      address: '',
      key: record.key + `-${record.children ? record.children.length : 0}`
    };
    if (type === 'subLevel') {
      if (record.children) {
        record.children.push(initRecord);
      } else {
        record.children = [initRecord];
      }
      setExplanRowKeys([...explanRowKeys, record.key]);
      setEditingRow(initRecord);
    } else {
      // 添加当前层级；
      
    }
    setDataSource([...dataSource]);
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
              inputing(e.target.value, index, record, 'name');
            }}
          ></Input>
        ) : (
          <span>{text}</span>
        )
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (text: string, record: Record, index: number): ReactElement =>
        editingRow.key === record.key ? (
          <Input
            value={text}
            size="small"
            onChange={e => {
              inputing(e.target.value, index, record, 'address');
            }}
          ></Input>
        ) : (
          <a href={text} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        )
    },
    {
      title: 'Option',
      dataIndex: 'option',
      key: 'option',
      width: 200,
      render: (t: string, record: Record, idx: number) => {
        return TableOptionCol(t, record, idx, editingRow, {
          cancelInput,
          deleteConfirm,
          toggleEdit,
          inputing,
          addRow
        });
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
        expandedRowKeys={explanRowKeys}
        onExpandedRowsChange={v => {
          setExplanRowKeys(v);
        }}
      ></Table>
    </div>
  );
};

export default OrderTable;
