import React from 'react';
import { TabBar } from 'antd-mobile';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router';
import {PlusOutlined} from '@ant-design/icons';
import $ from 'jquery';

class TabBarBottom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '',
      hidden: false,
      fullScreen: false,
      redirect: false,
    };
  }
 
  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              hidden: !this.state.hidden,
            });
          }}
        >
          Click to show/hide tab-bar
        </a>
        <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              fullScreen: !this.state.fullScreen,
            });
          }}
        >
          Click to switch fullscreen
        </a>
      </div>
    );
  }

  render() {
    if (this.state.redirect) {
        this.setState({redirect:false})
        return <Redirect push to={this.state.selectedTab}/>;
    }
    return (
      <div id = "tabBarBottom" style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { position: 'absolute', bottom: 0, width: '100%'}}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
          height="200px"
        >
          <TabBar.Item
            title="Home"
            key="Home"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selectedTab === '/'}
            badge={1}
            onPress={() => {
              this.setState({
                selectedTab: '/',
                redirect: true,
              });
            }}
            data-seed="logId"
          >
            {/*this.renderContent('Life')*/}
          </TabBar.Item>
          
          <TabBar.Item
            icon={
            //   <div style={{
            //     width: '22px',
            //     height: '22px',
            //     background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
            //   />
                
                <PlusOutlined id="plusTabBar" />
            }
            selectedIcon={
            //   <div style={{
            //     width: '22px',
            //     height: '22px',
            //     background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
            //   />
                <PlusOutlined id="plusTabBar" style={{color: 'blue'}}/>
            }
            title="Add Plant"
            key="addPlant"
            dot
            //selected={this.state.selectedTab === '/'}
            onPress={() => {
              this.setState({
                selectedTab: '/',
                redirect: true,
              });
              this.props.toggleAddPop();
            }}
          >
            {/*this.renderContent('Friend')*/}
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
            title="About"
            key="About"
            hidden="true"
            selected={this.state.selectedTab === '/About'}
            onPress={() => {
              this.setState({
                selectedTab: '/About',
                redirect: true,
              });
            }}
          >
            {/*this.renderContent('My')*/}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default TabBarBottom;