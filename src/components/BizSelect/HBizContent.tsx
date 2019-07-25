import React, { useState } from 'react';
import { Checkbox } from 'antd';
import './hBizContent.less';

interface BizSelectContentProps {
  data?: {
    key: string;
    title: string;
    list: {
      title: string;
      key: string;
      status: boolean;
      [propName: string]: any;
    }[];
  }[];
  onChange?(data: any, el?: any): void;
}

const HBizContent = (props: BizSelectContentProps) => {
  const { data = [], onChange = () => {} } = props;
  const [bodyData, setBodyData] = useState(data);

  const isCheckAll = bodyData.every(item => item.list.every(el => el.status));
  const isCancelAll = bodyData.every(item => item.list.every(el => !el.status));

  const checkAllChange = (e: any) => {
    const newData = bodyData.map(item => {
      item.list = item.list.map(el => {
        el.status = e.target.checked;
        return el;
      });
      return item;
    });
    onChange(newData);
    setBodyData(newData);
  };
  const cancelAllChange = (e: any) => {
    const newData = bodyData.map(item => {
      item.list = item.list.map(el => {
        el.status = !e.target.checked;
        return el;
      });
      return item;
    });
    onChange(newData);
    setBodyData(newData);
  };
  const toggleAllChange = (e: any) => {
    const newData = bodyData.map(item => {
      item.list = item.list.map(el => {
        el.status = !el.status;
        return el;
      });
      return item;
    });
    onChange(newData);
    setBodyData(newData);
  };
  const sectionCheck = (e: any, idx: number) => {
    bodyData[idx].list = bodyData[idx].list.map(item => {
      item.status = e.target.checked;
      return item;
    });
    const newData = [...bodyData];
    onChange(newData);
    setBodyData(newData);
  };
  const itemCheck = (e: any, idx: number, itemIdx: number) => {
    bodyData[idx].list[itemIdx].status = e.target.checked;
    const newData = [...bodyData];
    onChange(newData, bodyData[idx].list[itemIdx]);
    setBodyData(newData);
  };
  return (
    <div className="h-biz-content">
      <div className="h-biz-header">
        <span>
          <Checkbox checked={isCheckAll} onChange={checkAllChange} />
          &nbsp;全选
        </span>
        <span>
          <Checkbox checked={isCancelAll} onChange={cancelAllChange} />
          &nbsp;全不选
        </span>
        <span>
          <Checkbox onChange={toggleAllChange} />
          &nbsp;反选
        </span>
      </div>
      <div className="h-biz-body">
        {bodyData.map((item, idx) => {
          return (
            <div key={item.key} className="body-section">
              <div>
                <Checkbox
                  checked={item.list.every(el => el.status)}
                  onChange={e => {
                    sectionCheck(e, idx);
                  }}
                />
                &nbsp;{item.title}
              </div>
              <div className="section-items-wrap">
                {item.list.map((el, itemIdx) => (
                  <span key={el.key} className="section-items">
                    <Checkbox
                      checked={el.status}
                      onChange={e => {
                        itemCheck(e, idx, itemIdx);
                      }}
                    />
                    &nbsp;{el.title}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HBizContent;
