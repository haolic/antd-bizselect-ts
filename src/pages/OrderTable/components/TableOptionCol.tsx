import React from 'react';
import { Icon, Popconfirm, Popover } from 'antd';
import './TableOptionCol.less';

interface Record {
  key: string;
  name: string;
  address: string;
  width?: number;
  [propName: string]: any;
}

const TableOptionCol = (
  t: string,
  record: Record,
  idx: number,
  editingRow: any,
  { cancelInput, deleteConfirm, toggleEdit, inputing, addRow }: any
) => {
  const optionItemDis = !!editingRow.key;
  return (
    <div className="option-col">
      <span
        className={`${
          !editingRow.key || editingRow.key === record.key
            ? ''
            : 'disabled-option-item'
        } option-item`}
        onClick={() => {
          if (!editingRow.key || editingRow.key === record.key) {
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
        onClick={() => optionItemDis && cancelInput(record)}
      >
        {editingRow.key === record.key ? <Icon type="close" /> : null}
      </span>
      <span
        className="option-item"
        style={{
          textDecoration: 'underline',
          color: '#49b3ff'
        }}
        onClick={() =>
          inputing(
            record.status === 'hidden' ? 'show' : 'hidden',
            idx,
            record,
            'status'
          )
        }
      >
        {record.status === 'hidden' ? '显示' : '隐藏'}
      </span>
      {optionItemDis ? (
        <span className="disabled-option-item option-item">
          <Icon type="plus-circle" />
        </span>
      ) : (
        <Popover
          placement="topRight"
          overlayClassName="add-row-container"
          content={
            <ul>
              <li
                className="add-row-item"
                onClick={() => addRow(record, idx, 'nowLevel')}
              >
                添加当前层级
              </li>
              <li
                className="add-row-item"
                onClick={() => addRow(record, idx, 'subLevel')}
              >
                添加下层级
              </li>
            </ul>
          }
        >
          <span
            className={
              optionItemDis ? 'disabled-option-item option-item' : 'option-item'
            }
          >
            <Icon type="plus-circle" />
          </span>
        </Popover>
      )}

      {optionItemDis ? (
        <span className="disabled-option-item option-item">
          <Icon type="delete" />
        </span>
      ) : (
        <Popconfirm
          placement="topLeft"
          title="确定删除？"
          trigger="click"
          okText="确定"
          cancelText="取消"
          onConfirm={() => deleteConfirm(record, idx, editingRow)}
        >
          <span
            className={
              optionItemDis ? 'disabled-option-item option-item' : 'option-item'
            }
          >
            <Icon type="delete" />
          </span>
        </Popconfirm>
      )}
    </div>
  );
};

export default TableOptionCol;
