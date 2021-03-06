import { Spinner } from 'react-bootstrap';

export default function UnderLoader(props) {
  const { loading, children } = props;

  if (loading) {
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ opacity: 0.4 }}>{children}</div>
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <Spinner
            animation='border'
            variant='dark'
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
            }}
          />
        </div>
      </div>
    );
  }

  return children;
}
