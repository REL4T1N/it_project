import styles from"./premiere.module.css"
function Premiere({props}) {
  return (
    <div className='bg-[#222222] my-8 mx-10'>
        <div className="h-[400px] bg-[#2e2c2c] w-1/4 min-w-80" id="Description">
            <h1 className="text-[#DBF231] text-4xl px-20 py-5">{props.logo}</h1>
            <div className='description px-16 text-xl'>
                <p className="">{props.description}</p>
                <p className="py-1">Ну актеры мб</p>
            </div>
        </div>
        <div className='premiere-image'>
        </div>
    </div>
  )
}

export default Premiere