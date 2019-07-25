import React from "react";
import BizSelect from "../../components/BizSelect";
import "./index.less";
import mockData from "../../components/BizSelect/mockData";

const BizSelectPage = () => {
  const bizChange = (data: any, el?: any) => {
    console.log(data, el);
  }
  return (
    <div className="biz-select-page-wrap">
      <BizSelect title="更多" data={mockData} onChange={bizChange} />
    </div>
  );
};

export default BizSelectPage;
