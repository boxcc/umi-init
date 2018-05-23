import React from 'react';
import { connect } from 'dva';
// import Redirect from 'umi/redirect';
// import styles from './index.css';
import { Button } from 'antd';

function IndexPage({ login }) {
  // if (login) {
  //   return <Redirect to="/login" />;
  // }
  
  return (
    <div>
      umi init
      <Button>TEST</Button>
    </div>
  );
}

IndexPage.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    login: state.global.login,
  };
}

export default connect(mapStateToProps)(IndexPage);
