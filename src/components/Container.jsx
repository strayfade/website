import './Container.css'

function Container({children}) {
    return (
        <main>
            <div className='scrollable'>
                <div className='page-container'>
                    <div className='page-padding'></div>
                    {children}
                    <div className='page-padding'></div>
                </div>
            </div>
        </main>
    )
}
export default Container
