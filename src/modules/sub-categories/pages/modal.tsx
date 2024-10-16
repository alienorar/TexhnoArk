import { Modal, Form, Input, Button, Select } from 'antd';
import { useEffect } from 'react';
import { SubCreate, SubModalprops } from '../types';
import { useCreateSubCategory, useUpdateSubCategory } from '../hooks/mutations';
// import { subCategory } from '@service';

const { Option } = Select;

const SubCategory = ({ open, handleClose, update, categories, }: SubModalprops) => {
    const [form] = Form.useForm();
    const {mutate:createMutate, isPending:isCreating} = useCreateSubCategory()
    const {mutate:updateMutate, isPending:isUpdating} = useUpdateSubCategory()
    useEffect(() => {
        if (update) {
            form.setFieldsValue({
                name: update?.name,
                parent_category_id: Number(update?.parent_category_id),

            })
        } else {
            form.resetFields()
        }
    });

    const onFinish = (values:SubCreate) => {
   if (update?.id) {
    const payload = {...values,id:update?.id}
    updateMutate(payload,{
        onSuccess:()=>{
            handleClose()
        }
    })
   }else{
       createMutate(values, {
           onSuccess: () => {
               handleClose()
           }
       })
   }
    };

    return (
        <Modal
            title="Add New Category"
            open={open}
            onCancel={handleClose}
            footer={null}
        >
            <Form
                form={form}
                name="category_form"
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label=" Sub Category name"
                    name="name"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                    rules={[
                        {
                            required: true,
                            message: 'Enter category name!',
                        },
                    ]}
                >  <Input className='h-10 border-[0.5px] px-3 ' />
                </Form.Item>

                <Form.Item
                    name="parent_category_id"
                    label="Parent Category"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: '8px' }}
                    rules={[
                        {
                            required: true,
                            message: 'Enter category name!',
                        },
                    ]}>
                    <Select
                        showSearch
                        placeholder="Select a Category"
                        className='h-10 border-[0.5px] rounded-lg '
                    >
                        {categories?.map((item: any, index: number) => (
                            <Option value={parseInt(item.id)} key={index}>
                                {item.name}
                            </Option>

                        ))}

                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button
                        block
                        htmlType="submit"
                        style={{
                            backgroundColor: "#e35112",
                            color: "white",
                            height: "40px",
                            fontSize: "18px",
                            marginTop: "10px",
                        }}
                        loading={isCreating||isUpdating}
                    >
                     {
                        update?.id ? "Update" : "Add"
                     }
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SubCategory;
