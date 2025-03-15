import { useState } from 'react';
import TWish from '../../types/wish.model';
import s from './mainPage.module.css';

function MainPage() {

    const userName = localStorage.getItem('login')

    const [wishItem, setWishItem] = useState('');
    
    const [wishList, setWishList] = useState<TWish[]>(() => {
        const storedWishList = localStorage.getItem('wishList');
        return storedWishList ? JSON.parse(storedWishList) : [];
    });

    function addWish() {
        if (wishItem.trim()) {
            const updatedWishList = [...wishList, {id: wishList.length + 1, text: wishItem, isGet: false}];
            setWishList(updatedWishList);
            localStorage.setItem('wishList', JSON.stringify(updatedWishList))
        } else return;

        setWishItem('');
    }

    function deleteWish(index: number) {
        const updatedWishList = wishList.filter((_, i) => i !== index);
        setWishList(updatedWishList)
        localStorage.setItem('wishList', JSON.stringify(updatedWishList))
    }

    function wishIsGet(index: number) {
        const updatedWishList = wishList.map((wish, i) => i === index ? { ...wish, isGet: !wish.isGet } : wish);
        setWishList(updatedWishList);
        localStorage.setItem('wishList', JSON.stringify(updatedWishList))
    }

    function shareWishList() {
        if (wishList.length === 0) {
            alert('Список порожній! Додайте хоча б одне побажання.');
            return;
        }
    
        const shareText = wishList
            .map((wish, index) => `${index + 1}. ${wish.text} ${wish.isGet ? '(Вже подаровано)' : ''}`)
            .join('\n');
    
        navigator.clipboard.writeText(shareText)
            .then(() => alert('Список скопійовано в буфер обміну! Тепер можете вставити його в месенджер чи соцмережі.'))
            .catch((err) => alert('Не вдалося скопіювати список: ' + err));
    }

    function logOut() {
        localStorage.setItem('isAuth', 'false')
        window.location.reload()
    }

    function deleteAccount() {
        localStorage.clear()
        window.location.reload()
    }

    return (
        <div className={s.wrapper}>

            <nav className={s.header}>

                <div className={s.admin}>
                    <div className={s.admin_name}>{userName ? userName : 'No-Name'}</div>
                    <div className={s.log_out}>
                        <div className={s.output} onClick={() => logOut()}>Log Out</div>
                        <div className={s.output} onClick={() => deleteAccount()}>Delete Account</div>
                    </div>
                </div>

                <div className={s.form}>
                    <input 
                    type="text" 
                    className={s.input_wish} 
                    placeholder='Наприклад: iPhone 16 Pro 128gb' 
                    value={wishItem} 
                    onChange={(e) => {setWishItem(e.target.value)}}/>

                    <div className={s.input_btns}>
                        <button 
                        className={`btn ${s.add_item}`}
                        onClick={addWish}
                        >Додати предмет</button>

                        <button 
                        className={`btn ${s.share_list}`}
                        onClick={shareWishList}
                        >Поділитися списком</button>
                    </div>
                </div>

            </nav>

            <div className={s.main_screen}>

                {wishList[0] ? 
                <div className={s.isEmpty} style={{display: 'none'}}></div>
                : 
                <div className={s.isEmpty}>Ваш список бажань пустий :(</div>} 

                {wishList.map((_, index) => (
                    <div 
                    key={wishList[index].id} 
                    className={wishList[index].isGet ? `${s.wish_list_item} ${s.wish_is_get}` : `${s.wish_list_item}`}
                    >
                        {wishList[index].text}
                        <div className={s.btns}>
                            <button className={`btn ${s.isGet}`} onClick={() => wishIsGet(index)}>Подаровано</button>
                            <button className={`btn ${s.isDelete}`} onClick={() => deleteWish(index)}>Видалити</button>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default MainPage;