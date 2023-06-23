import {
  CaretDownFilled,
  DoubleRightOutlined,
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  MobileFilled,
  MobileTwoTone,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import { Avatar, DatePicker, Form, InputRef, Radio, RadioChangeEvent, TimePicker } from 'antd';
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  SettingDrawer,
} from '@ant-design/pro-components';
import { css } from '@emotion/css';
import {
  Button,
  Divider,
  Input,
  Dropdown,
  Popover,
  theme,
  ConfigProvider,
  Space,
  Tag,
  List
} from 'antd';
import React, { useRef, useState } from 'react';
import defaultProps from './_defaultProps.tsx';
import utils from './utils.tsx'
import { TextAreaRef } from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import groups from './names.json'
import CheckableTag from 'antd/es/tag/CheckableTag';

dayjs.extend(customParseFormat);

type LayoutType = Parameters<typeof Form>[0]['layout'];

const Item: React.FC<{ children: React.ReactNode }> = (props) => {
  const { token } = theme.useToken();
  return (
    <div
      className={css`
        color: ${token.colorTextSecondary};
        font-size: 14px;
        cursor: pointer;
        line-height: 22px;
        margin-bottom: 8px;
        &:hover {
          color: ${token.colorPrimary};
        }
      `}
      style={{
        width: '33.33%',
      }}
    >
      {props.children}
      <DoubleRightOutlined
        style={{
          marginInlineStart: 4,
        }}
      />
    </div>
  );
};

const { TextArea } = Input;

const MenuCard = () => {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Divider
        style={{
          height: '1.5em',
        }}
        type="vertical"
      />
    </div>
  );
};

const SearchInput = () => {
  const { token } = theme.useToken();
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: 'flex',
        alignItems: 'center',
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
          backgroundColor: token.colorBgTextHover,
        }}
        prefix={
          <SearchOutlined
            style={{
              color: token.colorTextLightSolid,
            }}
          />
        }
        placeholder="搜索方案"
        bordered={false}
      />
      <PlusCircleFilled
        style={{
          color: token.colorPrimary,
          fontSize: 24,
        }}
      />
    </div>
  );
};

export default () => {
  const dateFormat = "YYYY-MM-DD-HH"

  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true,
  });

  const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');
  const [num, setNum] = useState(40);

  const inputRef = useRef<InputRef>(null);
  const inputSi = useRef<InputRef>(null);

  const [searchStr, setSearchStr] = useState('');

  const articleRef = useRef<TextAreaRef>(null);
  const inputAiPrompt = useRef<InputRef>(null)

  const groupList = groups.groups

  const [form] = Form.useForm();
  const onTypeChange = (value: RadioChangeEvent) => {
    form.setFieldsValue({ type: value.target.value })
  }

  const onDateChange = (dateTime: RangePickerProps['value'], dateString: [string, string]) => {
    // console.log(dateTime?.[0]?.format(dateFormat));
    form.setFieldsValue({ date: dateTime })
  }

  const handleChange = (name: string, checked: boolean) => {
    // let input = inputRef.current?.input
    // if(input != null) {
    //   input.value = name
    // }
    setSearchStr(name)
  }

  const handleSearchChange = event => {
    setSearchStr(event.target.value);
  };

  let openWindow: Window | null = null

  const openAi = (prompt: String) => {
    let article = articleRef.current?.resizableTextArea?.textArea.value

    let compose = article + "\n" + prompt;
    utils.copy(compose)
    console.log(openWindow);
    if (openWindow != null && openWindow.window != null && !openWindow.closed) {
      openWindow.focus();
    } else {
      openWindow = window.open("https://yiyan.baidu.com/", "yiyan")
    }
  }

  const openBaidu = () => {

    // 搜索字符串
    const inputStr = searchStr || ""
    // 站内地址
    const siteStr = inputSi.current?.input?.value || "";

    const url = new URL("https://www.baidu.com/s?rsv_spt=1&rsv_iqid=0xd35f3b7a0009269c&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_enter=1&rsv_dl=tb&rsv_btype=i&inputT=2458&rsv_t=c76edkLSxfQa0mr%2B1dNSt1v1U7Wx7JaPQmwyLcCUpIKsYf3Q%2BlE4oxcqlmdQLRsYfUjE&ct=2097152")
    // 搜索文本
    url.searchParams.append("wd", inputStr);
    //站内地址： &si=baijiahao.com
    url.searchParams.append("si", siteStr);
    window.open(url.toString(), "baidu")
  }

  const openWeibo = () => {

    const inputStr = searchStr
    const searchStrHandled = "https://s.weibo.com/weibo?q=" + inputStr
    console.log(searchStrHandled)
    window.open(searchStrHandled)
  }

  const openAll = () => {
    openBaidu();
    openWeibo();
  }

  const openMaimai = () => {
    const inputStr = searchStr
    const searchStrHandled = "https://maimai.cn/web/search_center?type=feed&highlight=true&query=" + inputStr
    console.log(searchStrHandled)
    window.open(searchStrHandled, "maimai")
  }

  const openToutiao = () => {
    //https://so.toutiao.com/search?dvpf=pc&source=input&keyword=%E6%BB%B4%E6%BB%B4&filter_vendor=site&index_resource=site&filter_period=week&min_time=1686906358&max_time=1687511158
    // 一周时间
    let max = dayjs().unix().toString()
    let min = dayjs().subtract(7, "day").unix().toString()

    const inputStr = searchStr
    const searchStrHandled = new URL("https://so.toutiao.com/search?");
    searchStrHandled.searchParams.append("keyword", inputStr + "")
    searchStrHandled.searchParams.append("dvpf", "pc");
    searchStrHandled.searchParams.append("source", "input");
    searchStrHandled.searchParams.append("filter_vendor", "site");
    searchStrHandled.searchParams.append("index_resource", "site");
    searchStrHandled.searchParams.append("filter_period", "week");
    searchStrHandled.searchParams.append("min_time", min);
    searchStrHandled.searchParams.append("max_time", max);

    window.open(searchStrHandled, "toutiao")
  }

  const onWeiboFinish = (values: any) => {
    let type = values.type;

    let tmpDate = values.date
    let date = "custom:" + tmpDate[0].format(dateFormat) + ":" + tmpDate[1].format(dateFormat)

    const inputStr = searchStr
    const searchStrHandled = new URL("https://s.weibo.com/weibo?" + type);
    searchStrHandled.searchParams.append("q", inputStr + "")
    searchStrHandled.searchParams.append("timescope", date);

    window.open(searchStrHandled, "weibo")

  }

  if (typeof document === 'undefined') {
    return <div />;
  }
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <ProConfigProvider hashed={false}>
        <ConfigProvider
          getTargetContainer={() => {
            return document.getElementById('test-pro-layout') || document.body;
          }}
        >
          <ProLayout
            prefixCls="my-prefix"
            bgLayoutImgList={[
              {
                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                left: 85,
                bottom: 100,
                height: '303px',
              },
              {
                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                bottom: -68,
                right: -45,
                height: '303px',
              },
              {
                src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
                bottom: 0,
                left: 0,
                width: '331px',
              },
            ]}
            {...defaultProps}
            location={{
              pathname,
            }}
            token={{
              header: {
                colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
              },
            }}
            siderMenuType="group"
            menu={{
              collapsedShowGroupTitle: true,
            }}
            avatarProps={{
              src: 'avatar.png',
              size: 'large',
              title: '大宝',
              render: (props, dom) => {
                return (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'logout',
                          icon: <LogoutOutlined />,
                          label: '退出登录',
                        },
                      ],
                    }}
                  >
                    {dom}
                  </Dropdown>
                );
              },
            }}
            actionsRender={(props) => {
              if (props.isMobile) return [];
              if (typeof window === 'undefined') return [];
              return [
                props.layout !== 'side' && document.body.clientWidth > 1400 ? (
                  <SearchInput />
                ) : undefined,
                <InfoCircleFilled key="InfoCircleFilled" />,
                <QuestionCircleFilled key="QuestionCircleFilled" />,
                <GithubFilled key="GithubFilled" />,
              ];
            }}
            headerTitleRender={(logo, title, _) => {
              const defaultDom = (
                <a>
                  {logo}
                  {title}
                </a>
              );
              if (typeof window === 'undefined') return defaultDom;
              if (document.body.clientWidth < 1400) {
                return defaultDom;
              }
              if (_.isMobile) return defaultDom;
              return (
                <>
                  {defaultDom}
                  <MenuCard />
                </>
              );
            }}
            menuFooterRender={(props) => {
              if (props?.collapsed) return undefined;
              return (
                <div
                  style={{
                    textAlign: 'center',
                    paddingBlockStart: 12,
                  }}
                >
                  <div><a href="https://beian.miit.gov.cn/" target="_blank">京ICP备2023015072号-1</a></div>
                  <div> © 2023 大厂青年</div>
                  <div>by 老铁</div>
                </div>
              );
            }}
            onMenuHeaderClick={(e) => console.log(e)}
            menuItemRender={(item, dom) => (
              <div
                onClick={() => {
                  setPathname(item.path || '/welcome');
                }}
              >
                {dom}
              </div>
            )}
            {...settings}
          >
            <PageContainer
              token={{
                paddingInlinePageContainerContent: num,
              }}
              extra={[
                <Button key="3">操作</Button>,
                <Button key="2">操作</Button>,
                <Button
                  key="1"
                  type="primary"
                  onClick={() => {
                    openAll()
                  }}
                >
                  打开所有
                </Button>,
              ]}
              subTitle="简单的描述"
              footer={[
                <Button key="3">重置</Button>,
                <Button key="2" type="primary">
                  提交
                </Button>,
              ]}
            >
              <ProCard
                style={{
                  height: '200vh',
                  minHeight: 800,
                }}
                direction="column"

              >
                <ProCard
                  style={{ marginBlockStart: 28 }}
                  colSpan="100%"
                  bordered
                  split={'vertical'}
                  headerBordered
                >
                  <ProCard title="搜索设置" colSpan="50%">
                    <Space direction="vertical">
                      <Input style={{ width: '50%' }} value={searchStr} onChange={handleSearchChange}/>
                      <Space wrap>

                        <Space.Compact style={{ width: '100%' }}>
                          <Input defaultValue="baijiahao.baidu.com" ref={inputSi} />
                          <Button type="primary" onClick={() => {
                            openBaidu()

                          }}>百度</Button>
                        </Space.Compact>
                        <Button onClick={() => {
                          openMaimai()
                        }}>脉脉</Button>
                        <Button onClick={() => {
                          openToutiao()
                        }}>头条</Button>
                      </Space>

                      <ProCard title="微博"  bordered headerBordered>
                        <Form
                          form={form}
                          onFinish={onWeiboFinish}
                          initialValues={{ type: "atten=1", date: [dayjs().subtract(7, "day"), dayjs()] }}
                        >
                          <Form.Item label="类型" name="type">
                            <Radio.Group defaultValue="category=4" onChange={onTypeChange}>
                              <Radio.Button value="typeall=1">全部</Radio.Button>
                              <Radio.Button value="atten=1">关注人</Radio.Button>
                              <Radio.Button value="vip=1" >认证用户</Radio.Button>
                              <Radio.Button value="category=4">媒体</Radio.Button>
                            </Radio.Group>
                          </Form.Item>
                          <Form.Item label="时间" name="date">
                            <DatePicker.RangePicker
                              onChange={onDateChange}
                              format={"YYYY-MM-DD-HH"}
                              defaultValue={[dayjs().subtract(7, "day"), dayjs()]}
                              showTime={{ use12Hours: false, format: "HH" }}
                            />
                          </Form.Item>
                          <Form.Item>
                            <Button type="primary" htmlType="submit">搜索</Button>
                          </Form.Item>
                        </Form>
                      </ProCard>
                    </Space>
                  </ProCard>
                  <ProCard title="圈子" colSpan="50%" direction='column'>
                    <List
                      itemLayout="vertical"
                      dataSource={groupList}
                      pagination={{position: 'bottom', pageSize: 4}}
                      renderItem={(item, index) => (
                        <List.Item>
                          <List.Item.Meta title={item.group} avatar={<Avatar icon={<MobileTwoTone twoToneColor={settings?.colorPrimary}/>}/>} />
                          <Space size={[0, 8]} wrap>
                            {item.list.map((name) => (
                              <CheckableTag
                                key={name}
                                checked={false}
                                onChange={(checked) => handleChange(name, checked)}
                              >
                                {name}
                              </CheckableTag>
                            ))}
                          
                        </Space>
                        </List.Item>
                      )}
                    />
                  </ProCard>
                </ProCard>
                <ProCard
                  style={{ marginBlockStart: 28 }}
                  colSpan="100%"
                  bordered
                  split={'vertical'}
                  headerBordered
                >
                  <ProCard title="文章内容" colSpan="50%">
                    <TextArea rows={24}
                      placeholder='输入文章内容'
                      ref={articleRef}
                    />
                  </ProCard>
                  <ProCard title="AI 提示词">
                    <Space direction='vertical' size={[0, 20]} >
                      <Tag color="magenta" onClick={(e) => {
                        openAi(e.target?.innerText || "")
                      }
                      }>内容用中文写一篇稿子，开头不要和原文一样，把【大厂青年】写到文章第一段话的开头</Tag>
                      <Tag color="red" onClick={(e) => {
                        openAi(e.target?.innerText || "")
                      }
                      }>就以上内容用中文写一篇稿子，开头不要和原文一样，把【大厂青年】写到文章第一段话的开头</Tag>
                      {/* <Tag color="volcano"></Tag>
                      <Tag color="orange">orange</Tag>
                      <Tag color="gold">gold</Tag>
                      <Tag color="lime">lime</Tag>
                      <Tag color="green">green</Tag>
                      <Tag color="cyan">cyan</Tag>
                      <Tag color="blue">blue</Tag>
                      <Tag color="geekblue">geekblue</Tag>
                      <Tag color="purple">purple</Tag> */}
                      <Space.Compact style={{ width: '100%' }}>
                        <Input placeholder="AI 提示词" allowClear ref={inputAiPrompt} />

                        <Button type="primary" onClick={() => {
                          openAi(inputAiPrompt.current?.input?.value || "")
                        }}>文心一言</Button>
                      </Space.Compact>
                    </Space>
                  </ProCard>
                </ProCard>
              </ProCard>
            </PageContainer>

            <SettingDrawer
              pathname={pathname}
              enableDarkTheme
              getContainer={(e: any) => {
                if (typeof window === 'undefined') return e;
                return document.getElementById('test-pro-layout');
              }}
              settings={settings}
              onSettingChange={(changeSetting) => {
                setSetting(changeSetting);
              }}
              disableUrlParams={false}
            />
          </ProLayout>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
};
