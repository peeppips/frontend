
// import { Spinner } from 'react-bootstrap'
import { Spin } from 'antd';
const Loader = () => {
  return (
    // <Spinner
    //   animation='border'
    //   role='status'
    //   style={{
    //     width: '100px',
    //     height: '100px',
    //     margin: 'auto',
    //     display: 'block',
    //   }}
    // >
    // </Spinner>

      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>

  )
}

export default Loader
