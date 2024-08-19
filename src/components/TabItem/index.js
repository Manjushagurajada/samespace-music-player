import './index.css'

const TabItem = props => {
  const {tabDetails, onClickButton, isActive} = props
  const {tabId, tabContent} = tabDetails
  const activeBtn = isActive ? 'highlight' : 'normal'
  const clickButton = () => {
    onClickButton(tabId)
  }
  return (
    <li className="tab-item" key={tabId}>
      <button
        className={`tab-button ${activeBtn}`}
        type="button"
        onClick={clickButton}
      >
        {tabContent}
      </button>
    </li>
  )
}

export default TabItem
