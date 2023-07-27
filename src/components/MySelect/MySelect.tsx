import { useEffect, useState } from 'react';
import Select from 'react-select'
import './mySelect.css'
import { IUserData } from '../../page/MainPage/MainPage';

interface Ioptions {
    value: string,
    label: string,
}

interface ImySelectOptions {
    arrayUsernames: IUserData[],
    setCurrentUsername: (value: string) => void,
    currentUsername: string
}

const MySelect: React.FC<ImySelectOptions> = ({arrayUsernames, setCurrentUsername, currentUsername}) => {

    const [options, setOptions] = useState<Ioptions[]>([]);

    const getValue = () => {
        return currentUsername ? options.find(b => b.value === currentUsername) : ''
    }

    const onChange = (newValue: null | any) => {
        if(newValue){
            setCurrentUsername(newValue.value)
        }else{
            setCurrentUsername('')
        }
    }

    const formattedData = () => {
        if (Array.isArray(arrayUsernames)) {
            const formattedOptions = arrayUsernames.map((item) => ({
                value: item.username,
                label: item.username
            }));
            setOptions(formattedOptions);
        }
    }

    useEffect(() => {
        formattedData()
    }, [])

    return(
        <Select options={options} onChange={onChange} className="react-select-container"
        value={getValue()} isClearable placeholder='Users'/>
    )
}
    
export default MySelect