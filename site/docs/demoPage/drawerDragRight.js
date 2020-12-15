import React from "react";
import ReactDOM from 'react-dom';
import { Drawer, Menu, Button } from '../../../source/components/index.ts';
import { Resizable } from 'react-resizable';
import './drawerDragRight.less';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      drawerWidth: 450,
      resizeWidth: document.body.offsetWidth - 450
    };
  }

  onChange = (bool) => {
    console.log(bool);
  }

  onTouchEnd = () => {
    this.setState({
      visible: false,
    });
  }

  onSwitch = () => {
    this.setState({
      visible: !this.state.visible,
    });
  }

  onCloseClick = () => {
    this.setState({
      visible: !this.state.visible,
    });
  }

  onResize = (e, { size }) => {
    this.setState({
      resizeWidth: size.width,
      drawerWidth: document.body.offsetWidth - size.width
    })
  }

  render() {
    return (
      <div>
        <Drawer
          handler={false}
          level={null}
          width={this.state.drawerWidth}
          visible={this.state.visible}
          closed={true}
          onChange={this.onChange}
          onMaskClick={this.onTouchEnd}
          onCloseClick={this.onCloseClick}
        >
          <Resizable
            width={this.state.resizeWidth}
            height={0}
            minConstraints={[document.body.offsetWidth - 1000, 0]}
            maxConstraints={[document.body.offsetWidth - 300, 0]}
            onResize={this.onResize}
            draggableOpts={{
              offsetParent: document.body
            }}
          >
            <div style={{ height: '100%' }}>
              <Menu
                style={{ height: '100%' }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
              >
                <Menu.SubMenu
                  key="sub1"
                  title={<span>Navigation One</span>}
                >
                  <Menu.ItemGroup key="g1" title="Item 1">
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup key="g2" title="Item 2">
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                  </Menu.ItemGroup>
                </Menu.SubMenu>
                <Menu.SubMenu
                  key="sub2"
                  title={<span>Navigation Two</span>}
                >
                  <Menu.Item key="5">Option 5</Menu.Item>
                  <Menu.Item key="6">Option 6</Menu.Item>
                  <Menu.SubMenu key="sub3" title="Submenu">
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                  </Menu.SubMenu>
                </Menu.SubMenu>
                <Menu.SubMenu
                  key="sub4"
                  title={<span>Navigation Three</span>}
                >
                  <Menu.Item key="9">Option 9</Menu.Item>
                  <Menu.Item key="10">Option 10</Menu.Item>
                  <Menu.Item key="11">Option 11</Menu.Item>
                  <Menu.Item key="12">Option 12</Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </div>
          </Resizable>
        </Drawer>
        <div
          style={{
            width: '100%', height: 450,
            textAlign: 'center', lineHeight: '450px',
          }}
        >
          内容区块
          <Button
            type="primary"
            onClick={this.onSwitch}
            style={{marginLeft: 20}}
          >
            {!this.state.visible ? '打开抽屉' : '关闭抽屉'}
          </Button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Demo />,
  document.getElementById('app')
);
