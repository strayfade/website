import './ArticleHeader.css'
import IconButton from './IconButton'
import Separator from './Separator'

function ArticleHeader({ Title = 'Test Title', Description = 'Test Description', Author = 'Noah' }) {
    return (
        <div>
            <IconButton Ref={'/'} Image={'arrow_back'} Button={'Back'} />
            <h1 className='article-title'>{Title}</h1>
            <p className='article-description'>{Description}</p>
            <div className='article-author'>
                <span>Written by</span> <span className='article-author-emphasis'>{Author}</span>
            </div>
            <Separator/>
        </div>
    )
}
export default ArticleHeader
