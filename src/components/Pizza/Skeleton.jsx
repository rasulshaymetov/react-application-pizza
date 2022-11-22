import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    className='pizza-block'
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >

    <circle cx="138" cy="138" r="138" />
    <rect x="0" y="296" rx="10" ry="10" width="280" height="15" />
    <rect x="0" y="345" rx="10" ry="10" width="280" height="88" />

    <rect x="0" y="444" rx="10" ry="10" width="92" height="30" />
    <rect x="121" y="443" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton

