import React from "react"
import ContentLoader from "react-content-loader"

const Placeholder: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={288}
    height={466}
    viewBox="0 0 288 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="10" y="0" rx="100" ry="100" width="260" height="260"/>
    <rect x="0" y="270" rx="10" ry="10" width="280" height="27"/>
    <rect x="6" y="317" rx="24" ry="24" width="268" height="76"/>
    <rect x="130" y="411" rx="20" ry="20" width="150" height="43"/>
    <rect x="0" y="417" rx="20" ry="20" width="107" height="33"/>
  </ContentLoader>
)

export default Placeholder
