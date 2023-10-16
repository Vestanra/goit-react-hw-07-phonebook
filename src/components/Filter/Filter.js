import { Wrapper } from './Filter.styled';
import { useDispatch } from 'react-redux';
import { changeFilter } from 'redux/filterSlice';

export const Filter = () => {
    const dispatch = useDispatch();
    return (
        <Wrapper>
            Find contacts by name
            <input type="text" name="contact" onChange={(evt) => dispatch(changeFilter(evt.target.value))}></input>
        </Wrapper>
    )
}
