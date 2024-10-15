import { useState, useEffect } from "react";
import { Button, Space, Tooltip } from "antd";
import { EditOutlined, EnterOutlined } from '@ant-design/icons';
import { ConfirmDelete, GlobalTable } from "@components";
import { useGetCategory } from "../hooks/queries";
import { useLocation, useNavigate } from "react-router-dom";
// import { openNotification } from "@utils";
// import { ParamsType } from "@types";
const Index = () => {
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState();
  const { search } = useLocation()
  const navigate = useNavigate()
  const [params, setParams] = useState({
    search: "",
    limit: 2,
    page: 1
  });

  const { data } = useGetCategory(params);

  useEffect(() => {
    const params = new URLSearchParams(search)
    let page = Number(params.get("page")) || 1;
    let limit = Number(params.get("limit")) || 2;
    let search_value = params.get("search") || "";
    setParams((prev) => ({
      ...prev,
      limit: limit,
      page: page,
      search: search_value,
    }))
  }, [search])

  // console.log(tableData);

  // ============ Table ==============
  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination
    setParams((prev) => ({
      ...prev,
      limit: pageSize,
      page: current,
    })
    )
    const searchParams = new URLSearchParams(search)
    searchParams.set("page", `${current}`)
    searchParams.set('limit', `${pageSize}`)
    navigate(`?${searchParams}`)
  }
  // const updateParams = (newParams: ParamsType) => {
  //   setParams((prev) => ({
  //     ...prev,
  //     ...newParams
  //   }));
  // };

  // ======== Delete Data ========= 
  const deleteData = async () => {
  console.log("delete");
  
  };

  useEffect(() => {
    if (data?.data?.data?.categories) {
      setTableData(data.data.data.categories);
      setTotal(data.data.data.count)
    }
  }, [data]);


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: "Name",
      dataIndex: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('en-GB').replace(/\//g, '.')
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Tooltip title="edit"><Button><EditOutlined className="text-[18px]" /></Button></Tooltip>
          <ConfirmDelete
            id={record.id}
            onConfirm={deleteData}
            onCancel={() => console.log('Cancelled')}
            title={"Delete this Brands ?"}
          />
          <Tooltip title="view">
            <Button><EnterOutlined className="text-[18px]" /></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <GlobalTable
        data={tableData}
        columns={columns}
        handleChange={handleTableChange}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ['2', '3', '4', '6']
        }}
      /></>
  );
};

export default Index;
