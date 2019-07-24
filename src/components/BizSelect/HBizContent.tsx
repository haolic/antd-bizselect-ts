import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import "./hBizContent.less";

interface BizSelectContentProps {
  data?: {
    key: string;
    title: string;
    list: { title: string; key: string; status: boolean; unit: string }[];
  }[];
}

const HBizContent = (props: BizSelectContentProps) => {
  const { data = [] } = props;
  const [bodyData, setBodyData] = useState(data);

  const isCheckAll = bodyData.every(item => item.list.every(el => el.status));
  const isCancelAll = bodyData.every(item => item.list.every(el => !el.status));

  return (
    <div className="h-biz-content">
      <div className="h-biz-header">
        <span>
          <Checkbox
            checked={isCheckAll}
            onChange={e => {
              const newData = bodyData.map(item => {
                item.list = item.list.map(el => {
                  el.status = e.target.checked;
                  return el;
                });
                return item;
              });
              setBodyData(newData);
            }}
          />
          &nbsp;全选
        </span>
        <span>
          <Checkbox
            checked={isCancelAll}
            onChange={e => {
              const newData = bodyData.map(item => {
                item.list = item.list.map(el => {
                  el.status = !e.target.checked;
                  return el;
                });
                return item;
              });
              setBodyData(newData);
            }}
          />
          &nbsp;全不选
        </span>
        <span>
          <Checkbox />
          &nbsp;反选
        </span>
      </div>
      <div className="h-biz-body">
        {bodyData.map(item => {
          return (
            <div key={item.key} className="body-section">
              <div>
                <Checkbox checked={item.list.every(el => el.status)} />
                &nbsp;{item.title}
              </div>
              <div className="section-items-wrap">
                {item.list.map(el => (
                  <span key={el.key} className="section-items">
                    <Checkbox checked={el.status} />
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
