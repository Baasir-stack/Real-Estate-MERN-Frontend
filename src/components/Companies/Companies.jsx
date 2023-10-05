import './Companies.css'

const Companies = () => {
  return (
    <div className='c-wrapper'>
        <div className="innerWidth paddings flexCenter c-container">
            <div className="company-logo">
                <img src="./prologis.png"  alt="" />
            </div>
            <div className="company-logo">
                <img src="./tower.png" alt="" />
            </div>
            <div className="company-logo">
                <img  src="./equinix.png" alt="" />
            </div>
            <div  className="company-logo">
                <img  src="./realty.png" alt="" />
            </div>
            
        </div>
    </div>
  )
}

export default Companies